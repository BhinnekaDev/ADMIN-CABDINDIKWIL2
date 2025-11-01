export interface HeaderBeritaProps {
  search: string;
  loading: boolean;
  openAddModal: () => void;
  setSearch: (value: string) => void;
}
