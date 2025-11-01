export interface BeritaGambar {
  id?: number;
  keterangan?: string;
  url_gambar?: string;
  dibuat_pada?: string;
}

export interface DataItem {
  id: number;
  isi: string;
  judul: string;
  penulis: string;
  dibuat_pada: string;
  diperbarui_pada: string;
  tanggal_diterbitkan: string;
  berita_gambar: BeritaGambar[];
}

export type DataItemNonId = Partial<
  Omit<DataItem, "id" | "dibuat_pada" | "diperbarui_pada">
> & {
  id?: number;
  url_gambar?: BeritaGambar[];
};
