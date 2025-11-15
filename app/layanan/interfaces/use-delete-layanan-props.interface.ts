export interface UseDeleteLayananProps {
  loading: boolean;
  deleteLayanan: (id: number) => Promise<boolean>;
}
