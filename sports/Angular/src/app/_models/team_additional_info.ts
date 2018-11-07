import {Recommendation} from "./recommendation";
import {Media} from "./media";

export class TeamAdditionalInfo {
  sponsors: [{
    link: string,
    name: string
  }];
  other_sports: string [];
  site: string;
  email: string;
  phone_number: string;
  address: string;
  president: string;
  vice_president: string;
  sports_director: string;
  number_of_teams: number;
  number_of_athletes: number;
  number_of_coaches: number;
  number_of_physiotherapists: number;
  number_of_grass_fields: number;
  number_of_synthetic_fields: number;
  number_of_locker_rooms: number;
}
