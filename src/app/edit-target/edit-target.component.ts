import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TargetService} from '../services/target.service';
import {Target} from '../models/target';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-target',
  templateUrl: './edit-target.component.html',
  styleUrls: ['./edit-target.component.scss']
})
export class EditTargetComponent implements OnInit {

  targetForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    lat: ['', [Validators.required]],
    lng: ['', [Validators.required]],
    hint: ['', []]
  });

  target: Target;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private targetService: TargetService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.targetService.getTarget(params.get('id')).subscribe(target => {
          this.target = target;
          this.targetForm.patchValue({
            title: target.title,
            description: target.description,
            lng: target.location.coordinates[0],
            lat: target.location.coordinates[1],
            hint: target.hint
          });
        });
      }
    });
  }

  onSubmit() {
    if (this.targetForm.invalid) {
      return;
    }

    let data = this.targetForm.value;
    let target = new Target({
      title: data.title,
      description: data.description,
      hint: data.hint,
      location: {
        type: 'Point',
        coordinates: [
          data.lng,
          data.lat
        ]
      }
    });

    this.targetService.editTarget(this.target._id, target).subscribe(target => {
      this.snackBar.open('Uw target is opgeslagen', null, {
        duration: 3000
      });

      this.router.navigate(['/targets', target._id]);
    }, error => {
      if (error.error.mesage) {
        this.snackBar.open(error.error.message, null, {
          duration: 5000
        });
      } else {
        this.snackBar.open('Er is een fout opgetreden tijdens het opslaan van uw target.', null, {
          duration: 5000
        });
      }
    });
  }
}
