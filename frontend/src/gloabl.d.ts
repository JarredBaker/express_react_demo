export {};

declare global {
  interface ApiResponse {
    status: boolean;
    data: object;
  }

  interface UserType {
    id: string;
    email: string;
    firstname: string;
    surname: string;
  }

  interface StarWarsPerson {
    id: string;
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: Array<string | null>;
    species: Array<string | null>;
    vehicles: Array<string | null>;
    starships: Array<string | null>;
    created: string;
    edited: string;
    url: string;
  }
}
