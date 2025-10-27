export interface UseDeleteSatuanPendidikanProps {
  loading: boolean;
  deleteSatuanPendidikan: (id: number) => Promise<boolean>;
}
