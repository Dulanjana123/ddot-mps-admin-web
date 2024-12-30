import React, { useEffect, useRef, useState } from "react";
import "@esri/calcite-components/dist/components/calcite-shell.js";
import "@esri/calcite-components/dist/components/calcite-shell-panel.js";
import "@esri/calcite-components/dist/components/calcite-action-bar.js";
import "@esri/calcite-components/dist/components/calcite-action.js";
import "@esri/calcite-components/dist/components/calcite-panel.js";
import "@esri/calcite-components/dist/components/calcite-action-group.js";
import "@esri/calcite-components/dist/components/calcite-block.js";
import {
  CalciteShell,
  CalciteShellPanel,
  CalciteActionBar,
  CalciteAction,
  CalcitePanel,
  CalciteActionGroup,
  CalciteBlock,
} from "@esri/calcite-components-react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import LayerList from "@arcgis/core/widgets/LayerList";
import Legend from "@arcgis/core/widgets/Legend";
import Print from "@arcgis/core/widgets/Print";
import Graphic from "@arcgis/core/Graphic";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Search from "@arcgis/core/widgets/Search";
import Home from "@arcgis/core/widgets/Home.js";
import Locate from "@arcgis/core/widgets/Locate.js";
import Point from "@arcgis/core/geometry/Point";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";
import Slider from "@arcgis/core/widgets/Slider.js";
import ScaleRangeSlider from "@arcgis/core/widgets/ScaleRangeSlider.js";
import SearchSource from "@arcgis/core/widgets/Search/SearchSource.js";
import esriRequest from "@arcgis/core/request.js";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
import globalAppConfig from "@config/global-app-config";
import Basemap from "@arcgis/core/Basemap.js";
import DistanceMeasurement2D from "@arcgis/core/widgets/DistanceMeasurement2D";
import AreaMeasurement2D from "@arcgis/core/widgets/AreaMeasurement2D";
import CdButton from "@atoms/Button/CdButton";
import CdContainer from "@atoms/Container/CdContainer";
import { JustifyContent } from "@enums/components/Container";
import { Variant } from "@enums/components/CommonEnum";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer.js";
import { featureLayers, imageLayers } from "./MapUtilities/layers";
import { mapService } from "@services/api/map-service";
import ActionButton from "@arcgis/core/support/actions/ActionButton";
import { CommonMarkerPopupTemplate } from "@constants/arcgis-map-constants/pop-ups";
import CdLogo from "@atoms/Logo/CdLogo";
import { dynamicImage } from "@services/dynamic-image.service";
import TileLayer from "@arcgis/core/layers/TileLayer.js";

type MapProps = {
  latitude: number;
  longitude: number;
  baseMap?: string;
  initialZoomLevel?: number;
  minZoomLevel?: number;
};

const PRINT_SERVER_URL: string = globalAppConfig.arcgisPrintServerUrl;

