import { Component, OnInit } from '@angular/core';
import {UserInfoViewModel} from '../_models/user_info_viewmodel';
import {UserInfoService} from '../_services/user_info.service';
import { Chart } from 'chart.js';
import {Sort} from '@angular/material';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-user-info-media',
  templateUrl: './user-info-media.component.html',
  styleUrls: ['./user-info-media.component.css']
})
export class User_infoMediaComponent implements OnInit{

  viewModel: UserInfoViewModel;
  sortedData;
  id;
  constructor(private userInfoService : UserInfoService, private route: ActivatedRoute) {}

  ngOnInit() {

    this.id  = this.route.snapshot.paramMap.get('id');
    this.userInfoService.getUserInfo(this.id)
      .subscribe(userInfo => {


        // TODO: This should probably be done right out of the service

        //Convert birth_date to age

        let birth_date = new Date(userInfo.current_season.personal_info.date_of_birth);
        let ageDifMs = Date.now() - birth_date.getTime();
        let ageDate = new Date(ageDifMs);
        userInfo.current_season.personal_info.age = Math.abs(ageDate.getUTCFullYear() - 1970);


        // TODO: Get 2 youtube videos based on the player's name and set it up in the media

        // Right now, inserting some random videos just to look cool.

        userInfo.current_season.media= [
          {
            title: userInfo.current_season.personal_info.name + ' marca Hat-trick em jogo decisivo',
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
                name: userInfo.current_season.personal_info.name,
                id: '1'
              }],
            }
          },
          {
            title: userInfo.current_season.personal_info.name + ' faz 25 anos!',
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
                name: userInfo.current_season.personal_info.name,
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
            title: userInfo.current_season.personal_info.name + ' falha final da Taça de Portugal',
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
        ];

        // Inserting some recommendations for the same reason.

        userInfo.recommendations = {
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
        };


        this.viewModel = userInfo;

        this.sortedData = userInfo.current_season.media.slice();
        return this.viewModel = userInfo;
      });
  }

  sortData(sort: Sort) {
    if(!this.viewModel.current_season.media){
      return;
    }
    const data = this.viewModel.current_season.media.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'Popular': return compare(+a.views, +b.views, isAsc);
        case 'Recente': return compare(a.date, b.date, isAsc);
        case 'Gostos': return compare(+a.likes, +b.likes, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
