export interface Books {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  publisher: string;
  author: string;
  categoryId: number;
  price: number;
  publicationDate: string;
  pageNumber: number;
  rentInformation: {
    rent: boolean;
    byWhom: string;
  };
}
