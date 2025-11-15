export interface DataItem {
  id: number;
  judul: string;
  url_file: string;
  nama_file: string;
  jenis_file: string;
  ukuran_file: number;
  dibuat_pada: string;
  jenis_layanan: string;
}

export type DataItemNonId = Partial<Omit<DataItem, "id">> & {
  id?: number;
};
