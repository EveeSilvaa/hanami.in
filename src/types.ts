export interface MenuItem {
  name: string;
  price: number;
  category?: string;
  image: string;
  description?: string;
  ingredients?: string;
  isNew?: boolean;
}