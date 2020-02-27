import {Component, OnInit} from '@angular/core';
import {Player} from '../models/player';
import {AuthService} from '../authentication/auth.service';
import {PlayerService} from '../services/player.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  player: Player;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getPlayer().subscribe(player => this.player = player);
  }
}
