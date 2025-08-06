import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderDto } from 'src/app/proxy/dto-models';
import { CadreType } from 'src/app/proxy/enum';
import { OrderService } from 'src/app/proxy/services';
import { Common } from 'src/app/shared/common/common';
import { SubSink } from 'subsink';
import pdfMake from 'pdfmake/build/pdfmake';

pdfMake.fonts = {
  // download default Roboto font from cdnjs.com
  Roboto: {
    normal:
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    italics:
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics:
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
  },
  NIKOSH: {
    normal:
      'https://db.onlinewebfonts.com/t/aec382221b330b8581963c1bcc7c61d9.ttf',
    bold: 'https://db.onlinewebfonts.com/t/aec382221b330b8581963c1bcc7c61d9.ttf',
    italics:
      'https://db.onlinewebfonts.com/t/aec382221b330b8581963c1bcc7c61d9.ttf',
    bolditalics:
      'https://db.onlinewebfonts.com/t/aec382221b330b8581963c1bcc7c61d9.ttf',
  },
};

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

  // PDF PROPERTIES
  pdfDefinition: any;
  pdfContent: any[] = [];

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

  convertDateToBengali(dt) {
    return Common.dateToBengali(dt, false);
  }

  view(itemId: number): void {
    // Implement view logic here
  }

  edit(itemId: number): void {
    // Implement edit logic here
  }

  generatePdf(id: number): void {
    this.spinnerService.show();
    this.prepareData();
    this.createDocument();
    setTimeout(() => {
      this.spinnerService.hide();
      pdfMake.createPdf(this.pdfDefinition).open();
    }, 1500);
  }

  open(){}

  getPdfTableHeader(): any[] {
    return [
      [
        { text: 'ক্রম', style: 'headerTexts', rowSpan: 2 },
        {
          text: 'মন্ত্রনালয়/বিভাগ/দপ্তর/সংস্থার নাম',
          style: 'headerTexts',
          rowSpan: 2,
        },
        {
          text: 'পূর্ববর্তী মাসের অডিট আপত্তির জের',
          style: 'headerTexts',
          colSpan: 2,
        },
        {},
        {
          text: 'বর্তমান মাসের অডিট আপত্তি',
          style: 'headerTexts',
          colSpan: 2,
        },
        {},
        { text: 'মোট আপত্তির তথ্য', style: 'headerTexts', colSpan: 2 },
        {},
        {
          text: 'গত মাসে প্রেরিত ব্রডশিট জবাবের সংখ্যা',
          style: 'headerTexts',
          rowSpan: 2,
        },
        {
          text: 'অনিষ্পন্ন ব্রডশিট জবাবের সংখ্যা',
          style: 'headerTexts',
          rowSpan: 2,
        },
        {
          text: 'বর্তমান মাসের অডিট আপত্তি নিষ্পত্তির তথ্য',
          style: 'headerTexts',
          colSpan: 2,
        },
        {},
        { text: 'স্থিতি সংক্রান্ত তথ্য', style: 'headerTexts', colSpan: 5 },
        {},
        {},
        {},
        {},
        { text: 'মন্তব্য', style: 'headerTexts', rowSpan: 2 },
      ],
      [
        {},
        {},
        { text: 'সংখ্যা', style: 'headerTexts' },
        { text: 'টাকার পরিমাণ', style: 'headerTexts' },
        { text: 'সংখ্যা', style: 'headerTexts' },
        { text: 'টাকার পরিমাণ', style: 'headerTexts' },
        { text: 'সংখ্যা (৩+৫)', style: 'headerTexts' },
        { text: 'টাকার পরিমাণ (৪+৬)', style: 'headerTexts' },
        { text: '', style: 'headerTexts' },
        { text: '', style: 'headerTexts' },
        { text: 'সংখ্যা', style: 'headerTexts' },
        { text: 'টাকার পরিমাণ', style: 'headerTexts' },
        { text: 'ননএসএফআই আপত্তির সংখ্যা', style: 'headerTexts' },
        { text: 'এসএফআই আপত্তির সংখ্যা', style: 'headerTexts' },
        { text: 'রিপোর্টভুক্ত আপত্তির সংখ্যা', style: 'headerTexts' },
        { text: 'মোট আপত্তির সংখ্যা (১৩+১৪+১৫-১১)', style: 'headerTexts' },
        { text: 'মোট টাকার পরিমাণ', style: 'headerTexts' },
        { text: '', style: 'headerTexts' },
      ],
      [
        { text: '১', style: 'headerTexts' },
        { text: '২', style: 'headerTexts' },
        { text: '৩', style: 'headerTexts' },
        { text: '৪', style: 'headerTexts' },
        { text: '৫', style: 'headerTexts' },
        { text: '৬', style: 'headerTexts' },
        { text: '৭', style: 'headerTexts' },
        { text: '৮', style: 'headerTexts' },
        { text: '৯', style: 'headerTexts' },
        { text: '১০', style: 'headerTexts' },
        { text: '১১', style: 'headerTexts' },
        { text: '১২', style: 'headerTexts' },
        { text: '১৩', style: 'headerTexts' },
        { text: '১৪', style: 'headerTexts' },
        { text: '১৫', style: 'headerTexts' },
        { text: '১৬', style: 'headerTexts' },
        { text: '১৭', style: 'headerTexts' },
        { text: '১৮', style: 'headerTexts' },
      ],
    ];
  }

  prepareData() {
    this.pdfContent = [];
    let headerData = this.getPdfTableHeader();
    headerData.forEach((element) => {
      this.pdfContent.push(element);
    });
    let serial: number = 1;

    // this.summaries.forEach((data) => {
    //   this.pdfContent.push([
    //     {
    //       text: this.toLocal(data.serial),
    //       alignment: 'center',
    //       margin: [0, 3, 0, 0],
    //     },
    //     { text: data.name, style: 'tableTexts' },
    //     {
    //       text: this.toLocal(data.previousObjectionNumber),
    //       style: 'tableNumbers',
    //     },
    //     {
    //       text: '-', //text: this.toLakhAndLocal(data.previousObjectionAmount),
    //       style: 'tableNumbers',
    //     },
    //     {
    //       text: this.toLocal(data.currentObjectionNumber),
    //       style: 'tableNumbers',
    //     },
    //     {
    //       text: '-', //text: this.toLakhAndLocal(data.currentObjectionAmount),
    //       style: 'tableNumbers',
    //     },
    //     {
    //       text: this.toLocal(data.subTotalObjectionNumber),
    //       style: 'tableNumbers',
    //     },
    //     {
    //       text: '-', //text: this.toLakhAndLocal(data.subTotalObjectionAmount),
    //       style: 'tableNumbers',
    //     },
    //     {
    //       text: this.toLocal(data.previousBroadsheetNumber),
    //       style: 'tableNumbers',
    //     },
    //     {
    //       text: this.toLocal(data.unsetteledBroadsheetNumber),
    //       style: 'tableNumbers',
    //     },
    //     {
    //       text: this.toLocal(data.currentObjectionSettlementNumber),
    //       style: 'tableNumbers',
    //     },
    //     {
    //       text: '-', //text: this.toLakhAndLocal(data.currentObjectionSettlementAmount),
    //       style: 'tableNumbers',
    //     },
    //     { text: this.toLocal(data.nonSfiNumber), style: 'tableNumbers' },
    //     { text: this.toLocal(data.sfiNumber), style: 'tableNumbers' },
    //     { text: this.toLocal(data.draftNumber), style: 'tableNumbers' },
    //     {
    //       text: this.toLocal(data.totalObjectionNumber),
    //       style: 'tableNumbers',
    //     },
    //     {
    //       text: '-', //text: this.toLakhAndLocal(data.totalObjectionAmount),
    //       style: 'tableNumbers',
    //     },
    //     { text: '', style: 'tableTexts' },
    //   ]);
    // });
  }

  createDocument() {
    this.pdfDefinition = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      // watermark: {text:'Public Works Department',color: '#c9c7c7'},
      info: {
        title: 'Audit Report',
      },
      content: [
        {
          text: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার',
          // style: 'header1',
          alignment: 'center',
          fontSize: 14,
        },
        {
          text: 'প্রধান প্রকৌশলীর কার্যালয়\nগণপূর্ত মনিটরিং এন্ড অডিট সার্কেল,\nপূর্ত ভবন, ঢাকা।\nফোনঃ ০২২২৩৩৮২২০৭',
          style: 'header2',
          alignment: 'center',
        },
        '\n\nবিষয়ঃ মাসিক সমন্বয় সভার জন্য অডিট আপত্তি সংক্রান্ত তথ্য',
        {
          columns: [
            [{ text: 'মাসের নামঃ __________________________________________' }],
            [
              {
                text: 'টাকার পরিমাণঃ লক্ষ টাকায়',
                alignment: 'right',
              },
            ],
          ],
          style: 'lineSpacing12',
        },
        // {text: 'Column/row spans', pageBreak: 'before', style: 'subheader'},
        // {text: 'Column/row spans', style: 'subheader'},
        // 'Each cell-element can set a rowSpan or colSpan',
        {
          style: 'tableSetup',
          // color: '#444',
          // layout: 'lightHorizontalLines',
          table: {
            widths: [15, '*', 25, 40, 25, 40, 25, 40, 25, 25, 25, 40, 30, 30, 30, 30, 40, 40],
            headerRows: 3,
            // keepWithHeaderRows: 1,
            dontBreakRows: true,

            body: this.pdfContent,
            style: 'lineSpacing24',
          },
        },
        { text: '', style: 'lineSpacing60' },
      ],
      // pageMargins: [ this.inchToPointConvert(0.7), this.inchToPointConvert(0.8), this.inchToPointConvert(0.2), this.inchToPointConvert(0.4) ],
      footer: function (currentPage, pageCount) {
        return {
          margin: 0,
          columns: [
            {
              // fontSize: 9,
              text: [
                {
                  text: 'HR Transfer System',
                  // style: 'footer1',
                  margin: [2, 0, 0, 0],
                },
              ],
              // alignment: 'center'
            },
            {
              // fontSize: 9,
              text: [
                {
                  text:
                    pageCount > 1
                      ? `${currentPage.toString()} of ${pageCount}`
                      : '',
                  style: 'footerPageNumber',
                },
              ],
              alignment: 'center',
            },
            {
              fontSize: 9,
              text: [
                {
                  text: '', //new Date().toLocaleDateString(),
                },
              ],
              // alignment: 'center'
            },
          ],
        };
      },
      defaultStyle: {
        font: 'NIKOSH',
        fontSize: 10,
      },
      styles: {
        lineSpacing12: {
          margin: [0, 0, 0, 12],
        },
        lineSpacing24: {
          margin: [0, 0, 0, 24],
          fontSize: 14,
        },
        lineSpacing60: {
          margin: [0, 0, 0, 60],
        },
        tableSetup: {
          margin: [-5, 0, -5, 0],
          // margin: [0, 5, 0, 15]
        },
        headerTexts: {
          fontSize: 9,
          alignment: 'center',
          margin: [0, 2, 0, 0],
        },
        // header: {
        //   fontSize: 9,
        //   alignment: 'right',
        //   margin: [0, 5, 0, 0]
        // },
        tableTexts: {
          fontSize: 10,
          margin: [0, 3, 0, 0],
        },
        tableNumbers: {
          fontSize: 9,
          alignment: 'right',
          margin: [0, 3, 0, 0],
        },
        footer1: {
          fontSize: 6,
          margin: [10, 0, 0, 0],
          // alignment: 'center'
        },
        footerPageNumber: {
          fontSize: 6,
          // alignment: 'center'
        },
      },
    };
  }

  inchToPointConvert(num: number) {
    return num * 72;
  }
}
