
export interface Product {
  /** Id of the product */
  id: string;

  /** Products title/name */
  title: string;

  /** Products description */
  description: string;

  /** Brand/company name of the product */
  brand: string;

  /** The products RRP */
  price: number;

  /** Sale price if the product is on sale */
  salePercentage: number | null;

  /** List of images */
  images: string[];

  /** List of available thumbnails */
  thumbnails: string[];
}
