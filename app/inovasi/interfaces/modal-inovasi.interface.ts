import {
  DataItem,
  DataItemNonId,
} from "@/app/inovasi/interfaces/data-item.interface";

export interface ModalInovasiProps {
  modalInput: DataItemNonId;
  onSubmit: () => void;
  closeModal: () => void;
  loadingCreate: boolean;
  editingItem?: DataItem | null;
  setModalInput: React.Dispatch<React.SetStateAction<DataItemNonId>>;
}
