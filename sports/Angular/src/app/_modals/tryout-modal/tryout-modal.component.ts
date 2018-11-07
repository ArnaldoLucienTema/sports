import {Component, Inject, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {TeamService} from '../../_services/team.service';
import {TeamViewModel} from '../../_models/team_viewmodel';

@Component({
  selector: 'app-tryout-modal',
  templateUrl: './tryout-modal.component.html',
  styleUrls: ['./tryout-modal.component.css']
})
export class TryoutModalComponent implements OnInit {

  address: string;
  age_group: string;
  days: string;
  time: string;
  requirements: string;

  constructor(
    public dialogRef: MatDialogRef<TryoutModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

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

}
