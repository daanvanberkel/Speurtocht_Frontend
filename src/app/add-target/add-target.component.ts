import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {TargetService} from '../services/target.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-target',
  templateUrl: './add-target.component.html',
  styleUrls: ['./add-target.component.scss']
})
export class AddTargetComponent implements OnInit {

  saving = false;

  photo: File;
  showablePhoto: any;

  targetForm = this.fb.group({
    id: ['', [Validators.required]],
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    lat: ['', [Validators.required]],
    lng: ['', [Validators.required]],
    hint: ['', []],
    photo: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private targetService: TargetService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.targetForm.patchValue({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    }
  }

  onPhotoChange(event) {
    if (event.target.files) {
      if (event.target.files.length < 1) {
        return;
      }

      this.photo = event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(this.photo);
      reader.onload = event => {
        this.showablePhoto = reader.result;
      }
    }
  }

  onTitleChange(event) {
    this.targetForm.patchValue({
      id: event.target.value.toLowerCase().trim().replace(/\s/g, '-')
    });
  }

  onIdChange(event) {
    this.targetForm.patchValue({
      id: event.target.value.toLowerCase().replace(/\s/g, '-')
    });
  }

  onSubmit() {
    if (this.targetForm.invalid) {
      return;
    }

    let data = this.targetForm.value;

    let formData = new FormData();
    formData.append('id', data.id);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('lat', data.lat);
    formData.append('lng', data.lng);
    formData.append('hint', data.hint);
    formData.append('photo', this.photo);

    this.saving = true;

    let patienceSnackbar = this.snackBar.open('Uw target wordt geupload. Een moment geduld a.u.b.');

    this.targetService.addTarget(formData).subscribe(target => {
      patienceSnackbar.dismiss();

      this.snackBar.open('Uw target is opgeslagen', null, {
        duration: 3000
      });

      this.router.navigate(['/targets', target._id]);
    }, error => {
      patienceSnackbar.dismiss();

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
