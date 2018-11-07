import {Recommendation} from "./recommendation";
import {Media} from "./media";
import {ExternalIds} from "./external_ids";

export class TeamSeason {
  external_ids: ExternalIds;
  _id: string;
  team_id: string;
  season_id: string;
  name: string;
  avatar: string;
  standings: [
    {
      id: string,
      _id: string,
      competition_id: string,
      name: string,
      avatar: string,
      position: number,
      matches: number,
      wins: number,
      draws: number,
      losses: number,
      goals: number,
      goals_taken: number
    }
    ];
  matches: [{
    id: string,
    _id: string,
    date: string,
    competition_season: {
      id: string,
      name: string,
      avatar: string
    },
    home_team: {
      id: string,
      name: string,
      avatar: string,
      goals: number
    },
    away_team: {
      id: string,
      name: string,
      avatar: string,
      goals: number
    }
  }];
  players: [
    {
      id: string,
      _id: string,
      user_info_id: string,
      age: number; // added
      date_of_birth: string; // added
      name: string,
      number: string,
      avatar: string,
      nationality: string,
      positions: string[]
    }
    ];
  staff: [
    {
      id: string,
      age: number; // added
      date_of_birth: string;// added
      user_info_id: string,
      position: string,
      name: string,
      avatar: string,
      nationality: string
    }
    ];
  media: Media[];
}
