import { CdModal } from "@atoms/index";
import { ModalSize } from "@enums/components/modal-enum";
import { ConfirmOptions } from "@interfaces/components/confirm-navigation";

type Props = ConfirmOptions & { open: boolean };

export function Confirm({
  open,
  title,
  subtitle,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <CdModal
      size={ModalSize.sm}
      id="modal"
      title={title}
      isOpen={open}
      onClose={onCancel}
      onSubmit={onConfirm}
      submitButtonText={confirmText}
      cancelButtonText={cancelText}
      body={<div>{subtitle}</div>}
    />
  );
}
