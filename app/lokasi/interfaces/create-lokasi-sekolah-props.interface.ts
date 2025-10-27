import { DataItem } from "@/app/lokasi/interfaces/data-item.interface";
import { LokasiData } from "@/app/lokasi/interfaces/lokasi-data.interface";

export interface CreateLokasiSekolahProps {
  loading: boolean;
  createLokasi: (data: LokasiData) => Promise<DataItem | null>;
}
