import React, { useEffect, useState } from "react";
import { CdButton, CdContainer, CdSWOMap } from "@atoms/index";
import { MapLocation } from "@interfaces/components/map";
import { SwoLocationDto } from "@interfaces/request/swo-location-dto";
import { mapService } from "@services/api/map-service";
import LocationDetailPanel from "./LocationDetailPanel";
import CdRow from "@atoms/Base/CdRow";
import CdCol from "@atoms/Base/CdCol";
import isValidMARAddressSearch from "@utils/mar-address-utils";
import globalAppConfig from "@config/global-app-config";
import { isNullOrEmpty } from "@utils/stringValidation";
import {
  Address,
  Block,
  Intersection,
} from "@interfaces/response/mar-geocode-reponse-dto";
import SearchResults from "./SearchResults";
import { useAppDispatch } from "@store/state-hooks";
import { setActiveTab } from "@store/reducers/mps/swoWizardSlice";
import { enqueueSnackbar } from "notistack";
import { ToastVariant } from "@enums/components/snackbar-enum";
import CdTypography from "@atoms/Typography/CdTypography";

const mapApiRejectionCharacters = globalAppConfig.mapApiRejectionCharacters;

interface SWOLocationProps {
  disableResults?: boolean;
}

const SWOLocation: React.FC<SWOLocationProps> = ({
  disableResults = false,
}) => {
  const dispatch = useAppDispatch();
  const [isLocationLoading, setIsLocationLoading] = useState<boolean>(false);
  const [locationData, setLocationData] = useState<SwoLocationDto | null>(null);
  const [pinnedCoordinate, setPinnedCoordinate] = useState<MapLocation | null>(
    null
  );
  const [locationCoordinates, setLocationCoordinates] = useState<
    MapLocation[] | null
  >(null);
  const [addressSearchText, setAddressSearchText] = useState<string>("");
  const [locationSuggestions, setLocationSuggestions] = useState<any[]>([]);

  const handleChangeLocation = async (data: any) => {
    setPinnedCoordinate(null);
    const searchLocation = data.location;
    if (
      searchLocation &&
      !isNullOrEmpty(searchLocation) &&
      isValidMARAddressSearch(searchLocation)
    ) {
      setIsLocationLoading(true);
      try {
        const { data, success } = await mapService.requestSearchResults(
          searchLocation
        );
        if (success) {
          const responseData = editLocationResponse(data);
          const locationCoordinates: MapLocation[] = responseData?.map(
            (loc: Address | Block | Intersection) => {
              return {
                latitude: loc.latitude,
                longitude: loc.longitude,
              };
            }
          );
          setLocationCoordinates(locationCoordinates);
        }
      } catch (error) {
        // Will replace with system notification later
        enqueueSnackbar("Location not found.", { variant: ToastVariant.Error });
      } finally {
        setIsLocationLoading(false);
      }
    }
  };

  const editLocationResponse = (
    data: any
  ): Block[] | Address[] | Intersection[] | [] => {
    const isResultAvailable = Object.entries(data).length !== 0;
    if (isResultAvailable) {
      switch (Object.keys(data)[0].toLowerCase()) {
        case "blocks":
          data = data.blockAddresses.map((block: any) => {
            return {
              longitude: block.address.properties.Longitude,
              latitude: block.address.properties.Latitude,
              ward: block.address.properties.Ward,
              quadrant: block.address.properties.Quadrant,
            };
          });
          break;

        case "addresses":
          data = data.addresses.map((address: any) => {
            return {
              longitude: address.address.properties.Longitude,
              latitude: address.address.properties.Latitude,
              ward: address.address.properties.Ward,
              quadrant: address.address.properties.Quadrant,
            };
          });
          break;

        case "intersections":
          data = data.intersections.map((intersection: any) => {
            return {
              longitude: intersection.intersection.properties.Longitude,
              latitude: intersection.intersection.properties.Latitude,
            };
          });
          break;
        default:
          return [];
          break;
      }
      return data;
    }
    return [];
  };

  const fetchReverseGeoCodeLocation = async (coordinates: MapLocation) => {
    try {
      setIsLocationLoading(true);
      const { data, success } = await mapService.getReverseGeoCodeLocation(
        coordinates
      );
      if (success) {
        setLocationData({
          location:
            data?.data?.address.properties.fullAddress ||
            data?.data?.address.properties.alias ||
            "",
          ward: data?.data?.address.properties.ward || "",
          quadrant: data?.data?.address.properties.quadrant || "",
          lot: data?.data?.sslData?.lot || "",
          square: data?.data?.sslData?.square || "",
        });
      }
    } catch (error) {
      setLocationData({
        location: "",
        lot: "",
        parcel: "",
        quadrant: "",
        square: "",
        ward: "",
      });
      // Will replace with system notification later
      enqueueSnackbar("Location not found.", { variant: ToastVariant.Error });
    } finally {
      setIsLocationLoading(false);
    }
  };

  const fetchLocationSuggestions = async (searchBoxText: string) => {
    try {
      let { data, success } = await mapService.requestTextSuggestions(
        searchBoxText
      );

      if (success) {
        // filter unique items
        data = data.filter(
          (item: any, index: number, self: any[]) =>
            self.indexOf(item) === index
        );
        // remove items containing bad characters
        const badCharacterSet = new Set(mapApiRejectionCharacters);
        data = data.filter(
          (item: any) => ![...item].some((char) => badCharacterSet.has(char))
        );
        setLocationSuggestions(data);
      } else {
        setLocationSuggestions([]);
      }
    } catch (error) {
      // Will add system notification later
      enqueueSnackbar("Error occured.", { variant: ToastVariant.Error });
    }
  };

  useEffect(() => {
    if (pinnedCoordinate) {
      setLocationCoordinates(null);
      fetchReverseGeoCodeLocation(pinnedCoordinate);
    }
  }, [pinnedCoordinate]);

  useEffect(() => {
    if (addressSearchText && isValidMARAddressSearch(addressSearchText)) {
      fetchLocationSuggestions(addressSearchText);
    }
  }, [addressSearchText]);

  useEffect(() => {
    if (locationCoordinates) {
      setLocationData({
        location: addressSearchText,
        lot: null,
        parcel: null,
        quadrant: null,
        square: null,
        ward: null,
      });
    }
  }, [locationCoordinates]);

  return (
    <CdContainer>
      <CdRow className="g-0 flex-column py-3 me-5">
        <CdCol className="mb-3">
          <CdTypography className="h5">Select Location on Map</CdTypography>
          <span>(Double click on the map to select a location.)</span>
        </CdCol>
        <CdCol>
          <CdSWOMap
            coordinates={pinnedCoordinate}
            getPinnedCoordinates={setPinnedCoordinate}
            isLocationLoading={isLocationLoading}
            MultipleCoordinates={locationCoordinates}
          />
        </CdCol>
        <CdCol>
          <LocationDetailPanel
            locationData={locationData}
            handleChangeLocation={handleChangeLocation}
            setAddressSearchText={setAddressSearchText}
            locationSuggestions={locationSuggestions}
            setLocationSuggestions={setLocationSuggestions}
          />
        </CdCol>
        <hr className="mt-5 mb-3" />
        <CdCol>
          {locationData?.quadrant && !disableResults && <SearchResults />}
        </CdCol>
        <CdCol xs={12} className="d-flex justify-content-start">
          <CdButton
            color="primary"
            onClick={() => dispatch(setActiveTab(1))}
            className="me-2"
          >
            Back
          </CdButton>
          <CdButton color="primary" onClick={() => dispatch(setActiveTab(3))}>
            Next
          </CdButton>
        </CdCol>
      </CdRow>
    </CdContainer>
  );
};

export default SWOLocation;
