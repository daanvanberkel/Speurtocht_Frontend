import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Target} from '../../targets/target';
import {ThumbService} from '../thumb.service';
import {Thumb} from '../thumb';
import {Player} from '../../authentication/player';
import {AuthService} from '../../authentication/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-thumbs',
  templateUrl: './thumbs.component.html',
  styleUrls: ['./thumbs.component.scss']
})
export class ThumbsComponent implements OnInit, OnDestroy {

  @Input() target: Target;
  thumb: Thumb;
  player: Player;

  private playerSub: Subscription;

  constructor(
    private thumbService: ThumbService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.playerSub = this.authService.getPlayer().subscribe(player => {
      this.player = player;

      if (player) {
        for (let thumb of this.target.thumbs) {
          if (thumb.player === this.player._id) {
            this.thumb = thumb;
            break;
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.playerSub.unsubscribe();
  }

  onUp() {
    if (!this.player) return;

    if (this.thumb && this.thumb.up) {
      // Delete existing thumb
      this.target.thumbs_up--;
      this.thumbService.deleteThumb(this.target._id).subscribe(() => this.thumb = undefined);
      return;
    }

    this.target.thumbs_up++;
    if (this.thumb) {
      // Remove thumb down and add thumb up
      this.target.thumbs_down--;
      this.thumb = {player: this.player._id, up: true}
      this.thumbService.editThumb(this.target._id, true).subscribe(() => {});
    } else {
      // Add new thumb
      this.thumb = {player: this.player._id, up: true}
      this.thumbService.addThumb(this.target._id, true).subscribe(() => {});
    }
  }

  onDown() {
    if (!this.player) return;

    if (this.thumb && !this.thumb.up) {
      // Delete existing thumb
      this.target.thumbs_down--;
      this.thumbService.deleteThumb(this.target._id).subscribe(() => this.thumb = undefined);
      return;
    }

    this.target.thumbs_down++;
    if (this.thumb) {
      // Remove thumb up and add thumb down
      this.target.thumbs_up--;
      this.thumb = {player: this.player._id, up: false}
      this.thumbService.editThumb(this.target._id, false).subscribe(() => {});
    } else {
      // Add new thumb
      this.thumb = {player: this.player._id, up: false}
      this.thumbService.addThumb(this.target._id, false).subscribe(() => {});
    }
  }
}
