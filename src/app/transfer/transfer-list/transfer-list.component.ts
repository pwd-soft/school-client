import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderDto } from 'src/app/proxy/dto-models';
import { CadreType } from 'src/app/proxy/enum';
import { OrderService } from 'src/app/proxy/services';
import { Common } from 'src/app/shared/common/common';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.scss'],
})
export class TransferListComponent implements OnInit {
  subs = new SubSink();
  cacheSVG = true;
  fg: FormGroup;

  orders: OrderDto[] = [];

  constructor(
    private orderService: OrderService,
    private cdRef: ChangeDetectorRef,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.spinnerService.show();
    this.subs.sink = this.orderService
      .getList(CadreType.NonCadre)
      .subscribe((orders) => {
        this.spinnerService.hide();
        this.orders = orders;
        this.cdRef.detectChanges();
        console.log(orders);
      });
  }

  toLocal(i: any): string {
    return (+i).toLocaleString('bn-BD');
  }

  convertDateToBengali(dt){
    return Common.dateToBengali(dt, false);
  }

  view(itemId: number): void {
    // Implement view logic here
  }

  edit(itemId: number): void {
    // Implement edit logic here
  }

}
