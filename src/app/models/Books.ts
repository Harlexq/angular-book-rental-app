export interface Books {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  publisher: string;
  author: string;
  category: string;
  price: number;
  publicationDate: string;
  pageNumber: number;
  rentInformation: {
    rent: boolean;
    byWhom: string;
  };
}
