export interface UseDeleteSatuanPendidikanProps {
  loading: boolean;
  deleteLokasi: (id: number) => Promise<boolean>;
}
