import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserInfoViewModel} from '../_models/user_info_viewmodel';
import {UserInfoService} from '../_services/user_info.service';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {
  UsernameValidator,
  PasswordValidator,
  ParentErrorStateMatcher
} from '../validators';
import {ActivatedRoute, Router} from '@angular/router';
import {MatchService} from '../_services/match.service';
import {MatchViewModel} from '../_models/match_viewmodel';
import {ScrollToService} from 'ng2-scroll-to-el';
import {forEach} from "@angular/router/src/utils/collection";
import {RecommendationModalComponent} from "../_modals/recommendation-modal/recommendation-modal.component";
import {UploadImageModalComponent} from "../_modals/upload-image-modal/upload-image-modal.component";
import {MatDialog} from "@angular/material";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../_services/authentication.service";

@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.css']
})
export class EditUserInfoComponent implements OnInit, AfterViewInit {

  ngModelMockVar;
  currentMatchIdx;
  availableStuff;
  matchesInEdit;
  eventsToggled;
  selectizeConfig;
  season;
  team;
  parentErrorStateMatcher;
  seasons;
  genders;
  positions;
  countries;
  feet;
  cities;
  validation_messages;
  account_validation_messages;
  id;

  avatar: File;

  player_matches: any[];
  viewModel: UserInfoViewModel;
  userDetailsForm: FormGroup;
  accountDetailsForm: FormGroup;
  matching_passwords_group: FormGroup;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  cropperReady = false;

  // Only for demonstration purposes, this variable helps knowing when to display the *already received* matches
  showGames: boolean = false;

  constructor(private matchService: MatchService,
              public dialog: MatDialog,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private scrollService: ScrollToService,
              private userInfoService: UserInfoService,
              private authenticationService: AuthenticationService,
              private http: HttpClient
              ) {
  }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');

    // Charge mock values
    this.season = {
      id: '',
      name: ''
    };
    this.team = {
      id: '',
      name: ''
    };
    this.availableStuff = [
      '2 Golos',
      '2 Assistências',
      '2 Cartões Vermelhos',
      '3 Cartões Amarelos',
    ];
    this.matchesInEdit = {};
    this.eventsToggled = {};
    this.selectizeConfig = {
      create: true,
      valueField: 'id',
      labelField: 'name',
      searchField: 'name',
      maxItems: null
    };
    this.parentErrorStateMatcher = new ParentErrorStateMatcher();
    this.seasons = [
      {
        id: '2',
        name: '2017/18'
      },
      {
        id: '3',
        name: '2016/17'
      },
      {
        id: '2',
        name: '2015/16'
      },
      {
        id: '2',
        name: '2014/15'
      },
      {
        id: '2',
        name: '2013/14'
      },
      {
        id: '2',
        name: '2012/13'
      },
      {
        id: '2',
        name: '2011/12'
      },
    ];
    this.genders = [
      'Masculino',
      'Feminino'
    ];
    this.positions = [
      'Guarda-redes',
      'Defesa Central',
      'Defesa Esquerdo',
      'Defesa Direito',
      'Defesa',
      'Médio Defensivo',
      'Médio Ofensivo',
      'Médio Esquerdo',
      'Médio Direito',
      'Médio Centro',
      'Ala Esquerdo',
      'Ala Direito',
      'Avançado',
    ];
    this.countries = [
      'Portugal',
      'Cabo Verde',
      'Angola',
      'São Tomé e Príncipe',
      'Brazil',
      'Moçambique',
      'Guiné Bissau'
    ];
    this.feet = [
      'Esquerdo',
      'Direito',
      'Ambos'
    ];
    this.cities = [
      'Lisboa',
      'Setúbal',
      'Praia',
      'Seixal',
      'Porto',
      'Faro',
      'Coimbra'
    ];
    this.validation_messages = {
      'name': [
        {type: 'required', message: 'O nome é obrigatório'}
      ],
      'gender': [
        {type: 'required', message: 'Insere o teu género.'},
      ],
      'birthday': [
        {type: 'required', message: 'Por favor, insere a tua data de nascimento'},
      ]
    };
    this.account_validation_messages = {
      'username': [
        {type: 'required', message: 'Username is required'},
        {type: 'minlength', message: 'Username must be at least 5 characters long'},
        {type: 'maxlength', message: 'Username cannot be more than 25 characters long'},
        {type: 'pattern', message: 'Your username must contain only numbers and letters'},
        {type: 'validUsername', message: 'Your username has already been taken'}
      ],
      'email': [
        {type: 'required', message: 'Email is required'},
        {type: 'pattern', message: 'Enter a valid email'}
      ],
      'confirm_password': [
        {type: 'required', message: 'Confirm password is required'},
        {type: 'areEqual', message: 'Password mismatch'}
      ],
      'password': [
        {type: 'required', message: 'Password is required'},
        {type: 'minlength', message: 'Password must be at least 5 characters long'},
        {type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number'}
      ],
      'terms': [
        {type: 'pattern', message: 'You must accept terms and conditions'}
      ]
    };
  }

