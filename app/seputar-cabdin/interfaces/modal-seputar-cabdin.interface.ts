import {
  DataItem,
  DataItemNonId,
} from "@/app/seputar-cabdin/interfaces/data-item.interface";

export interface ModalSeputarCabdinProps {
  modalInput: DataItemNonId;
  onSubmit: () => void;
  closeModal: () => void;
  loadingCreate: boolean;
  editingItem?: DataItem | null;
  setModalInput: React.Dispatch<React.SetStateAction<DataItemNonId>>;
}
