import { GenericUserService} from './_services/generic_user.service';
import {AuthenticationService} from './_services/authentication.service';
import {HttpClient, HttpHandler, HttpHeaders} from '@angular/common/http';
import { Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {}

}
