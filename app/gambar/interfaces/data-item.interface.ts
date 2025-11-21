export interface Jenis_Sekolah {
  id?: number;
  nama_jenis?: string;
}

export interface DataItem {
  id: number;
  url_gambar: string;
  dibuat_pada: string;
  jenis_sekolah: Jenis_Sekolah;
}

export type DataItemNonId = Partial<Omit<DataItem, "id">> & {
  id?: number;
};
