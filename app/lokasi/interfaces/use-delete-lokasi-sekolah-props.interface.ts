export interface UseDeleteLokasiSekolahProps {
  loading: boolean;
  deleteLokasi: (id: number) => Promise<boolean>;
}
