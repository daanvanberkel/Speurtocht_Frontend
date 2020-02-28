import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {PlayerService} from '../services/player.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {PlayersDataSource} from '../datasources/players.datasource';
import {Player} from '../models/player';
import {Observable} from 'rxjs';
import {AuthService} from '../authentication/auth.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns = ['name', 'actions'];
  dataSource = new PlayersDataSource(this.playerService);

  user: Player;

  constructor(
    private authService: AuthService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.authService.getPlayer().subscribe(user => this.user = user);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getScore(player: Player): Observable<number> {
    return this.playerService.playerScore(player.username);
  }
}
