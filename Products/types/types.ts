export type productType = {
  name: string;
  price: string;
  category: string;
};

export interface ProductsQuery {
  filter: Record<string, any>;
  sort?: string;
  page?: number;
  limit?: number;
  fields?: number;
}
