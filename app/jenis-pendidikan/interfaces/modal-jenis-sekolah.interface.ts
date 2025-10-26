import { DataItem } from "@/app/jenis-pendidikan/interfaces/data-item.interface";

export interface ModalJenisSekolahProps {
  modalInput: string;
  onSubmit: () => void;
  closeModal: () => void;
  editingItem: DataItem | null;
  setModalInput: (value: string) => void;
}
