export interface HeaderPrakataProps {
  search: string;
  loading: boolean;
  openAddModal: () => void;
  setSearch: (value: string) => void;
}
