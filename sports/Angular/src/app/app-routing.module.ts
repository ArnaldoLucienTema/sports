import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard} from './_guards/auth.guard';
import { User_infoComponent } from "./user_info/user_info.component";
import {TeamComponent} from './team/team.component';
import {HomeComponent} from './home/home.component';
import {MatchComponent} from './match/match.component';
import {CreateAccountComponent} from './create-account/create-account.component';
import {EditUserInfoComponent} from './edit-user-info/edit-user-info.component';
import {FilterUserInfoComponent} from './filter-user-info/filter-user-info.component';
import {TeamPlayerComponent} from "./team-player/team-player.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'user-info/:id', component: User_infoComponent },
  { path: 'team/:id/player/:shadow_player_id', component: TeamPlayerComponent },
  { path: 'team/:id', component: TeamComponent },
  { path: 'home', component: HomeComponent },
  { path: 'match/:id', component: MatchComponent },
  { path: 'create-account', component: CreateAccountComponent},
  { path: 'edit-user-info/:id', component: EditUserInfoComponent},
  { path: 'filter-user-info', component: FilterUserInfoComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
