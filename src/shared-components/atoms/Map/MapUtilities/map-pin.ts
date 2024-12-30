import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import { dynamicImage } from "@services/dynamic-image.service";

const mapPinIcon = new PictureMarkerSymbol({
    url: dynamicImage("location.png"),
    width: "28px",
    height: "28px",
    yoffset: "14px",
});

export default mapPinIcon;