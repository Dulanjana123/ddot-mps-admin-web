import CdButton from "@atoms/Button/CdButton";
import { setActiveTab } from "@store/reducers/mps/swoWizardSlice";
import { useAppDispatch } from "@store/state-hooks";
import React from "react";

const SWODetails = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="sidebar-body">
      <div>SWODetails</div>
      <CdButton color="primary" onClick={() => dispatch(setActiveTab(3))}>
        Next
      </CdButton>
    </div>
  );
};

export default SWODetails;
