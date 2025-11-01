export interface SeputarCabdinGambar {
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
  seputar_cabdin_gambar: SeputarCabdinGambar[];
}

export type DataItemNonId = Partial<
  Omit<DataItem, "id" | "dibuat_pada" | "diperbarui_pada">
> & {
  id?: number;
  url_gambar?: SeputarCabdinGambar[];
};
