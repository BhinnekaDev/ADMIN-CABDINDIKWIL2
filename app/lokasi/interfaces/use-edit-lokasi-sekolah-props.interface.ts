import { DataItem } from "@/app/lokasi/interfaces/data-item.interface";
import { LokasiData } from "@/app/lokasi/interfaces/lokasi-data.interface";

export interface UseEditLokasiSekolahProps {
  loading: boolean;
  editLokasi: (id: number, data: LokasiData) => Promise<DataItem | null>;
}
