import { Component, Inject, OnInit } from '@angular/core';
import { ContinueBookService } from '../services/continue-book.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookDialogueComponent } from '../book-dialogue/book-dialogue.component';

@Component({
  selector: 'app-continue-book',
  templateUrl: './continue-book.component.html',
  styleUrls: ['./continue-book.component.css']
})
export class ContinueBookComponent implements OnInit{
constructor(private continueBookService : ContinueBookService,
  @Inject(MAT_DIALOG_DATA) public data : any ,
  private firstDialog : BookDialogueComponent){

}
  ngOnInit(): void {
    console.log(this.data)
  }

}
