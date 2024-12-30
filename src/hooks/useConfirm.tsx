import { ConfirmCtx } from "@utils/confirm-navigation/ConfirmProvider";
import { useContext } from "react";


export const useConfirm = () => {
  const context = useContext(ConfirmCtx);

  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }

  return context;
};
