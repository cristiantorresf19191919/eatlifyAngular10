import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SliderModule} from 'primeng/slider';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {KeyFilterModule} from 'primeng/keyfilter';
import {SpinnerModule} from 'primeng/spinner';
import {FieldsetModule} from 'primeng/fieldset';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {ChartModule} from 'primeng/chart';
import {CheckboxModule} from 'primeng/checkbox';
import {MultiSelectModule} from 'primeng/multiselect';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    SliderModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    KeyFilterModule,
    SpinnerModule,
    FieldsetModule,
    MenuModule,
    ChartModule,
    CheckboxModule,
    MultiSelectModule




  ],
  providers:[MessageService]
})
export class PrimengModule { }
