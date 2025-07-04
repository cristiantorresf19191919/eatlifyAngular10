import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Document } from './document';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  /* socket.on('getDoc') socket.emit('document',doc) */
  /* preparando para escuchar el evento document del servidor*/
  currentDocument = this.socket.fromEvent<Document>('document');
  documents = this.socket.fromEvent<string[]>('documents');
  constructor(private socket: Socket) { }
  getDocument(id:string){
    this.socket.emit('getDoc',id);
  }
  newDocument(){
    this.socket.emit('addDoc',{id:this.docId(),doc:''});
  }
  editDocument(document:Document){
    this.socket.emit('editDoc',document);
  }
  /* funcion generadora de ids*/
  private docId(){
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++ ){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
