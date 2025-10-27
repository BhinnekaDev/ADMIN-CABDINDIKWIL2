import { DataItem } from "@/app/lokasi/interfaces/data-item.interface";
import { LokasiData } from "@/app/lokasi/interfaces/lokasi-data.interface";

export interface ModalLokasiSekolahProps {
  modalInput: LokasiData;
  onSubmit: () => void;
  loadingCreate: boolean;
  closeModal: () => void;
  editingItem: DataItem | null;
  setModalInput: (value: LokasiData) => void;
}
