import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-loading-global',
  templateUrl: './loading-global.component.html',
  styleUrls: ['./loading-global.component.scss']
})
export class LoadingGlobalComponent implements OnInit, OnChanges {
  @Input() loadingState;
  @Input() loadingMessage: string = '';
  loading: boolean;
  
  constructor() { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loadingState']) {
      this.loading = changes['loadingState'].currentValue;
    }
    if (changes['loadingMessage']) {
      this.loadingMessage = changes['loadingMessage'].currentValue;
    }
  }

  ngOnInit() {
    this.loading = this.loadingState;
  }
}
