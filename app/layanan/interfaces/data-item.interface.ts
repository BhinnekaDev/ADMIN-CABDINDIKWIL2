export interface DataItem {
  id: number;
  judul: string;
  url_file: string;
  raw_csv?: string;
  nama_file: string;
  jenis_file: string;
  ukuran_file: number;
  dibuat_pada: string;
  jenis_layanan: string;
  preview_html?: string | null;
}

export type DataItemNonId = Partial<Omit<DataItem, "id">> & {
  id?: number;
};
