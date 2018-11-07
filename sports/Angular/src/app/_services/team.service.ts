import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {AuthenticationService} from './authentication.service';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {catchError, retry, tap} from 'rxjs/operators';
import {TeamViewModel} from '../_models/team_viewmodel';
import {Recommendation} from '../_models/recommendation';
import {SearchEntityViewmodel} from "../_models/search_entity_viewmodel";
import {CompetitionViewModel} from "../_models/competition_viewmodel";

@Injectable()
export class TeamService {

  mockTeams: TeamViewModel[] = [{
    "additional_info": {
      "sponsors": [{
        link: 'https://www.tripadvisor.pt/Restaurant_Review-g4995953-d12242638-Reviews-Mundet_Factory-Seixal_Lisbon_District_Central_Portugal.html',
        name: 'Mundet Factory'
      }],
      "other_sports": ['Basquetebol', 'Hóquei Patins'],
      site: 'www.seixalfc.pt',
      email: 'seixalfc@seixal.pt',
      phone_number: '+351 214 444 294',
      address: 'R. Dona Maria II 17, Seixal',
      president: 'Maria Teresa Andrade',
      vice_president: 'Manuel Coisinha',
      sports_director: 'Caíta Moreira',
      number_of_teams: 5,
      number_of_athletes: 134,
      number_of_coaches: 8,
      number_of_physiotherapists: 12,
      number_of_grass_fields: 1,
      number_of_synthetic_fields: 0,
      number_of_locker_rooms: 5,
    },
    "recommendations": {
      "list": [1, 2, 3, 4, 5, 6],
      top_5: [{
        user_id: '-1',
        author: {
          author_type: 'football_user_info',
          name: 'Arnaldo Tema',
          relationship: 'Colega de equipa',
          id: '2',
          avatar: 'https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-9/13781724_10205190140152111_6495749405499267870_n.jpg?_nc_cat=106&oh=c66e24c7f9b1ce391584fa0400b9414b&oe=5C545952',
          team: {
            id: '1',
            acronym: 'SFC',
            avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
            name: 'Seixal FC',
          },
        },
        text: 'Sed imperdiet tellus tristique, porttitor velit condimentum, bibendum augue. Maecenas sit amet libero et urna consequat ultrices ut sit amet nulla. Mauris quis neque ut lacus elementum tempus.',
      },
        {
          user_id: '-1',
        author: {
          author_type: 'football_user_info',
            name: 'Nuno Carmo',
            relationship: 'Treinador',
            id: '3',
            avatar: 'https://scontent.fopo3-1.fna.fbcdn.net/v/t31.0-8/15541052_10212069863200855_2889012374229061166_o.jpg?_nc_cat=0&oh=5b128be1ebf4151ec5aa2afb671b72d0&oe=5B8C9375',
            team: {
              id: '1',
              acronym: 'SFC',
              avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
              name: 'Seixal FC',
            },
          },
          text: 'Maecenas tortor elit, fermentum non aliquam quis, bibendum nec urna. Cras euismod justo nec nisl ullamcorper, eget gravida tellus tincidunt. Aliquam quis leo ligula.',
        },
        {
          user_id: '-1',
        author: {
          author_type: 'football_user_info',
            name: 'Vital de Carvalho',
            id: '4',
            relationship: 'Jogador',
            avatar: 'https://openminds.swissre.com/static//images/profile-default.png',
            team: {
              id: '1',
              acronym: 'SFC',
              avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
              name: 'Seixal FC',
            },
          },
          text: 'Duis eu maximus nibh, in consequat dui. Suspendisse porttitor elit et turpis faucibus volutpat. Nunc et mi luctus, vehicula eros team_id, tincidunt ante.',
        },
        {
          user_id: '-1',
        author: {
          author_type: 'football_user_info',
            name: 'José Mourinho',
            relationship: 'Treinador',
            id: '5',
            avatar: 'https://cdn.images.dailystar.co.uk/dynamic/58/photos/763000/620x/Jose-Mourinho-644644.jpg',
            team: {
              id: '1',
              acronym: 'SFC',
              avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
              name: 'Seixal FC',
            },
          },
          text: 'Cras vehicula diam team_id massa tempus sodales. Mauris gravida nunc sed pulvinar ornare. Quisque eu pulvinar augue. Curabitur a rutrum metus. Nam mattis, quam ut varius suscipit, lacus lorem sodales diam, ac fermentum quam nulla a orci. Aenean team_id tincidunt ex, sit amet commodo ligula. Nulla dui mi, consectetur sit amet justo sed, aliquam dictum mi. Aenean sit amet cursus enim.',
        },
        {
          user_id: '-1',
        author: {
          author_type: 'football_user_info',
            name: 'Jorge Jesus',
            relationship: 'Treinador',
            id: '6',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            team: {
              id: '1',
              acronym: 'SFC',
              avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
              name: 'Seixal FC',
            },
          },
          text: 'Nunc interdum, mauris ut pharetra elementum, mauris nunc blandit augue, nec semper arcu risus ac orci. Curabitur sit amet mauris vel erat faucibus fringilla in vel ligula.',
        }
      ],
    },
    "external_ids": {
      "zerozero": "9"
    },
    "previous_seasons": [],
    "tryouts": [
      {
        address: 'R. Dona Maria II 17, Seixal',
        age_group: 'Séniores',
        days: '6, 7, 10 de Agosto',
        time: '20h30',
        requirements: 'Devem vir acompanhados do c. cidadão',
      },
      {
        address: 'R. Dona Maria II 17, Seixal',
        age_group: 'Juniores 1999-2001',
        days: '9, 13, 14 de Agosto',
        time: '18h30',
        requirements: 'Devem vir acompanhados do c. cidadão',
      },
      {
        address: 'R. Dona Maria II 17, Seixal',
        age_group: 'Infantis 2005-2006',
        days: '6, 7, 10 de Agosto',
        time: '18h00',
        requirements: 'Devem vir acompanhados do c. cidadão',
      }
    ],
    followers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    following: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    "_id": "5b69b1adf5accc36e448a750",
    "acronym": "FC Porto",
    "avatar": "https://www.zerozero.pt/img/logos/equipas/9_imgbank.png",
    "full_name": "",
    "name": "FC Porto",
    "current_season": {
      "external_ids": {
        "zerozero": "9"
      },
      "standings": [
        {
          "position": 1,
          "matches": 17,
          "wins": 16,
          "draws": 1,
          "losses": 0,
          "goals": 53,
          "goals_taken": 10,
          "id": "5b69b1a8f5accc36e448a74f",
          "competition_id": "5b69b1a3f5accc36e448a74d",
          "name": "Liga NOS 2017/18",
          "avatar": "http://www.zerozero.pt/img/logos/edicoes/70079_imgbank_.png",
          "_id": "5b69b1adf5accc36e448a752"
        }
      ],
      "matches": [
        {
          "competition_season": {
            "id": "5b69b1a8f5accc36e448a74f",
            "name": "Liga NOS 2017/18",
            "avatar": "http://www.zerozero.pt/img/logos/edicoes/70079_imgbank_.png"
          },
          "home_team": {
            "id": "5b69b1adf5accc36e448a751",
            "name": "FC Porto",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/9_imgbank.png",
            "goals": 4
          },
          "away_team": {
            "id": "5b69b1b7f5accc36e448a795",
            "name": "Estoril Praia",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/1734_imgbank.png",
            "goals": 0
          },
          "id": "5b69b42bf5accc36e448b6cf",
          "date": "2017-08-09T18:00:00.000Z",
          "_id": "5b69b42bf5accc36e448b6d1"
        },
        {
          "competition_season": {
            "id": "5b69b1a8f5accc36e448a74f",
            "name": "Liga NOS 2017/18",
            "avatar": "http://www.zerozero.pt/img/logos/edicoes/70079_imgbank_.png"
          },
          "home_team": {
            "id": "5b69b1adf5accc36e448a751",
            "name": "FC Porto",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/9_imgbank.png",
            "goals": 3
          },
          "away_team": {
            "id": "5b69b1b6f5accc36e448a789",
            "name": "Moreirense",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/6_imgbank.png",
            "goals": 0
          },
          "id": "5b69b440f5accc36e448bbdb",
          "date": "2017-08-20T17:00:00.000Z",
          "_id": "5b69b440f5accc36e448bbdd"
        },
        {
          "competition_season": {
            "id": "5b69b1a8f5accc36e448a74f",
            "name": "Liga NOS 2017/18",
            "avatar": "http://www.zerozero.pt/img/logos/edicoes/70079_imgbank_.png"
          },
          "home_team": {
            "id": "5b69b1adf5accc36e448a751",
            "name": "FC Porto",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/9_imgbank.png",
            "goals": 3
          },
          "away_team": {
            "id": "5b69b1b1f5accc36e448a765",
            "name": "Chaves",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/20_imgbank.png",
            "goals": 0
          },
          "id": "5b69b457f5accc36e448c0e7",
          "date": "2017-09-09T19:30:00.000Z",
          "_id": "5b69b457f5accc36e448c0e9"
        },
        {
          "competition_season": {
            "id": "5b69b1a8f5accc36e448a74f",
            "name": "Liga NOS 2017/18",
            "avatar": "http://www.zerozero.pt/img/logos/edicoes/70079_imgbank_.png"
          },
          "home_team": {
            "id": "5b69b1adf5accc36e448a751",
            "name": "FC Porto",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/9_imgbank.png",
            "goals": 5
          },
          "away_team": {
            "id": "5b69b1b3f5accc36e448a775",
            "name": "Portimonense",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/33_imgbank.png",
            "goals": 2
          },
          "id": "5b69b464f5accc36e448c50e",
          "date": "2017-09-22T19:30:00.000Z",
          "_id": "5b69b464f5accc36e448c510"
        },
        {
          "competition_season": {
            "id": "5b69b1a8f5accc36e448a74f",
            "name": "Liga NOS 2017/18",
            "avatar": "http://www.zerozero.pt/img/logos/edicoes/70079_imgbank_.png"
          },
          "home_team": {
            "id": "5b69b1adf5accc36e448a751",
            "name": "FC Porto",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/9_imgbank.png",
            "goals": 6
          },
          "away_team": {
            "id": "5b69b1b7f5accc36e448a791",
            "name": "Paços Ferreira",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/13_imgbank.png",
            "goals": 1
          },
          "id": "5b69b47ff5accc36e448cb49",
          "date": "2017-10-21T19:30:00.000Z",
          "_id": "5b69b47ff5accc36e448cb4b"
        },
        {
          "competition_season": {
            "id": "5b69b1a8f5accc36e448a74f",
            "name": "Liga NOS 2017/18",
            "avatar": "http://www.zerozero.pt/img/logos/edicoes/70079_imgbank_.png"
          },
          "home_team": {
            "id": "5b69b1adf5accc36e448a751",
            "name": "FC Porto",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/9_imgbank.png",
            "goals": 2
          },
          "away_team": {
            "id": "5b69b1b4f5accc36e448a77d",
            "name": "Belenenses",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/3_imgbank.png",
            "goals": 0
          },
          "id": "5b69b49bf5accc36e448d0ed",
          "date": "2017-11-04T20:30:00.000Z",
          "_id": "5b69b49cf5accc36e448d0ef"
        },
        {
          "competition_season": {
            "id": "5b69b1a8f5accc36e448a74f",
            "name": "Liga NOS 2017/18",
            "avatar": "http://www.zerozero.pt/img/logos/edicoes/70079_imgbank_.png"
          },
          "home_team": {
            "id": "5b69b1adf5accc36e448a751",
            "name": "FC Porto",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/9_imgbank.png",
            "goals": 0
          },
          "away_team": {
            "id": "5b69b1adf5accc36e448a755",
            "name": "Benfica",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/4_imgbank.png",
            "goals": 0
          },
          "id": "5b69b4abf5accc36e448d561",
          "date": "2017-12-01T20:30:00.000Z",
          "_id": "5b69b4acf5accc36e448d563"
        },
        {
          "competition_season": {
            "id": "5b69b1a8f5accc36e448a74f",
            "name": "Liga NOS 2017/18",
            "avatar": "http://www.zerozero.pt/img/logos/edicoes/70079_imgbank_.png"
          },
          "home_team": {
            "id": "5b69b1adf5accc36e448a751",
            "name": "FC Porto",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/9_imgbank.png",
            "goals": 3
          },
          "away_team": {
            "id": "5b69b1b2f5accc36e448a769",
            "name": "Marítimo",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/12_imgbank.png",
            "goals": 1
          },
          "id": "5b69b4cff5accc36e448dccd",
          "date": "2017-12-18T21:00:00.000Z",
          "_id": "5b69b4cff5accc36e448dccf"
        },
        {
          "competition_season": {
            "id": "5b69b1a8f5accc36e448a74f",
            "name": "Liga NOS 2017/18",
            "avatar": "http://www.zerozero.pt/img/logos/edicoes/70079_imgbank_.png"
          },
          "home_team": {
            "id": "5b69b1adf5accc36e448a751",
            "name": "FC Porto",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/9_imgbank.png",
            "goals": 4
          },
          "away_team": {
            "id": "5b69b1b3f5accc36e448a771",
            "name": "V. Guimarães",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/18_imgbank.png",
            "goals": 2
          },
          "id": "5b69b4e4f5accc36e448e0f5",
          "date": "2018-01-07T20:15:00.000Z",
          "_id": "5b69b4e4f5accc36e448e0f7"
        },
        {
          "competition_season": {
            "id": "5b69b1a8f5accc36e448a74f",
            "name": "Liga NOS 2017/18",
            "avatar": "http://www.zerozero.pt/img/logos/edicoes/70079_imgbank_.png"
          },
          "home_team": {
            "id": "5b69b1adf5accc36e448a751",
            "name": "FC Porto",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/9_imgbank.png",
            "goals": 1
          },
          "away_team": {
            "id": "5b69b1b4f5accc36e448a779",
            "name": "Tondela",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/4336_imgbank.png",
            "goals": 0
          },
          "id": "5b69b4f3f5accc36e448e51d",
          "date": "2018-01-19T21:00:00.000Z",
          "_id": "5b69b4f3f5accc36e448e51f"
        },
        {
          "competition_season": {
            "id": "5b69b1a8f5accc36e448a74f",
            "name": "Liga NOS 2017/18",
            "avatar": "http://www.zerozero.pt/img/logos/edicoes/70079_imgbank_.png"
          },
          "home_team": {
            "id": "5b69b1adf5accc36e448a751",
            "name": "FC Porto",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/9_imgbank.png",
            "goals": 3
          },
          "away_team": {
            "id": "5b69b1b0f5accc36e448a75d",
            "name": "Braga",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/15_imgbank.png",
            "goals": 1
          },
          "id": "5b69b509f5accc36e448ea73",
          "date": "2018-02-03T20:30:00.000Z",
          "_id": "5b69b509f5accc36e448ea75"
        },
        {
          "competition_season": {
            "id": "5b69b1a8f5accc36e448a74f",
            "name": "Liga NOS 2017/18",
            "avatar": "http://www.zerozero.pt/img/logos/edicoes/70079_imgbank_.png"
          },
          "home_team": {
            "id": "5b69b1adf5accc36e448a751",
            "name": "FC Porto",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/9_imgbank.png",
            "goals": 5
          },
          "away_team": {
            "id": "5b69b1b1f5accc36e448a761",
            "name": "Rio Ave",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/31_imgbank.png",
            "goals": 0
          },
          "id": "5b69b525f5accc36e448f147",
          "date": "2018-02-18T18:00:00.000Z",
          "_id": "5b69b525f5accc36e448f149"
        },
        {
          "competition_season": {
            "id": "5b69b1a8f5accc36e448a74f",
            "name": "Liga NOS 2017/18",
            "avatar": "http://www.zerozero.pt/img/logos/edicoes/70079_imgbank_.png"
          },
          "home_team": {
            "id": "5b69b1adf5accc36e448a751",
            "name": "FC Porto",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/9_imgbank.png",
            "goals": 2
          },
          "away_team": {
            "id": "5b69b1b0f5accc36e448a759",
            "name": "Sporting",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/16_imgbank.png",
            "goals": 1
          },
          "id": "5b69b537f5accc36e448f531",
          "date": "2018-03-02T20:30:00.000Z",
          "_id": "5b69b538f5accc36e448f533"
        },
        {
          "competition_season": {
            "id": "5b69b1a8f5accc36e448a74f",
            "name": "Liga NOS 2017/18",
            "avatar": "http://www.zerozero.pt/img/logos/edicoes/70079_imgbank_.png"
          },
          "home_team": {
            "id": "5b69b1adf5accc36e448a751",
            "name": "FC Porto",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/9_imgbank.png",
            "goals": 2
          },
          "away_team": {
            "id": "5b69b1b2f5accc36e448a76d",
            "name": "Boavista",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/5_imgbank.png",
            "goals": 0
          },
          "id": "5b69b558f5accc36e448fbb7",
          "date": "2018-03-17T20:30:00.000Z",
          "_id": "5b69b558f5accc36e448fbb9"
        },
        {
          "competition_season": {
            "id": "5b69b1a8f5accc36e448a74f",
            "name": "Liga NOS 2017/18",
            "avatar": "http://www.zerozero.pt/img/logos/edicoes/70079_imgbank_.png"
          },
          "home_team": {
            "id": "5b69b1adf5accc36e448a751",
            "name": "FC Porto",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/9_imgbank.png",
            "goals": 3
          },
          "away_team": {
            "id": "5b69b1b5f5accc36e448a781",
            "name": "Desp. Aves",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/7_imgbank.png",
            "goals": 0
          },
          "id": "5b69b576f5accc36e44901a3",
          "date": "2018-04-08T17:00:00.000Z",
          "_id": "5b69b576f5accc36e44901a5"
        },
        {
          "competition_season": {
            "id": "5b69b1a8f5accc36e448a74f",
            "name": "Liga NOS 2017/18",
            "avatar": "http://www.zerozero.pt/img/logos/edicoes/70079_imgbank_.png"
          },
          "home_team": {
            "id": "5b69b1adf5accc36e448a751",
            "name": "FC Porto",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/9_imgbank.png",
            "goals": 5
          },
          "away_team": {
            "id": "5b69b1b5f5accc36e448a785",
            "name": "V. Setúbal",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/35_imgbank.png",
            "goals": 1
          },
          "id": "5b69b598f5accc36e4490793",
          "date": "2018-04-23T19:00:00.000Z",
          "_id": "5b69b598f5accc36e4490795"
        },
        {
          "competition_season": {
            "id": "5b69b1a8f5accc36e448a74f",
            "name": "Liga NOS 2017/18",
            "avatar": "http://www.zerozero.pt/img/logos/edicoes/70079_imgbank_.png"
          },
          "home_team": {
            "id": "5b69b1adf5accc36e448a751",
            "name": "FC Porto",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/9_imgbank.png",
            "goals": 2
          },
          "away_team": {
            "id": "5b69b1b6f5accc36e448a78d",
            "name": "Feirense",
            "avatar": "https://www.zerozero.pt/img/logos/equipas/1728_imgbank.png",
            "goals": 1
          },
          "id": "5b69b5aef5accc36e4490c9f",
          "date": "2018-05-06T19:15:00.000Z",
          "_id": "5b69b5aef5accc36e4490ca1"
        }
      ],
      "players": [
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Guarda Redes"
          ],
          "id": "5b69b1b8f5accc36e448a799",
          "user_info_id": "5b69b1b8f5accc36e448a798",
          "name": "Iker Casillas Fernández",
          "number": "1",
          "avatar": "https://www.zerozero.pt/img/jogadores/03/1003_20180803164212_iker_casillas.png",
          "nationality": "Espanha",
          "_id": "5b69b1b8f5accc36e448a79a"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Guarda Redes"
          ],
          "id": "5b69b1b9f5accc36e448a79e",
          "user_info_id": "5b69b1b9f5accc36e448a79d",
          "name": "José Pedro Malheiro de Sá",
          "number": "12",
          "avatar": "https://www.zerozero.pt/img/jogadores/60/164860_20180803164215_jose_sa.png",
          "nationality": "Portugal",
          "_id": "5b69b1b9f5accc36e448a79f"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Guarda Redes"
          ],
          "id": "5b69b1b9f5accc36e448a7a3",
          "user_info_id": "5b69b1b9f5accc36e448a7a2",
          "name": "João Paulo Santos da Costa",
          "number": "24",
          "avatar": "https://www.zerozero.pt/img/jogadores/94/160894_20180526125001_joao_costa.jpg",
          "nationality": "Portugal",
          "_id": "5b69b1b9f5accc36e448a7a4"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Guarda Redes"
          ],
          "id": "5b69b1baf5accc36e448a7a8",
          "user_info_id": "5b69b1baf5accc36e448a7a7",
          "name": "Vanailson Luciano de Souza Alves",
          "number": "26",
          "avatar": "https://www.zerozero.pt/img/jogadores/28/241528_20180803164216_vana_alves.png",
          "nationality": "Brasil",
          "_id": "5b69b1baf5accc36e448a7a9"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Guarda Redes"
          ],
          "id": "5b69b1baf5accc36e448a7ad",
          "user_info_id": "5b69b1baf5accc36e448a7ac",
          "name": "Fabiano Ribeiro de Freitas",
          "number": "40",
          "avatar": "https://www.zerozero.pt/img/jogadores/51/39151_20180803164218_fabiano.png",
          "nationality": "Brasil",
          "_id": "5b69b1baf5accc36e448a7ae"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Defesa (Defesa Esquerdo)"
          ],
          "id": "5b69b1bbf5accc36e448a7b2",
          "user_info_id": "5b69b1bbf5accc36e448a7b1",
          "name": "Luís Rafael Soares Alves",
          "number": "-",
          "avatar": "https://www.zerozero.pt/img/jogadores/18/105518_20180731180922_rafa_soares.png",
          "nationality": "Portugal",
          "_id": "5b69b1bbf5accc36e448a7b3"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Defesa (Defesa Direito)"
          ],
          "id": "5b69b1bbf5accc36e448a7b7",
          "user_info_id": "5b69b1bbf5accc36e448a7b6",
          "name": "Victorio Maximiliano Pereira Páez",
          "number": "2",
          "avatar": "https://www.zerozero.pt/img/jogadores/64/34664_20180803164414_maxi_pereira.png",
          "nationality": "Uruguai",
          "_id": "5b69b1bbf5accc36e448a7b8"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Defesa (Defesa Central)"
          ],
          "id": "5b69b1bcf5accc36e448a7bc",
          "user_info_id": "5b69b1bcf5accc36e448a7bb",
          "name": "Yordán Hernando Osorio Paredes",
          "number": "4",
          "avatar": "https://www.zerozero.pt/img/jogadores/35/404035_20180731182037_yordan_osorio.png",
          "nationality": "Venezuela",
          "_id": "5b69b1bcf5accc36e448a7bd"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Defesa (Defesa Central)"
          ],
          "id": "5b69b1bcf5accc36e448a7c1",
          "user_info_id": "5b69b1bcf5accc36e448a7c0",
          "name": "Iván Marcano Sierra",
          "number": "5",
          "avatar": "https://www.zerozero.pt/img/jogadores/73/36773_20180613195208_ivan_marcano.jpg",
          "nationality": "Espanha",
          "_id": "5b69b1bdf5accc36e448a7c2"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Defesa (Defesa Esquerdo)"
          ],
          "id": "5b69b1bdf5accc36e448a7c6",
          "user_info_id": "5b69b1bdf5accc36e448a7c5",
          "name": "Alex Nicolao Telles",
          "number": "13",
          "avatar": "https://www.zerozero.pt/img/jogadores/39/176439_20180803164419_alex_telles.png",
          "nationality": "Brasil",
          "_id": "5b69b1bdf5accc36e448a7c7"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Defesa (Defesa Direito)",
            "Defesa (Defesa Esquerdo)"
          ],
          "id": "5b69b1bef5accc36e448a7cb",
          "user_info_id": "5b69b1bef5accc36e448a7ca",
          "name": "Miguel Arturo Layún Prado",
          "number": "19",
          "avatar": "https://www.zerozero.pt/img/jogadores/51/106851_20180614125648_miguel_layun.jpg",
          "nationality": "México",
          "_id": "5b69b1bef5accc36e448a7cc"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Defesa (Defesa Direito)",
            "Avançado (Extremo Direito)"
          ],
          "id": "5b69b1bef5accc36e448a7d0",
          "user_info_id": "5b69b1bef5accc36e448a7cf",
          "name": "Ricardo Domingos Barbosa Pereira",
          "number": "21",
          "avatar": "https://www.zerozero.pt/img/jogadores/79/56579_20180613112949_ricardo_pereira.jpg",
          "nationality": "Portugal",
          "_id": "5b69b1bef5accc36e448a7d1"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Defesa (Defesa Central)",
            "Médio (Médio Defensivo)"
          ],
          "id": "5b69b1bff5accc36e448a7d5",
          "user_info_id": "5b69b1bff5accc36e448a7d4",
          "name": "Diego Antonio Reyes Rosales",
          "number": "23",
          "avatar": "https://www.zerozero.pt/img/jogadores/17/163617_20180613195452_diego_reyes.png",
          "nationality": "México",
          "_id": "5b69b1bff5accc36e448a7d6"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Defesa (Defesa Central)"
          ],
          "id": "5b69b1bff5accc36e448a7da",
          "user_info_id": "5b69b1bff5accc36e448a7d9",
          "name": "Felipe Augusto de Almeida Monteiro ",
          "number": "28",
          "avatar": "https://www.zerozero.pt/img/jogadores/45/176145_20180803164427_felipe.png",
          "nationality": "Brasil",
          "_id": "5b69b1bff5accc36e448a7db"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Defesa (Defesa Direito)",
            "Defesa (Defesa Esquerdo)"
          ],
          "id": "5b69b1c0f5accc36e448a7df",
          "user_info_id": "5b69b1c0f5accc36e448a7de",
          "name": "José Diogo Dalot Teixeira",
          "number": "30",
          "avatar": "https://www.zerozero.pt/img/jogadores/16/284416_20180606144230_diogo_dalot.jpg",
          "nationality": "Portugal",
          "_id": "5b69b1c0f5accc36e448a7e0"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Defesa (Defesa Central)"
          ],
          "id": "5b69b1c0f5accc36e448a7e4",
          "user_info_id": "5b69b1c0f5accc36e448a7e3",
          "name": "Jorge Filipe Oliveira Fernandes",
          "number": "44",
          "avatar": "https://www.zerozero.pt/img/jogadores/41/216241_20180622172526_jorge_fernandes.jpg",
          "nationality": "Portugal",
          "_id": "5b69b1c0f5accc36e448a7e5"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Defesa (Defesa Esquerdo)",
            "Médio (Extremo Esquerdo)"
          ],
          "id": "5b69b1c1f5accc36e448a7e9",
          "user_info_id": "5b69b1c1f5accc36e448a7e8",
          "name": "Luís Carlos Machado Mata",
          "number": "55",
          "avatar": "https://www.zerozero.pt/img/jogadores/33/216233_20180519110525_luis_mata.jpg",
          "nationality": "Portugal",
          "_id": "5b69b1c1f5accc36e448a7ea"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Médio (Médio Ofensivo)",
            "Avançado (Extremo Direito)"
          ],
          "id": "5b69b1c2f5accc36e448a7ee",
          "user_info_id": "5b69b1c2f5accc36e448a7ed",
          "name": "Paulo Henrique Soares dos Santos",
          "number": "6",
          "avatar": "https://www.zerozero.pt/img/jogadores/39/240739_20180608202049_paulinho.png",
          "nationality": "Brasil",
          "_id": "5b69b1c2f5accc36e448a7ef"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Médio (Médio Ofensivo)"
          ],
          "id": "5b69b1c3f5accc36e448a7f3",
          "user_info_id": "5b69b1c3f5accc36e448a7f2",
          "name": "Óliver Torres Muñoz",
          "number": "10",
          "avatar": "https://www.zerozero.pt/img/jogadores/81/260081_20180803164624_oliver_torres.png",
          "nationality": "Espanha",
          "_id": "5b69b1c3f5accc36e448a7f4"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Médio (Médio Centro)"
          ],
          "id": "5b69b1c4f5accc36e448a7f8",
          "user_info_id": "5b69b1c4f5accc36e448a7f7",
          "name": "Héctor Miguel Herrera López ",
          "number": "16",
          "avatar": "https://www.zerozero.pt/img/jogadores/35/211935_20180803164626_hector_herrera.png",
          "nationality": "México",
          "_id": "5b69b1c4f5accc36e448a7f9"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Médio (Médio Centro)"
          ],
          "id": "5b69b1cbf5accc36e448a7fd",
          "user_info_id": "5b69b1cbf5accc36e448a7fc",
          "name": "André Filipe Brás André",
          "number": "20",
          "avatar": "https://www.zerozero.pt/img/jogadores/73/31173_20180731183335_andre_andre.png",
          "nationality": "Portugal",
          "_id": "5b69b1cbf5accc36e448a7fe"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Médio (Médio Defensivo)"
          ],
          "id": "5b69b1cbf5accc36e448a802",
          "user_info_id": "5b69b1cbf5accc36e448a801",
          "name": "Danilo Luís Hélio Pereira",
          "number": "22",
          "avatar": "https://www.zerozero.pt/img/jogadores/22/74722_20180803164627_danilo_pereira.png",
          "nationality": "Portugal",
          "_id": "5b69b1cbf5accc36e448a803"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Médio (Médio Ofensivo)",
            "Avançado (Extremo Direito)"
          ],
          "id": "5b69b1ccf5accc36e448a807",
          "user_info_id": "5b69b1ccf5accc36e448a806",
          "name": "Otávio Edmilson da Silva Monteiro",
          "number": "25",
          "avatar": "https://www.zerozero.pt/img/jogadores/60/276060_20180803164629_otavio.png",
          "nationality": "Brasil",
          "_id": "5b69b1ccf5accc36e448a808"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Médio (Médio Defensivo)"
          ],
          "id": "5b69b1ccf5accc36e448a80c",
          "user_info_id": "5b69b1ccf5accc36e448a80b",
          "name": "Sérgio Miguel Relvas de Oliveira",
          "number": "27",
          "avatar": "https://www.zerozero.pt/img/jogadores/43/74743_20180803164631_sergio_oliveira.png",
          "nationality": "Portugal",
          "_id": "5b69b1ccf5accc36e448a80d"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Médio (Médio Defensivo)"
          ],
          "id": "5b69b1cdf5accc36e448a811",
          "user_info_id": "5b69b1cdf5accc36e448a810",
          "name": "Luiz Gustavo Novaes Palhares",
          "number": "50",
          "avatar": "https://www.zerozero.pt/img/jogadores/66/547866_20180519110715_luizao.jpg",
          "nationality": "Brasil",
          "_id": "5b69b1cdf5accc36e448a812"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Médio (Médio Defensivo)",
            "Defesa (Defesa Esquerdo)"
          ],
          "id": "5b69b1cdf5accc36e448a816",
          "user_info_id": "5b69b1cdf5accc36e448a815",
          "name": "Rui Filipe Araújo Moreira",
          "number": "60",
          "avatar": "https://www.zerozero.pt/img/jogadores/62/96062_20180519110802_rui_moreira.jpg",
          "nationality": "Portugal",
          "_id": "5b69b1cdf5accc36e448a817"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Médio (Médio Ofensivo)",
            "Avançado (Extremo Esquerdo)"
          ],
          "id": "5b69b1cef5accc36e448a81b",
          "user_info_id": "5b69b1cdf5accc36e448a81a",
          "name": "Federico Nicolás Varela",
          "number": "68",
          "avatar": "https://www.zerozero.pt/img/jogadores/67/446667_20180730135436_fede_varela.jpg",
          "nationality": "Argentina",
          "_id": "5b69b1cef5accc36e448a81c"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Avançado (Extremo Direito)",
            "Avançado (Extremo Esquerdo)"
          ],
          "id": "5b69b1cef5accc36e448a820",
          "user_info_id": "5b69b1cef5accc36e448a81f",
          "name": "Hernâni Jorge Santos Fortes",
          "number": "7",
          "avatar": "https://www.zerozero.pt/img/jogadores/04/159904_20180803164856_hernani.png",
          "nationality": "Portugal",
          "_id": "5b69b1cef5accc36e448a821"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Avançado (Extremo Esquerdo)",
            "Médio (Médio Ofensivo)"
          ],
          "id": "5b69b1cff5accc36e448a825",
          "user_info_id": "5b69b1cff5accc36e448a824",
          "name": "Yacine Nasr Eddine Brahimi",
          "number": "8",
          "avatar": "https://www.zerozero.pt/img/jogadores/07/64507_20180803164856_yacine_brahimi.png",
          "nationality": "Argélia",
          "_id": "5b69b1cff5accc36e448a826"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Avançado (Ponta de Lança)"
          ],
          "id": "5b69b1d0f5accc36e448a82a",
          "user_info_id": "5b69b1cff5accc36e448a829",
          "name": "Vincent Aboubakar",
          "number": "9",
          "avatar": "https://www.zerozero.pt/img/jogadores/45/141345_20180803164856_vincent_aboubakar.png",
          "nationality": "Camarões",
          "_id": "5b69b1d0f5accc36e448a82b"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Avançado (Ponta de Lança)",
            "Avançado (Extremo Direito)"
          ],
          "id": "5b69b1d0f5accc36e448a82f",
          "user_info_id": "5b69b1d0f5accc36e448a82e",
          "name": "Moussa Marega",
          "number": "11",
          "avatar": "https://www.zerozero.pt/img/jogadores/01/280401_20180803164859_moussa_marega.png",
          "nationality": "Mali",
          "_id": "5b69b1d0f5accc36e448a830"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Avançado (Ponta de Lança)"
          ],
          "id": "5b69b1d1f5accc36e448a834",
          "user_info_id": "5b69b1d1f5accc36e448a833",
          "name": "Gonçalo Mendes Paciência",
          "number": "14",
          "avatar": "https://www.zerozero.pt/img/jogadores/94/74894_20180712133107_goncalo_paciencia.png",
          "nationality": "Portugal",
          "_id": "5b69b1d1f5accc36e448a835"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Avançado (Extremo Direito)",
            "Avançado (Extremo Esquerdo)"
          ],
          "id": "5b69b1d1f5accc36e448a839",
          "user_info_id": "5b69b1d1f5accc36e448a838",
          "name": "Jesús Manuel Corona Ruíz",
          "number": "17",
          "avatar": "https://www.zerozero.pt/img/jogadores/94/155294_20180803164904_jesus_corona.png",
          "nationality": "México",
          "_id": "5b69b1d2f5accc36e448a83a"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Avançado",
            "Avançado (Extremo Esquerdo)"
          ],
          "id": "5b69b1d2f5accc36e448a83e",
          "user_info_id": "5b69b1d2f5accc36e448a83d",
          "name": "Abdul Majeed Waris",
          "number": "18",
          "avatar": "https://www.zerozero.pt/img/jogadores/97/134497_20180608202118_majeed_waris.png",
          "nationality": "Gana",
          "_id": "5b69b1d2f5accc36e448a83f"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Avançado (Ponta de Lança)"
          ],
          "id": "5b69b1d2f5accc36e448a843",
          "user_info_id": "5b69b1d2f5accc36e448a842",
          "name": "Francisco das Chagas Soares dos Santos",
          "number": "29",
          "avatar": "https://www.zerozero.pt/img/jogadores/70/137670_20180803164909_soares.png",
          "nationality": "Brasil",
          "_id": "5b69b1d2f5accc36e448a844"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Avançado (Ponta de Lança)"
          ],
          "id": "5b69b1d3f5accc36e448a848",
          "user_info_id": "5b69b1d3f5accc36e448a847",
          "name": "Rui Pedro da Silva e Sousa",
          "number": "33",
          "avatar": "https://www.zerozero.pt/img/jogadores/35/284035_20180603014314_rui_pedro.jpg",
          "nationality": "Portugal",
          "_id": "5b69b1d3f5accc36e448a849"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Médio (Médio Centro)",
            "Avançado (Extremo Direito)"
          ],
          "id": "5b69b1d3f5accc36e448a84d",
          "user_info_id": "5b69b1d3f5accc36e448a84c",
          "name": "Bruno Xavier Almeida Costa",
          "number": "87",
          "avatar": "https://www.zerozero.pt/img/jogadores/11/284011_20180803164623_bruno_costa.png",
          "nationality": "Portugal",
          "_id": "5b69b1d4f5accc36e448a84e"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Avançado (Extremo Esquerdo)",
            "Avançado (Extremo Direito)"
          ],
          "id": "5b69b1d4f5accc36e448a852",
          "user_info_id": "5b69b1d4f5accc36e448a851",
          "name": "Wenderson Rodrigues do Nascimento Galeno",
          "number": "90",
          "avatar": "https://www.zerozero.pt/img/jogadores/90/505790_20180725200454_wenderson_galeno.jpg",
          "nationality": "Brasil",
          "_id": "5b69b1d4f5accc36e448a853"
        },
        {
          "age": 23,
          "date_of_birth": "",
          "positions": [
            "Avançado (Ponta de Lança)"
          ],
          "id": "5b69b1d5f5accc36e448a857",
          "user_info_id": "5b69b1d5f5accc36e448a856",
          "name": "André Filipe Ferreira Coelho Pereira",
          "number": "95",
          "avatar": "https://www.zerozero.pt/img/jogadores/15/217215_20180803164908_andre_pereira.png",
          "nationality": "Portugal",
          "_id": "5b69b1d5f5accc36e448a858"
        }
      ],
      "staff": [
        {
          "age": 23,
          "date_of_birth": "",
          id: '5',
          user_info_id: '5',
          name: 'José Mourinho',
          avatar: 'https://cdn.images.dailystar.co.uk/dynamic/58/photos/763000/620x/Jose-Mourinho-644644.jpg',
          position: 'Treinador principal',
          nationality: 'Portugal',
        },
        {
          "age": 23,
          "date_of_birth": "",
          id: '6',
          user_info_id: '6',
          name: 'Jorge Jesus',
          avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
          position: 'Treinador adjunto',
          nationality: 'Portugal',
        },
        {
          "age": 23,
          "date_of_birth": "",
          id: '4',
          user_info_id: '4',
          name: 'Vital de Carvalho',
          avatar: 'https://openminds.swissre.com/static//images/profile-default.png',
          position: 'Treinador adjunto',
          nationality: 'Portugal',
        },
        {
          "age": 23,
          "date_of_birth": "",
          id: '3',
          user_info_id: '3',
          name: 'Nuno Carmo',
          avatar: 'https://scontent.fopo3-1.fna.fbcdn.net/v/t31.0-8/15541052_10212069863200855_2889012374229061166_o.jpg?_nc_cat=0&oh=5b128be1ebf4151ec5aa2afb671b72d0&oe=5B8C9375',
          position: 'Preparador físico',
          nationality: 'Portugal',
        },
      ],
      "media": [
        {
          title: 'Arnaldo Tema marca Hat-trick em jogo decisivo',
          author: 'A Bola.',
          date: '08-05-2018',
          image: 'https://static.noticiasaominuto.com/stockimages/1920/naom_5ac4042fdc0c4.jpg?1522795787',
          ref: '//www.youtube.com/embed/8Z0sbekoQL4',
          views: 53,
          shares: 8,
          likes: 20,
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices, lectus non maximus varius, nibh orci rutrum velit, rhoncus vehicula sapien quam efficitur orci',
          references: {
            leagues: [
              {
                name: 'Liga Portugal',
                id: '2',
              }
            ],
            team: [{
              name: 'Seixal FC',
              id: '1'
            }],
            player: [{
              name: 'Arnaldo Tema',
              id: '1'
            }],
          }
        },
        {
          title: 'Arnaldo faz 25 anos!',
          author: 'A Bola.',
          date: '27-08-2018',
          image: 'https://static.noticiasaominuto.com/stockimages/1920/naom_5ac4042fdc0c4.jpg?1522795787',
          ref: '//www.youtube.com/embed/8Z0sbekoQL4',
          views: 1200,
          shares: 12,
          likes: 0,
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices, lectus non maximus varius, nibh orci rutrum velit, rhoncus vehicula sapien quam efficitur orci.',
          references: {
            leagues: [
              {
                name: 'Liga Portugal',
                id: '1',
              }
            ],
            team: [{
              name: 'Seixal FC',
              id: '1'
            }],
            player: [{
              name: 'Arnaldo Tema',
              id: '1'
            }],
          }
        },
        {
          title: 'Melhores momentos',
          author: 'A Bola.',
          date: '08-09-2018',
          image: 'https://static.noticiasaominuto.com/stockimages/1920/naom_5ac4042fdc0c4.jpg?1522795787',
          ref: '//www.youtube.com/embed/8Z0sbekoQL4',
          views: 93,
          shares: 45,
          likes: 90,
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices, lectus non maximus varius, nibh orci rutrum velit, rhoncus vehicula sapien quam efficitur orci',
          references: {
            leagues: [
              {
                name: 'Liga Portugal',
                id: '1',
              }
            ],
            team: [{
              name: 'Seixal FC',
              id: '1'
            }],
            player: [{
              name: 'Arnaldo Tema',
              id: '1'
            }],
          }
        },
        {
          title: '15 Golos em 10 jogos.',
          author: 'A Bola.',
          date: '03-11-2018',
          image: 'https://static.noticiasaominuto.com/stockimages/1920/naom_5ac4042fdc0c4.jpg?1522795787',
          ref: '//www.youtube.com/embed/8Z0sbekoQL4',
          views: 200,
          shares: 12,
          likes: 20,
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices, lectus non maximus varius, nibh orci rutrum velit, rhoncus vehicula sapien quam efficitur orci',
          references: {
            leagues: [
              {
                name: 'Liga Portugal',
                id: '1',
              }
            ],
            team: [{
              name: 'Seixal FC',
              id: '1'
            }],
            player: [{
              name: 'Arnaldo Tema',
              id: '1'
            }],
          }
        },
        {
          title: 'Campeão da Supermacia',
          author: 'A Bola.',
          date: '08-02-2018',
          image: 'https://static.noticiasaominuto.com/stockimages/1920/naom_5ac4042fdc0c4.jpg?1522795787',
          ref: '//www.youtube.com/embed/8Z0sbekoQL4',
          views: 2,
          shares: 0,
          likes: 0,
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices, lectus non maximus varius, nibh orci rutrum velit, rhoncus vehicula sapien quam efficitur orci',
          references: {
            leagues: [
              {
                name: 'Liga Portugal',
                id: '1',
              }
            ],
            team: [{
              name: 'Seixal FC',
              id: '1'
            }],
            player: [{
              name: 'Arnaldo Tema',
              id: '1'
            }],
          }
        },
        {
          title: 'Diogo falha final da Taça de Portugal',
          author: 'A Bola.',
          date: '28-05-2018',
          image: 'https://static.noticiasaominuto.com/stockimages/1920/naom_5ac4042fdc0c4.jpg?1522795787',
          ref: '//www.youtube.com/embed/8Z0sbekoQL4',
          views: 40,
          shares: 40,
          likes: 13,
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices, lectus non maximus varius, nibh orci rutrum velit, rhoncus vehicula sapien quam efficitur orci',
          references: {
            leagues: [
              {
                name: 'Liga Portugal',
                id: '1',
              }
            ],
            team: [{
              name: 'Seixal FC',
              id: '1'
            }],
            player: [{
              name: 'Arnaldo Tema',
              id: '1'
            }],
          }
        },

      ],
      "_id": "5b69b1adf5accc36e448a751",
      "season_id": "5b69b1a8f5accc36e448a74e",
      "avatar": "https://www.zerozero.pt/img/logos/equipas/9_imgbank.png",
      "name": "FC Porto",
      "team_id": "5b69b1adf5accc36e448a750"
    }
  }];
  mockSearchTeams: SearchEntityViewmodel[] = [
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
  requestOptions;

  constructor(private authenticationService: AuthenticationService, private http: HttpClient) {
    this.requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'jwt': authenticationService.token
      })
    };
  }

  getPlayers(id: string) : Observable<any> {
    return this.http.get<any[]>('api/teams/' + id + '/players/', this.requestOptions)
      .pipe(
        tap(data => {
          console.log('GET Players By Team Id', data);
        }),
        catchError(this.handleError)
      );
  }

  getTeam(id: string): Observable<TeamViewModel> {

    if (!id || id == "-1") {
      return of(this.mockTeams[0]);
    }

    else {
      return this.http.get<TeamViewModel>('/api/teams/' + id, this.requestOptions)
        .pipe(
          tap(data => {
            console.log('GET Team', data);
          }),

          catchError(this.handleError)
        );
    }
  };

  createRecommendation(id: string, recommendation: Recommendation): Observable<Recommendation> {
    this.mockTeams[id].recommendations.top_5.push(recommendation);
    return of(recommendation);
  };

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

  getTeamsByLeague(id: string) {
    return this.http.get<any>('/api/competitions/' + id + '/teams', this.requestOptions)
      .pipe(
        tap(data => {
          console.log('GET Teams By League ID', data);
        }),
        catchError(this.handleError)
      );
  }
}
