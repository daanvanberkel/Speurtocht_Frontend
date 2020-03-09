import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import Socket = SocketIOClient.Socket;
import {environment} from '../../environments/environment';
import {AuthService} from '../authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;

  constructor(
    private authService: AuthService
  ) {}

  public getSocket(): Socket {
    if (!this.socket) {
      this.socket = io(environment.api_base, {
        transportOptions: {
          polling: {
            extraHeaders: {
              'Authorization': `Bearer ${this.authService.getJwt()}`
            }
          }
        }
      });
    }

    return this.socket;
  }
}
