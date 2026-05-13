import {
  DataItemSpmb,
  DataItemNonIdSpmb,
} from "@/app/pengumuman-smpmb/interfaces/data-item.interface";

export interface ModalSpmbProps {
  modalInput: DataItemNonIdSpmb;
  onSubmit: () => void;
  closeModal: () => void;
  loadingCreate: boolean;
  editingItem?: DataItemSpmb | null;
  setModalInput: React.Dispatch<React.SetStateAction<DataItemNonIdSpmb>>;
}
