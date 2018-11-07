// Current_season out and some renames...
import {Media} from "./media";

export class CompetitionSeason{
  _id: string;
  competition_id: string;
  season_id: string;
  name : string;
  avatar: string;
  matches : number[];
  standings : number[];
  stats : number[];
  media: Media[];
}
