import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Player} from '../models/player';
import {PlayerService} from '../services/player.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../authentication/auth.service';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  playerForm = this.fb.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    password: ['']
  });

  player: Player;
  user: Player;
  username: string;

  constructor(
    private fb: FormBuilder,
    private playerService: PlayerService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.authService.getPlayer().subscribe(user => {
      this.user = user;
      this.loadPlayer();
    });

    this.route.paramMap.subscribe(params => {
      if (params.get('username')) {
        this.username = params.get('username');
        this.loadPlayer();
      }
    })
  }

  loadPlayer() {
    if (!this.user || !this.username) {
      return;
    }

    this.playerService.getPlayer(this.username).subscribe(player => {
      if (this.user._id != player._id && !this.user.isAdmin()) {
        this.snackBar.open('U mag deze gebruiker niet aanpassen', null, {
          duration: 5000
        });
        this.router.navigate(['/players', player.username]);
        return;
      }

      this.player = player;
      this.playerForm.patchValue({
        name: player.name,
        username: player.username
      });
    }, error => {
      if (error.error.message) {
        this.snackBar.open(error.error.message, null, {
          duration: 5000
        });
      } else {
        this.snackBar.open('Er is een fout opgetreden tijdens het aanpassen van uw speler', null, {
          duration: 5000
        });
      }
    });
  }

  onSubmit() {
    if (this.playerForm.invalid) {
      return;
    }

    let data = this.playerForm.value;
    let p = new Player();
    p.name = data.name;
    p.username = data.username;
    p.local = {
      password: data.password
    };

    this.playerService.editPlayer(this.username, p).subscribe(player => {
      this.router.navigate(['/players', player.username]);
      this.snackBar.open('Uw speler is aangepast', null, {
        duration: 5000
      });
    }, error => {
      if (error.error.message) {
        this.snackBar.open(error.error.message, null, {
          duration: 5000
        });
      } else {
        this.snackBar.open('Er is een fout opgetreden tijdens het aanpassen van uw speler', null, {
          duration: 5000
        });
      }
    });
  }
}
