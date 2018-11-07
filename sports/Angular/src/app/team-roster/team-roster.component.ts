import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TeamViewModel} from '../_models/team_viewmodel';
import { TeamService } from '../_services/team.service';
import { Chart } from 'chart.js';
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-team-roster',
  templateUrl: './team-roster.component.html',
  styleUrls: ['./team-roster.component.css']
})
export class TeamRosterComponent implements OnInit, AfterViewInit  {

  viewModel: TeamViewModel;
  id;
  constructor(private teamService : TeamService, private route: ActivatedRoute, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.id  = this.route.snapshot.paramMap.get('id');
  }

  ngAfterViewInit() {
    this.teamService.getTeam(this.id)
      .subscribe(team => this.viewModel = team);
  }
}
