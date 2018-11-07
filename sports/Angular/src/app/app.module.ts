import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NgSelectizeModule} from 'ng-selectize';
import {MyDatePickerModule} from 'angular4-datepicker/src/my-date-picker';
import {ScrollToModule} from 'ng2-scroll-to-el';

import {AuthGuard} from './_guards/auth.guard';
import {AdminGuard} from './_guards/admin.guard';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';

import {HttpClient, HttpHeaders, HttpClientModule} from '@angular/common/http';


import {LoadingPageModule} from 'angular-loading-page';         //Loading directive
import {MaterialBarModule} from 'angular-loading-page';         //Loading animation component
import {ClickOutsideModule} from 'ng-click-outside';
import {
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatChipsModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';

import {DropzoneModule} from 'ngx-dropzone-wrapper';
import {DROPZONE_CONFIG} from 'ngx-dropzone-wrapper';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {TeamComponent} from './team/team.component';
import {MatchComponent} from './match/match.component';
import {CompetitionComponent} from './competition/competition.component';
import {User_infoComponent} from './user_info/user_info.component';
import {User_infoMediaComponent} from './user-info-media/user-info-media.component';
import {User_infoStatsComponent} from './user-info-stats/user-info-stats.component';
import {TeamRosterComponent} from './team-roster/team-roster.component';
import {RecommendationModalComponent} from './_modals/recommendation-modal/recommendation-modal.component';
import {TryoutModalComponent} from './_modals/tryout-modal/tryout-modal.component';
import {UploadImageModalComponent} from './_modals/upload-image-modal/upload-image-modal.component';
import {TeamPlayerEvaluationModalComponent} from './_modals/team-player-evaluation-modal/team-player-evaluation-modal.component';
import {UserInfoProfileComponent} from './user-info-profile/user-info-profile.component';
import {TeamProfileComponent} from './team-profile/team-profile.component';
import {TeamStatsComponent} from './team-stats/team-stats.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {CreateAccountComponent} from './create-account/create-account.component';
import {HeaderComponent} from './header/header.component';
import {EditUserInfoComponent} from './edit-user-info/edit-user-info.component';
import {ToastModule} from 'ng2-toastr';
import {FilterUserInfoComponent} from './filter-user-info/filter-user-info.component';
import {UserInfoService} from './_services/user_info.service';
import {UserService} from './_services/user.service';
import {MatchService} from './_services/match.service';
import {TeamService} from './_services/team.service';
import {SocketIOService} from "./_services/socket_io.service";
import {AuthenticationService} from './_services/authentication.service';
import {GenericUserService} from './_services/generic_user.service';
import {CompetitionService} from './_services/competition.service';
import {NotificationsService} from "./_services/notifications.service";
import { TeamMediaComponent } from './team-media/team-media.component';
import { TeamPlayerComponent } from './team-player/team-player.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NotificationsComponent } from './notifications/notifications.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFiles: 1,
  acceptedFiles: 'application/pdf'
};

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    MatchComponent,
    CompetitionComponent,
    User_infoComponent,
    User_infoMediaComponent,
    User_infoStatsComponent,
    TeamRosterComponent,
    RecommendationModalComponent,
    UploadImageModalComponent,
    TeamPlayerEvaluationModalComponent,
    TryoutModalComponent,
    UserInfoProfileComponent,
    TeamProfileComponent,
    TeamStatsComponent,
    HomeComponent,
    LoginComponent,
    CreateAccountComponent,
    HeaderComponent,
    EditUserInfoComponent,
    FilterUserInfoComponent,
    TeamMediaComponent,
    TeamPlayerComponent,
    NotificationsComponent
  ],
  imports: [
    ImageCropperModule,
    HttpClientModule,
    BrowserModule,
    ClickOutsideModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollToModule.forRoot(),
    MyDatePickerModule,
    AppRoutingModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    LoadingPageModule,
    MaterialBarModule,
    NgSelectizeModule,
    DropzoneModule,
    ToastModule.forRoot()
  ],
  providers: [
    HttpClient,
    AuthGuard,
    AdminGuard,
    AuthenticationService,
    CompetitionService,
    GenericUserService,
    UserInfoService,
    UserService,
    TeamService,
    MatchService,
    SocketIOService,
    NotificationsService,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    RecommendationModalComponent,
    UploadImageModalComponent,
    TeamPlayerEvaluationModalComponent,
    TryoutModalComponent
  ]
})
export class AppModule {
}
