import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {AuthenticationService} from './authentication.service';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {catchError, retry, tap} from 'rxjs/operators';
import {MatchViewModel} from '../_models/match_viewmodel';
import {Achievement} from '../_models/achievement';
import {SearchEntityViewmodel} from '../_models/search_entity_viewmodel';
import {TeamMatch} from "../_models/team_match";
import {PlayerMatch} from "../_models/player_match";
import {TeamViewModel} from "../_models/team_viewmodel";

@Injectable()
export class MatchService {

  //mockMatches: MatchViewModel[] = [

  mockMatches: MatchViewModel [] = [
    {
      _id: '1',
      played: true,
      external_ids: {
        zerozero: 1
      },
      date: '27-08-2013',
      duration: 90,
      phase: 'Jornada 1',
      stadium: 'Municipal José Martins Vieira (POR) (Cova da Piedade - Almada)',
      referee: 'Nuno Miguel Serrano Almeida',
      competition_season: {
        name: 'Ledman LigaPro 2017/2018',
        avatar: 'http://www.zerozero.pt/img/logos/edicoes/87509_imgbank_.png',
        id: '1',
        competition_id: '1',
        phase: 'Jornada 1'
      },
      home_team: {
        goals: ['45', '66', '79'],
        id: '1',
        team_id: '1',
        name: 'C. Piedade',
        avatar: 'http://www.zerozero.pt/img/logos/equipas/6505_imgbank.png',
        achievements: [{
          id: '1',
          name: '5 jogos consecutivos a marcar golo.',
          avatar: '/assets/default_badge.png'
        }],
        main_lineup: [
          {
            name: 'Pedro Alves',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1,
            positions: ['Avançado'],
            goals: ['1', '12'],
            assists: [],
            yellow_cards: ['23'],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            age: 22,
            nationality: 'Portugal',
            user_info_id: '1',
            date_of_birth: 'Some date',
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1,
            positions: ['Avançado'],
            goals: [],
            assists: [],
            yellow_cards: ['23'],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            age: 22,
            nationality: 'Portugal',
            user_info_id: '1',
            date_of_birth: 'Some date',
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1,
            positions: ['Avançado'],
            goals: [],
            assists: [],
            yellow_cards: ['23'],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            age: 22,
            nationality: 'Portugal',
            user_info_id: '1',
            date_of_birth: 'Some date',
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1,
            positions: ['Avançado'],
            goals: ['2'],
            assists: [],
            yellow_cards: ['23'],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            age: 22,
            nationality: 'Portugal',
            user_info_id: '1',
            date_of_birth: 'Some date',
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1,
            positions: ['Avançado'],
            goals: [],
            assists: [],
            yellow_cards: ['23'],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            age: 22,
            nationality: 'Portugal',
            user_info_id: '1',
            date_of_birth: 'Some date',
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1,
            positions: ['Avançado'],
            goals: [],
            assists: [],
            yellow_cards: ['23'],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            age: 22,
            nationality: 'Portugal',
            user_info_id: '1',
            date_of_birth: 'Some date',
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1,
            positions: ['Avançado'],
            goals: [],
            assists: [],
            yellow_cards: ['23'],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            age: 22,
            nationality: 'Portugal',
            user_info_id: '1',
            date_of_birth: 'Some date',
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1,
            positions: ['Avançado'],
            goals: [],
            assists: [],
            yellow_cards: ['23'],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            age: 22,
            nationality: 'Portugal',
            user_info_id: '1',
            date_of_birth: 'Some date',
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1,
            positions: ['Avançado'],
            goals: [],
            assists: [],
            yellow_cards: ['23'],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            age: 22,
            nationality: 'Portugal',
            user_info_id: '1',
            date_of_birth: 'Some date',
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1,
            positions: ['Avançado'],
            goals: [],
            assists: [],
            yellow_cards: ['23'],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            age: 22,
            nationality: 'Portugal',
            user_info_id: '1',
            date_of_birth: 'Some date',
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1,
            positions: ['Avançado'],
            goals: [],
            assists: [],
            yellow_cards: ['23'],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            age: 22,
            nationality: 'Portugal',
            user_info_id: '1',
            date_of_birth: 'Some date',
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
        ],
        reserves: [
          {
            name: 'Lima Pereira',
            id: '4',
            external_ids: {
              zerozero: 1
            },
            number: 0,
            positions: ['Médio Centro'],
            goals: [],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 12,
            go_in: ['80'],
            user_info_id: '8',
            nationality: 'Portugal',
            date_of_birth: 'Some date',
            age: 22,
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
          {
            name: 'Lima Pereira',
            id: '4',
            external_ids: {
              zerozero: 1
            },
            number: 0,
            positions: ['Médio Centro'],
            goals: [],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 12,
            go_in: ['80'],
            user_info_id: '8',
            nationality: 'Portugal',
            date_of_birth: 'Some date',
            age: 22,
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
          {
            name: 'Lima Pereira',
            id: '4',
            external_ids: {
              zerozero: 1
            },
            number: 0,
            positions: ['Médio Centro'],
            goals: [],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 12,
            go_in: ['80'],
            user_info_id: '8',
            nationality: 'Portugal',
            date_of_birth: 'Some date',
            age: 22,
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
          {
            name: 'Lima Pereira',
            id: '4',
            external_ids: {
              zerozero: 1
            },
            number: 0,
            positions: ['Médio Centro'],
            goals: [],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 12,
            go_in: ['80'],
            user_info_id: '8',
            nationality: 'Portugal',
            date_of_birth: 'Some date',
            age: 22,
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
          {
            name: 'Lima Pereira',
            id: '4',
            external_ids: {
              zerozero: 1
            },
            number: 0,
            positions: ['Médio Centro'],
            goals: [],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 12,
            go_in: ['80'],
            user_info_id: '8',
            nationality: 'Portugal',
            date_of_birth: 'Some date',
            age: 22,
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
        ],
        staff: [{
          name: 'Bruno Ribeiro',
          age: 45,
          date_of_birth: 'Some date',
          id: '1',
          user_info_id: '1',
          avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
          nationality: 'Portugal',
          achievements: [],
          external_ids: {
            zerozero: 1
          }
        }]
      },
      away_team: {
        staff: [{
          name: 'Bruno Ribeiro',
          id: '1',
          avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
          nationality: 'Portugal',
          external_ids: {
            zerozero: 1
          },
          age: 45, // added
          date_of_birth: 'Some date',
          user_info_id: '1',
          achievements: []
        }],
        team_id: '2',
        goals: ['45', '66', '79'],
        id: '1',
        name: 'U. Madeira',
        avatar: 'http://www.zerozero.pt/img/logos/equipas/22_imgbank.png',
        achievements: [],
        main_lineup: [
          {
            name: 'José Chastre',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1,
            positions: ['Avançado'],
            goals: [],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            age: 22,
            nationality: 'Portugal',
            user_info_id: '1',
            date_of_birth: 'Some date',
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1,
            positions: ['Avançado'],
            goals: [],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            age: 22,
            nationality: 'Portugal',
            user_info_id: '1',
            date_of_birth: 'Some date',
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1,
            positions: ['Avançado'],
            goals: [],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            age: 22,
            nationality: 'Portugal',
            user_info_id: '1',
            date_of_birth: 'Some date',
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1,
            positions: ['Avançado'],
            goals: [],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            age: 22,
            nationality: 'Portugal',
            user_info_id: '1',
            date_of_birth: 'Some date',
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1,
            positions: ['Avançado'],
            goals: ['45'],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            age: 22,
            nationality: 'Portugal',
            user_info_id: '1',
            date_of_birth: 'Some date',
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1,
            positions: ['Avançado'],
            goals: [],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            age: 22,
            nationality: 'Portugal',
            user_info_id: '1',
            date_of_birth: 'Some date',
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1,
            positions: ['Avançado'],
            goals: [],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            age: 22,
            nationality: 'Portugal',
            user_info_id: '1',
            date_of_birth: 'Some date',
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1,
            positions: ['Avançado'],
            goals: ['71'],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            age: 22,
            nationality: 'Portugal',
            user_info_id: '1',
            date_of_birth: 'Some date',
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1,
            positions: ['Avançado'],
            goals: [],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            age: 22,
            nationality: 'Portugal',
            user_info_id: '1',
            date_of_birth: 'Some date',
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1,
            positions: ['Avançado'],
            goals: [],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            age: 22,
            nationality: 'Portugal',
            user_info_id: '1',
            date_of_birth: 'Some date',
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1,
            positions: ['Avançado'],
            goals: [],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            age: 22,
            nationality: 'Portugal',
            user_info_id: '1',
            date_of_birth: 'Some date',
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
        ],
        reserves: [
          {
            name: 'Tiago Almeira',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 24,
            positions: ['D. Central'],
            goals: [],
            assists: ['45'],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 30,
            go_in: ['60'],
            user_info_id: '8',
            nationality: 'Portugal',
            date_of_birth: 'Some date',
            age: 22,
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
          {
            name: 'Tiago Almeira',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 24,
            positions: ['D. Central'],
            goals: ['33'],
            assists: ['45'],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 30,
            go_in: ['60'],
            user_info_id: '8',
            nationality: 'Portugal',
            date_of_birth: 'Some date',
            age: 22,
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
          {
            name: 'Tiago Almeira',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 24,
            positions: ['D. Central'],
            goals: [],
            assists: ['45'],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 30,
            go_in: ['60'],
            user_info_id: '8',
            nationality: 'Portugal',
            date_of_birth: 'Some date',
            age: 22,
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
          {
            name: 'Tiago Almeira',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 24,
            positions: ['D. Central'],
            goals: [],
            assists: ['45'],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 30,
            go_in: ['60'],
            user_info_id: '8',
            nationality: 'Portugal',
            date_of_birth: 'Some date',
            age: 22,
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
          {
            name: 'Tiago Almeira',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 24,
            positions: ['D. Central'],
            goals: [],
            assists: ['45'],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 30,
            go_in: ['60'],
            user_info_id: '8',
            nationality: 'Portugal',
            date_of_birth: 'Some date',
            age: 22,
            go_out: [],
            avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
          },
        ]
      }
    }
  ];

  requestOptions;

  constructor(private authenticationService: AuthenticationService, private http: HttpClient) {
    this.requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'jwt': authenticationService.token
      })
    };
  }

  getMatch(id: string): Observable<MatchViewModel> {
    debugger;
    if(id == "-1") {
      return of(this.mockMatches[0]);
    }
    else {
      return this.http.get<MatchViewModel>('/api/matches/' + id, this.requestOptions)
        .pipe(
          tap(data => {
            console.log('GET Match', data);
          }),

          catchError(this.handleError)
        );
    }
  };


  // getPlayerMatchByTeamSeason(player_id: string, team_id: string,season_id: string): Observable<MatchViewModel[]> {
  getPlayerMatchByTeamSeason(player_id: string, team_id: string, season_id: string): Observable<any[]> {
    let mock_match_obj = [
      {
        id: '1',
        played: true,
        player_goals: 2,
        player_assists: ['45'],
        player_minutes_played: 90,
        player_yellow_cards: ['23'],
        player_red_cards: [],
        external_ids: {
          zerozero: 1
        },
        date: '27-08-2013',
        duration: 90,
        phase: 'Jornada 1',
        stadium: 'Municipal José Martins Vieira (POR) (Cova da Piedade - Almada)',
        referee: 'Nuno Miguel Serrano Almeida',
        competition: {
          name: 'Ledman LigaPro 2017/2018',
          avatar: 'http://www.zerozero.pt/img/logos/edicoes/87509_imgbank_.png',
          id: '1',
          external_ids: {
            zerozero: 1
          }
        },
        home_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          goals: ['45', '66', '79'],
          id: '1',
          name: 'C. Piedade',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/6505_imgbank.png',

          achievements: [{
            id: '1',
            name: '5 jogos consecutivos a marcar golo.',
            avatar: '/assets/default_badge.png'
          }],
          main_lineup: [
            {
              name: 'Pedro Alves',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: ['23'],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            }
          ],
          reserves: [],
        },
        away_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          team_id: '2',
          goals: ['45', '66', '79'],
          id: '1',
          name: 'U. Madeira',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/22_imgbank.png',
          achievements: [],
          main_lineup: [
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          reserves: [
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ]
        }
      },
      {
        id: '2',
        played: true,
        player_goals: 2,
        player_assists: ['45'],
        player_minutes_played: 90,
        player_yellow_cards: ['23'],
        player_red_cards: [],
        external_ids: {
          zerozero: 1
        },
        date: '27-08-2013',
        duration: 90,
        phase: 'Jornada 1',
        stadium: 'Municipal José Martins Vieira (POR) (Cova da Piedade - Almada)',
        referee: 'Nuno Miguel Serrano Almeida',
        competition: {
          name: 'Ledman LigaPro 2017/2018',
          avatar: 'http://www.zerozero.pt/img/logos/edicoes/87509_imgbank_.png',
          id: '1',
          external_ids: {
            zerozero: 1
          }
        },
        home_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          goals: ['45', '66', '79'],
          id: '1',
          name: 'C. Piedade',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/6505_imgbank.png',

          achievements: [{
            id: '1',
            name: '5 jogos consecutivos a marcar golo.',
            avatar: '/assets/default_badge.png'
          }],
          main_lineup: [
            {
              name: 'Pedro Alves',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: ['23'],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            }
          ],
          reserves: [],

        },
        away_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          team_id: '2',
          goals: ['45', '66', '79'],
          id: '1',
          name: 'U. Madeira',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/22_imgbank.png',
          achievements: [],
          main_lineup: [
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          reserves: [
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          coach: {
            name: 'Ricardo Chéu',
            id: '1',
            avatar: 'https://scontent.fopo3-1.fna.fbcdn.net/v/t31.0-8/15541052_10212069863200855_2889012374229061166_o.jpg?_nc_cat=0&oh=5b128be1ebf4151ec5aa2afb671b72d0&oe=5B8C9375',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            }
          }
        }
      },
      {
        id: '3',
        played: true,
        player_goals: 2,
        player_assists: ['45'],
        player_minutes_played: 90,
        player_yellow_cards: ['23'],
        player_red_cards: [],
        external_ids: {
          zerozero: 1
        },
        date: '27-08-2013',
        duration: 90,
        phase: 'Jornada 1',
        stadium: 'Municipal José Martins Vieira (POR) (Cova da Piedade - Almada)',
        referee: 'Nuno Miguel Serrano Almeida',
        competition: {
          name: 'Ledman LigaPro 2017/2018',
          avatar: 'http://www.zerozero.pt/img/logos/edicoes/87509_imgbank_.png',
          id: '1',
          external_ids: {
            zerozero: 1
          }
        },
        home_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          goals: ['45', '66', '79'],
          id: '1',
          name: 'C. Piedade',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/6505_imgbank.png',

          achievements: [{
            id: '1',
            name: '5 jogos consecutivos a marcar golo.',
            avatar: '/assets/default_badge.png'
          }],
          main_lineup: [
            {
              name: 'Pedro Alves',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: ['23'],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            }
          ],
          reserves: [],

        },
        away_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          team_id: '2',
          goals: ['45', '66', '79'],
          id: '1',
          name: 'U. Madeira',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/22_imgbank.png',

          achievements: [],
          main_lineup: [
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: ['1', '2'],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: ['1'],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: ['1'],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          reserves: [
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          coach: {
            name: 'Ricardo Chéu',
            id: '1',
            avatar: 'https://scontent.fopo3-1.fna.fbcdn.net/v/t31.0-8/15541052_10212069863200855_2889012374229061166_o.jpg?_nc_cat=0&oh=5b128be1ebf4151ec5aa2afb671b72d0&oe=5B8C9375',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            }
          }
        }
      },
      {
        id: '4',
        played: true,
        player_goals: 2,
        player_assists: ['45'],
        player_minutes_played: 90,
        player_yellow_cards: ['23'],
        player_red_cards: [],
        external_ids: {
          zerozero: 1
        },
        date: '27-08-2013',
        duration: 90,
        phase: 'Jornada 1',
        stadium: 'Municipal José Martins Vieira (POR) (Cova da Piedade - Almada)',
        referee: 'Nuno Miguel Serrano Almeida',
        competition: {
          name: 'Ledman LigaPro 2017/2018',
          avatar: 'http://www.zerozero.pt/img/logos/edicoes/87509_imgbank_.png',
          id: '1',
          external_ids: {
            zerozero: 1
          }
        },
        home_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          goals: ['45', '66', '79'],
          id: '1',
          name: 'C. Piedade',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/6505_imgbank.png',

          achievements: [{
            id: '1',
            name: '5 jogos consecutivos a marcar golo.',
            avatar: '/assets/default_badge.png'
          }],
          main_lineup: [
            {
              name: 'Pedro Alves',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: ['23'],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            }
          ],
          reserves: [],

        },
        away_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          team_id: '2',
          goals: ['45', '66', '79'],
          id: '1',
          name: 'U. Madeira',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/22_imgbank.png',
          achievements: [],
          main_lineup: [
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          reserves: [
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          coach: {
            name: 'Ricardo Chéu',
            id: '1',
            avatar: 'https://scontent.fopo3-1.fna.fbcdn.net/v/t31.0-8/15541052_10212069863200855_2889012374229061166_o.jpg?_nc_cat=0&oh=5b128be1ebf4151ec5aa2afb671b72d0&oe=5B8C9375',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            }
          }
        }
      },
      {
        id: '5',
        played: true,
        player_goals: 2,
        player_assists: ['45'],
        player_minutes_played: 90,
        player_yellow_cards: ['23'],
        player_red_cards: [],
        external_ids: {
          zerozero: 1
        },
        date: '27-08-2013',
        duration: 90,
        phase: 'Jornada 1',
        stadium: 'Municipal José Martins Vieira (POR) (Cova da Piedade - Almada)',
        referee: 'Nuno Miguel Serrano Almeida',
        competition: {
          name: 'Ledman LigaPro 2017/2018',
          avatar: 'http://www.zerozero.pt/img/logos/edicoes/87509_imgbank_.png',
          id: '1',
          external_ids: {
            zerozero: 1
          }
        },
        home_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          goals: ['45', '66', '79'],
          id: '1',
          name: 'C. Piedade',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/6505_imgbank.png',

          achievements: [{
            id: '1',
            name: '5 jogos consecutivos a marcar golo.',
            avatar: '/assets/default_badge.png'
          }],
          main_lineup: [
            {
              name: 'Pedro Alves',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: ['23'],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            }
          ],
          reserves: [],

        },
        away_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          team_id: '2',
          goals: ['45', '66', '79'],
          id: '1',
          name: 'U. Madeira',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/22_imgbank.png',

          achievements: [],
          main_lineup: [
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          reserves: [
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          coach: {
            name: 'Ricardo Chéu',
            id: '1',
            avatar: 'https://scontent.fopo3-1.fna.fbcdn.net/v/t31.0-8/15541052_10212069863200855_2889012374229061166_o.jpg?_nc_cat=0&oh=5b128be1ebf4151ec5aa2afb671b72d0&oe=5B8C9375',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            }
          }
        }
      },
      {
        id: '6',
        played: true,
        player_goals: 2,
        player_assists: ['45'],
        player_minutes_played: 90,
        player_yellow_cards: ['23'],
        player_red_cards: [],
        external_ids: {
          zerozero: 1
        },
        date: '27-08-2013',
        duration: 90,
        phase: 'Jornada 1',
        stadium: 'Municipal José Martins Vieira (POR) (Cova da Piedade - Almada)',
        referee: 'Nuno Miguel Serrano Almeida',
        competition: {
          name: 'Ledman LigaPro 2017/2018',
          avatar: 'http://www.zerozero.pt/img/logos/edicoes/87509_imgbank_.png',
          id: '1',
          external_ids: {
            zerozero: 1
          }
        },
        home_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          goals: ['45', '66', '79'],
          id: '1',
          name: 'C. Piedade',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/6505_imgbank.png',

          achievements: [{
            id: '1',
            name: '5 jogos consecutivos a marcar golo.',
            avatar: '/assets/default_badge.png'
          }],
          main_lineup: [
            {
              name: 'Pedro Alves',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: ['23'],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            }
          ],
          reserves: [],

        },
        away_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          team_id: '2',
          goals: ['45', '66', '79'],
          id: '1',
          name: 'U. Madeira',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/22_imgbank.png',

          achievements: [],
          main_lineup: [
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          reserves: [
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          coach: {
            name: 'Ricardo Chéu',
            id: '1',
            avatar: 'https://scontent.fopo3-1.fna.fbcdn.net/v/t31.0-8/15541052_10212069863200855_2889012374229061166_o.jpg?_nc_cat=0&oh=5b128be1ebf4151ec5aa2afb671b72d0&oe=5B8C9375',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            }
          }
        }
      },
      {
        id: '7',
        played: true,
        player_goals: 2,
        player_assists: ['45'],
        player_minutes_played: 90,
        player_yellow_cards: ['23'],
        player_red_cards: [],
        external_ids: {
          zerozero: 1
        },
        date: '27-08-2013',
        duration: 90,
        phase: 'Jornada 1',
        stadium: 'Municipal José Martins Vieira (POR) (Cova da Piedade - Almada)',
        referee: 'Nuno Miguel Serrano Almeida',
        competition: {
          name: 'Ledman LigaPro 2017/2018',
          avatar: 'http://www.zerozero.pt/img/logos/edicoes/87509_imgbank_.png',
          id: '1',
          external_ids: {
            zerozero: 1
          }
        },
        home_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          goals: ['45', '66', '79'],
          id: '1',
          name: 'C. Piedade',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/6505_imgbank.png',

          achievements: [{
            id: '1',
            name: '5 jogos consecutivos a marcar golo.',
            avatar: '/assets/default_badge.png'
          }],
          main_lineup: [
            {
              name: 'Pedro Alves',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: ['23'],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            }
          ],
          reserves: [],

        },
        away_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          team_id: '2',
          goals: ['45', '66', '79'],
          id: '1',
          name: 'U. Madeira',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/22_imgbank.png',

          achievements: [],
          main_lineup: [
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: ['1'],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: ['1'],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: ['1'],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          reserves: [
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          coach: {
            name: 'Ricardo Chéu',
            id: '1',
            avatar: 'https://scontent.fopo3-1.fna.fbcdn.net/v/t31.0-8/15541052_10212069863200855_2889012374229061166_o.jpg?_nc_cat=0&oh=5b128be1ebf4151ec5aa2afb671b72d0&oe=5B8C9375',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            }
          }
        }
      },
      {
        id: '8',
        played: true,
        player_goals: 2,
        player_assists: ['45'],
        player_minutes_played: 90,
        player_yellow_cards: ['23'],
        player_red_cards: [],
        external_ids: {
          zerozero: 1
        },
        date: '27-08-2013',
        duration: 90,
        phase: 'Jornada 1',
        stadium: 'Municipal José Martins Vieira (POR) (Cova da Piedade - Almada)',
        referee: 'Nuno Miguel Serrano Almeida',
        competition: {
          name: 'Ledman LigaPro 2017/2018',
          avatar: 'http://www.zerozero.pt/img/logos/edicoes/87509_imgbank_.png',
          id: '1',
          external_ids: {
            zerozero: 1
          }
        },
        home_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          goals: ['45', '66', '79'],
          id: '1',
          name: 'C. Piedade',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/6505_imgbank.png',

          achievements: [{
            id: '1',
            name: '5 jogos consecutivos a marcar golo.',
            avatar: '/assets/default_badge.png'
          }],
          main_lineup: [
            {
              name: 'Pedro Alves',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: ['23'],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            }
          ],
          reserves: [],

        },
        away_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          team_id: '2',
          goals: ['45', '66', '79'],
          id: '1',
          name: 'U. Madeira',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/22_imgbank.png',

          achievements: [],
          main_lineup: [
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: ['1'],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          reserves: [
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          coach: {
            name: 'Ricardo Chéu',
            id: '1',
            avatar: 'https://scontent.fopo3-1.fna.fbcdn.net/v/t31.0-8/15541052_10212069863200855_2889012374229061166_o.jpg?_nc_cat=0&oh=5b128be1ebf4151ec5aa2afb671b72d0&oe=5B8C9375',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            }
          }
        }
      },
      {
        id: '9',
        played: true,
        player_goals: 2,
        player_assists: ['45'],
        player_minutes_played: 90,
        player_yellow_cards: ['23'],
        player_red_cards: [],
        external_ids: {
          zerozero: 1
        },
        date: '27-08-2013',
        duration: 90,
        phase: 'Jornada 1',
        stadium: 'Municipal José Martins Vieira (POR) (Cova da Piedade - Almada)',
        referee: 'Nuno Miguel Serrano Almeida',
        competition: {
          name: 'Ledman LigaPro 2017/2018',
          avatar: 'http://www.zerozero.pt/img/logos/edicoes/87509_imgbank_.png',
          id: '1',
          external_ids: {
            zerozero: 1
          }
        },
        home_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          goals: ['45', '66', '79'],
          id: '1',
          name: 'C. Piedade',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/6505_imgbank.png',

          achievements: [{
            id: '1',
            name: '5 jogos consecutivos a marcar golo.',
            avatar: '/assets/default_badge.png'
          }],
          main_lineup: [
            {
              name: 'Pedro Alves',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: ['23'],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            }
          ],
          reserves: [],

        },
        away_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          team_id: '2',
          goals: ['45', '66', '79'],
          id: '1',
          name: 'U. Madeira',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/22_imgbank.png',

          achievements: [],
          main_lineup: [
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          reserves: [
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          coach: {
            name: 'Ricardo Chéu',
            id: '1',
            avatar: 'https://scontent.fopo3-1.fna.fbcdn.net/v/t31.0-8/15541052_10212069863200855_2889012374229061166_o.jpg?_nc_cat=0&oh=5b128be1ebf4151ec5aa2afb671b72d0&oe=5B8C9375',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            }
          }
        }
      },
      {
        id: '10',
        played: true,
        player_goals: 2,
        player_assists: ['45'],
        player_minutes_played: 90,
        player_yellow_cards: ['23'],
        player_red_cards: [],
        external_ids: {
          zerozero: 1
        },
        date: '27-08-2013',
        duration: 90,
        phase: 'Jornada 1',
        stadium: 'Municipal José Martins Vieira (POR) (Cova da Piedade - Almada)',
        referee: 'Nuno Miguel Serrano Almeida',
        competition: {
          name: 'Ledman LigaPro 2017/2018',
          avatar: 'http://www.zerozero.pt/img/logos/edicoes/87509_imgbank_.png',
          id: '1',
          external_ids: {
            zerozero: 1
          }
        },
        home_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          goals: ['45', '66', '79'],
          id: '1',
          name: 'C. Piedade',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/6505_imgbank.png',

          achievements: [{
            id: '1',
            name: '5 jogos consecutivos a marcar golo.',
            avatar: '/assets/default_badge.png'
          }],
          main_lineup: [
            {
              name: 'Pedro Alves',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: ['23'],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            }
          ],
          reserves: [],

        },
        away_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          team_id: '2',
          goals: ['45', '66', '79'],
          id: '1',
          name: 'U. Madeira',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/22_imgbank.png',

          achievements: [],
          main_lineup: [
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          reserves: [
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          coach: {
            name: 'Ricardo Chéu',
            id: '1',
            avatar: 'https://scontent.fopo3-1.fna.fbcdn.net/v/t31.0-8/15541052_10212069863200855_2889012374229061166_o.jpg?_nc_cat=0&oh=5b128be1ebf4151ec5aa2afb671b72d0&oe=5B8C9375',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            }
          }
        }
      },
      {
        id: '11',
        played: true,
        player_goals: 2,
        player_assists: ['45'],
        player_minutes_played: 90,
        player_yellow_cards: ['23'],
        player_red_cards: [],
        external_ids: {
          zerozero: 1
        },
        date: '27-08-2013',
        duration: 90,
        phase: 'Jornada 1',
        stadium: 'Municipal José Martins Vieira (POR) (Cova da Piedade - Almada)',
        referee: 'Nuno Miguel Serrano Almeida',
        competition: {
          name: 'Ledman LigaPro 2017/2018',
          avatar: 'http://www.zerozero.pt/img/logos/edicoes/87509_imgbank_.png',
          id: '1',
          external_ids: {
            zerozero: 1
          }
        },
        home_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          goals: ['45', '66', '79'],
          id: '1',
          name: 'C. Piedade',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/6505_imgbank.png',

          achievements: [{
            id: '1',
            name: '5 jogos consecutivos a marcar golo.',
            avatar: '/assets/default_badge.png'
          }],
          main_lineup: [
            {
              name: 'Pedro Alves',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: ['23'],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            }
          ],
          reserves: [],

        },
        away_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          team_id: '2',
          goals: ['45', '66', '79'],
          id: '1',
          name: 'U. Madeira',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/22_imgbank.png',

