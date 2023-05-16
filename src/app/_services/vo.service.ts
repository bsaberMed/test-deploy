import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Vo } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class VoService {

  constructor(private router: Router,
              private http: HttpClient) { }

  add(vo: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
      return this.http.post<any>(`${environment.apiUrl}voUpdate.php`, vo, { headers });
  }

  delete(id: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${environment.apiUrl}voDelete.php`, id, { headers });
  }

  addList(vo: Vo[]) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    
    return this.http.post(`${environment.apiUrl}vo.php`, vo, { headers: headers });
  }

  get() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    
    return this.http.get(`${environment.apiUrl}voList.php`, { headers: headers });
  }
}
