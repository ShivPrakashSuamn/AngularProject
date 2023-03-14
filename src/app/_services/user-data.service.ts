import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  url = 'https://randomuser.me/api/';
  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get(this.url);
  }
}
