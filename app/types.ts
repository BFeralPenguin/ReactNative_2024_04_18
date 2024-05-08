export type Pizza = {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  description?: string;
  isNew: boolean;
  isFavorite: boolean;
};
