export interface UseDeleteInovasiProps {
  loading: boolean;
  deleteInovasi: (id: number) => Promise<boolean>;
}
