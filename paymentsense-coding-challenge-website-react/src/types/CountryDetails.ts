import { Country } from "./Country";

export type CountryDetails = {
  name: string;
  alpha3Code: string;
  borders: Country[];
  languages: string[];
  currencies: string;
  population: number;
  timeZones: string[];
  capital: string;
}
