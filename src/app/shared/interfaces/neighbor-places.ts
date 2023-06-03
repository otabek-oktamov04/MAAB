export interface INeighborPlaces {
  name: string;
  id: string;
  logo: FileList | string;
}

export interface INeighborPlacesData {
  count: number;
  next: string;
  previous: string;
  results: INeighborPlaces[];
}
