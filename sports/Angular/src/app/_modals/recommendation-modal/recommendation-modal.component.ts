import {Component, Inject, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SessionUser} from "../../_models/session_user";

@Component({
  selector: 'app-recommendation-modal',
  templateUrl: './recommendation-modal.component.html',
  styleUrls: ['./recommendation-modal.component.css']
})
export class RecommendationModalComponent implements OnInit {

  text: string;
  relationship: string;
  recommendationIdx: string;
  edit: false;
  create: true;
  author;
  player;

  constructor(
    public dialogRef: MatDialogRef<RecommendationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { author: SessionUser, edit: boolean, player: any, create: boolean }
  ) {

    this.author = this.data.author;
    this.player = this.data.player;
  }

  ngOnInit() {
  }

  /**
   *     user_id: {type: Schema.Types.ObjectId, ref: 'football_user_info'},
   author: {
        author_type: String,
        name: String,
        relationship: String,
        id: String, // There's no Schema reference because it can be any type of user
        avatar: String,
        team: {
            id: {type: Schema.Types.ObjectId, ref: 'football_team'},
            acronym: String,
            avatar: String,
            name: String,
        },
    },
   text: String
   */
  onCreateClick(): void {
    this.dialogRef.close({
      author: this.author,
      text: this.text,
      relationship: this.relationship
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
