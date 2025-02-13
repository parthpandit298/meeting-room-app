import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MeetingRoom {
  id: number;
  buildingName: string;
  meetingRoomName:string;
  floorNo: number;
  capacity: number;
}

@Injectable({
  providedIn: 'root'
})
export class MeetingRoomService {

  private apiUrl = 'http://localhost:8080/api/meeting-rooms';

  constructor(private http: HttpClient) { }

  getAllRooms(): Observable<MeetingRoom[]> {
    return this.http.get<MeetingRoom[]>(this.apiUrl);
  }

  getRoomById(id: number): Observable<MeetingRoom> {
    return this.http.get<MeetingRoom>(`${this.apiUrl}/${id}`);
  }
}
