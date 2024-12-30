import { CdButton } from "@atoms/index";
import React from "react";
import { useNavigate } from "react-router-dom";

const ManageStopWorkOrders = () => {
  const navigate = useNavigate();

  return (
    <div className="page-body">
      <div className="h3">Stop Work Orders List</div>
      <div className="h6">Under development...</div>
      <CdButton
        color="primary"
        id="btn-add-swo"
        onClick={() => {
          navigate("/swo/add");
        }}
      >
        Add New
      </CdButton>
    </div>
  );
};

export default ManageStopWorkOrders;
