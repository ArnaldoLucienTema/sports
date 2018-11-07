import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserInfoViewModel} from '../_models/user_info_viewmodel';
import {UserInfoService} from '../_services/user_info.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user_info.component.html',
  styleUrls: ['./user_info.component.css']
})
export class User_infoComponent implements OnInit, AfterViewInit{

  id;
  viewModel: UserInfoViewModel;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userInfoService : UserInfoService) { }

  ngOnInit() {
    this.id  = this.route.snapshot.paramMap.get('id');
  }

  ngAfterViewInit(){
    this.userInfoService.getUserInfo(this.id)
      .subscribe(userInfo => {
        this.viewModel = userInfo
      });
  }

  hasClass(elementId, className) {
    let elem = document.getElementById(elementId);
    return (' ' + elem.className + ' ').indexOf(' ' + className+ ' ') > -1;
  }

  over(event, isOver){
    let elem = event.target;
    let newClassName = ' '+ 'over'+ ' ';
    isOver? elem.className += newClassName: elem.classList.remove('over');
  }

  changeTab(tabId){
    let newClassName = ' '+'current'+' ';
    if(document.getElementsByClassName('current')[0]){
      document.getElementsByClassName('current')[0].classList.remove('current');
      document.getElementById(tabId).className += newClassName;
    }
  }
}
