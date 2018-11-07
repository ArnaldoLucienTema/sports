import {Component, Inject, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SessionUser} from "../../_models/session_user";

@Component({
  selector: 'app-upload-image-modall',
  templateUrl: './upload-image-modal.component.html',
  styleUrls: ['./upload-image-modal.component.css']
})
export class UploadImageModalComponent implements OnInit {

  imageFileChanged: any = '';
  croppedImage: any = '';
  cropperReady = false;

  constructor(
    public dialogRef: MatDialogRef<UploadImageModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.imageFileChanged = this.data;

  }

  ngOnInit() {
    this.imageFileChanged = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  imageCroppedBase64(image: string) {
    this.croppedImage = image;
  }
  imageLoaded() {
    this.cropperReady = true;
  }
  imageLoadFailed () {
    console.log('Load failed');
  }


}
