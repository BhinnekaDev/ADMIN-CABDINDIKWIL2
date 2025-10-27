import { DataItem } from "@/app/jenis-pendidikan/interfaces/data-item.interface";

export interface UseEditJenisSekolahProps {
  loading: boolean;
  editJenis: (id: number, namaJenis: string) => Promise<DataItem | null>;
}
