import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { DocumentService } from './document.service';

@Component({
  selector: 'app-realtime-list',
  templateUrl: './realtime-list.component.html',
  styleUrls: ['./realtime-list.component.scss']
})
export class RealtimeListComponent implements OnInit {

  documents: Observable<string[]>;
  currentDocId:string;
  private _docSub: Subscription;
  constructor(private documentService: DocumentService) { }
  ngOnInit() {

    this.documents = this.documentService.documents;

    /* leyendo el evento 'document' de socket */
    this._docSub = this.documentService.currentDocument.subscribe(
      doc => this.currentDocId = doc.id
    )
  }
  whatsgoingon(){
    console.log(this.documents);
  }
  ngOnDestroy(){
    this._docSub.unsubscribe();
  }

  loadDoc(id:string){
    this.documentService.getDocument(id);
  }
  newDoc(){
    this.documentService.newDocument();
  }



}
