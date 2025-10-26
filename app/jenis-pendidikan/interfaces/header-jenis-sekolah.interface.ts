export interface HeaderJenisSekolahProps {
  search: string;
  loading: boolean;
  openAddModal: () => void;
  setSearch: (value: string) => void;
}
