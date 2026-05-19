import type { Store } from "../entities";

export interface StoreRepository {
  getAll(): Promise<Store[]>;
  getByCity(city: string): Promise<Store[]>;
  getNearby(lat: number, lng: number, radiusKm: number): Promise<Store[]>;
}
