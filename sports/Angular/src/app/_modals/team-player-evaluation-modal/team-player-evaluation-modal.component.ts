import {Component, Inject, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {TeamService} from '../../_services/team.service';
import {TeamViewModel} from '../../_models/team_viewmodel';

@Component({
  selector: 'app-tryout-modal',
  templateUrl: './team-player-evaluation-modal.component.html',
  styleUrls: ['./team-player-evaluation-modal.component.css']
})
export class TeamPlayerEvaluationModalComponent implements OnInit {

  address: string;
  age_group: string;
  days: string;
  time: string;
  requirements: string;
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};

  constructor(
    public dialogRef: MatDialogRef<TeamPlayerEvaluationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    /*
    if (this.data.recommendationIdx != null) {
      this.edit = true;
      this.recommendationIdx = this.data.recommendationIdx;
      this.text = this.data.recommendations[this.data.recommendationIdx];
    }
    */
  }

  ngOnInit() {
  }

  onCreateClick(): void {
    this.dialogRef.close({
      address: this.address,
      age_group: this.age_group,
      days: this.days,
      time: this.time,
      requirements: this.requirements
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addFieldValue() {
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

}
