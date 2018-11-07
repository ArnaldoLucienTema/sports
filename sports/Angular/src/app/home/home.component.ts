import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from "../_services/authentication.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  email;
  password;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {}

  ngOnInit() {}

  createAccount() {

    // Logs in with the password and username provided initially.
    // For demo purposes, let's insert a mock username and passowrd.
    this.authenticationService.signup(this.email, this.password)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['/create-account']);
        }
      });
  }
}
