import { DataItem } from "@/app/kontak/interfaces/data-item.interface";

export interface UseEditKontakProps {
  loading: boolean;
  editKontak: (id: number, data: DataItem) => Promise<DataItem | null>;
}
