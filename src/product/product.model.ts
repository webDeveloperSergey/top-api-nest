export class ProductModel {
  image: string;
  title: string;
  price: number;
  oldPrice: number;
  created: number;
  calculateRated: number;
  description: string;
  advantages: string;
  desAdvantages: string;
  categories: string[];
  tags: string[];
  characteristics: {
    [key: string]: string;
  };
}
