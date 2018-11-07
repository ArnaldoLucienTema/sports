import {Achievement} from './achievement';
import {UserInfoSeason} from "./user_info_season";
import {Recommendation} from "./recommendation";
import {SkillSet} from "./skill_set";
import {Media} from "./media";


export class TeamPlayer {
  _id: string;
  created_at: string;
  updated_at: string;
  user_info_id: string;
  name: string;
  age: number; // added
  date_of_birth: string;// added
  avatar: string;
  positions: string[];
  height: number;
  weight: number;
  foot: string;
  nationality: string;
  residence: string;
  contacts: string [];
  media: Media[];
  evaluations: {
    simple: [{
      technical: string,
      tactical: string,
      physical: string,
      mental: string,
      date: string,
      match: string,
    }],
    advanced: [{
      technical: [{
        attribute : string,
        value: string
      }],
      tactical: [{
        attribute : string,
        value: string
      }],
      physical: [{
        attribute : string,
        value: string
      }],
      mental: [{
        attribute : string,
        value: string
      }],
      date: string,
      match: string,
    }]
  }
}
