import { CdButton, CdModal } from "@atoms/index";
import { Variant } from "@enums/components/CommonEnum";
import { ModalSize } from "@enums/components/modal-enum";
import { FC, useEffect, useState } from "react";
import QuickFiltersForm from "./QuickFiltersForm";
import { FilterItems } from "@interfaces/components/datagrid";

type QuickFiltersProps = {
  setFilterItems: (args: FilterItems) => void;
};

const QuickFilters: FC<QuickFiltersProps> = ({ setFilterItems }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [quickFiltersApplied, setQuickFiltersApplied] = useState(false);

  const handleApplyFilterBtn = () => {
    if (quickFiltersApplied) {
      setFilterItems({ items: [] });
      setQuickFiltersApplied(false);
    } else {
      setModalOpen(true);
    }
  };

  return (
    <div>
      <CdButton
        color={quickFiltersApplied ? Variant.secondary : Variant.primary}
        id="advanced_filters"
        onClick={handleApplyFilterBtn}
      >
        {quickFiltersApplied
          ? "Clear Advanced Filters"
          : "Apply Advanced Filters"}
      </CdButton>
      <CdModal
        size={ModalSize.lg}
        id="modal"
        title={"Search"}
        isOpen={modalOpen}
        toggle={() => setModalOpen(!modalOpen)}
        showFooter={false}
        body={
          <QuickFiltersForm
            setFilterItems={setFilterItems}
            setQuickFiltersApplied={setQuickFiltersApplied}
            setModalOpen={setModalOpen}
          />
        }
      />
    </div>
  );
};

export default QuickFilters;
