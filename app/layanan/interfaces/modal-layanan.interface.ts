import {
  DataItem,
  DataItemNonId,
} from "@/app/layanan/interfaces/data-item.interface";

export interface ModalLayananProps {
  modalInput: DataItemNonId;
  onSubmit: () => void;
  closeModal: () => void;
  loadingCreate: boolean;
  editingItem?: DataItem | null;
  setModalInput: React.Dispatch<React.SetStateAction<DataItemNonId>>;
}
