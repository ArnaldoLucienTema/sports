import {Media} from "./media";

export class UserInfoSeason{
  _id: string;
  user_info_id: string;
  season_id: string;
  name: string;
  avatar: string;
  personal_info: {
    name: string,
    age: number,
    number: string;
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
  team: {
    id: string,
    team_id: string,
    acronym: string,
    avatar: string,
    name: string
  };
  stats: [{
    id: string,
    competition_id: string;
    name: string, //Nome da competição (já tem season no nome)
    avatar: string,
    games: number,
    wins: number,
    draws: number,
    losses: number,
    goals: number,
    assists: number,
    yellow_cards: number,
    red_cards: number,
    minutes_played: number
  }]
  matches: [{
    id: string,
    date: string,
    competition_season:{
      id: string,
      competition_id: string,
      name: string,
      avatar: string
    },
    home_team: {
      id: string,
      team_id: string,
      name: string,
      avatar: string,
      goals: number
    },
    away_team: {
      id: string,
      team_id: string,
      name: string,
      avatar: string,
      goals: number
    }
  }];
  media: Media[];
}
