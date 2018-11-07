import {TeamMatch} from './team_match';

export class MatchViewModel{
  _id: string;
  played: boolean;
  external_ids: {
    zerozero: number
  };
  date: string;
  duration : number;
  phase: string;
  stadium: string;
  referee: string;
  competition_season: {
    name: string;
    avatar: string;
    id: string;
    competition_id: string;
    phase: string;
  };
  home_team : TeamMatch;
  away_team : TeamMatch;
}
