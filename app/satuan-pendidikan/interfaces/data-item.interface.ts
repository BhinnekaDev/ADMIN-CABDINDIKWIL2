import { LokasiData } from "@/app/satuan-pendidikan/interfaces/lokasi-data.interface";
import { JenisSekolahData } from "@/app/satuan-pendidikan/interfaces/jenis-sekolah-data.interface";

export interface DataItemSatuanPendidikan {
  npsn: number;
  nama: string;
  status: string;
  jenis_sekolah: JenisSekolahData;
  lokasi: LokasiData;
}