  ngAfterViewInit() {
    this.userInfoService.getUserInfo(this.id)
      .subscribe(userInfo => {

        this.viewModel = userInfo;

        // For demonstration purposes only.
        // The matches should come through a match.sercice function
        this.player_matches = this.viewModel.current_season.matches;
        this.createForms();
      });
  }

  createForms() {
    // matching passwords validation

    // user details form validations
    this.userDetailsForm = this.fb.group({
      name: [this.viewModel.current_season.personal_info.name, Validators.required],
      birthday: [this.viewModel.current_season.personal_info.date_of_birth, Validators.required],
      gender: new FormControl(this.genders[0], Validators.required),
      height: [this.viewModel.current_season.personal_info.height, Validators.required],
      weight: [this.viewModel.current_season.personal_info.weight, Validators.required],
      country: new FormControl(this.countries[0], Validators.required),
      city: new FormControl(this.cities[0], Validators.required),
      position: new FormControl(this.positions[0], Validators.required),
      foot: new FormControl(this.feet[0], Validators.required),
    });

    // user links form validations
    this.accountDetailsForm = this.fb.group({
      username: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.matching_passwords_group,
      terms: new FormControl(false, Validators.pattern('true'))
    });

  }

  loadGames() {

    this.showGames = true;
    // Simply reloading the games with different goals, assists and other info - only for demonstration purposes.
    // When the Season Endpoint is working, it will get the games by Season ID

    // While the match endpoint is not yet configured, the goals statically mocked.
    this.player_matches.forEach(function (match, index) {
      match.player_goals = random(0,3);
      match.player_assists = random(0,2);
      match.player_minutes_played = random(65,29);
      match.player_yellow_cards = random(0,2);
      match.player_red_cards = random(0,1);

      match.date = new Date(match.date).toDateString();

      match.isDataConfirmed = true;

    });

    /*
    this.matchService.getPlayerMatchByTeamSeason(this.viewModel.user_id, this.team.id, this.season.id)
      .subscribe(player_matches => this.player_matches = player_matches);
    */
  }

  save() {
    // Todo: Saves current information to the user model and returns to user-info
    this.userInfoService.editUserInfo(this.viewModel.current_season, this.avatar)
      .subscribe(res => {
        debugger;
        this.authenticationService.setSessionAvatar(res['personal_info'].avatar + '?random=' + _make_random_text());
        this.router.navigate(['/user-info/' + this.id]);
      })
  }

  discard() {
    // Todo: Discards current information and returns to user-info
    this.router.navigate(['/user-info/' + this.id]);
  }

  goToMatch(match) {
    debugger;
    // Todo: Discards current information and returns to user-info
    this.router.navigate(['/match/' + match.id]);
  }

  changedInput(inputType, event, isMatch) {
    let value = event.target.value;
    if (isMatch){
      this.player_matches[this.currentMatchIdx][inputType] = value;
      this.player_matches[this.currentMatchIdx].isDataConfirmed = false;
    }
    else
      this.viewModel[inputType] = value;
  }

  goToTop(index) {
    this.scrollService.scrollTo('#top', 500, -100);
    this.eventsToggled[index] = false;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCroppedBase64(image: string) {
    this.croppedImage = image;
  }
  imageCroppedFile(image: File) {
    this.avatar = image;
  }
  imageLoaded() {
    this.cropperReady = true;
  }
  imageLoadFailed () {
    console.log('Load failed');
  }

}

// For demonstration purposes only, this function helps generating random numbers between a certain range
function random(start, end) {
  return Math.floor(Math.random() * end) + start
}

function _make_random_text() {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
