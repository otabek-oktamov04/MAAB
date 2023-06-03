import { INeighborPlaces } from "./neighbor-places";

export interface ISocket {
  connector_type: string;
  plug_type: "DC" | "AC";
  is_available: boolean;
  power: number;
}

export interface IStation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  is_working: boolean;
  energy_power: string;
  price: number;
  sockets: ISocket[];
  neighboring_places_ids: string[];
  images: FileList | IImage[];
  neighboring_places: INeighborPlaces[];
  socket_count: number;
  rating: number;
}

export interface IOption {
  value: string;
  label: string;
}

export interface IImage {
  id: string;
  image: string;
}

export interface IStationData {
  count: number
  next: string | null
  previous: string | null
  results: IStation[]
}