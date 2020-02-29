import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Attempt} from '../attempt';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-attempt-detail-dialog',
  templateUrl: './attempt-detail-dialog.component.html',
  styleUrls: ['./attempt-detail-dialog.component.scss']
})
export class AttemptDetailDialogComponent implements OnInit {

  attempt: Attempt;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any)
  { }

  ngOnInit(): void {
    this.attempt = this.data.attempt;
  }

  getPhotoUrl(): string {
    return `${environment.api_base}/targets/${this.attempt.target._id}/attempts/${this.attempt._id}/photo`;
  }
}
