import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AttemptService} from '../services/attempt.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-attempt',
  templateUrl: './add-attempt.component.html',
  styleUrls: ['./add-attempt.component.scss']
})
export class AddAttemptComponent implements OnInit {

  attemptForm = this.fb.group({
    photo: ['', Validators.required]
  });

  photo: File;
  showableImage: any;
  target_id: string;

  constructor(
    private fb: FormBuilder,
    private attemptService: AttemptService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get('target_id')) {
        this.target_id = params.get('target_id');
      }
    });
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
        this.showableImage = reader.result;
      }
    }
  }

  onSubmit() {
    if (this.attemptForm.invalid) {
      return;
    }

    let data = new FormData();
    data.append('photo', this.photo);

    let patienceSnackbar = this.snackBar.open('Uw poging wordt geupload. Een moment geduld a.u.b.');

    this.attemptService.addAttempt(this.target_id, data).subscribe(attempt => {
      patienceSnackbar.dismiss();
      this.snackBar.open(`Poging is geupload. Uw score is ${attempt.score}`, null, {
        duration: 5000
      });
    }, error => {
      patienceSnackbar.dismiss();
      if (error.error.message) {
        this.snackBar.open(error.error.message, null, {
          duration: 5000
        });
      } else {
        this.snackBar.open('Er is een fout opgetreden tijdens het opslaan van de poging.', null, {
          duration: 5000
        });
      }
    });

    this.router.navigate(['/targets', this.target_id]);
  }
}
