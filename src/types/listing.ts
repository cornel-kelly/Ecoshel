/** Domain types used by the property listing feature. */
export interface Listing {
  id: string;
  title: string;
  neighborhood: string;
  subLocation: string;
  propertyType: string;
  beds: number;
  baths: number | string;
  price: number;
  amenities: string[];
  hostBadge: string;
  imgUrl: string;
  description: string;
}
