import React, { useEffect, useRef, useState } from "react";
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
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Sketch from "@arcgis/core/widgets/Sketch.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { WatchLockAreaPopupTemplate } from "@constants/arcgis-map-constants/pop-ups";
import Graphic from "@arcgis/core/Graphic";
import { generateUUIDV4 } from "@utils/helper/generate-uuid";

type WatchLockAreaMapProps = {
  getCoordinates: (data: any) => void;
  setImage: (data: any) => void;
};

const CdWatchLockAreaMap: React.FC<WatchLockAreaMapProps> = ({
  getCoordinates,
  setImage,
}) => {
  const mapConatinerRef = useRef<HTMLDivElement | null>(null);
  const [graphics, setGraphics] = useState<Array<Graphic> | null>(null);
  const viewRef = useRef<MapView | null>(null);
  const mapRef = useRef<Map | null>(null);

  const addGraphic = (newGraphic: Graphic): void => {
    setGraphics((prevGraphics) => {
      const currentGraphics = prevGraphics || [];
      return [...currentGraphics, newGraphic];
    });
  };

  const updateGraphic = (updatedGraphic: Graphic) => {
    setGraphics((prevGraphics) => {
      const currentGraphics = prevGraphics || [];

      const index = currentGraphics.findIndex(
        (graphic) => graphic.attributes.id === updatedGraphic.attributes.id
      );

      if (index !== -1) {
        const updatedGraphics = [...currentGraphics];
        updatedGraphics[index] = updatedGraphic;
        return updatedGraphics;
      } else {
        return currentGraphics;
      }
    });
  };

  const deleteGraphic = (deletedGraphic: Graphic) => {
    setGraphics((prevGraphics) => {
      return (
        prevGraphics?.filter(
          (graphic) => graphic.attributes?.id !== deletedGraphic.attributes?.id
        ) || []
      );
    });
  };

  useEffect(() => {
    if (viewRef.current) return;
    const graphicsLayer = new GraphicsLayer();

    const map = new Map({
      basemap: "topo-vector",
      layers: [graphicsLayer],
    });

    const view = new MapView({
      map: map,
      container: mapConatinerRef.current!,
      center: [-77.009056, 38.889805],
      zoom: 12,
      constraints: {
        minZoom: 5,
      },
    });

    viewRef.current = view;
    mapRef.current = map;

    view.ui.move("zoom", "bottom-left");

    const watchLockFeatureLayer = new FeatureLayer({
      url: "https://maps2.dcgis.dc.gov/dcgis/rest/services/DDOT/WatchLockArea/FeatureServer/0",
      popupTemplate: WatchLockAreaPopupTemplate,
      title: "WatchLockArea - TOPSWatchArea",
      visible: true,
    });

    map.add(watchLockFeatureLayer);

    view.when(() => {
      const sketch = new Sketch({
        layer: graphicsLayer,
        view: view,
        creationMode: "single",
        layout: "vertical",
        tooltipOptions: {
          enabled: true,
        },
        visibleElements: {
          createTools: {
            point: false,
            polyline: false,
            circle: false,
            rectangle: false,
          },
          snappingControlsElements: {
            layerList: false,
          },
        },
      });

      view.ui.add(sketch, "top-left");

      sketch.on("create", (event) => {
        if (event.state === "complete") {
          const graphic = event.graphic as Graphic;
          // add id to identify graphics
          graphic.attributes = { ...graphic.attributes, id: generateUUIDV4() };
          addGraphic(graphic);
          takeScreenshotWithGraphics();
        }
      });

      sketch.on("update", (event) => {
        if (event.state === "complete") {
          const graphics = event.graphics as Graphic[];
          graphics.forEach((graphic) => {
            updateGraphic(graphic);
          });
          takeScreenshotWithGraphics();
        }
      });

      sketch.on("delete", (event) => {
        const graphics = event.graphics as Graphic[];
        graphics.forEach((graphic) => {
          deleteGraphic(graphic);
        });
        takeScreenshotWithGraphics();
      });
    });
  }, []);

  const takeScreenshotWithGraphics = () => {
    if (viewRef.current) {
      viewRef.current
        .takeScreenshot({
          format: "jpg",
          quality: 70,
        })
        .then((screenshot) => {
          setImage(screenshot.dataUrl);
        });
    }
  };

  useEffect(() => {
    if (graphics) {
      const coordinates = graphics?.map((graphic) => {
        return graphic.geometry.toJSON();
      });
      getCoordinates(coordinates);
    }
  }, [graphics]);

  return (
    <CalciteShell id="calcite-shell">
      <div id="viewDiv" ref={mapConatinerRef}></div>
    </CalciteShell>
  );
};

export default CdWatchLockAreaMap;
