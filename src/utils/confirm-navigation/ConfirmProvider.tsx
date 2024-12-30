import {
  createContext,
  type ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

import { Variant } from "@enums/components/CommonEnum";
import {
  ConfirmContext,
  ConfirmOptions,
  Nullable,
} from "@interfaces/components/confirm-navigation";
import { Confirm } from "./Confirm";

export const ConfirmCtx = createContext<Nullable<ConfirmContext>>(null);

interface Props {
  children: ReactNode;
}

export function ConfirmProvider({ children }: Props) {
  const [confirm, setConfirm] = useState<Nullable<ConfirmOptions>>(null);

  const [open, toggle] = useState(false);

  const show = useCallback(
    (confirmOptions: Nullable<ConfirmOptions>) => {
      setConfirm(confirmOptions);
      toggle(true);
    },
    [toggle]
  );

  const onConfirm = () => {
    confirm?.onConfirm?.();
    toggle(false);
  };

  const onCancel = () => {
    confirm?.onCancel?.();
    toggle(false);
  };

  const value = useMemo(() => ({ show }), [show]);

  return (
    <ConfirmCtx.Provider value={value}>
      <Confirm
        type={Variant.warning}
        {...confirm}
        onCancel={onCancel}
        onConfirm={onConfirm}
        open={open}
      />
      {children}
    </ConfirmCtx.Provider>
  );
}
