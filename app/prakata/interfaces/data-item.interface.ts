export interface DataItem {
  id: number;
  isi: string;
  judul: string;
  penutup: string;
  sub_judul: string;
  dibuat_pada: string;
  diperbarui_pada: string;
}

export type DataItemNonId = Partial<
  Omit<DataItem, "id" | "dibuat_pada" | "diperbarui_pada">
> & {
  id?: number;
};
