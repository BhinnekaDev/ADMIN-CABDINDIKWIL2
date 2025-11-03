import { DataItem } from "@/app/admin/interfaces/data-item.interface";

export interface ModalAdminProps {
  modalInput: DataItem;
  onSubmit: () => void;
  closeModal: () => void;
  loadingCreate: boolean;
  editingItem?: DataItem | null;
  setModalInput: React.Dispatch<React.SetStateAction<DataItem>>;
}
