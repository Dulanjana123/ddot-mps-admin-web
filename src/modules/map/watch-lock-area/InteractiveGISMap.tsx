import { CdContainer, CdButton, CdWatchLockAreaMap } from "@atoms/index";
import { ButtonSizes, ButtonTypes } from "@enums/components/ButtonEnum";
import { Variant } from "@enums/components/CommonEnum";
import {
  AlignItems,
  FlexDirection,
  JustifyContent,
} from "@enums/components/Container";
import { CdLoadingButton } from "@molecules/index";
import { updateForm, setTab } from "@store/reducers/watchLockFormWizard";
import { useAppDispatch } from "@store/state-hooks";
import React, { useState } from "react";

const InteractiveGisMap: React.FC = () => {
  const [areaCoordinates, setAreaCoordinates] = useState<Array<any> | null>(
    null
  );
  const [image, setImage] = useState<any>();
  const dispatch = useAppDispatch();

  const goBack = () => {
    dispatch(
      setTab({
        tab: 2,
      })
    );
  };

  const onSubmit = () => {
    const data = {
      coordinates: areaCoordinates,
      image: image,
    };
    dispatch(
      updateForm({
        step: "interactiveMap",
        data,
      })
    );
    dispatch(
      setTab({
        tab: 4,
      })
    );
  };

  return (
    <>
      <CdWatchLockAreaMap
        getCoordinates={setAreaCoordinates}
        setImage={setImage}
      />
      <CdContainer
        flex
        className="mt-4"
        alignItems={AlignItems.baseline}
        justifyContent={JustifyContent.end}
        flexDirection={FlexDirection.row}
        gap="1.5rem"
      >
        <CdButton
          id={"back-btn"}
          text="Back"
          type={ButtonTypes.button}
          size={ButtonSizes.md}
          color={Variant.light}
          onClick={goBack}
        />
        <CdLoadingButton
          isLoading={false}
          color={Variant.primary}
          text="Next"
          size={ButtonSizes.md}
          type={ButtonTypes.submit}
          disabled={false}
          id={"next-button"}
          onClick={onSubmit}
        />
      </CdContainer>
    </>
  );
};

export default InteractiveGisMap;
