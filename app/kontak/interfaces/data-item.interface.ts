export interface DataItem {
  id: number;
  email: string;
  alamat: string;
  no_telp: string;
  dibuat_pada: string;
}

export type DataItemNonId = Partial<Omit<DataItem, "id">> & {
  id?: number;
};
