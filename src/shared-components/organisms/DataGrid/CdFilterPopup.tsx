import { CdButton, CdContainer, CdFaIcon, CdTypography } from "@atoms/index";
import { IconPlacement } from "@enums/components/ButtonEnum";
import { Variant } from "@enums/components/CommonEnum";
import { AlignItems, JustifyContent } from "@enums/components/Container";
import { Menu } from "@mui/material";
import React, { FC, useState } from "react";
import CdFilterAccordion, { CdAccordionItem } from "./CdFilterAccordion";
import { CdIconButton } from "@molecules/index";

type FilterPopupProps = {
  accordionItems: CdAccordionItem[];
  handleClearFilters: () => void;
};

const CdFilterPopup: FC<FilterPopupProps> = ({
  accordionItems,
  handleClearFilters,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CdIconButton
        className="w-100"
        icon={["fas", "filter"]}
        text="Filter"
        iconSide={IconPlacement.Right}
        onClick={handleClick}
        outline
      />
      <Menu
        sx={{ mt: 1 }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <CdContainer
          className="p-0"
          flex
          justifyContent={JustifyContent.spaceBetween}
          alignItems={AlignItems.center}
        >
          <CdContainer
            flex
            alignItems={AlignItems.baseline}
            className="p-0 m-0 ps-1"
            gap="5px"
          >
            <CdFaIcon icon={["fas", "filter"]} />
            <CdTypography className="h5 px-1">Filters</CdTypography>
          </CdContainer>
          <CdIconButton
            icon={["fas", "times"]}
            text="Close"
            className="border-0 p-0"
            color={Variant.link}
            onClick={handleClose}
          />
        </CdContainer>
        <CdContainer
          className="px-2"
          flex
          justifyContent={JustifyContent.spaceBetween}
          alignItems={AlignItems.baseline}
        >
          <CdTypography>Applied</CdTypography>
          <CdButton
            onClick={handleClearFilters}
            className="border-0 p-1"
            color={Variant.link}
          >
            Clear Filters
          </CdButton>
        </CdContainer>
        <div className="mt-2">
          <CdFilterAccordion items={accordionItems} />
        </div>
      </Menu>
    </>
  );
};

export default CdFilterPopup;
