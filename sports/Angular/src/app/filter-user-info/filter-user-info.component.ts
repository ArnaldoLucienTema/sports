import {Component, OnInit} from '@angular/core';
import {GenericUserService} from '../_services/generic_user.service';
import {SearchEntityViewmodel} from '../_models/search_entity_viewmodel';
import {Router} from '@angular/router';
import {UserInfoService} from '../_services/user_info.service';
import {UserInfoSearch} from '../_models/user_info_search';
import {Sort} from '@angular/material';
import {FilterSearch} from '../_models/filter_search';


@Component({
  selector: 'app-filter-user-info',
  templateUrl: './filter-user-info.component.html',
  styleUrls: ['./filter-user-info.component.css']
})
export class FilterUserInfoComponent implements OnInit {


  personal_data_select = [];
  stats_select = [];
  physical_atts_select;
  technical_atts_select;
  //mental_atts_select;
  sc_atts_select;
  competition_select;


  personal_data;
  physical_atts;
  technical_atts;
  mental_atts;
  sc_atts;
  competitions;
  seasons;
  stats;

  teams: SearchEntityViewmodel[];
  age_groups;
  leagues;
  players: UserInfoSearch[];
  loading = false;
  no_results = false;
  user;

  sortedData;
  regex_values;
  regex_words;

  value_types;

  private search_fields: Array<FilterSearch> = [];

  constructor(private router: Router, private genericUserService: GenericUserService,
              private userInfoService: UserInfoService) {
  }

