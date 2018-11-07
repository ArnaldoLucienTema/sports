import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import {MatDialog} from '@angular/material';
import {MatchViewModel} from '../_models/match_viewmodel';
import {MatchService} from '../_services/match.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit, AfterViewInit {

  viewModel: MatchViewModel;
  id;

  constructor(
    private matchService: MatchService,
    public dialog: MatDialog,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.id  = this.route.snapshot.paramMap.get('id');
  }

  ngAfterViewInit() {
      console.log("Arnaldo");
      this.matchService.getMatch(this.id)
        .subscribe(match => this.viewModel = match);
  }}
