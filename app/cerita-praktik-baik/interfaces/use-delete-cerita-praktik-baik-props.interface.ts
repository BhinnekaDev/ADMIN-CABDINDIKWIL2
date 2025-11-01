export interface UseDeleteCeritaPraktikBaikProps {
  loading: boolean;
  deleteCeritaPraktikBaik: (id: number) => Promise<boolean>;
}
