import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OrderDto } from 'src/app/proxy/dto-models';
import { CadreType } from 'src/app/proxy/enum';
import { OrderService } from 'src/app/proxy/services';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.scss']
})
export class TransferListComponent implements OnInit {

  subs = new SubSink();
  cacheSVG = true;
  fg: FormGroup;

  orders: OrderDto[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.subs.sink = this.orderService.getList(CadreType.NonCadre).subscribe(orders => {
      this.orders = orders;
    });
  }

}
