import {CompetitionSeason} from './competition_season';

export class CompetitionViewModel{
  _id: string;
  name : string;
  avatar: string;
  current_season: CompetitionSeason
  previous_seasons: CompetitionSeason[]
}
