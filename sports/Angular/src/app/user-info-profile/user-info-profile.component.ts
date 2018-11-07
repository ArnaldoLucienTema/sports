import {
  Component,
  OnInit,
  AfterViewInit,
  ViewContainerRef,
  AfterViewChecked,
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';
import {UserInfoViewModel} from '../_models/user_info_viewmodel';
import {UserInfoService} from '../_services/user_info.service';
import {Chart} from 'chart.js';
import {forEach} from '@angular/router/src/utils/collection';
import {MatDialog} from '@angular/material';
import {RecommendationModalComponent} from '../_modals/recommendation-modal/recommendation-modal.component';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';
import {of} from 'rxjs/observable/of';
import {AuthenticationService} from "../_services/authentication.service";
import {SessionUser} from "../_models/session_user";

@Component({
  selector: 'app-user-info-profile',
  templateUrl: './user-info-profile.component.html',
  styleUrls: ['./user-info-profile.component.css']
})
export class UserInfoProfileComponent implements OnInit, AfterViewInit {

  viewModel: UserInfoViewModel;
  session_user: SessionUser;
  _chart: Chart;
  colors;
  data;
  options;
  labels;
  skill_values;
  id;
  loading_chart: boolean = false;
  isFollowing: boolean = false;
  isSessionUserProfile: boolean = false;

  constructor(private userInfoService: UserInfoService,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              public toastr: ToastsManager, vcr: ViewContainerRef,
              private cdRef: ChangeDetectorRef,
              private authenticationService: AuthenticationService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');

    this.data = {};
    this.options = {};
    this.labels = [];
    this.skill_values = [];
    this.colors = [];

  }

  ngAfterViewInit() {
    this.userInfoService.getUserInfo(this.id)
      .subscribe((userInfo) => {

        // Check if user is already being followed by the session user

        if (userInfo.followers.indexOf(this.authenticationService.getSessionUser().profile_id) > -1) {
          this.isFollowing = true;
        }

        if (this.authenticationService.getSessionUser().profile_id == userInfo._id) {
          this.isSessionUserProfile = true;
        }

        // Convert birth_date to age TODO: This should probably be done right out of the service
        let birth_date = new Date(userInfo.current_season.personal_info.date_of_birth);
        let ageDifMs = Date.now() - birth_date.getTime();
        let ageDate = new Date(ageDifMs);
        userInfo.current_season.personal_info.age = Math.abs(ageDate.getUTCFullYear() - 1970);

        // TODO: Get 2 youtube videos based on the player's name and set it up in the media
        // Right now, inserting some random videos just to look cool.
        userInfo.current_season.media = [
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

        if (!userInfo.recommendations || !userInfo.recommendations.top_5 || userInfo.recommendations.top_5.length < 1) {
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
        }

        userInfo.current_season.personal_info.avatar = userInfo.current_season.personal_info.avatar + '?random=' + _make_random_text();

        this.viewModel = userInfo;
        // When the user scrolls the page, execute myFunction
        window.onscroll = function () {
          stickyScroll()
        };

        this.session_user = this.authenticationService.getSessionUser();
        this.cdRef.detectChanges();
        this.loadChart();

      });

  }

  editPlayer(): void {
    this.router.navigate(['/edit-user-info/' + this.id]);
  }

  loadChart() {
    this.loading_chart = true;
    this.viewModel.skill_set.forEach((skill) => {
      this.labels.push(skill.name);
      this.skill_values.push(skill.endorsements.length);
    });
    this.data = {
      labels: this.labels,
      datasets: [{
        data: this.skill_values, //[19, 18, 14, 15, 23]
        backgroundColor: [
          '#4383a882',
          '#4383a882',
          '#4383a882',
          '#4383a882',
          '#4383a882',
        ]
      }]
    };
    this.options = {
      title: {
        text: 'Vota nas "Skills" de ' + this.viewModel.current_season.personal_info.name,
        display: true
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          ticks: {
            mirror: true
          },
          gridLines: {
            display: false
          }
        }]
      }
    };

    let ctx = document.getElementById('graph');
    this._chart = new Chart(ctx, {
      type: 'horizontalBar',
      data: this.data,
      options: this.options,
      colors: this.colors
    });
    this.loading_chart = false;
    return true;
  }

  addRecommendation(): void {


    const dialogRef = this.dialog.open(RecommendationModalComponent,
      {
        data: {
          author: this.session_user,
          player: this.viewModel,
          edit: false,
          create: true
        }
      });

    dialogRef.afterClosed().subscribe(rec_object => {
      let recommendation = {
        user_id: '',
        text: rec_object.text,
        author: {
          author_type: rec_object.author.user_type,
          name: rec_object.author.name,
          id: rec_object.author.profile_id,
          relationship: rec_object.relationship,
          avatar: rec_object.author.avatar,
          team: {
            id: rec_object.author.team_id,
            acronym: rec_object.author.team_acronym,
            avatar: rec_object.author.team_avatar,
            name: rec_object.author.team_name,
          }
        }
      };

      this.userInfoService.createRecommendation(recommendation, this.viewModel._id)
        .subscribe((done) => {
          if (done) {
            this.viewModel.recommendations.top_5.push(recommendation);
            this.cdRef.detectChanges();
          }
          else {
            this.toastr.warning('Ocorreu um erro, tente mais tarde!');
          }
        })
    });
  }

  voteSkill(event): void {


    // TODO: Should send the whole skill_set instead of just the name and then receive the whole skillSet as it is now
    let skillName = event.target.title;
    this.userInfoService.voteForSkill(skillName, this.session_user.profile_id, this.viewModel._id)
      .subscribe((done) => {
        if (done) {
          this.labels.forEach((label, key) => {
            if (label == skillName)
              ++this.skill_values[key];
            this.cdRef.detectChanges();
            this._chart.update();
          });
          this.toastr.success('Voto registado!');
        }
      })
  }

  follow() {
    this.userInfoService.follow(this.viewModel._id)
      .subscribe((done) => {
        if (done) {
          this.isFollowing = true;
          this.cdRef.detectChanges();
        }
      });
  }

  unfollow() {
    this.userInfoService.unfollow(this.viewModel._id)
      .subscribe((done) => {

        if (done) {
          this.isFollowing = false;
          this.cdRef.detectChanges();
        }
      });
  }
}

// Add the sticky class to personal when you reach its scroll position.
// Remove "sticky" when you leave the scroll position
function stickyScroll() {

  // Get the navbar
  let personal = document.getElementById("personal");
  let achievements = document.getElementById("achievements");
  let indicators = document.getElementById("indicators");

  // Get the offset position of the personal
  let currOffset = personal.offsetTop;

  if (window.pageYOffset + 195 >= currOffset) {
    personal.parentElement.classList.add("row-left");
    personal.classList.add("sticky");
  }

  if (window.pageYOffset < 461) {
    personal.classList.remove("sticky");
  }

  if (window.pageYOffset > 2411) {
    personal.classList.add("hidden-for-footer");
    achievements.classList.add("hidden-for-footer");
    indicators.classList.add("hidden-for-footer");
  }
  else {
    personal.classList.remove("hidden-for-footer");
    achievements.classList.remove("hidden-for-footer");
    indicators.classList.remove("hidden-for-footer");
  }
}

function _make_random_text() {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