  ngOnInit() {
    this.personal_data = ['Pé', 'Idade', 'Posição', 'Residência', 'Mobilidade', 'D. de Nascimento',];
    this.stats = ['Época', 'Jogos', 'Minutos', 'Golos', 'Assistências', 'Class. média', 'C. Amarelos', 'C. Vermelhos'];
    this.physical_atts = ['Altura', 'Peso', 'Votação SC', 'Velocidade', 'Resistência', 'Força', 'Agilidade', 'Reflexos', 'Impulsão', 'Proteção de bola', 'Corpo a corpo'];
    this.technical_atts = ['Passe', 'Recepção', 'Drible', 'Remates Longe', 'Finalização', 'Cabeceamento', 'Cruzamento', 'Desarme', 'Primeiro toque', 'Lançamentos Laterais', 'Cantos', 'Livres diretos', 'Livres indiretos', 'Penalties'];
    this.mental_atts = ['Agressividade', 'Bravura', 'Antecipação', 'Concentração', 'Determinação', 'Compostura', 'Tomada de decisão', 'Criatividade', 'Jogo sem bola', 'Posicionamento', 'Velocidade Reação', 'Visão de Jogo', 'Disciplina', 'Ética de trabalho', 'Espírito de grupo', 'Liderança', 'Comunicação'];
    this.sc_atts = ['Badges', 'Badges Época', 'Badges Carreira'];
    this.competitions = ['Escalão', 'Distrito', 'Divisão', 'Clube'];

    this.value_types = {
      'default': {
        values: Array.apply(null, {length: 200}).map(Number.call, Number),
        suffix: '',
        filters: [
          {
            regex: '$in',
            text: 'Exatamente'

          },
          {
            regex: '$gte',
            text: 'Pelo menos'
          },
          {
            regex: '$lte',
            text: 'No máximo'
          },
          {
            regex: '$gte,$lte',
            text: 'Entre'
          },
        ]
      },
      'personal_info.foot': {
        values: ['Direito', 'Esquerdo', 'Ambidestro'],
        suffix: '',
        filters: [{
          regex: '$regex',
          text: 'Joga com'
        }]
      },
      'personal_info.birth_date': {
        values: ['1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009'],
        suffix: '',
        filters: [
          {
            regex: '$regex',
            text: 'Exatamente'

          },
          {
            regex: '$gte',
            text: 'Desde'
          },
          {
            regex: '$lte',
            text: 'Até'
          },
          {
            regex: '$gte,$lte',
            text: 'Entre'
          },
        ]
      },
      'personal_info.age': {
        values: Array.apply(null, {length: 35}).map(Number.call, Number),
        suffix: 'anos',
        filters: [
          {
            regex: '$regex',
            text: 'Exatamente'

          },
          {
            regex: '$gte',
            text: 'Pelo menos'
          },
          {
            regex: '$lte',
            text: 'No máximo'
          },
          {
            regex: '$gte,$lte',
            text: 'Entre'
          },
        ]
      },
      'personal_info.residence': {
        values: ['Lisboa', 'Porto', 'Coimbra', 'Algarve', 'Setúbal', 'Santarém', 'Viseu', 'Leiria'],
        suffix: '',
        filters: ['$regex'],
        filters_text: ['Reside em']
      },
      'team.name': {
        values: ['Seixal', 'Benfica', 'Porto', 'Amora', 'Alcochetense', 'Montijo', 'Sporting'],
        suffix: '',
        filters: [
          {
            regex: '$in',
            text: 'Joga no'

          }
        ]

      },
      'personal_info.mobility': {
        values: ['Total', 'Regional', 'Distrital'],
        suffix: '',
        filters: ['$regex'],
        filters_text: ['No máximo']
      },
      'personal_info.positions': {
        values: ['Guarda Redes', 'Defesa', 'Defesa (Defesa Central)', 'Defesa (Defesa Esquerdo)', 'Defesa (Defesa Direito)', 'Médio', 'Médio (Médio Defensivo)', 'Médio (Médio Centro)', 'Médio (Médio Ofensivo)', 'Médio Esquerdo', 'Médio (Extremo Esquerdo)', 'Médio (Extremo Direito)', 'Médio Direito', 'Avançado (Extremo Direito)', 'Avançado (Extremo Esquerdo)', 'Avançado (Ponta de Lança)'],
        suffix: '',
        filters: [
          {
            regex: '$in',
            text: 'É natural como'

          }
        ]
      },
      'stats.games': {
        values: Array.apply(null, {length: 200}).map(Number.call, Number),
        suffix: 'jogos',
        filters: [
          {
            regex: '$in',
            text: 'Exatamente'

          },
          {
            regex: '$gte',
            text: 'Pelo menos'
          },
          {
            regex: '$lte',
            text: 'No máximo'
          },
          {
            regex: '$gte,$lte',
            text: 'Entre'
          },
        ]
      },
      'stats.minutes': {
        values: Array.apply(null, {length: 90}).map(Number.call, Number),
        suffix: 'mins',
        filters: [
          {
            regex: '$in',
            text: 'Exatamente'

          },
          {
            regex: '$gte',
            text: 'Pelo menos'
          },
          {
            regex: '$lte',
            text: 'No máximo'
          },
          {
            regex: '$gte,$lte',
            text: 'Entre'
          },
        ]
      },
      'stats.goals': {
        values: Array.apply(null, {length: 200}).map(Number.call, Number),
        suffix: 'golos',
        filters: [
          {
            regex: '$in',
            text: 'Exatamente'

          },
          {
            regex: '$gte',
            text: 'Pelo menos'
          },
          {
            regex: '$lte',
            text: 'No máximo'
          },
          {
            regex: '$gte,$lte',
            text: 'Entre'
          },
        ]
      },
      'stats.assists': {
        values: Array.apply(null, {length: 200}).map(Number.call, Number),
        suffix: 'ass.',
        filters: [
          {
            regex: '$in',
            text: 'Exatamente'

          },
          {
            regex: '$gte',
            text: 'Pelo menos'
          },
          {
            regex: '$lte',
            text: 'No máximo'
          },
          {
            regex: '$gte,$lte',
            text: 'Entre'
          },
        ]
      },
      'personal_info.height': {
        values: ['120', '150', '170', '180', '190', '200'],
        suffix: 'cm',
        filters: [
          {
            regex: '$in',
            text: 'Exatamente'

          },
          {
            regex: '$gte',
            text: 'Pelo menos'
          },
          {
            regex: '$lte',
            text: 'No máximo'
          },
          {
            regex: '$gte,$lte',
            text: 'Entre'
          },
        ]
      },
      'personal_info.weight': {
        values: ['50', '60', '70', '80', '90'],
        suffix: 'kg',
        filters: [
          {
            regex: '$in',
            text: 'Exatamente'

          },
          {
            regex: '$gte',
            text: 'Pelo menos'
          },
          {
            regex: '$lte',
            text: 'No máximo'
          },
          {
            regex: '$gte,$lte',
            text: 'Entre'
          },
        ]
      },
      'personal_info.age_group': {
        values: ['Petizes', 'Traquinas', 'Benjamins B', 'Benjamins A', 'Infantis B', 'Infantis A', 'Iniciados B', 'Iniciados', 'Juvenis B', 'Juvenis', 'Juniores B', 'Juniores', 'Seniores'],
        suffix: '',
        filters: [
          {
            regex: '$regex',
            text: 'Exatamente'

          },
          {
            regex: '$gte',
            text: 'Desde'
          },
          {
            regex: '$lte',
            text: 'Até'
          },
          {
            regex: '$gte,$lte',
            text: 'Entre'
          },
        ]
      },
      'personal_info.district': {
        values: ['Lisboa', 'Porto', 'Setúbal', 'Santarém', 'Faro'],
        suffix: '',
        filters: [{
          regex: '$regex',
          text: 'Joga em/no'
        }]
      },
      'personal_info.division': {
        values: ['Nacional', 'Regional', 'Distrital', '1ª Div', '2ª Div', '3ª Div'],
        suffix: '',
        filters: [{
          regex: '$regex',
          text: 'Joga na'
        }]
      },
      'personal_info.season': {
        values: ['2018/2019', '2017/2018', '2016/2017', '2015/2016', '2014/2015'],
        suffix: '',
        filters: [
          {
            regex: '$regex',
            text: 'Exatamente'

          },
          {
            regex: '$gte',
            text: 'Desde'
          },
          {
            regex: '$lte',
            text: 'Até'
          },
          {
            regex: '$gte,$lte',
            text: 'Entre'
          },
        ]
      },
      'stats.red_cards': {
        values: Array.apply(null, {length: 200}).map(Number.call, Number),
        suffix: '',
        filters: [
          {
            regex: '$in',
            text: 'Exatamente'

          },
          {
            regex: '$gte',
            text: 'Pelo menos'
          },
          {
            regex: '$lte',
            text: 'No máximo'
          },
          {
            regex: '$gte,$lte',
            text: 'Entre'
          },
        ]
      },
      'stats.yellow_cards': {
        values: Array.apply(null, {length: 200}).map(Number.call, Number),
        suffix: '',
        filters: [
          {
            regex: '$in',
            text: 'Exatamente'

          },
          {
            regex: '$gte',
            text: 'Pelo menos'
          },
          {
            regex: '$lte',
            text: 'No máximo'
          },
          {
            regex: '$gte,$lte',
            text: 'Entre'
          },
        ]
      }
    };
  }

