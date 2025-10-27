import { DataItemSatuanPendidikan } from "@/app/satuan-pendidikan/interfaces/data-item.interface";
import { SatuanPendidikanData } from "@/app/satuan-pendidikan/interfaces/satuan-pendidikan-data.interface";

export interface ModalSatuanPendidikanProps {
  modalInput: SatuanPendidikanData;
  onSubmit: () => void;
  loadingCreate: boolean;
  closeModal: () => void;
  editingItem: DataItemSatuanPendidikan | null;
  setModalInput: (value: SatuanPendidikanData) => void;
}
