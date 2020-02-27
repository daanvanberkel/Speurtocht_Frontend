import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.getJwt()) {
      this.router.navigate(['/']);
      return;
    }

    this.route.queryParamMap.subscribe(params => {
      if (params.get('jwt')) {
        this.authService.setJwt(params.get('jwt'));
        this.authService.loadPlayer().subscribe(player => {
          if (localStorage.getItem('redirect_to')) {
            this.router.navigate([localStorage.getItem('redirect_to')]);
            localStorage.removeItem('redirect_to');
          } else {
            this.router.navigate(['/']);
          }
        });
      }
    })
  }

}
