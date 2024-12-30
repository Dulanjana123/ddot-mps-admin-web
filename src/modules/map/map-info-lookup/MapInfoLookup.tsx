import { CdAutocompleteTextInput, CdButton } from "@atoms/index";
import CdGisMap from "@atoms/Map/CdGisMap";
import Breadcrumbs from "@common-elements/Breadcrumbs/Breadcrumbs";
import globalAppConfig from "@config/global-app-config";
import { ButtonSizes, ButtonTypes } from "@enums/components/ButtonEnum";
import { Variant } from "@enums/components/CommonEnum";
import { MapLocation } from "@interfaces/components/map";
import { CdLoadingButton } from "@molecules/index";
import CdDataTable from "@organisms/Table/CdDataTable";
import { mapService } from "@services/api/map-service";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

const mapApiRejectionCharacters = globalAppConfig.mapApiRejectionCharacters;

const MapInfoLookup: React.FC = () => {
  const [headers, setHeaders] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [recordCount, setRecordCount] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [clickedSubmit, setClickedSubmit] = useState<boolean>(false);
  const [searchBoxText, setSearchBoxText] = useState<string>("");
  const [items, setItems] = useState<any[]>([]);
  const [textBoxErrorToggle, setTextBoxErrorToggle] = useState<boolean>(false);
  const [containsBadCharacter, setContainsBadCharacter] =
    useState<boolean>(false);
  const [mapLocation, setMapLocation] = useState<MapLocation | null>(null);
  const [isResultAvailable, setIsResultAvailable] = useState<boolean>(false);
  const [isInitialRender, setIsInitialRender] = useState<boolean>(true);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const extractTableHeaders = (data: any) => {
    const headers = ["", ...Object.keys(data[0])];
    return headers;
  };

  const isValidMARAddressSearch = (searchText: string): Boolean => {
    for (const char of mapApiRejectionCharacters) {
      if (searchText.includes(char)) {
        return false;
      }
    }

    return true;
  };

  const editLocationResponse = (data: any) => {
    const isResultAvailable = Object.entries(data).length !== 0;
    if (isResultAvailable) {
      switch (Object.keys(data)[0].toLowerCase()) {
        case "blocks":
          // need longitude, latitude, block, and block name
          data = data.blocks.map((block: any) => {
            return {
              Longitude: block.block.geometry.coordinates[0],
              Latitude: block.block.geometry.coordinates[1],
              Block: block.block.properties.FullBlock,
              BlockName: block.block.properties.BlockName,
            };
          });
          break;

        case "addresses":
          // need longitude, latitude, and address
          data = data.addresses.map((address: any) => {
            return {
              Longitude: address.address.geometry.coordinates[0],
              Latitude: address.address.geometry.coordinates[1],
              Address: address.address.properties.FullAddress,
              Alias: address.address.properties.Alias,
            };
          });
          break;

        case "intersections":
          // need intersection, longitude, latitude
          data = data.intersections.map((intersection: any) => {
            return {
              Longitude: intersection.intersection.geometry.coordinates[0],
              Latitude: intersection.intersection.geometry.coordinates[1],
              Intersection:
                intersection.intersection.properties.FullIntersection,
            };
          });
          break;
        default:
          break;
      }
      return data;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await mapService.requestTextSuggestions(searchBoxText);
      // keep only unique items using filter and indexOf
      response.data = response.data.filter(
        (item: any, index: number, self: any[]) => self.indexOf(item) === index
      );

      // remove items containing bad characters
      const badCharacterSet = new Set(mapApiRejectionCharacters);
      response.data = response.data.filter(
        (item: any) => ![...item].some((char) => badCharacterSet.has(char))
      );

      setItems(response.data);
    };
    fetchData();
  }, [searchBoxText]);

  const handleSearchClicked = async () => {
    if (!isValidMARAddressSearch(searchBoxText)) {
      setMapLocation(null);
      setHeaders([]);
      setData([]);
      setIsResultAvailable(false);
      setContainsBadCharacter(true);
      return;
    }
    setContainsBadCharacter(false);
    setTextBoxErrorToggle(true);
    setRecordCount(0);
    setData([]);
    setMapLocation(null);
    if (searchBoxText.length > 0) {
      setClickedSubmit(true);
      setSearchTerm(searchBoxText);
      const response = await mapService.requestSearchResults(searchBoxText);
      const success = response.success;
      const responseData = editLocationResponse(response.data);
      setClickedSubmit(false);
      if (success) {
        setIsResultAvailable(true);
        setRecordCount(responseData.length);
        setHeaders(extractTableHeaders(responseData));

        const tempData: any[] = [];
        responseData.forEach((item: any) => {
          tempData.push([
            <CdButton
              id={"map-view-btn"}
              text="View Map/Info"
              color={Variant.link}
              onClick={() => setMapLocation}
            />,
            ...Object.values(item),
          ]);
        });
        setData(tempData);
      } else {
        setIsInitialRender(false);
        setIsResultAvailable(false);
      }
    }
  };

  const handleSetMapLocation = (data: any) => {
    const mapLocationPoint: MapLocation = {
      latitude: data[2],
      longitude: data[1],
    };
    setMapLocation(mapLocationPoint);
  };

  const showErrorText = () => {
    if (containsBadCharacter) {
      return "MAR web service does not accept some of the characters in your search text. Please check the format and try again.";
    } else if (isResultAvailable) {
      return `Your search for '${searchTerm}' returned ${recordCount} ${
        recordCount > 1 ? "records" : "record"
      }.`;
    } else if (!isResultAvailable && !isInitialRender) {
      return "MAR web service returned no results for your search string. Please check the format and try again.";
    }
  };

  useEffect(() => {
    if (mapLocation) {
      mapContainerRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [mapLocation]);

  return (
    <div className="page-body">
      <Breadcrumbs mainTitle={"Map-Info Lookup"} parent="Map" />
      <Container fluid>
        <Card>
          <CardBody>
            <Row className="g-0 justify-content-center">
              <Col xs={12} className="d-flex justify-content-center">
                <label htmlFor="searchInput">Address/Block/Intersection</label>
              </Col>

              <Col sx={12} md={4}>
                <CdAutocompleteTextInput
                  id="searchInput"
                  sx={{ width: "auto" }}
                  placeholder="Search location"
                  type="search"
                  freeSolo
                  disableClearable
                  options={items.map((item: any) => item)}
                  error={textBoxErrorToggle && searchBoxText.length == 0} // to avoid displaying error as soon as page loads (when searchBoxText is empty)
                  onInputChange={(_event, newInputValue) => {
                    setSearchBoxText(newInputValue);
                    if (newInputValue.length <= 1) {
                      setItems([]);
                      if (newInputValue.length == 0) {
                        setSearchBoxText("");
                      }
                    }
                  }}
                  onKeyDown={(event) => {
                    // to simulate a click on the search button when the user presses the 'Enter' key
                    if (event.key === "Enter") {
                      handleSearchClicked();
                    }
                  }}
                />
              </Col>

              <Col xs={12} className="d-flex justify-content-center mt-4 mb-5">
                <CdLoadingButton
                  text="Search"
                  size={ButtonSizes.md}
                  color={Variant.primary}
                  isLoading={clickedSubmit}
                  disabled={clickedSubmit}
                  type={ButtonTypes.submit}
                  id={"searchButton"}
                  onClick={handleSearchClicked}
                  className={"w-25"}
                />
              </Col>
            </Row>
            <Row className="g-0 mb-4">
              <Col>
                <p>
                  <b>
                    <i>{showErrorText()}</i>
                  </b>
                </p>
                {isResultAvailable && (
                  <CdDataTable
                    bordered
                    hover
                    striped
                    headers={headers}
                    data={data}
                    onRowClick={handleSetMapLocation}
                    responsive
                    small
                  />
                )}
              </Col>
            </Row>
            <div ref={mapContainerRef}>
              {mapLocation && isResultAvailable && (
                <CdGisMap
                  latitude={mapLocation.latitude}
                  longitude={mapLocation.longitude}
                />
              )}
            </div>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default MapInfoLookup;
