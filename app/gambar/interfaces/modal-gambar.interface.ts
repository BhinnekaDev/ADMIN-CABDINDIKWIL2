import {
  DataItem,
  DataItemNonId,
} from "@/app/gambar/interfaces/data-item.interface";

export interface ModalGambarProps {
  modalInput: DataItemNonId;
  onSubmit: () => void;
  closeModal: () => void;
  loadingCreate: boolean;
  editingItem?: DataItem | null;
  setModalInput: React.Dispatch<React.SetStateAction<DataItemNonId>>;
}
