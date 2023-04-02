import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { Inject, Injectable } from '@angular/core';
import { RoomList } from '../rooms';
import { environment } from '../../../environments/environment'
import { inject } from '@angular/core/testing';
import { AppConfig } from 'src/app/AppConfig/appconfig.interface';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  roomList: RoomList[] = [
  ]
  headers = new HttpHeaders({ 'token': "1234lnj vjfj" })

  getRooms$ = this.http.get<RoomList[]>('/api/rooms', {
    headers: this.headers
  }).pipe(shareReplay(1));

  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient) {
    console.log(this.config.apiEndpoint)
    console.log("Rooms Service Initialized...")
  }

  getRooms() {
    const headers = new HttpHeaders({ 'token': "1234lnj vjfj" })
    return this.http.get<RoomList[]>('/api/rooms', {
      headers: headers
    });
  }

  addRooms(room: RoomList) {
    return this.http.post<RoomList[]>('api/rooms', room, {
      headers: this.headers
    });
  }
  editRoom(room: RoomList) {
    return this.http.put<RoomList[]>(`api/rooms/${room.roomNumber}`, room);
  }

  deleteRoom(id: string) {
    return this.http.delete<RoomList[]>(`api/rooms/${id}`);
  }

  getPhotos() {
    const request = new HttpRequest("GET", `https://jsonplaceholder.typicode.com/photos`, {
      reportProgress: true,
    })

    return this.http.request(request);
  }
}
