import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllCompanies(): Observable<any> {
    return this.http.get('https://api.npoint.io/a1b1c28b32d9785bb26c');
  }

  getAllTickets(): Observable<any> {
    return this.http.get('https://api.npoint.io/163b5e66df9f2741243e');
  }
}
