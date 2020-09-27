/* import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { rootReducer } from './reducers/rootReducer';
import {
  NgReduxModule,
  NgRedux,
  DevToolsExtension,
} from '@angular-redux/store';


@NgModule({
    declarations: [],
    imports: [CommonModule, NgReduxModule],
    exports: [NgReduxModule],
  })


  export class ReduxModule{
    constructor(public store: NgRedux<any>, devTools: DevToolsExtension) {
        store.configureStore(rootReducer, {}, [], [devTools.enhancer()]);
      }
  } */