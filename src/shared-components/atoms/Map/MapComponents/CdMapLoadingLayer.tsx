import { CdSpinner } from "@atoms/index";
import React from "react";

const CdMapLoadingLayer: React.FC = () => {
  return (
    <div className="map-loading">
      <CdSpinner />
    </div>
  );
};

export default CdMapLoadingLayer;
