export class Recommendation{
  user_id: string;
  author:{
    author_type: string;
    name : string;
    id: string;
    relationship: string,
    avatar: string;
    team : {
      id: string;
      acronym: string;
      avatar: string;
      name: string;
    };
  };
  text: string;
}
