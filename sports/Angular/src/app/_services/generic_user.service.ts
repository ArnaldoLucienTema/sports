import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {AuthenticationService} from './authentication.service';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {UserInfoViewModel} from '../_models/user_info_viewmodel';
import {SearchEntityViewmodel} from '../_models/search_entity_viewmodel';
import {UserInfoSearch} from '../_models/user_info_search';
import {FilterSearch} from '../_models/filter_search';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class GenericUserService {

  //TODO change to mockUserInfo: UserInfoSearch[] = [
  mockUserInfo = [
    {
      name: 'Cristiano Ronaldo',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      },
      id: '1',
      type: 'player',
      avatar: 'https://e3.365dm.com/18/07/1096x616/skynews-cristiano-ronaldo-football_4358475.jpg?20180710164507',
      user_id: '1',
      personal_info: {
        name: 'Cristiano Ronaldo',
        age: 22,
        avatar: 'https://e3.365dm.com/18/07/1096x616/skynews-cristiano-ronaldo-football_4358475.jpg?20180710164507',
        full_name: 'Diogo César Pontes Pires',
        positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
        height: 165,
        weight: 90,
        date_of_birth: '30-01-1993',
        nationality: 'Portugal',
        residence: 'Lisboa',
        foot: 'Direito',
        updated_at: '8-05-2018'
      },
      followers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      following: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],

      current_season: {
        season_id: 1,
        name: '17/18',
        team: {
          id: 1,
          acronym: 'SFC',
          avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
          name: 'Seixal FC',
          full_name: 'Seixal Futebol Clube'
        },
        stats: [
          {
            season: '2017/18',
            competition_name: 'Liga Portugal',
            competition_avatar: '/assets/Liga_Portugal_logo.png',
            games: 15,
            wins: 14,
            losses: 0,
            draws: 1,
            goals: 13,
            assists: 4,
            yellow_cards: 1,
            red_cards: 0,
            minutes_played: 1050
          },
          {
            season: '2017/18',
            competition_name: 'Taça de Portugal',
            competition_avatar: '/assets/Tacadaligalogo.png',
            games: 4,
            wins: 1,
            losses: 1,
            draws: 1,
            goals: 4,
            assists: 1,
            yellow_cards: 0,
            red_cards: 0,
            minutes_played: 280
          },
          {
            season: '2017/18',
            competition_name: 'Super Taça',
            competition_avatar: '/assets/9_imgbank_tp.png',
            games: 1,
            wins: 1,
            losses: 0,
            draws: 0,
            goals: 2,
            assists: 1,
            yellow_cards: 0,
            red_cards: 0,
            minutes_played: 90
          }
        ],
        games: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      },
      previous_seasons: [],
      skill_set: [
        {
          name: 'Goleador',
          avatar: '/assets/scorer.png',
          endorsements: [33, 2, 2, 2, 2, 2, 2],
        },
        {
          name: 'Drible',
          avatar: '/assets/dribble.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          name: 'Rapidez',
          avatar: '/assets/fast.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        },
        {
          name: 'Passe',
          avatar: '/assets/passer.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 22, 2, 2],
        },
        {
          name: 'Força',
          avatar: '/assets/strong.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 44, , 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 42, 2, 2, 2, 2, 2, 2, 2, 2],
        },
      ],
      recommendations: {
        list: [1, 2, 3]
      },
      achievements: [
        {
          id: '1',
          name: '5 jogos consecutivos a marcar golo.',
          user_id: '1',
          user_name: 'Pedro Alves',
          user_avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
          user_positions: ['Médio Ofensivo'],
          avatar: '/assets/scorer.png'
        },
        {
          id: '1',
          name: '3 hat-tricks numa época.',
          user_id: '1',
          user_name: 'Pedro Alves',
          user_avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
          user_positions: ['Médio Ofensivo'],
          avatar: '/assets/scorer.png'
        }
      ],
    },
    {
      name: 'Nuno Carmo',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      },
      id: '1',
      type: 'player',
      avatar: 'https://scontent.fopo3-1.fna.fbcdn.net/v/t31.0-8/15541052_10212069863200855_2889012374229061166_o.jpg?_nc_cat=0&oh=5b128be1ebf4151ec5aa2afb671b72d0&oe=5B8C9375',
      user_id: '1',
      personal_info: {
        name: 'Nuno Carmo',
        age: 25,
        avatar: 'https://scontent.fopo3-1.fna.fbcdn.net/v/t31.0-8/15541052_10212069863200855_2889012374229061166_o.jpg?_nc_cat=0&oh=5b128be1ebf4151ec5aa2afb671b72d0&oe=5B8C9375',
        full_name: 'Diogo César Pontes Pires',
        positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
        height: 170,
        weight: 90,
        date_of_birth: '30-01-1993',
        nationality: 'Portugal',
        residence: 'Lisboa',
        foot: 'Direito',
        updated_at: '8-05-2018'
      },
      followers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      following: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      current_season: {
        season_id: 1,
        name: '17/18',
        team: {
          id: 1,
          acronym: 'SFC',
          avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
          name: 'Seixal FC',
          full_name: 'Seixal Futebol Clube'
        },
        stats: [
          {
            season: '2017/18',
            competition_name: 'Liga Portugal',
            competition_avatar: '/assets/Liga_Portugal_logo.png',
            games: 15,
            wins: 14,
            losses: 0,
            draws: 1,
            goals: 13,
            assists: 4,
            yellow_cards: 1,
            red_cards: 0,
            minutes_played: 1050
          },
          {
            season: '2017/18',
            competition_name: 'Taça de Portugal',
            competition_avatar: '/assets/Tacadaligalogo.png',
            games: 4,
            wins: 1,
            losses: 1,
            draws: 1,
            goals: 4,
            assists: 1,
            yellow_cards: 0,
            red_cards: 0,
            minutes_played: 280
          },
          {
            season: '2017/18',
            competition_name: 'Super Taça',
            competition_avatar: '/assets/9_imgbank_tp.png',
            games: 1,
            wins: 1,
            losses: 0,
            draws: 0,
            goals: 2,
            assists: 1,
            yellow_cards: 0,
            red_cards: 0,
            minutes_played: 90
          }
        ],
        games: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      },
      previous_seasons: [],
      skill_set: [
        {
          name: 'Goleador',
          avatar: '/assets/scorer.png',
          endorsements: [33, 2, 2, 2, 2, 2, 2],
        },
        {
          name: 'Drible',
          avatar: '/assets/dribble.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          name: 'Rapidez',
          avatar: '/assets/fast.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        },
        {
          name: 'Passe',
          avatar: '/assets/passer.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 22, 2, 2],
        },
        {
          name: 'Força',
          avatar: '/assets/strong.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 44, , 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 42, 2, 2, 2, 2, 2, 2, 2, 2],
        },
      ],
      recommendations: {
        list: [1, 2, 3]
      },
      achievements: [
        {
          id: '1',
          name: '5 jogos consecutivos a marcar golo.',
          user_id: '1',
          user_name: 'Pedro Alves',
          user_avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
          user_positions: ['Médio Ofensivo'],
          avatar: '/assets/scorer.png'
        },
        {
          id: '1',
          name: '3 hat-tricks numa época.',
          user_id: '1',
          user_name: 'Pedro Alves',
          user_avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
          user_positions: ['Médio Ofensivo'],
          avatar: '/assets/scorer.png'
        }
      ],
    },
    {
      name: 'Arnaldo Tema',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      },
      id: '1',
      type: 'player',
      avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
      user_id: '1',
      personal_info: {
        name: 'Arnaldo Tema',
        age: 25,
        avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
        full_name: 'Diogo César Pontes Pires',
        positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
        height: 165,
        weight: 95,
        date_of_birth: '30-01-1993',
        nationality: 'Portugal',
        residence: 'Lisboa',
        foot: 'Direito',
        updated_at: '8-05-2018'
      },
      followers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      following: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      current_season: {
        season_id: 1,
        name: '17/18',
        team: {
          id: 1,
          acronym: 'SFC',
          avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
          name: 'Seixal FC',
          full_name: 'Seixal Futebol Clube'
        },
        stats: [
          {
            season: '2017/18',
            competition_name: 'Liga Portugal',
            competition_avatar: '/assets/Liga_Portugal_logo.png',
            games: 15,
            wins: 14,
            losses: 0,
            draws: 1,
            goals: 13,
            assists: 4,
            yellow_cards: 1,
            red_cards: 0,
            minutes_played: 1050
          },
          {
            season: '2017/18',
            competition_name: 'Taça de Portugal',
            competition_avatar: '/assets/Tacadaligalogo.png',
            games: 4,
            wins: 1,
            losses: 1,
            draws: 1,
            goals: 4,
            assists: 1,
            yellow_cards: 0,
            red_cards: 0,
            minutes_played: 280
          },
          {
            season: '2017/18',
            competition_name: 'Super Taça',
            competition_avatar: '/assets/9_imgbank_tp.png',
            games: 1,
            wins: 1,
            losses: 0,
            draws: 0,
            goals: 2,
            assists: 1,
            yellow_cards: 0,
            red_cards: 0,
            minutes_played: 90
          }
        ],
        games: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      },
      previous_seasons: [],
      skill_set: [
        {
          name: 'Goleador',
          avatar: '/assets/scorer.png',
          endorsements: [33, 2, 2, 2, 2, 2, 2],
        },
        {
          name: 'Drible',
          avatar: '/assets/dribble.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          name: 'Rapidez',
          avatar: '/assets/fast.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        },
        {
          name: 'Passe',
          avatar: '/assets/passer.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 22, 2, 2],
        },
        {
          name: 'Força',
          avatar: '/assets/strong.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 44, , 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 42, 2, 2, 2, 2, 2, 2, 2, 2],
        },
      ],
      recommendations: {
        list: [1, 2, 3]
      },
      achievements: [
        {
          id: '1',
          name: '5 jogos consecutivos a marcar golo.',
          user_id: '1',
          user_name: 'Pedro Alves',
          user_avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
          user_positions: ['Médio Ofensivo'],
          avatar: '/assets/scorer.png'
        },
        {
          id: '1',
          name: '3 hat-tricks numa época.',
          user_id: '1',
          user_name: 'Pedro Alves',
          user_avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
          user_positions: ['Médio Ofensivo'],
          avatar: '/assets/scorer.png'
        }
      ],
    },
    {
      name: 'Arnaldo Tema',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      },
      id: '1',
      type: 'player',
      avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
      user_id: '1',
      personal_info: {
        name: 'Arnaldo Tema',
        age: 25,
        avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
        full_name: 'Diogo César Pontes Pires',
        positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
        height: 165,
        weight: 90,
        date_of_birth: '30-01-1993',
        nationality: 'Portugal',
        residence: 'Lisboa',
        foot: 'Direito',
        updated_at: '8-05-2018'
      },
      followers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      following: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      current_season: {
        season_id: 1,
        name: '17/18',
        team: {
          id: 1,
          acronym: 'SFC',
          avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
          name: 'Seixal FC',
          full_name: 'Seixal Futebol Clube'
        },
        stats: [
          {
            season: '2017/18',
            competition_name: 'Liga Portugal',
            competition_avatar: '/assets/Liga_Portugal_logo.png',
            games: 15,
            wins: 14,
            losses: 0,
            draws: 1,
            goals: 25,
            assists: 4,
            yellow_cards: 1,
            red_cards: 0,
            minutes_played: 1050
          },
          {
            season: '2017/18',
            competition_name: 'Taça de Portugal',
            competition_avatar: '/assets/Tacadaligalogo.png',
            games: 4,
            wins: 1,
            losses: 1,
            draws: 1,
            goals: 4,
            assists: 1,
            yellow_cards: 0,
            red_cards: 0,
            minutes_played: 280
          },
          {
            season: '2017/18',
            competition_name: 'Super Taça',
            competition_avatar: '/assets/9_imgbank_tp.png',
            games: 1,
            wins: 1,
            losses: 0,
            draws: 0,
            goals: 2,
            assists: 1,
            yellow_cards: 0,
            red_cards: 0,
            minutes_played: 90
          }
        ],
        games: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      },
      previous_seasons: [],
      skill_set: [
        {
          name: 'Goleador',
          avatar: '/assets/scorer.png',
          endorsements: [33, 2, 2, 2, 2, 2, 2],
        },
        {
          name: 'Drible',
          avatar: '/assets/dribble.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          name: 'Rapidez',
          avatar: '/assets/fast.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        },
        {
          name: 'Passe',
          avatar: '/assets/passer.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 22, 2, 2],
        },
        {
          name: 'Força',
          avatar: '/assets/strong.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 44, , 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 42, 2, 2, 2, 2, 2, 2, 2, 2],
        },
      ],
      recommendations: {
        list: [1, 2, 3]
      },
      achievements: [
        {
          id: '1',
          name: '5 jogos consecutivos a marcar golo.',
          user_id: '1',
          user_name: 'Pedro Alves',
          user_avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
          user_positions: ['Médio Ofensivo'],
          avatar: '/assets/scorer.png'
        },
        {
          id: '1',
          name: '3 hat-tricks numa época.',
          user_id: '1',
          user_name: 'Pedro Alves',
          user_avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
          user_positions: ['Médio Ofensivo'],
          avatar: '/assets/scorer.png'
        }
      ],
    },
    {
      name: 'Flávio Fonseca',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      },
      id: '1',
      type: 'player',
      avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
      user_id: '1',
      personal_info: {
        name: 'Flávio Fonseca',
        age: 25,
        avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
        full_name: 'Diogo César Pontes Pires',
        positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
        height: 165,
        weight: 90,
        date_of_birth: '30-01-1993',
        nationality: 'Portugal',
        residence: 'Lisboa',
        foot: 'Direito',
        updated_at: '8-05-2018'
      },
      followers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      following: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      current_season: {
        season_id: 1,
        name: '17/18',
        team: {
          id: 1,
          acronym: 'SFC',
          avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
          name: 'Seixal FC',
          full_name: 'Seixal Futebol Clube'
        },
        stats: [
          {
            season: '2017/18',
            competition_name: 'Liga Portugal',
            competition_avatar: '/assets/Liga_Portugal_logo.png',
            games: 15,
            wins: 14,
            losses: 0,
            draws: 1,
            goals: 13,
            assists: 4,
            yellow_cards: 1,
            red_cards: 0,
            minutes_played: 1050
          },
          {
            season: '2017/18',
            competition_name: 'Taça de Portugal',
            competition_avatar: '/assets/Tacadaligalogo.png',
            games: 4,
            wins: 1,
            losses: 1,
            draws: 1,
            goals: 4,
            assists: 1,
            yellow_cards: 0,
            red_cards: 0,
            minutes_played: 280
          },
          {
            season: '2017/18',
            competition_name: 'Super Taça',
            competition_avatar: '/assets/9_imgbank_tp.png',
            games: 1,
            wins: 1,
            losses: 0,
            draws: 0,
            goals: 2,
            assists: 1,
            yellow_cards: 0,
            red_cards: 0,
            minutes_played: 90
          }
        ],
        games: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
      },
      previous_seasons: [],
      skill_set: [
        {
          name: 'Goleador',
          avatar: '/assets/scorer.png',
          endorsements: [33, 2, 2, 2, 2, 2, 2],
        },
        {
          name: 'Drible',
          avatar: '/assets/dribble.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          name: 'Rapidez',
          avatar: '/assets/fast.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        },
        {
          name: 'Passe',
          avatar: '/assets/passer.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 22, 2, 2],
        },
        {
          name: 'Força',
          avatar: '/assets/strong.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 44, , 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 42, 2, 2, 2, 2, 2, 2, 2, 2],
        },
      ],
      recommendations: {
        list: [1, 2, 3]
      },
      achievements: [
        {
          id: '1',
          name: '5 jogos consecutivos a marcar golo.',
          user_id: '1',
          user_name: 'Pedro Alves',
          user_avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
          user_positions: ['Médio Ofensivo'],
          avatar: '/assets/scorer.png'
        },
        {
          id: '1',
          name: '3 hat-tricks numa época.',
          user_id: '1',
          user_name: 'Pedro Alves',
          user_avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
          user_positions: ['Médio Ofensivo'],
          avatar: '/assets/scorer.png'
        }
      ],
    },
    {
      name: 'Arnaldo Tema',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      },
      id: '1',
      type: 'player',
      avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
      user_id: '1',
      personal_info: {
        name: 'Arnaldo Tema',
        age: 25,
        avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
        full_name: 'Diogo César Pontes Pires',
        positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
        height: 165,
        weight: 90,
        date_of_birth: '30-01-1993',
        nationality: 'Portugal',
        residence: 'Lisboa',
        foot: 'Direito',
        updated_at: '8-05-2018'
      },
      followers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      following: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      current_season: {
        season_id: 1,
        name: '17/18',
        team: {
          id: 1,
          acronym: 'SFC',
          avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
          name: 'Seixal FC',
          full_name: 'Seixal Futebol Clube'
        },
        stats: [
          {
            season: '2017/18',
            competition_name: 'Liga Portugal',
            competition_avatar: '/assets/Liga_Portugal_logo.png',
            games: 15,
            wins: 14,
            losses: 0,
            draws: 1,
            goals: 13,
            assists: 6,
            yellow_cards: 1,
            red_cards: 0,
            minutes_played: 1050
          },
          {
            season: '2017/18',
            competition_name: 'Taça de Portugal',
            competition_avatar: '/assets/Tacadaligalogo.png',
            games: 4,
            wins: 1,
            losses: 1,
            draws: 1,
            goals: 4,
            assists: 1,
            yellow_cards: 0,
            red_cards: 0,
            minutes_played: 280
          },
          {
            season: '2017/18',
            competition_name: 'Super Taça',
            competition_avatar: '/assets/9_imgbank_tp.png',
            games: 1,
            wins: 1,
            losses: 0,
            draws: 0,
            goals: 2,
            assists: 1,
            yellow_cards: 0,
            red_cards: 0,
            minutes_played: 90
          }
        ],
        games: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      },
      previous_seasons: [],
      skill_set: [
        {
          name: 'Goleador',
          avatar: '/assets/scorer.png',
          endorsements: [33, 2, 2, 2, 2, 2, 2],
        },
        {
          name: 'Drible',
          avatar: '/assets/dribble.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          name: 'Rapidez',
          avatar: '/assets/fast.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        },
        {
          name: 'Passe',
          avatar: '/assets/passer.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 22, 2, 2],
        },
        {
          name: 'Força',
          avatar: '/assets/strong.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 44, , 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 42, 2, 2, 2, 2, 2, 2, 2, 2],
        },
      ],
      recommendations: {
        list: [1, 2, 3]
      },
      achievements: [
        {
          id: '1',
          name: '5 jogos consecutivos a marcar golo.',
          user_id: '1',
          user_name: 'Pedro Alves',
          user_avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
          user_positions: ['Médio Ofensivo'],
          avatar: '/assets/scorer.png'
        },
        {
          id: '1',
          name: '3 hat-tricks numa época.',
          user_id: '1',
          user_name: 'Pedro Alves',
          user_avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
          user_positions: ['Médio Ofensivo'],
          avatar: '/assets/scorer.png'
        }
      ],
    },
    {
      name: 'Naldo',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      },
      id: '1',
      type: 'player',
      avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
      user_id: '1',
      personal_info: {
        name: 'Naldo',
        age: 25,
        avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
        full_name: 'Diogo César Pontes Pires',
        positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
        height: 165,
        weight: 70,
        date_of_birth: '30-01-1993',
        nationality: 'Portugal',
        residence: 'Lisboa',
        foot: 'Direito',
        updated_at: '8-05-2018'
      },
      followers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      following: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      current_season: {
        season_id: 1,
        name: '17/18',
        team: {
          id: 1,
          acronym: 'SFC',
          avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
          name: 'Seixal FC',
          full_name: 'Seixal Futebol Clube'
        },
        stats: [
          {
            season: '2017/18',
            competition_name: 'Liga Portugal',
            competition_avatar: '/assets/Liga_Portugal_logo.png',
            games: 15,
            wins: 14,
            losses: 0,
            draws: 1,
            goals: 13,
            assists: 1,
            yellow_cards: 1,
            red_cards: 0,
            minutes_played: 1050
          },
          {
            season: '2017/18',
            competition_name: 'Taça de Portugal',
            competition_avatar: '/assets/Tacadaligalogo.png',
            games: 4,
            wins: 1,
            losses: 1,
            draws: 1,
            goals: 4,
            assists: 1,
            yellow_cards: 0,
            red_cards: 0,
            minutes_played: 280
          },
          {
            season: '2017/18',
            competition_name: 'Super Taça',
            competition_avatar: '/assets/9_imgbank_tp.png',
            games: 1,
            wins: 1,
            losses: 0,
            draws: 0,
            goals: 2,
            assists: 1,
            yellow_cards: 0,
            red_cards: 0,
            minutes_played: 90
          }
        ],
        games: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      },
      previous_seasons: [],
      skill_set: [
        {
          name: 'Goleador',
          avatar: '/assets/scorer.png',
          endorsements: [33, 2, 2, 2, 2, 2, 2],
        },
        {
          name: 'Drible',
          avatar: '/assets/dribble.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          name: 'Rapidez',
          avatar: '/assets/fast.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        },
        {
          name: 'Passe',
          avatar: '/assets/passer.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 22, 2, 2],
        },
        {
          name: 'Força',
          avatar: '/assets/strong.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 44, , 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 42, 2, 2, 2, 2, 2, 2, 2, 2],
        },
      ],
      recommendations: {
        list: [1, 2, 3]
      },
      achievements: [
        {
          id: '1',
          name: '5 jogos consecutivos a marcar golo.',
          user_id: '1',
          user_name: 'Pedro Alves',
          user_avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
          user_positions: ['Médio Ofensivo'],
          avatar: '/assets/scorer.png'
        },
        {
          id: '1',
          name: '3 hat-tricks numa época.',
          user_id: '1',
          user_name: 'Pedro Alves',
          user_avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
          user_positions: ['Médio Ofensivo'],
          avatar: '/assets/scorer.png'
        }
      ],
    },
    {
      name: 'Roberto',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      },
      id: '1',
      type: 'player',
      avatar: 'https://e3.365dm.com/18/07/1096x616/skynews-cristiano-ronaldo-football_4358475.jpg?20180710164507',
      user_id: '1',
      personal_info: {
        name: 'Roberto',
        age: 25,
        avatar: 'https://e3.365dm.com/18/07/1096x616/skynews-cristiano-ronaldo-football_4358475.jpg?20180710164507',
        full_name: 'Diogo César Pontes Pires',
        positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
        height: 165,
        weight: 90,
        date_of_birth: '30-01-1993',
        nationality: 'Portugal',
        residence: 'Lisboa',
        foot: 'Direito',
        updated_at: '8-05-2018'
      },
      followers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      following: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      current_season: {
        season_id: 1,
        name: '17/18',
        team: {
          id: 1,
          acronym: 'SFC',
          avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
          name: 'Seixal FC',
          full_name: 'Seixal Futebol Clube'
        },
        stats: [
          {
            season: '2017/18',
            competition_name: 'Liga Portugal',
            competition_avatar: '/assets/Liga_Portugal_logo.png',
            games: 15,
            wins: 14,
            losses: 0,
            draws: 1,
            goals: 13,
            assists: 4,
            yellow_cards: 1,
            red_cards: 0,
            minutes_played: 1050
          },
          {
            season: '2017/18',
            competition_name: 'Taça de Portugal',
            competition_avatar: '/assets/Tacadaligalogo.png',
            games: 4,
            wins: 1,
            losses: 1,
            draws: 1,
            goals: 4,
            assists: 1,
            yellow_cards: 0,
            red_cards: 0,
            minutes_played: 280
          },
          {
            season: '2017/18',
            competition_name: 'Super Taça',
            competition_avatar: '/assets/9_imgbank_tp.png',
            games: 1,
            wins: 1,
            losses: 0,
            draws: 0,
            goals: 2,
            assists: 1,
            yellow_cards: 0,
            red_cards: 0,
            minutes_played: 90
          }
        ],
        games: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      },
      previous_seasons: [],
      skill_set: [
        {
          name: 'Goleador',
          avatar: '/assets/scorer.png',
          endorsements: [33, 2, 2, 2, 2, 2, 2],
        },
        {
          name: 'Drible',
          avatar: '/assets/dribble.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          name: 'Rapidez',
          avatar: '/assets/fast.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        },
        {
          name: 'Passe',
          avatar: '/assets/passer.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 22, 2, 2],
        },
        {
          name: 'Força',
          avatar: '/assets/strong.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 44, , 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 42, 2, 2, 2, 2, 2, 2, 2, 2],
        },
      ],
      recommendations: {
        list: [1, 2, 3]
      },
      achievements: [
        {
          id: '1',
          name: '5 jogos consecutivos a marcar golo.',
          user_id: '1',
          user_name: 'Pedro Alves',
          user_avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
          user_positions: ['Médio Ofensivo'],
          avatar: '/assets/scorer.png'
        },
        {
          id: '1',
          name: '3 hat-tricks numa época.',
          user_id: '1',
          user_name: 'Pedro Alves',
          user_avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
          user_positions: ['Médio Ofensivo'],
          avatar: '/assets/scorer.png'
        }
      ],
    },
    {
      name: 'Arnaldo Tema',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      },
      id: '1',
      type: 'player',
      avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
      user_id: '1',
      personal_info: {
        name: 'Arnaldo Tema',
        age: 25,
        avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
        full_name: 'Diogo César Pontes Pires',
        positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
        height: 165,
        weight: 90,
        date_of_birth: '30-01-1993',
        nationality: 'Portugal',
        residence: 'Lisboa',
        foot: 'Direito',
        updated_at: '8-05-2018'
      },
      followers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      following: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      current_season: {
        season_id: 1,
        name: '17/18',
        team: {
          id: 1,
          acronym: 'SFC',
          avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
          name: 'Seixal FC',
          full_name: 'Seixal Futebol Clube'
        },
        stats: [
          {
            season: '2017/18',
            competition_name: 'Liga Portugal',
            competition_avatar: '/assets/Liga_Portugal_logo.png',
            games: 15,
            wins: 14,
            losses: 0,
            draws: 1,
            goals: 13,
            assists: 4,
            yellow_cards: 1,
            red_cards: 0,
            minutes_played: 1050
          },
          {
            season: '2017/18',
            competition_name: 'Taça de Portugal',
            competition_avatar: '/assets/Tacadaligalogo.png',
            games: 4,
            wins: 1,
            losses: 1,
            draws: 1,
            goals: 4,
            assists: 1,
            yellow_cards: 0,
            red_cards: 0,
            minutes_played: 280
          },
          {
            season: '2017/18',
            competition_name: 'Super Taça',
            competition_avatar: '/assets/9_imgbank_tp.png',
            games: 1,
            wins: 1,
            losses: 0,
            draws: 0,
            goals: 2,
            assists: 1,
            yellow_cards: 0,
            red_cards: 0,
            minutes_played: 90
          }
        ],
        games: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      },
      previous_seasons: [],
      skill_set: [
        {
          name: 'Goleador',
          avatar: '/assets/scorer.png',
          endorsements: [33, 2, 2, 2, 2, 2, 2],
        },
        {
          name: 'Drible',
          avatar: '/assets/dribble.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          name: 'Rapidez',
          avatar: '/assets/fast.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        },
        {
          name: 'Passe',
          avatar: '/assets/passer.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 22, 2, 2],
        },
        {
          name: 'Força',
          avatar: '/assets/strong.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 44, , 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 42, 2, 2, 2, 2, 2, 2, 2, 2],
        },
      ],
      recommendations: {
        list: [1, 2, 3]
      },
      achievements: [
        {
          id: '1',
          name: '5 jogos consecutivos a marcar golo.',
          user_id: '1',
          user_name: 'Pedro Alves',
          user_avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
          user_positions: ['Médio Ofensivo'],
          avatar: '/assets/scorer.png'
        },
        {
          id: '1',
          name: '3 hat-tricks numa época.',
          user_id: '1',
          user_name: 'Pedro Alves',
          user_avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
          user_positions: ['Médio Ofensivo'],
          avatar: '/assets/scorer.png'
        }
      ],
    },
    {
      name: 'Arnaldo Tema',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      },
      id: '1',
      type: 'player',
      avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
      user_id: '1',
      personal_info: {
        name: 'Arnaldo Tema',
        age: 25,
        avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
        full_name: 'Diogo César Pontes Pires',
        positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
        height: 165,
        weight: 90,
        date_of_birth: '30-01-1993',
        nationality: 'Portugal',
        residence: 'Lisboa',
        foot: 'Direito',
        updated_at: '8-05-2018'
      },
      followers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      following: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      current_season: {
        season_id: 1,
        name: '17/18',
        team: {
          id: 1,
          acronym: 'SFC',
          avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
          name: 'Seixal FC',
          full_name: 'Seixal Futebol Clube'
        },
        stats: [
          {
            season: '2017/18',
            competition_name: 'Liga Portugal',
            competition_avatar: '/assets/Liga_Portugal_logo.png',
            games: 15,
            wins: 14,
            losses: 0,
            draws: 1,
            goals: 13,
            assists: 4,
            yellow_cards: 1,
            red_cards: 0,
            minutes_played: 1050
          },
          {
            season: '2017/18',
            competition_name: 'Taça de Portugal',
            competition_avatar: '/assets/Tacadaligalogo.png',
            games: 4,
            wins: 1,
            losses: 1,
            draws: 1,
            goals: 4,
            assists: 1,
            yellow_cards: 0,
            red_cards: 0,
            minutes_played: 280
          },
          {
            season: '2017/18',
            competition_name: 'Super Taça',
            competition_avatar: '/assets/9_imgbank_tp.png',
            games: 1,
            wins: 1,
            losses: 0,
            draws: 0,
            goals: 2,
            assists: 1,
            yellow_cards: 0,
            red_cards: 0,
            minutes_played: 90
          }
        ],
        games: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      },
      previous_seasons: [],
      skill_set: [
        {
          name: 'Goleador',
          avatar: '/assets/scorer.png',
          endorsements: [33, 2, 2, 2, 2, 2, 2],
        },
        {
          name: 'Drible',
          avatar: '/assets/dribble.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          name: 'Rapidez',
          avatar: '/assets/fast.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        },
        {
          name: 'Passe',
          avatar: '/assets/passer.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 22, 2, 2],
        },
        {
          name: 'Força',
          avatar: '/assets/strong.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 44, , 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 42, 2, 2, 2, 2, 2, 2, 2, 2],
        },
      ],
      recommendations: {
        list: [1, 2, 3]
      },
      achievements: [
        {
          id: '1',
          name: '5 jogos consecutivos a marcar golo.',
          user_id: '1',
          user_name: 'Pedro Alves',
          user_avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
          user_positions: ['Médio Ofensivo'],
          avatar: '/assets/scorer.png'
        },
        {
          id: '1',
          name: '3 hat-tricks numa época.',
          user_id: '1',
          user_name: 'Pedro Alves',
          user_avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
          user_positions: ['Médio Ofensivo'],
          avatar: '/assets/scorer.png'
        }
      ],
    },
    {
      name: 'Emanuelle Robirstkoviskovic',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      },
      id: '1',
      type: 'player',
      avatar: 'https://e3.365dm.com/18/07/1096x616/skynews-cristiano-ronaldo-football_4358475.jpg?20180710164507',
      user_id: '1',
      personal_info: {
        name: 'Emanuelle Robirstkoviskovic',
        age: 25,
        avatar: 'https://e3.365dm.com/18/07/1096x616/skynews-cristiano-ronaldo-football_4358475.jpg?20180710164507',
        full_name: 'Diogo César Pontes Pires',
        positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
        height: 165,
        weight: 90,
        date_of_birth: '30-01-1993',
        nationality: 'Portugal',
        residence: 'Lisboa',
        foot: 'Direito',
        updated_at: '8-05-2018'
      },
      followers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      following: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      current_season: {
        season_id: 1,
        name: '17/18',
        team: {
          id: 1,
          acronym: 'SFC',
          avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
          name: 'Seixal FC',
          full_name: 'Seixal Futebol Clube'
        },
        stats: [
          {
            season: '2017/18',
            competition_name: 'Liga Portugal',
            competition_avatar: '/assets/Liga_Portugal_logo.png',
            games: 15,
            wins: 14,
            losses: 0,
            draws: 1,
            goals: 13,
            assists: 4,
            yellow_cards: 1,
            red_cards: 0,
            minutes_played: 1050
          },
          {
            season: '2017/18',
            competition_name: 'Taça de Portugal',
            competition_avatar: '/assets/Tacadaligalogo.png',
            games: 4,
            wins: 1,
            losses: 1,
            draws: 1,
            goals: 4,
            assists: 1,
            yellow_cards: 0,
            red_cards: 0,
            minutes_played: 280
          },
          {
            season: '2017/18',
            competition_name: 'Super Taça',
            competition_avatar: '/assets/9_imgbank_tp.png',
            games: 1,
            wins: 1,
            losses: 0,
            draws: 0,
            goals: 2,
            assists: 1,
            yellow_cards: 0,
            red_cards: 0,
            minutes_played: 90
          }
        ],
        games: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      },
      previous_seasons: [],
      skill_set: [
        {
          name: 'Goleador',
          avatar: '/assets/scorer.png',
          endorsements: [33, 2, 2, 2, 2, 2, 2],
        },
        {
          name: 'Drible',
          avatar: '/assets/dribble.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          name: 'Rapidez',
          avatar: '/assets/fast.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        },
        {
          name: 'Passe',
          avatar: '/assets/passer.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 22, 2, 2],
        },
        {
          name: 'Força',
          avatar: '/assets/strong.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 44, , 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 42, 2, 2, 2, 2, 2, 2, 2, 2],
        },
      ],
      recommendations: {
        list: [1, 2, 3]
      },
      achievements: [
        {
          id: '1',
          name: '5 jogos consecutivos a marcar golo.',
          user_id: '1',
          user_name: 'Pedro Alves',
          user_avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
          user_positions: ['Médio Ofensivo'],
          avatar: '/assets/scorer.png'
        },
        {
          id: '1',
          name: '3 hat-tricks numa época.',
          user_id: '1',
          user_name: 'Pedro Alves',
          user_avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
          user_positions: ['Médio Ofensivo'],
          avatar: '/assets/scorer.png'
        }
      ],
    },
    {
      name: 'Thierry Henry',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      },
      id: '1',
      type: 'player',
      avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
      user_id: '1',
      personal_info: {
        name: 'Thierry Henry',
        age: 25,
        avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
        full_name: 'Diogo César Pontes Pires',
        positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
        height: 165,
        weight: 90,
        date_of_birth: '30-01-1993',
        nationality: 'Portugal',
        residence: 'Lisboa',
        foot: 'Direito',
        updated_at: '8-05-2018'
      },
      followers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      following: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      current_season: {
        season_id: 1,
        name: '17/18',
        team: {
          id: 1,
          acronym: 'SFC',
          avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
          name: 'Seixal FC',
          full_name: 'Seixal Futebol Clube'
        },
        stats: [
          {
            season: '2017/18',
            competition_name: 'Liga Portugal',
            competition_avatar: '/assets/Liga_Portugal_logo.png',
            games: 15,
            wins: 14,
            losses: 0,
            draws: 1,
            goals: 13,
            assists: 4,
            yellow_cards: 1,
            red_cards: 0,
            minutes_played: 1050
          },
          {
            season: '2017/18',
            competition_name: 'Taça de Portugal',
            competition_avatar: '/assets/Tacadaligalogo.png',
            games: 4,
            wins: 1,
            losses: 1,
            draws: 1,
            goals: 4,
            assists: 1,
            yellow_cards: 0,
            red_cards: 0,
            minutes_played: 280
          },
          {
            season: '2017/18',
            competition_name: 'Super Taça',
            competition_avatar: '/assets/9_imgbank_tp.png',
            games: 1,
            wins: 1,
            losses: 0,
            draws: 0,
            goals: 2,
            assists: 1,
            yellow_cards: 0,
            red_cards: 0,
            minutes_played: 90
          }
        ],
        games: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      },
      previous_seasons: [],
      skill_set: [
        {
          name: 'Goleador',
          avatar: '/assets/scorer.png',
          endorsements: [33, 2, 2, 2, 2, 2, 2],
        },
        {
          name: 'Drible',
          avatar: '/assets/dribble.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          name: 'Rapidez',
          avatar: '/assets/fast.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        },
        {
          name: 'Passe',
          avatar: '/assets/passer.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 22, 2, 2],
        },
        {
          name: 'Força',
          avatar: '/assets/strong.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 44, , 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 42, 2, 2, 2, 2, 2, 2, 2, 2],
        },
      ],
      recommendations: {
        list: [1, 2, 3]
      },
      achievements: [
        {
          id: '1',
          name: '5 jogos consecutivos a marcar golo.',
          user_id: '1',
          user_name: 'Pedro Alves',
          user_avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
          user_positions: ['Médio Ofensivo'],
          avatar: '/assets/scorer.png'
        },
        {
          id: '1',
          name: '3 hat-tricks numa época.',
          user_id: '1',
          user_name: 'Pedro Alves',
          user_avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
          user_positions: ['Médio Ofensivo'],
          avatar: '/assets/scorer.png'
        }
      ],
    },
    {
      name: 'Arnaldo Tema',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      },
      id: '1',
      type: 'player',
      avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
      user_id: '1',
      personal_info: {
        name: 'Arnaldo Tema',
        age: 25,
        avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
        full_name: 'Diogo César Pontes Pires',
        positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
        height: 165,
        weight: 90,
        date_of_birth: '30-01-1993',
        nationality: 'Portugal',
        residence: 'Lisboa',
        foot: 'Direito',
        updated_at: '8-05-2018'
      },
      followers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      following: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      current_season: {
        season_id: 1,
        name: '17/18',
        team: {
          id: 1,
          acronym: 'SFC',
          avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
          name: 'Seixal FC',
          full_name: 'Seixal Futebol Clube'
        },
        stats: [
          {
            season: '2017/18',
            competition_name: 'Liga Portugal',
            competition_avatar: '/assets/Liga_Portugal_logo.png',
            games: 15,
            wins: 14,
            losses: 0,
            draws: 1,
            goals: 13,
            assists: 4,
            yellow_cards: 1,
            red_cards: 0,
            minutes_played: 1050
          },
          {
            season: '2017/18',
            competition_name: 'Taça de Portugal',
            competition_avatar: '/assets/Tacadaligalogo.png',
            games: 4,
            wins: 1,
            losses: 1,
            draws: 1,
            goals: 4,
            assists: 1,
            yellow_cards: 0,
            red_cards: 0,
            minutes_played: 280
          },
          {
            season: '2017/18',
            competition_name: 'Super Taça',
            competition_avatar: '/assets/9_imgbank_tp.png',
            games: 1,
            wins: 1,
            losses: 0,
            draws: 0,
            goals: 2,
            assists: 1,
            yellow_cards: 0,
            red_cards: 0,
            minutes_played: 90
          }
        ],
        games: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      },
      previous_seasons: [],
      skill_set: [
        {
          name: 'Goleador',
          avatar: '/assets/scorer.png',
          endorsements: [33, 2, 2, 2, 2, 2, 2],
        },
        {
          name: 'Drible',
          avatar: '/assets/dribble.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          name: 'Rapidez',
          avatar: '/assets/fast.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        },
        {
          name: 'Passe',
          avatar: '/assets/passer.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 22, 2, 2],
        },
        {
          name: 'Força',
          avatar: '/assets/strong.png',
          endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 44, , 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 42, 2, 2, 2, 2, 2, 2, 2, 2],
        },
      ],
      recommendations: {
        list: [1, 2, 3]
      },
      achievements: [
        {
          id: '1',
          name: '5 jogos consecutivos a marcar golo.',
          user_id: '1',
          user_name: 'Pedro Alves',
          user_avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
          user_positions: ['Médio Ofensivo'],
          avatar: '/assets/scorer.png'
        },
        {
          id: '1',
          name: '3 hat-tricks numa época.',
          user_id: '1',
          user_name: 'Pedro Alves',
          user_avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
          user_positions: ['Médio Ofensivo'],
          avatar: '/assets/scorer.png'
        }
      ],
    },
  ]
  search_obj: SearchEntityViewmodel[] = [
    {
      personal_info: {
        name: 'FC Porto',
        avatar: 'https://www.zerozero.pt/img/logos/equipas/9_imgbank.png',
      },
      team: {
        id: '5b69b1adf5accc36e448a750',
        acronym: 'FCP',
        avatar: 'https://www.zerozero.pt/img/logos/equipas/9_imgbank.png',
        name: 'FC Porto',
        full_name: 'FC Porto'
      },
      _id: '5b69b1adf5accc36e448a750',
      user_info_id: '5b69b1adf5accc36e448a750',
      type: 'teams',
    },
    {
      personal_info: {
        name: 'Benfica',
        avatar: 'https://www.zerozero.pt/img/logos/equipas/4_imgbank.png',
      },
      team: {
        id: '5b69b1adf5accc36e448a754',
        acronym: 'SLB',
        avatar: 'https://www.zerozero.pt/img/logos/equipas/4_imgbank.png',
        name: 'Benfica',
        full_name: 'Benfica'
      },
      _id: '5b69b1adf5accc36e448a754',
      user_info_id: '5b69b1adf5accc36e448a754',
      type: 'teams',
    },
    {
      personal_info: {
        name: 'Sporting',
        avatar: 'https://www.zerozero.pt/img/logos/equipas/16_imgbank.png',
      },
      team: {
        id: '5b69b1b0f5accc36e448a758',
        acronym: 'SFC',
        avatar: 'https://www.zerozero.pt/img/logos/equipas/16_imgbank.png',
        name: 'Sporting',
        full_name: 'Sporting'
      },
      _id: '5b69b1b0f5accc36e448a758',
      user_info_id: '5b69b1b0f5accc36e448a758',
      type: 'teams',
    },
    {
      personal_info: {
        name: 'Braga',
        avatar: 'https://www.zerozero.pt/img/logos/equipas/15_imgbank.png',
      },
      team: {
        id: '5b69b1b0f5accc36e448a75c',
        acronym: 'SCB',
        avatar: 'https://www.zerozero.pt/img/logos/equipas/15_imgbank.png',
        name: 'Braga',
        full_name: 'Braga'
      },
      _id: '5b69b1b0f5accc36e448a75c',
      user_info_id: '5b69b1b0f5accc36e448a75c',
      type: 'teams',
    },
    {
      personal_info: {
        name: 'Rio Ave',
        avatar: 'https://www.zerozero.pt/img/logos/equipas/31_imgbank.png',
      },
      team: {
        id: '5b69b1b1f5accc36e448a760',
        acronym: 'RAFC',
        avatar: 'https://www.zerozero.pt/img/logos/equipas/31_imgbank.png',
        name: 'Rio Ave',
        full_name: 'Rio Ave'
      },
      user_info_id: '5b69b1b1f5accc36e448a760',
      _id: '5b69b1b1f5accc36e448a760',
      type: 'teams',
    }
  ];

  testing: boolean = false;
  requestOptions;

  constructor(private authenticationService: AuthenticationService , private http: HttpClient) {
    this.requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'jwt': authenticationService.token
      })
    };
  }

  //TODO: ALTT - Change input params to just a Filter_Search model
  searchUser(id: string, query: string, type: string): Observable<SearchEntityViewmodel[]> {

    let query_list = [];
    if (type || type != "") {
      query_list.push(
        {
          search_item: type,
          selected_filter: '$regex',
          selected_value: query
        }
      );
    }
    else {
      query_list.push(
        {
          search_item: 'personal_info.name',
          selected_filter: '$regex',
          selected_value: query
        }
      );
    }

    const body = {
      query: query_list
    }

    return this.http.post<SearchEntityViewmodel[]>('/api/players/search', body, this.requestOptions)
      .pipe(
        tap(data => console.log('POST Player Search', data)),
        catchError(this.handleError)
      );
  }

  //detailedSearchUser(search_obj: Array<FilterSearch>): Observable<UserInfoSearch[]> {
  detailedSearchUser(search_obj: Array<FilterSearch>): Observable<any[]> {

    debugger;

    return this.http.post<SearchEntityViewmodel[]>('/api/players/search', {query: search_obj}, this.requestOptions)
      .pipe(
        tap(data => console.log('POST Player Search', data)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };
}
