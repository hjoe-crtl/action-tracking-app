import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Action } from '../models/action.model';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private apiUrl = 'http://localhost:8080/api/actions';

  constructor(private http: HttpClient) { }

  getActions(): Observable<Action[]> {
    return this.http.get<Action[]>(this.apiUrl);
  }

  getActionsByStructure(structureId: number): Observable<Action[]> {
    return this.http.get<Action[]>(`${this.apiUrl}/structure/${structureId}`);
  }

  createAction(action: Action): Observable<Action> {
    return this.http.post<Action>(this.apiUrl, action);
  }

  updateAction(id: number, action: Action): Observable<Action> {
    return this.http.put<Action>(`${this.apiUrl}/${id}`, action);
  }

  updateTauxRealisation(id: number, nbLivrablesRealises: number): Observable<Action> {
    return this.http.patch<Action>(`${this.apiUrl}/${id}/taux-realisation`, { nbLivrablesRealises });
  }
}
