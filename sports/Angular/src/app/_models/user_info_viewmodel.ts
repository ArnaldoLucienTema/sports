import {Achievement} from './achievement';
import {UserInfoSeason} from "./user_info_season";
import {Recommendation} from "./recommendation";
import {SkillSet} from "./skill_set";

//NEW put correct information in "user_info_season"

export class UserInfoViewModel {
  _id: string;
  user_id: string;
  followers : string[];
  following : string[];
  current_season: UserInfoSeason;
  previous_seasons: UserInfoSeason[];
  skill_set: SkillSet[];
  recommendations: {
    list: number[],
    top_5: Recommendation[]
  };
  achievements: Achievement[];
  created_at: string;
  updated_at: string;
}
