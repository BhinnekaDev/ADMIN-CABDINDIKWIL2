import { LokasiData } from "@/app/satuan-pendidikan/interfaces/lokasi-data.interface";
import { JenisSekolahData } from "@/app/satuan-pendidikan/interfaces/jenis-sekolah-data.interface";

export interface SatuanPendidikanData {
  npsn: number;
  nama: string;
  status: string;
  alamat: string;
  jenis_sekolah: JenisSekolahData;
  lokasi: LokasiData;
}