  contains(array: any[], element) {
    return array.indexOf(element) > -1;
  };

  loadAgeGroups() {
    // Todo: Get AgeGroups
    this.age_groups = [
      {
        id: '1',
        name: 'Petizes',
      },
      {
        id: '2',
        name: 'Traquinas',
      },
      {
        id: '3',
        name: 'Benjamins B',
      },
      {
        id: '4',
        name: 'Benjamins A',
      }, {
        id: '5',
        name: 'Infantis B',
      },
      {
        id: '6',
        name: 'Infantis A',
      }, {
        id: '7',
        name: 'Iniciados B',
      },
      {
        id: '8',
        name: 'Iniciados',
      }, {
        id: '9',
        name: 'Juvenis B',
      },
      {
        id: '10',
        name: 'Juvenis',
      }, {
        id: '11',
        name: 'Juniores B',
      },
      {
        id: '12',
        name: 'Juniores',
      }, {
        id: '13',
        name: 'Seniores',
      }
    ];
  }

  loadLeagues() {
    // Todo: Get Competitions
    this.leagues = [
      {
        id: '2',
        name: 'Liga Portuguesa'
      },
      {
        id: '3',
        name: 'II Liga'
      },
      {
        id: '2',
        name: 'AF Lisboa 1ª Divisão Série 1 2017/18'
      },
    ];
  }

  loadTeam() {
    // Todo: Get Team based on chosenLeague
    this.genericUserService.searchUser('', '', 'team.name')
      .subscribe(teams => this.teams = teams);
  }

