import {Achievement} from './achievement';
import {SearchEntityViewmodel} from './search_entity_viewmodel';

export class UserInfoSearch extends SearchEntityViewmodel{

  constructor(){
    super();
  }

  // Inherit from the extended class
  name: string;
  team: {
    id: string,
    acronym: string,
    avatar: string,
    name: string,
    full_name: string
  };
  user_info_id: string;
  _id: string;
  personal_info: {
    name: string,
    age: number,
    avatar: string,
    full_name: string,
    positions: string[],
    height: number,
    weight: number,
    date_of_birth: string,
    foot: string,
    nationality: string,
    residence: string,
    updated_at: string
  };
  stats: [{
    season: string,
    competition_name: string,
    competition_avatar: string,
    games: number,
    wins: number,
    losses: number,
    draws: number,
    goals: number,
    assists: number,
    yellow_cards: number,
    red_cards: number,
    minutes_played: number
  }];

}
