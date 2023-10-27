import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {


  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:4800'); // Replace with your backend URL
  }

  // Emit an event with optional data
  emit(event: string, data?: any): void {
    this.socket.emit(event, data);
  }

  // Listen for an event and return an Observable to subscribe to
  on<T>(event: string): Observable<T> {
    return new Observable((observer) => {
      this.socket.on(event, (data: T) => {
        observer.next(data);
      });
      return () => {
        this.socket.off(event);
      };
    });
  }
}
