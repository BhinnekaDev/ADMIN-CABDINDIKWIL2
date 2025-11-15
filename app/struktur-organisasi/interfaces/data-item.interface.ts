export interface DataItem {
  id: number;
  dibuat_pada: string;
  gambar_struktur: string;
  gambar_dokumentasi: string;
}

export type DataItemNonId = Partial<Omit<DataItem, "id">> & {
  id?: number;
};