          achievements: [],
          main_lineup: [
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          reserves: [
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          coach: {
            name: 'Ricardo Chéu',
            id: '1',
            avatar: 'https://scontent.fopo3-1.fna.fbcdn.net/v/t31.0-8/15541052_10212069863200855_2889012374229061166_o.jpg?_nc_cat=0&oh=5b128be1ebf4151ec5aa2afb671b72d0&oe=5B8C9375',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            }
          }
        }
      },
      {
        id: '12',
        played: true,
        player_goals: 2,
        player_assists: ['45'],
        player_minutes_played: 90,
        player_yellow_cards: ['23'],
        player_red_cards: [],
        external_ids: {
          zerozero: 1
        },
        date: '27-08-2013',
        duration: 90,
        phase: 'Jornada 1',
        stadium: 'Municipal José Martins Vieira (POR) (Cova da Piedade - Almada)',
        referee: 'Nuno Miguel Serrano Almeida',
        competition: {
          name: 'Ledman LigaPro 2017/2018',
          avatar: 'http://www.zerozero.pt/img/logos/edicoes/87509_imgbank_.png',
          id: '1',
          external_ids: {
            zerozero: 1
          }
        },
        home_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          goals: ['45', '66', '79'],
          id: '1',
          name: 'C. Piedade',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/6505_imgbank.png',

          achievements: [{
            id: '1',
            name: '5 jogos consecutivos a marcar golo.',
            avatar: '/assets/default_badge.png'
          }],
          main_lineup: [
            {
              name: 'Pedro Alves',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: ['23'],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            }
          ],
          reserves: [],

        },
        away_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          team_id: '2',
          goals: ['45', '66', '79'],
          id: '1',
          name: 'U. Madeira',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/22_imgbank.png',

          achievements: [],
          main_lineup: [
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          reserves: [
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          coach: {
            name: 'Ricardo Chéu',
            id: '1',
            avatar: 'https://scontent.fopo3-1.fna.fbcdn.net/v/t31.0-8/15541052_10212069863200855_2889012374229061166_o.jpg?_nc_cat=0&oh=5b128be1ebf4151ec5aa2afb671b72d0&oe=5B8C9375',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            }
          }
        }
      },
      {
        id: '13',
        played: true,
        player_goals: 2,
        player_assists: ['45'],
        player_minutes_played: 90,
        player_yellow_cards: ['23'],
        player_red_cards: [],
        external_ids: {
          zerozero: 1
        },
        date: '27-08-2013',
        duration: 90,
        phase: 'Jornada 1',
        stadium: 'Municipal José Martins Vieira (POR) (Cova da Piedade - Almada)',
        referee: 'Nuno Miguel Serrano Almeida',
        competition: {
          name: 'Ledman LigaPro 2017/2018',
          avatar: 'http://www.zerozero.pt/img/logos/edicoes/87509_imgbank_.png',
          id: '1',
          external_ids: {
            zerozero: 1
          }
        },
        home_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          goals: ['45', '66', '79'],
          id: '1',
          name: 'C. Piedade',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/6505_imgbank.png',

          achievements: [{
            id: '1',
            name: '5 jogos consecutivos a marcar golo.',
            avatar: '/assets/default_badge.png'
          }],
          main_lineup: [
            {
              name: 'Pedro Alves',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: ['23'],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            }
          ],
          reserves: [],

        },
        away_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          team_id: '2',
          goals: ['45', '66', '79'],
          id: '1',
          name: 'U. Madeira',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/22_imgbank.png',

          achievements: [],
          main_lineup: [
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          reserves: [
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          coach: {
            name: 'Ricardo Chéu',
            id: '1',
            avatar: 'https://scontent.fopo3-1.fna.fbcdn.net/v/t31.0-8/15541052_10212069863200855_2889012374229061166_o.jpg?_nc_cat=0&oh=5b128be1ebf4151ec5aa2afb671b72d0&oe=5B8C9375',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            }
          }
        }
      },
      {
        id: '14',
        played: true,
        player_goals: 2,
        player_assists: ['45'],
        player_minutes_played: 90,
        player_yellow_cards: ['23'],
        player_red_cards: [],
        external_ids: {
          zerozero: 1
        },
        date: '27-08-2013',
        duration: 90,
        phase: 'Jornada 1',
        stadium: 'Municipal José Martins Vieira (POR) (Cova da Piedade - Almada)',
        referee: 'Nuno Miguel Serrano Almeida',
        competition: {
          name: 'Ledman LigaPro 2017/2018',
          avatar: 'http://www.zerozero.pt/img/logos/edicoes/87509_imgbank_.png',
          id: '1',
          external_ids: {
            zerozero: 1
          }
        },
        home_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          goals: ['45', '66', '79'],
          id: '1',
          name: 'C. Piedade',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/6505_imgbank.png',

          achievements: [{
            id: '1',
            name: '5 jogos consecutivos a marcar golo.',
            avatar: '/assets/default_badge.png'
          }],
          main_lineup: [
            {
              name: 'Pedro Alves',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: ['23'],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            }
          ],
          reserves: [],

        },
        away_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          team_id: '2',
          goals: ['45', '66', '79'],
          id: '1',
          name: 'U. Madeira',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/22_imgbank.png',

          achievements: [],
          main_lineup: [
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          reserves: [
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          coach: {
            name: 'Ricardo Chéu',
            id: '1',
            avatar: 'https://scontent.fopo3-1.fna.fbcdn.net/v/t31.0-8/15541052_10212069863200855_2889012374229061166_o.jpg?_nc_cat=0&oh=5b128be1ebf4151ec5aa2afb671b72d0&oe=5B8C9375',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            }
          }
        }
      },
      {
        id: '15',
        played: true,
        player_goals: 2,
        player_assists: ['45'],
        player_minutes_played: 90,
        player_yellow_cards: ['23'],
        player_red_cards: [],
        external_ids: {
          zerozero: 1
        },
        date: '27-08-2013',
        duration: 90,
        phase: 'Jornada 1',
        stadium: 'Municipal José Martins Vieira (POR) (Cova da Piedade - Almada)',
        referee: 'Nuno Miguel Serrano Almeida',
        competition: {
          name: 'Ledman LigaPro 2017/2018',
          avatar: 'http://www.zerozero.pt/img/logos/edicoes/87509_imgbank_.png',
          id: '1',
          external_ids: {
            zerozero: 1
          }
        },
        home_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          goals: ['45', '66', '79'],
          id: '1',
          name: 'C. Piedade',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/6505_imgbank.png',

          achievements: [{
            id: '1',
            name: '5 jogos consecutivos a marcar golo.',
            avatar: '/assets/default_badge.png'
          }],
          main_lineup: [
            {
              name: 'Pedro Alves',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: ['23'],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            }
          ],
          reserves: [],

        },
        away_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          team_id: '2',
          goals: ['45', '66', '79'],
          id: '1',
          name: 'U. Madeira',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/22_imgbank.png',

          achievements: [],
          main_lineup: [
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          reserves: [
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          coach: {
            name: 'Ricardo Chéu',
            id: '1',
            avatar: 'https://scontent.fopo3-1.fna.fbcdn.net/v/t31.0-8/15541052_10212069863200855_2889012374229061166_o.jpg?_nc_cat=0&oh=5b128be1ebf4151ec5aa2afb671b72d0&oe=5B8C9375',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            }
          }
        }
      },
      {
        id: '16',
        played: true,
        player_goals: 2,
        player_assists: ['45'],
        player_minutes_played: 90,
        player_yellow_cards: ['23'],
        player_red_cards: [],
        external_ids: {
          zerozero: 1
        },
        date: '27-08-2013',
        duration: 90,
        phase: 'Jornada 1',
        stadium: 'Municipal José Martins Vieira (POR) (Cova da Piedade - Almada)',
        referee: 'Nuno Miguel Serrano Almeida',
        competition: {
          name: 'Ledman LigaPro 2017/2018',
          avatar: 'http://www.zerozero.pt/img/logos/edicoes/87509_imgbank_.png',
          id: '1',
          external_ids: {
            zerozero: 1
          }
        },
        home_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          goals: ['45', '66', '79'],
          id: '1',
          name: 'C. Piedade',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/6505_imgbank.png',

          achievements: [{
            id: '1',
            name: '5 jogos consecutivos a marcar golo.',
            avatar: '/assets/default_badge.png'
          }],
          main_lineup: [
            {
              name: 'Pedro Alves',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: ['23'],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            }
          ],
          reserves: [],

        },
        away_team: {
          staff: [{
            name: 'Bruno Ribeiro',
            id: '1',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            },
            age: 45, // added
            date_of_birth: 'Some date',
            user_info_id: '1',
            achievements: []
          }],
          team_id: '2',
          goals: ['45', '66', '79'],
          id: '1',
          name: 'U. Madeira',
          avatar: 'http://www.zerozero.pt/img/logos/equipas/22_imgbank.png',

          achievements: [],
          main_lineup: [
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'José Chastre',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 1,
              positions: ['Avançado'],
              goals: [],
              assists: [],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 90,
              go_in: [],
              age: 22,
              nationality: 'Portugal',
              user_info_id: '1',
              date_of_birth: 'Some date',
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          reserves: [
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
            {
              name: 'Tiago Almeira',
              id: '1',
              external_ids: {
                zerozero: 1
              },
              number: 24,
              positions: ['D. Central'],
              goals: [],
              assists: ['45'],
              yellow_cards: [],
              red_cards: [],
              minutes_played: 30,
              go_in: ['60'],
              user_info_id: '8',
              nationality: 'Portugal',
              date_of_birth: 'Some date',
              age: 22,
              go_out: [],
              avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952'
            },
          ],
          coach: {
            name: 'Ricardo Chéu',
            id: '1',
            avatar: 'https://scontent.fopo3-1.fna.fbcdn.net/v/t31.0-8/15541052_10212069863200855_2889012374229061166_o.jpg?_nc_cat=0&oh=5b128be1ebf4151ec5aa2afb671b72d0&oe=5B8C9375',
            nationality: 'Portugal',
            external_ids: {
              zerozero: 1
            }
          }
        }
      }
    ];
    return of(mock_match_obj);
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
