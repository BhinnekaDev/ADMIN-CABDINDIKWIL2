export interface UseDeleteSpmbProps {
  loading: boolean;
  deleteSpmb: (id: number) => Promise<boolean>;
}
