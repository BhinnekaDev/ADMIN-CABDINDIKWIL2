export interface UseDeleteStrukturOrganisasiProps {
  loading: boolean;
  deleteStrukturOrganisasi: (id: number) => Promise<boolean>;
}
