import { DataItem } from "@/app/jenis-pendidikan/interfaces/data-item.interface";

export interface CreateJenisSekolahProps {
  loading: boolean;
  createJenis: (namaJenis: string) => Promise<DataItem | null>;
}
