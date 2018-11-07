import {Recommendation} from './recommendation';
import {Achievement} from './achievement';
import {TeamSeason} from "./team_season";
import {TeamAdditionalInfo} from "./team_additional_info";
import {ExternalIds} from "./external_ids";
import {TryOut} from "./try_out";

export class TeamViewModel {
  _id: string;
  additional_info: TeamAdditionalInfo;
  acronym: string;
  avatar: string;
  name: string;
  full_name: string;
  current_season: TeamSeason;
  previous_seasons: TeamSeason[];
  tryouts: TryOut[];
  recommendations: {
    list: number[],
    top_5: Recommendation[]
  };
  external_ids: ExternalIds;
  followers : string[];
  following : string[];
}
