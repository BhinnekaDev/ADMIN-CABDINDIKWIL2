import {
  DataItem,
  DataItemNonId,
} from "@/app/cerita-praktik-baik/interfaces/data-item.interface";

export interface ModalCeritaPraktikBaikProps {
  modalInput: DataItemNonId;
  onSubmit: () => void;
  closeModal: () => void;
  loadingCreate: boolean;
  editingItem?: DataItem | null;
  setModalInput: React.Dispatch<React.SetStateAction<DataItemNonId>>;
}
