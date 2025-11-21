export interface UseDeleteGambarProps {
  loading: boolean;
  deleteGambar: (id: number) => Promise<boolean>;
}
