export interface UseDeletePrakataProps {
  loading: boolean;
  deletePrakata: (id: number) => Promise<boolean>;
}
