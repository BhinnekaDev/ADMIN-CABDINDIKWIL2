import {
  DataItem,
  DataItemNonId,
} from "@/app/berita/interfaces/data-item.interface";

export interface ModalBeritaProps {
  modalInput: DataItemNonId;
  onSubmit: () => void;
  closeModal: () => void;
  loadingCreate: boolean;
  editingItem?: DataItem | null;
  setModalInput: React.Dispatch<React.SetStateAction<DataItemNonId>>;
}
