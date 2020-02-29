import {Component, Inject, OnInit} from '@angular/core';
import {Attempt} from '../attempt';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-attempt-delete-confirm',
  templateUrl: './attempt-delete-confirm.component.html',
  styleUrls: ['./attempt-delete-confirm.component.scss']
})
export class AttemptDeleteConfirmComponent implements OnInit {

  attempt: Attempt;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.attempt = this.data.attempt;
  }
}
