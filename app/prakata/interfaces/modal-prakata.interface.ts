import {
  DataItem,
  DataItemNonId,
} from "@/app/prakata/interfaces/data-item.interface";

export interface ModalPrakataProps {
  modalInput: DataItemNonId;
  onSubmit: () => void;
  closeModal: () => void;
  loadingCreate: boolean;
  editingItem?: DataItem | null;
  setModalInput: React.Dispatch<React.SetStateAction<DataItemNonId>>;
}
