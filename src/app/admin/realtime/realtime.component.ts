import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../realtime-list/document.service';
import { Observable, Subscription } from 'rxjs';
import { Document } from '../realtime-list/document';
import { startWith } from 'rxjs/operators';
import { Utilities } from '../parent-products/Utilties';

@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.scss']
})
export class RealtimeComponent implements OnInit {

  document: Document;
  private _docSub: Subscription;

  constructor(private documentService: DocumentService, private utilities: Utilities){}

  ngOnInit(){
       //ocultar icono y estado de reciviendo pedidos
		this.utilities.setCambioRuta(true);
    this._docSub = this.documentService.currentDocument.pipe(
      startWith( {id: '', doc: 'Select an existing document or create a new one to get started'})
    ).subscribe(document => this.document = document);
    console.log('first time what happens to this.document');
    console.log(this.document);
  }

  ngOnDestroy(){
    this._docSub.unsubscribe();
  }

  editDoc(){
    /* this will fire document on keyup event from the text area */
    /* This will emite editDoc on socket */
    this.documentService.editDocument(this.document);
  }

}
