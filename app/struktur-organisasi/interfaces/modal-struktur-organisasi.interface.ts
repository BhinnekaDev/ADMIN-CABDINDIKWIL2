import {
  DataItem,
  DataItemNonId,
} from "@/app/struktur-organisasi/interfaces/data-item.interface";

export interface ModalStrukturOrganisasiProps {
  modalInput: DataItemNonId;
  onSubmit: () => void;
  closeModal: () => void;
  loadingCreate: boolean;
  editingItem?: DataItem | null;
  setModalInput: React.Dispatch<React.SetStateAction<DataItemNonId>>;
}