  loadPlayers() {
    this.loading = true;
    this.no_results = false;

    this.search_fields.forEach((field, key) => {
      if (field.search_item == "personal_info.positions") {
        field.selected_value = [field.selected_value];
      }
    });

    this.genericUserService.detailedSearchUser(this.search_fields)
      .subscribe(players => {

          debugger;

          if (!players) {
            this.loading = false;
            this.no_results = true;
          }
          players.forEach(player => {
            let birth_date = new Date(player.personal_info.date_of_birth);
            let ageDifMs = Date.now() - birth_date.getTime();
            let ageDate = new Date(ageDifMs);
            player.personal_info.age = Math.abs(ageDate.getUTCFullYear() - 1970);
          });
          this.players = players;
          this.loading = false;
          this.no_results = false;
          this.sortedData = this.players.slice();
        }
      );
  }

  addFieldValue(form_values) {
    form_values.forEach((form_value, key) => {
      if (!this.search_fields.some(item => item.form == form_value)) {

        let mapped_var = mapVariable(form_value);
        let obj = this.value_types[mapped_var] ? this.value_types[mapped_var] : this.value_types['default'];
        this.search_fields.push({
          form: form_value,
          search_item: mapped_var,
          filters: obj.filters,
          values: obj.values,
          selected_filter: '',
          selected_value: '',
          selected_value_end: '',
          value_suffix: obj.suffix
        });
      }
    });
  }

  changed(form) {

    // Cleans current player list if the filters were cleaned
    if (this.search_fields.length == 0) {
      this.players = undefined;
    }

    // Todo: Get Players based on
    if (form)
      this.addFieldValue(form);

    // Reset the selected fileds
    this.personal_data_select = undefined;
    this.competition_select = undefined;
    this.physical_atts_select = undefined;
    this.sc_atts_select = undefined;
    this.technical_atts_select = undefined;

  }

  sortData(sort: Sort) {
    const data = this.players.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'age':
          return compare(+a.personal_info.age, +b.personal_info.age, !isAsc);
        case 'games':
          return compare(+a.stats[0].games, b.stats[0].games, !isAsc);
        case 'goals':
          return compare(+a.stats[0].goals, +b.stats[0].goals, !isAsc);
        case 'assists':
          return compare(+a.stats[0].assists, +b.stats[0].assists, !isAsc);
        case 'height':
          return compare(+a.personal_info.height, +b.personal_info.height, !isAsc);
        case 'weight':
          return compare(+a.personal_info.weight, +b.personal_info.weight, !isAsc);
        default:
          return 0;
      }
    });
  }

  deleteFieldValue(index) {
    this.search_fields.splice(index, 1);
  }
}


function mapVariable(text) {
  let translated = '';

  switch (text) {
    case 'Pé':
      translated = 'personal_info.foot';
      break;
    case 'Posição':
      translated = 'personal_info.positions';
      break;
    case 'Idade':
      translated = 'personal_info.age';
      break;
    case 'Residência':
      translated = 'personal_info.residence';
      break;
    case 'Clube':
      translated = 'team.name';
      break;
    case 'Mobilidade':
      translated = 'personal_info.mobility';
      break;
    case 'Época':
      translated = 'season'; //TODO ALTT Check this one out because it doesn't add up this way.
      break;
    case 'Jogos':
      translated = 'stats.games';
      break;
    case 'D. de Nascimento':
      translated = 'personal_info.date_of_birth';
      break;
    case 'Minutos':
      translated = 'stats.minutes';
      break;
    case 'Golos':
      translated = 'stats.goals';
      break;
    case 'Assistências':
      translated = 'stats.assists';
      break;
    case 'Altura':
      translated = 'personal_info.height';
      break;
    case 'Peso':
      translated = 'personal_info.weight';
      break;
    case 'Escalão':
      translated = 'personal_info.age_group';
      break;
    case 'Distrito':
      translated = 'personal_info.district';
      break;
    case 'Divisão':
      translated = 'personal_info.division';
      break;
    case 'C. Amarelos':
      translated = 'stats.yellow_cards';
      break;
    case 'C. Vermelhos':
      translated = 'stats.red_cards';
      break;
    default:
      translated = '';
  }

  return translated;
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
