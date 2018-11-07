import {Achievement} from './achievement';

export class PlayerMatch {
  name: string;
  age: number; // added
  date_of_birth: string;// added
  avatar: string;
  id: string;
  user_info_id: string;
  number: number;
  positions: string[];
  nationality: string;
  goals: string[];
  assists: string[];
  yellow_cards: string[];
  red_cards: string[];
  minutes_played: number;
  go_in:string[];
  go_out:string[];
  external_ids:{
    zerozero: number
  }
}
