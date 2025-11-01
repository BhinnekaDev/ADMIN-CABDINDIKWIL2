export interface UseDeleteBeritaProps {
  loading: boolean;
  deleteBerita: (id: number) => Promise<boolean>;
}
