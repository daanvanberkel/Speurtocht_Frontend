import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Target} from '../target';

@Component({
  selector: 'app-target-delete-confirm',
  templateUrl: './target-delete-confirm.component.html',
  styleUrls: ['./target-delete-confirm.component.scss']
})
export class TargetDeleteConfirmComponent implements OnInit {

  target: Target;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.target = this.data.target;
  }
}
