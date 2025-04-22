import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../Components/notes/notes.component';


@Injectable({ providedIn: 'root' })
export class NotesService {
  private api = 'https://localhost:7008/api/Notes';

  constructor(private http: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.api);
  }

  getNote(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.api}/${id}`);
  }

  createNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.api, note);
  }

  updateNote(note: Note): Observable<void> {
    return this.http.put<void>(`${this.api}/${note.id}`, note);
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}