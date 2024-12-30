import React, { useEffect, useRef } from "react";
import "@esri/calcite-components/dist/components/calcite-shell.js";
import "@esri/calcite-components/dist/components/calcite-shell-panel.js";
import "@esri/calcite-components/dist/components/calcite-action-bar.js";
import "@esri/calcite-components/dist/components/calcite-action.js";
import "@esri/calcite-components/dist/components/calcite-panel.js";
import "@esri/calcite-components/dist/components/calcite-action-group.js";
import "@esri/calcite-components/dist/components/calcite-block.js";
import { CalciteShell } from "@esri/calcite-components-react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Point from "@arcgis/core/geometry/Point";
import Graphic from "@arcgis/core/Graphic";
import { MapLocation } from "@interfaces/components/map";
import mapPinIcon from "./MapUtilities/map-pin";
import { CommonMarkerPopupTemplate } from "@constants/arcgis-map-constants/pop-ups";
import ActionButton from "@arcgis/core/support/actions/ActionButton";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";
import CdMapLoadingLayer from "./MapComponents/CdMapLoadingLayer";

type SwoMapProps = {
  coordinates?: MapLocation | null;
  MultipleCoordinates?: MapLocation[] | null;
  getPinnedCoordinates: (coordinates: MapLocation) => void;
  isLocationLoading?: boolean;
};

const CdSWOMap: React.FC<SwoMapProps> = ({
  coordinates,
  getPinnedCoordinates,
  MultipleCoordinates,
  isLocationLoading = false,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<MapView | null>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (viewRef.current) return;

    const map = new Map({
      basemap: "topo-vector",
    });

    const view = new MapView({
      map: map,
      container: mapContainerRef.current!,
      center: [-77.009056, 38.889805],
      zoom: 12,
      constraints: {
        minZoom: 11,
      },
    });

    viewRef.current = view;
    mapRef.current = map;

    view.ui.move("zoom", "bottom-left");

    view.on("double-click", (event) => {
      event.stopPropagation(); // Prevent the default double-click zoom behavior
    });
  }, []);

  useEffect(() => {
    if (!viewRef.current) return;
    const view = viewRef.current;

    view.graphics.removeAll();

    // event-listener for map clicks
    view.on("double-click", (event) => {
      if (!isLocationLoading) {
        let mapCoordinate: MapLocation = {
          latitude: event.mapPoint.latitude,
          longitude: event.mapPoint.longitude,
        };

        getPinnedCoordinates(mapCoordinate);
      }
    });

    if (
      coordinates?.latitude &&
      coordinates?.longitude &&
      MultipleCoordinates == null
    ) {
      const pointGraphic = addPin(coordinates, true);
      view.graphics.add(pointGraphic);
    }

    if (MultipleCoordinates) {
      const pointGraphics = MultipleCoordinates.map((coordinate) => {
        return addPin(coordinate, true, true);
      });

      view.graphics.addMany(pointGraphics);
    }

    const selectMapLocation = async () => {
      const selectedPoint = view.popup.selectedFeature.geometry as Point;
      let mapCoordinate: MapLocation = {
        latitude: selectedPoint.latitude,
        longitude: selectedPoint.longitude,
      };

      getPinnedCoordinates(mapCoordinate);
    };

    reactiveUtils.on(
      () => view.popup,
      "trigger-action",
      (event) => {
        if (event.action && event.action.id === "select-location") {
          selectMapLocation();
        }
      }
    );
  }, [coordinates, MultipleCoordinates]);

  const addPin = (
    coordinates: MapLocation,
    enablePopUp: boolean = false,
    enableActions: boolean = false
  ): Graphic => {
    const point = new Point({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      spatialReference: { wkid: 4326 },
    });

    const poinContent = `
    <ul>
      <li>Latitude: ${coordinates.latitude}</li>
      <li>Longitude: ${coordinates.longitude}</li> 
    </ul>
  `;

    const selectLocation = new ActionButton({
      id: "select-location",
      title: "Select location",
      icon: "selection-set",
    });

    return new Graphic({
      geometry: point,
      symbol: mapPinIcon,
      popupTemplate: enablePopUp
        ? CommonMarkerPopupTemplate({
            title: "Coordinates",
            content: poinContent,
            actions: enableActions ? [selectLocation] : undefined,
          })
        : undefined,
    });
  };

  return (
    <CalciteShell id="calcite-shell">
      <div id="viewDiv" ref={mapContainerRef}>
        {isLocationLoading && <CdMapLoadingLayer />}
      </div>
    </CalciteShell>
  );
};

export default CdSWOMap;
