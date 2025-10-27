export interface UseDeleteJenisSekolahProps {
  loading: boolean;
  deleteJenis: (id: number) => Promise<boolean>;
}
