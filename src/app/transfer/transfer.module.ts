import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferRoutingModule } from './transfer-routing.module';
import { TransferPreparationComponent } from './transfer-preparation/transfer-preparation.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDateAdapter, NgbDateStruct, NgbDateParserFormatter, NgbModalModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '../shared/shared.module';
import { TransferListComponent } from './transfer-list/transfer-list.component';

@Injectable()
 export class CustomNgbDateAdapter extends NgbDateAdapter<string> {

   readonly DELIMITER = '-';

   fromModel(value: string | null): NgbDateStruct | null {
     if (value) {
       let date = value.split(this.DELIMITER);
       return {
         day : parseInt(date[0], 10),
         month : parseInt(date[1], 10),
         year : parseInt(date[2], 10)
       };
     }
     return null;
   }

   toModel(date: NgbDateStruct | null): string | null {
     return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
   }
 }

 /**
  * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
  */
@Injectable()
 export class CustomNgbDateParserFormatter extends NgbDateParserFormatter {

   readonly DELIMITER = '/';

   parse(value: string): NgbDateStruct | null {
     if (value) {
       let date = value.split(this.DELIMITER);
       return {
         day : parseInt(date[0], 10),
         month : parseInt(date[1], 10),
         year : parseInt(date[2], 10)
       };
     }
     return null;
   }

   format(date: NgbDateStruct | null): string {
     return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
   }
 }


@NgModule({
  declarations: [
    TransferPreparationComponent,
    TransferListComponent
  ],
  imports: [
    CommonModule,
    TransferRoutingModule,
    InlineSVGModule.forRoot(),
    SharedModule,
    CommonModule,
    InlineSVGModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgSelectModule,
    NgbModalModule,
    HttpClientModule,
    NgbDatepickerModule,
    // MatTabsModule,
    // MatDividerModule,
    // MatRadioModule,
    // MatCheckboxModule,
  ],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomNgbDateAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomNgbDateParserFormatter},
  ],
})
export class TransferModule { }
