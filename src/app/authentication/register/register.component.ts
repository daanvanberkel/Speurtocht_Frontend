import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {PlayerService} from '../../services/player.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Player} from '../player';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private playerService: PlayerService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onSumbit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.playerService.addPlayer(new Player({
      name: this.registerForm.value.name,
      username: this.registerForm.value.username,
      local: {
        password: this.registerForm.value.password
      }
    })).subscribe(player => {
      this.snackBar.open('Account is aangemaakt. U kunt nu inloggen', null, {
        duration: 5000
      });

      this.router.navigate(['/login']);
    }, error => {
      if (error.error.message) {
        this.snackBar.open(error.error.message, null, {
          duration: 5000
        });
      } else {
        this.snackBar.open('Er is een fout opgetreden tijdens het aanmaken van uw account.', null, {
          duration: 5000
        });
      }
    });
  }
}
