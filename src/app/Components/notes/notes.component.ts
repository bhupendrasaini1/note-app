import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../service/notes.service';

export interface Note {
  id?: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-notes',
  standalone:false,
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  filteredNotes: Note[] = [];

  editMode = false;
  newNote: Note = { title: '', description: '' };
  editingNote: Note | null = null;

  searchText: string = '';
  isCardView: boolean = true;

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.notesService.getNotes().subscribe(data => {
      this.notes = data;
      this.applyFilter();
    });
  }

  toggleView(): void {
    debugger
    this.isCardView = !this.isCardView;
  }

  applyFilter(): void {
    
    const filter = this.searchText.toLowerCase();
    this.filteredNotes = this.notes.filter(note =>
      note.title.toLowerCase().includes(filter) ||
      note.description.toLowerCase().includes(filter)
    );
  }

  onSearchTextChanged(): void {
    this.applyFilter();
  }

  onSubmit(): void {
   
    if (this.editingNote) {
      this.notesService.updateNote({ ...this.newNote }).subscribe(() => {
        this.resetForm();
        this.loadNotes();
      });
    } else {
      this.notesService.createNote(this.newNote).subscribe(() => {
        this.resetForm();
        this.loadNotes();
      });
    }
  }

  onEdit(note: Note): void {
  
    this.editingNote = { ...note };
    this.newNote = { ...note };
  }

  onDelete(note: Note): void {
    if (note.id) {
      this.notesService.deleteNote(note.id).subscribe(() => this.loadNotes());
    }
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.newNote = { title: '', description: '' };
    this.editingNote = null;
  }
}
