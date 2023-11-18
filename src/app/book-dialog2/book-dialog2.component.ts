import { Component , Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookDialogue2Service } from '../services/book-dialogue-2.service';


@Component({
  selector: 'app-book-dialog2',
  templateUrl: './book-dialog2.component.html',
  styleUrls: ['./book-dialog2.component.css']
})
export class BookDialog2Component {
constructor( private dialog2 : BookDialogue2Service , 
  @Inject(MAT_DIALOG_DATA) public data : any, ){}
}
