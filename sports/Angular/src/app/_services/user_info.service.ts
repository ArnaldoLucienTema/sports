import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {AuthenticationService} from './authentication.service';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {catchError, retry, tap, map} from 'rxjs/operators';
import {UserInfoViewModel} from '../_models/user_info_viewmodel';
import {Recommendation} from '../_models/recommendation';
import {TeamPlayer} from "../_models/team_player";
import {UserInfoSeason} from "../_models/user_info_season";

@Injectable()
export class UserInfoService {

  mockUserInfo: any = {
      _id: '1',
      user_id: '1',
      followers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      following: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      current_season: {
        user_info_id: '1',
        season_id: '1',
        name: '17/18',
        avatar: '',
        personal_info: {
          name: 'Arnaldo Tema',
          age: 25,
          number: '12',
          avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
          full_name: 'Diogo César Pontes Pires',
          positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
          height: 165,
          weight: 90,
          date_of_birth: '1993-05-20T00:00:00.000Z',
          foot: 'Direito',
          nationality: 'Portugal',
          residence: 'Lisboa',
          updated_at: '8-05-2018'
        },
        team: {
          id: '1',
          team_id: '1',
          acronym: 'SFC',
          avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
          name: 'Seixal FC'
        },
        stats: [
          {
            id: '1',
            competition_id: '1',
            name: 'Liga Portugal 2017/18',
            avatar: '/assets/Liga_Portugal_logo.png',
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
            id: '2',
            competition_id: '2',
            name: 'Taça de Portugal 2016/17',
            avatar: '/assets/Tacadaligalogo.png',
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
            id: '3',
            competition_id: '3',
            name: 'Super Taça 2017/18',
            avatar: '/assets/9_imgbank_tp.png',
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
        matches: [
          {
            id: '1',
            date: '27-08-2013',
            competition_season: {
              id: '1',
              competition_id: '1',
              name: 'Ledman LigaPro 2017/2018',
              avatar: 'http://www.zerozero.pt/img/logos/edicoes/87509_imgbank_.png'
            },
            home_team: {
              id: '1',
              team_id: '1',
              name: 'C. Piedade',
              avatar: 'http://www.zerozero.pt/img/logos/equipas/6505_imgbank.png',
              goals: 3
            },
            away_team: {
              id: '1',
              team_id: '1',
              name: 'U. Madeira',
              avatar: 'http://www.zerozero.pt/img/logos/equipas/22_imgbank.png',
              goals: 1
            }
          }
        ],
        media: [
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
          }
        ]
      },
      previous_seasons: undefined,
      skill_set: [
        {
          name: 'Goleador',
          avatar: '/assets/scorer.png',
          endorsements: ['33', '2', '2', '2', '2', '2', '2'],
        },
        {
          name: 'Drible',
          avatar: '/assets/dribble.png',
          endorsements: ['33', '1', '2', '3', '4', '5', '3', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
        },
        {
          name: 'Rapidez',
          avatar: '/assets/fast.png',
          endorsements: ['33', '2', '2', '2', '2', '2', '2'],
        },
        {
          name: 'Passe',
          avatar: '/assets/passer.png',
          endorsements: ['33', '2', '2', '2', '2', '2', '2'],
        },
        {
          name: 'Força',
          avatar: '/assets/strong.png',
          endorsements: ['33', '1', '2', '3', '4', '5', '3', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
        }
      ],
      recommendations: {
        list: [1, 2, 3],
        top_5: [
          {
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
              relationship: 'Treinador',
              id: '4',
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
      achievements: [
        {
          id: '1',
          name: '5 jogos consecutivos a marcar golo.',
          avatar: '/assets/default_badge.png'
        },
        {
          id: '1',
          name: '3 hat-tricks numa época.',
          avatar: '/assets/default_badge.png'
        },
        {
          id: '1',
          name: '10 Assistências em 10 jogos.',
          avatar: '/assets/default_badge.png'
        }
      ],
      created_at: '8-05-2018',
      updated_at: '9-05-2018'
    };
  mockTeamPlayer: TeamPlayer = {
    _id: '-1',
    age: 15,
    created_at: '',
    updated_at: '',
    user_info_id: '-1',
    name: 'Raul Fonseca',
    date_of_birth: '2003-05-20T00:00:00.000Z',
    avatar: 'https://3.bp.blogspot.com/-kQx3Kcg4wNI/Wv22ovgGofI/AAAAAAAAMtQ/4BUXZPOVo0coGETrtwwLhurNSslJlCYTwCLcBGAs/s1600/1%2BA%2Bmelhor%2B001.jpeg',
    positions: ['Avançado'],
    height: 165,
    weight: 55,
    foot: 'Direito',
    nationality: 'Portugal',
    residence: 'Montijo',
    contacts: ['910001123', 'jogador@gmail.com'],
    media: [
      {
        title: 'Raul faz 15 anos!',
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
      }
    ],
    evaluations: {
      simple: [{
        technical: '4',
        tactical: '4',
        physical: '2',
        mental: '4',
        date: '2018-05-20T00:00:00.000Z',
        match: 'SLB v FCP',
      }],
      advanced: [{
        technical: [
          {
            attribute: 'passe',
            value: '3'
          },
          {
            attribute: 'drible',
            value: '3'
          },
          {
            attribute: 'remate',
            value: '3'
          }],
        tactical: [
          {
            attribute: 'posicionamento',
            value: '3'
          }],
        physical: [
          {
            attribute: 'velocidade',
            value: ''
          },
          {
            attribute: 'força',
            value: ''
          }],
        mental: [
          {
            attribute: 'liderança',
            value: '4'
          }],
        date: '2018-05-20T00:00:00.000Z',
        match: 'SLB v FCP',
      }]
    }
  };
  requestOptions;
  requestOptionsMultipart;
  testing = false;

  constructor(private authenticationService: AuthenticationService, private http: HttpClient) {
    this.requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'jwt': authenticationService.token
      })
    };
    this.requestOptionsMultipart = {
      headers: new HttpHeaders({
        'jwt': authenticationService.token
      })
    };
  }

  getUserInfo(id: string): Observable<UserInfoViewModel> {

    console.log(this.authenticationService.getSessionUser());
    if (this.testing || id == '-1') {
      return of(this.mockUserInfo[0]);
    }
    else {
      return this.http.get<UserInfoViewModel>('/api/players/' + id, this.requestOptions)
        .pipe(
          tap(data => {
            console.log('GET User info', data);
          }),
          catchError(this.handleError)
        );
    }
  };

  getTeamPlayer(team_id: string, id: string): Observable<TeamPlayer> {
    if (this.testing || id == '-1')
      return of(this.mockTeamPlayer);

    return this.http.get<TeamPlayer>('api/teams/' + team_id + '/player/' + id, this.requestOptions)
      .pipe(
        tap(data => {
          console.log('GET Team Info', data);
        }),
        catchError(this.handleError)
      );
  };

  createRecommendation(recommendation: Recommendation, user_info_id:string): Observable<Recommendation> {
    if (this.testing) {
      this.mockUserInfo.recommendations.top_5.push(recommendation);
      return of(recommendation);
    }

    return this.http.post<TeamPlayer>('api/players/' + user_info_id+ '/recommendations' , {recommendation: recommendation}, this.requestOptions)
      .pipe(
        tap(data => {
          console.log('POST player recommendation', data);
        }),
        catchError(this.handleError)
      );
  };

  voteForSkill(skillName: string, author_user_id: string, user_info_id:string): Observable<boolean> {
    if(this.testing){
      let done = false;
      this.mockUserInfo[0].skill_set.forEach(skill => {
        if (skill.name == skillName) {
          //skill.endorsements.push(/*authorId*/1); // Todo convert endorsments to string[]
          done = true;
        }
      });
      return of(done);
    }

    return this.http.post<boolean>('api/players/' + user_info_id+ '/skills' , {skill_name: skillName, author_user_id: author_user_id}, this.requestOptions)
      .pipe(
        tap(data => {
          console.log('POST player skill', data);
        }),
        catchError(this.handleError)
      );
  }

  follow(user_info_id: string) : Observable<boolean> {
    if (this.testing) {}

    let author_user_info_id = this.authenticationService.getSessionUser().profile_id;

    return this.http.post<boolean>('api/players/' + user_info_id+ '/followers' , {author_user_info_id: author_user_info_id}, this.requestOptions)
      .pipe(
        tap(data => {
          console.log('POST player follow', data);
        }),
        catchError(this.handleError)
      );
  }

  unfollow(user_info_id: string) : Observable<boolean> {
    if (this.testing) {}

    let author_user_info_id = this.authenticationService.getSessionUser().profile_id;

    return this.http.delete<boolean>('api/players/' + user_info_id+ '/followers/' +  author_user_info_id, this.requestOptions)
      .pipe(
        tap(data => {
          console.log('POST player follow', data);
        }),
        catchError(this.handleError)
      );
  }

  editUserInfo(user_info_season: UserInfoSeason, avatar: File) {

    let formData: FormData = new FormData();
    formData.append('personal_info', JSON.stringify(user_info_season.personal_info));
    formData.append('avatar', avatar, 'avatar');

    return this.http.put<UserInfoSeason>('/api/players/' + user_info_season._id , formData, this.requestOptionsMultipart)
      .map((res: any) => {
        this.authenticationService.setSessionAvatar(res.personal_info.avatar);
        return res;
      });
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
