export interface UseDeleteSeputarCabdinProps {
  loading: boolean;
  deleteSeputarCabdin: (id: number) => Promise<boolean>;
}