const CdGisMap: React.FC<MapProps> = ({
  latitude,
  longitude,
  baseMap = "topo-vector",
  initialZoomLevel = 15,
  minZoomLevel = 5,
}) => {
  const mapConatinerRef = useRef<HTMLDivElement | null>(null);
  const baseGalleryContainerRef = useRef<HTMLDivElement | null>(null);
  const layerContainerRef = useRef<HTMLDivElement | null>(null);
  const legendContainerRef = useRef<HTMLDivElement | null>(null);
  const distancemeasureContainerRef = useRef<HTMLDivElement | null>(null);
  const areameasureContainerRef = useRef<HTMLDivElement | null>(null);
  const printContainerRef = useRef<HTMLDivElement | null>(null);
  const clearButton = useRef<HTMLButtonElement | null>(null);
  const [activeWidget, setActiveWidget] = useState<string | null>(null);

  // Use refs to store component instances
  let viewRef = useRef<MapView | null>(null);
  let mapRef = useRef<Map | null>(null);
  let homeWidgetRef = useRef<Home | null>(null);

  const getMaps = async () => {
    const maps = await mapService.getBaseMaps();
    return maps.data.results;
  };

  useEffect(() => {
    if (viewRef.current) return;

    const map = new Map({
      basemap: baseMap,
    });

    const view = new MapView({
      map: map,
      container: mapConatinerRef.current!,
      zoom: initialZoomLevel,
      constraints: {
        minZoom: minZoomLevel,
      },
    });

    viewRef.current = view;
    mapRef.current = map;

    view.ui.move("zoom", "bottom-right");

    const mapFeatureLayers = featureLayers.map((layer) => {
      return new FeatureLayer({
        ...layer,
        outFields: ["*"],
      });
    });

    const mapImageLayers = imageLayers.map((layer) => {
      return new MapImageLayer({
        ...layer,
      });
    });

    const graphicsLayer = new GraphicsLayer({
      listMode: "hide",
    });

    const mapLayers = [...mapFeatureLayers, ...mapImageLayers];
    mapLayers.sort((layer1, layer2) =>
      layer2.title.localeCompare(layer1.title)
    );

    map.addMany(mapLayers);
    map.add(graphicsLayer);

    // Function to pan to the selected graphic
    const panToSelectedGraphic = async () => {
      const geom = view.popup.selectedFeature.geometry;
      await view.goTo({
        target: geom,
        zoom: 16,
      });
    };

    // Function to add merker to the selected graphic
    const addMarkerToSelectedGraphic = () => {
      const geometry = view.popup.selectedFeature.geometry as __esri.Geometry;
      if (geometry.type == "point") {
        const geom = geometry as __esri.Point;
        const latitude = geom.latitude || geom.y;
        const longitude = geom.longitude || geom.x;

        const addMarkerAction = new ActionButton({
          id: "remove-marker-feature",
          title: "Remove marker",
          icon: "x",
        });

        const poinContent = `
            <div>
              <strong>Latitude:</strong> ${latitude}<br/>
              <strong>Longitude:</strong> ${longitude}
            </div>
          `;

        const pointGraphic = new Graphic({
          geometry: geom,
          symbol: textMarkerSymbol,
          popupTemplate: CommonMarkerPopupTemplate({
            title: "Info",
            content: poinContent,
            actions: [addMarkerAction],
          }),
        });

        view.graphics.add(pointGraphic);
      } else if (geometry.type == "polygon") {
        const geom = geometry as __esri.Polygon;
        const latitude = geom.centroid.latitude || geom.centroid.y;
        const longitude = geom.centroid.longitude || geom.centroid.x;

        const addMarkerAction = new ActionButton({
          id: "remove-marker-feature",
          title: "Remove marker",
          icon: "x",
        });

        const poinContent = `
            <div>
              <strong>Centroid </strong><br/>
              <strong>Latitude:</strong> ${latitude}<br/>
              <strong>Longitude:</strong> ${longitude}
            </div>
          `;

        const pointGraphic = new Graphic({
          geometry: geom,
          symbol: textMarkerSymbol,
          popupTemplate: CommonMarkerPopupTemplate({
            title: "Info",
            content: poinContent,
            actions: [addMarkerAction],
          }),
        });

        view.graphics.add(pointGraphic);
      }
    };

    const removeMarkerFromSelectedGraphic = () => {
      const selectedGraphic = view.popup.selectedFeature;
      if (selectedGraphic) {
        view.graphics.remove(selectedGraphic);
        view.popup.close();
      }
    };

    reactiveUtils.on(
      () => view.popup,
      "trigger-action",
      (event) => {
        if (event.action && event.action.id === "pan-to-feature") {
          panToSelectedGraphic();
        } else if (event.action && event.action.id === "add-marker-feature") {
          addMarkerToSelectedGraphic();
        } else if (
          event.action &&
          event.action.id === "remove-marker-feature"
        ) {
          removeMarkerFromSelectedGraphic();
        }
      }
    );

    view.when(() => {
      const layerList = new LayerList({
        view: view,
        listItemCreatedFunction: layerItemActions,
        container: layerContainerRef.current!,
        dragEnabled: true,
        visibilityAppearance: "checkbox",
        minFilterItems: 2,
        filterPlaceholder: "Search layers",
        visibleElements: {
          collapseButton: false,
          errors: true,
          filter: true,
          heading: false,
          statusIndicators: true,
        },
      });

      reactiveUtils.watch(
        () => layerList.filterText,
        (filterText) => (layerList.filterText = filterText.trim())
      );

      layerList.on("trigger-action", (event: any) => {
        const { action, item } = event;
        // Capture the action id.
        const id = action.id;

        if (id === "legend") {
          item.panel = {
            content: new Legend({
              view: view,
              icon: "legend",
              layerInfos: [{ layer: item.layer }],
              respectLayerVisibility: false,
            }),
            open: true,
          };
        } else if (id === "transparency") {
          const slider = new Slider({
            min: 0,
            max: 1,
            values: [item.layer.opacity],
            precision: 2,
            visibleElements: {
              labels: true,
              rangeLabels: true,
            },
            icon: "transparency",
          });

          item.panel = {
            content: slider,
            open: true,
          };

          reactiveUtils.watch(
            () => slider.values.map((value) => value),
            (values) => (item.layer.opacity = values[0])
          );
        } else if (id === "visibilityRange") {
          const layer = item.layer as __esri.FeatureLayer;
          const scaleRangeSlider = new ScaleRangeSlider({
            view: view,
            layer: layer,
            region: "US",
          });

          scaleRangeSlider.on("thumb-drag", () => {
            layer.minScale = scaleRangeSlider.minScale;
            layer.maxScale = scaleRangeSlider.maxScale;
          });

          item.panel = {
            content: scaleRangeSlider,
            open: true,
          };
        } else if (
          id === "description" &&
          (item.layer.type === "feature" || item.layer.type === "map-image")
        ) {
          const layer = item.layer;
          window.open(layer.parsedUrl.path);
        } else if (id === "disablePopUp") {
          const layer = item.layer as __esri.FeatureLayer;
          layer.popupEnabled = !layer.popupEnabled;

          item.actionsSections = [
            [
              {
                title: "Legend",
                icon: "legend",
                id: "legend",
              },
              {
                title: "Transparency",
                icon: "transparency",
                id: "transparency",
              },
              {
                title: "Layer visibility range",
                icon: "layer-map",
                id: "visibilityRange",
              },
              {
                title: layer.popupEnabled ? "Disable Pop-up" : "Enable Pop-up",
                icon: "popup",
                id: "disablePopUp",
              },
            ],
            [
              {
                title: "Description",
                icon: "information",
                id: "description",
              },
            ],
          ];
        }
      });

      let customBasemaps: Basemap[] = [];

      getMaps().then((res) => {
        customBasemaps = res?.map((map) => {
          return new Basemap({
            portalItem: {
              id: map.id,
            },
          });
        });

        const topographicLayer = new TileLayer({
          url: "https://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer",
        });

        const esriTopographicMap = new Basemap({
          baseLayers: [topographicLayer],
          title: "Esri World Topographic Map",
          id: "esriTopographic",
        });

        new BasemapGallery({
          view: view,
          container: baseGalleryContainerRef.current!,
          source: [...customBasemaps, esriTopographicMap],
        });
      });

      new Legend({
        view: view,
        container: legendContainerRef.current!,
      });

      const distanceMeasurement2D = new DistanceMeasurement2D({
        viewModel: {
          view: view,
          unit: "kilometers",
        },
        container: distancemeasureContainerRef.current!,
      });

      const areaMeasurement2D = new AreaMeasurement2D({
        view: view,
        container: areameasureContainerRef.current!,
      });

      const clearMeasurement = () => {
        distanceMeasurement2D.viewModel.clear();
        areaMeasurement2D.viewModel.clear();
      };

      clearButton.current?.addEventListener("click", clearMeasurement);

      new Print({
        view: view,
        container: printContainerRef.current!,
        printServiceUrl: PRINT_SERVER_URL,
        templateOptions: {
          title: "ArcGIS Web Map",
          fileName: "ArcGIS Web Map",
          height: 500,
          width: 670,
        },
      });

      // Adds the find my location widget to the top left corner of the MapView
      const locateWidget = new Locate({
        view: viewRef.current!,
      });

      // Add the search widget to the top right corner of the view
      const searchWidget = new Search({
        view: viewRef.current!,
        sources: [customSearchSource],
        includeDefaultSources: false,
      });

      viewRef.current?.ui.add(searchWidget, {
        position: "top-right",
      });
      viewRef.current?.ui.add(locateWidget, "bottom-right");
    });
  }, [initialZoomLevel, minZoomLevel, baseMap]);

  useEffect(() => {
    if (viewRef.current) {
      viewRef.current?.graphics.removeAll();
      const point = new Point({
        longitude: longitude,
        latitude: latitude,
      });
      viewRef.current.center = point;

      const pointGraphic = new Graphic({
        geometry: point,
        symbol: textMarkerSymbol,
        popupTemplate: CommonMarkerPopupTemplate({
          title: "Info",
          content: `
            <div>
              <strong>Latitude:</strong> ${latitude}<br/>
              <strong>Longitude:</strong> ${longitude}
            </div>
          `,
        }),
      });

      if (!homeWidgetRef.current) {
        // Adds the home widget to the top left corner of the MapView
        const homeWidget = new Home({
          view: viewRef.current!,
        });
        homeWidgetRef.current = homeWidget;
        viewRef.current?.ui.add(homeWidget, "bottom-right");
      } else {
        homeWidgetRef.current.goToOverride = (view, goToParams) => {
          goToParams.options = {
            duration: "1000",
          };
          return view.goTo([longitude, latitude], goToParams.options);
        };
      }

      viewRef.current?.graphics.add(pointGraphic);
    }
  }, [longitude, latitude]);

  const textMarkerSymbol = {
    type: "text", // autocasts as new TextSymbol()
    color: "#eb2d2d",
    text: "\ue613", // esri-icon-map-pin
    font: {
      // autocasts as new Font()
      size: 20,
      family: "CalciteWebCoreIcons",
    },
  };

  //Custom search - MAR DC location search
  const customSearchSource = new SearchSource({
    placeholder: "Find address in DC",
    getSuggestions: (params) => {
      return esriRequest(
        `${globalAppConfig.baseApiUrl}/external/map/search-suggestions?searchText=${params.suggestTerm}`
      ).then((results) => {
        // Return Suggestion results to display in the Search widget
        return results.data.data.map((location: any) => {
          return {
            key: "name",
            text: location,
            sourceIndex: params.sourceIndex,
          };
        });
      });
    },
    getResults: (params) => {
      return esriRequest(
        `${globalAppConfig.baseApiUrl}/external/map/search-location?searchText=${params.suggestResult.text}`
      ).then((results) => {
        // Parse the results of your custom search
        const searchResults = results.data.data.addresses.map(
          (location: any) => {
            // Create a Graphic the Search widget can display
            const address = location.address;
            const graphic = new Graphic({
              geometry: new Point({
                x: address.geometry.coordinates[0],
                y: address.geometry.coordinates[1],
              }),
            });

            // a point result, so the view can zoom to it
            const buffer = geometryEngine.geodesicBuffer(
              graphic.geometry,
              100,
              "meters"
            );
            // Return a Search Result
            const searchResult = {
              extent: buffer,
              feature: graphic,
              name: address.properties.Alias,
            };
            return searchResult;
          }
        );

        // Return an array of Search Results
        return searchResults;
      });
    },
  });

  async function layerItemActions(event: any) {
    const { item } = event;
    await item.layer.when();

    item.actionsSections = [
      [
        {
          title: "Legend",
          icon: "legend",
          id: "legend",
        },
        {
          title: "Transparency",
          icon: "transparency",
          id: "transparency",
        },
        {
          title: "Layer visibility range",
          icon: "layer-map",
          id: "visibilityRange",
        },
        {
          title: item.layer.popupEnabled ? "Disable Pop-up" : "Enable Pop-up",
          icon: "popup",
          id: "disablePopUp",
        },
      ],
      [
        {
          title: "Description",
          icon: "information",
          id: "description",
        },
      ],
    ];
  }

  const handleActionBarClick = (event: any) => {
    const target = event.target.closest("calcite-action");
    if (!target) return;

    const nextWidget = target.dataset.actionId;
    if (activeWidget == nextWidget) {
      setActiveWidget(null);
      return;
    }
    setActiveWidget(nextWidget);
  };

  return (
    <>
      <CalciteShell id="calcite-shell">
        <CalciteShellPanel
          slot="panel-start"
          position="start"
          id="shell-panel-start"
          collapsed={!activeWidget}
          resizable
        >
          <CalciteActionBar
            slot="action-bar"
            onClick={handleActionBarClick}
            className="action-bar"
          >
            <CalciteActionGroup className="action-group-top">
              <CalciteAction
                data-action-id="layers"
                icon="layers"
                text="Layers"
                active={activeWidget === "layers"}
              />
              <CalciteAction
                data-action-id="basemaps"
                icon="basemap"
                text="Basemaps"
                active={activeWidget === "basemaps"}
              />
              <CalciteAction
                data-action-id="legend"
                icon="legend"
                text="Legend"
                active={activeWidget === "legend"}
              />
              <CalciteAction
                data-action-id="measurement"
                icon="measure"
                text="Measurement"
                active={activeWidget === "measurement"}
              />
              <CalciteAction
                data-action-id="print"
                icon="print"
                text="Print"
                active={activeWidget === "print"}
              />
            </CalciteActionGroup>

            <CalciteActionGroup>
              <a
                href="https://ddot.dc.gov/"
                target="_blank"
                style={{ textDecoration: "none" }}
                title="DDOT"
              >
                <CalciteAction text="DDOT">
                  <CdLogo
                    id={"ddot-logo"}
                    src={dynamicImage("logo/ddot-logo.png")}
                    height={25}
                    width={25}
                  />
                </CalciteAction>
              </a>
              <a
                href="https://octo.dc.gov/service/dc-gis-services"
                target="_blank"
                style={{ textDecoration: "none" }}
                title="OCTO"
              >
                <CalciteAction text="OCTO">
                  <CdLogo
                    id={"octo-logo"}
                    src={dynamicImage("logo/octo-logo.png")}
                    height={25}
                    width={25}
                  />
                </CalciteAction>
              </a>
            </CalciteActionGroup>
          </CalciteActionBar>

          <CalcitePanel
            heading="Layers"
            height-scale="l"
            id="panel-start"
            data-panel-id="layers"
            hidden={activeWidget !== "layers"}
            collapsible
          >
            <div id="layers-container" ref={layerContainerRef}></div>
          </CalcitePanel>
          <CalcitePanel
            heading="Basemaps"
            height-scale="l"
            data-panel-id="basemaps"
            hidden={activeWidget !== "basemaps"}
            collapsible
          >
            <div id="basemaps-container" ref={baseGalleryContainerRef}></div>
          </CalcitePanel>
          <CalcitePanel
            heading="Legend"
            height-scale="l"
            data-panel-id="legend"
            hidden={activeWidget !== "legend"}
            collapsible
          >
            <div id="legend-container" ref={legendContainerRef}></div>
          </CalcitePanel>
          <CalcitePanel
            heading="Measurement"
            height-scale="l"
            data-panel-id="measurement"
            hidden={activeWidget !== "measurement"}
            collapsible
          >
            <CalciteBlock
              collapsible
              heading="Distance"
              icon-start="measure-line"
              description="Calculate distance"
            >
              <div
                id="measurement-container"
                ref={distancemeasureContainerRef}
              ></div>
            </CalciteBlock>
            <CalciteBlock
              collapsible
              heading="Area"
              icon-start="measure-area"
              description="Calculate area"
            >
              <div
                id="measurement-container"
                ref={areameasureContainerRef}
              ></div>
            </CalciteBlock>
            <CdContainer
              className="mt-3"
              flex
              justifyContent={JustifyContent.center}
            >
              <CdButton
                color={Variant.primary}
                text="Clear"
                id="clear-btn"
                innerRef={clearButton}
              />
            </CdContainer>
          </CalcitePanel>
          <CalcitePanel
            heading="Print"
            height-scale="l"
            data-panel-id="print"
            hidden={activeWidget !== "print"}
            collapsible
          >
            <div id="print-container" ref={printContainerRef}></div>
          </CalcitePanel>
        </CalciteShellPanel>

        <CalcitePanel>
          <div id="viewDiv" ref={mapConatinerRef}></div>
        </CalcitePanel>
      </CalciteShell>
    </>
  );
};

export default CdGisMap;
