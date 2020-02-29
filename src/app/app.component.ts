import {Component, OnInit} from '@angular/core';
import {AuthService} from './authentication/auth.service';
import {Player} from "./authentication/player";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  player: Player;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getPlayer().subscribe(player => this.player = player);
    if (this.authService.getJwt()) {
      this.authService.loadPlayer().subscribe(() => {});
    }
  }
}
