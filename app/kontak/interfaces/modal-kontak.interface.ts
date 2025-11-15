import {
  DataItem,
  DataItemNonId,
} from "@/app/kontak/interfaces/data-item.interface";

export interface ModalKontakProps {
  modalInput: DataItemNonId;
  onSubmit: () => void;
  closeModal: () => void;
  loadingCreate: boolean;
  editingItem?: DataItem | null;
  setModalInput: React.Dispatch<React.SetStateAction<DataItemNonId>>;
}
