import {ChangeDetectorRef, Component, OnInit, ViewContainerRef} from '@angular/core';
import {GenericUserService} from '../_services/generic_user.service';
import {AuthenticationService} from '../_services/authentication.service';
import {Observable} from 'rxjs/Observable';
import {SearchEntityViewmodel} from "../_models/search_entity_viewmodel";
import {UserInfoViewModel} from '../_models/user_info_viewmodel';
import {UserInfoService} from '../_services/user_info.service';
import {MatDialog} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {User} from "../_models/user";
import {SessionUser} from "../_models/session_user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchString: string;
  searchResults: SearchEntityViewmodel[];
  viewModel: SessionUser;

  show_search: boolean;

  //Login variables
  model: any = {};
  error = '';

  constructor(
    public dialog: MatDialog, private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    private authenticationService: AuthenticationService,
    private genericService: GenericUserService,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.show_search = false;
  }

  ngAfterViewInit() {

    this.viewModel = this.authenticationService.getSessionUser() || new SessionUser();
    this.cdRef.detectChanges();
  }

  searchFor() {
    this.genericService.searchUser('', this.searchString, '')
      .subscribe((list) => {
          this.searchResults = list;
        }
      );
  }

  isAuthenticated() {
    return this.authenticationService.isLogged();
  }

  logout() {
    this.authenticationService.logout();
  }

}
