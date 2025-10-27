export interface HeaderLokasiSekolahProps {
  search: string;
  loading: boolean;
  openAddModal: () => void;
  setSearch: (value: string) => void;
}
