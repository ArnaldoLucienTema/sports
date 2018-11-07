import {Achievement} from './achievement';
import {PlayerMatch} from './player_match';

export class TeamMatch {
  id: string;
  team_id: string;
  name: string;
  avatar: string;
  goals: string[];
  achievements: Achievement[];
  main_lineup: PlayerMatch[];
  reserves: PlayerMatch[];
  staff:[{
    name: string;
    age: number; // added
    date_of_birth: string;// added
    id: string;
    user_info_id: string;
    avatar: string,
    nationality: string,
    achievements: Achievement[],
    external_ids:{
      zerozero: number
    }
  }];
}
