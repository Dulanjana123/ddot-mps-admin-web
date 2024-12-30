import React, { useEffect, useRef } from 'react';
import '@esri/calcite-components/dist/components/calcite-shell.js';
import '@esri/calcite-components/dist/components/calcite-shell-panel.js';
import '@esri/calcite-components/dist/components/calcite-action-bar.js';
import '@esri/calcite-components/dist/components/calcite-action.js';
import '@esri/calcite-components/dist/components/calcite-panel.js';
import '@esri/calcite-components/dist/components/calcite-action-group.js';
import '@esri/calcite-components/dist/components/calcite-block.js';
import { CalciteShell } from '@esri/calcite-components-react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Point from '@arcgis/core/geometry/Point';
import Graphic from '@arcgis/core/Graphic';
import PopupTemplate from '@arcgis/core/PopupTemplate';
import { Coordinate } from '@interfaces/components/map-data';
import mapPinIcon from './MapUtilities/map-pin';

type BaseMapProps = {
  coordinates: Coordinate[];
  mapDivId?: string;
  calciteShellId?: string;
  zoomLevel?: number;
  centerToFirstPoint?: boolean;
  popupTemplate?: PopupTemplate;
};

const CdBaseMap: React.FC<BaseMapProps> = ({
  coordinates,
  mapDivId = 'map-view-div',
  calciteShellId = 'calcite-shell',
  zoomLevel = 12,
  centerToFirstPoint = true,
  popupTemplate,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<MapView | null>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (viewRef.current) return;

    const map = new Map({
      basemap: 'topo-vector',
    });

    const view = new MapView({
      map: map,
      container: mapContainerRef.current!,
      center: [-77.009056, 38.889805],
      zoom: zoomLevel,
      constraints: {
        minZoom: 5,
      },
    });

    viewRef.current = view;
    mapRef.current = map;

    view.ui.move('zoom', 'bottom-left');
  }, []);

  useEffect(() => {
    if (!viewRef.current) return;

    const view = viewRef.current;

    // Clear previous graphics before adding new ones
    view.graphics.removeAll();

    const pointGraphics = coordinates.map((coordinates) => {
      const point = new Point({
        latitude: coordinates.x,
        longitude: coordinates.y,
      });

      const pointGraphic = new Graphic({
        geometry: point,
        symbol: mapPinIcon,
        attributes: { ...coordinates },
        popupTemplate: popupTemplate ? popupTemplate : undefined,
      });

      return pointGraphic;
    });

    // Set the view center to the first point (optional)
    if (coordinates.length > 0 && centerToFirstPoint) {
      const firstPoint = coordinates[0];
      const point = new Point({
        latitude: firstPoint.x,
        longitude: firstPoint.y,
      });
      view.center = point;
    }

    // Add all the point graphics to the view
    view.graphics.addMany(pointGraphics);
  }, [coordinates]);

  return (
    <CalciteShell id={calciteShellId}>
      <div id={mapDivId} ref={mapContainerRef}></div>
    </CalciteShell>
  );
};

export default CdBaseMap;
