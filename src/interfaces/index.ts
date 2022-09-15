export interface IPizzaBlock {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  category: number;
  rating: number;
}
export interface sortValueType {
  name: string;
  sortProperty: string;
}
