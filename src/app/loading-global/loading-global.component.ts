import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-loading-global',
  templateUrl: './loading-global.component.html',
  styleUrls: ['./loading-global.component.scss']
})
export class LoadingGlobalComponent implements OnInit, OnChanges {
  @Input()loadingState;
  loading:boolean;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    
    this.loading = changes['loadingState'].currentValue;
  }

  ngOnInit() {
    this.loading = this.loadingState;
  }

}
