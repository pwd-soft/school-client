import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Common } from 'src/app/shared/common/common';
import { SubSink } from 'subsink';
import pdfMake from 'pdfmake/build/pdfmake';
import { SchoolDto } from '../../proxy/dto-models';
import { SchoolService } from '../../proxy/services';
import { PreparationService } from '../../shared/services/preparation.service';

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
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss'],
})
export class SchoolListComponent implements OnInit {
  subs = new SubSink();
  cacheSVG = true;
  fg: FormGroup;

  schools: SchoolDto[] = [];

  // PDF PROPERTIES
  pdfDefinition: any;
  pdfContent: any[] = [];

  constructor(
    private schoolService: SchoolService, 
    private prep: PreparationService,
    private cdRef: ChangeDetectorRef,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.spinnerService.show();
    
    this.subs.sink = this.schoolService
      .getListByOfficeByCode("ee_nator")
      //.getListByOfficeByCode(this.prep.getUserName())
      .subscribe((s) => {
        this.spinnerService.hide();
        this.schools = s;
        this.cdRef.detectChanges();
        console.log(s);
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
        { text: 'ক্রম', style: 'headerTexts' },
        { text: 'নাম ও পদবী', style: 'headerTexts' },
        { text: 'বর্তমান কর্মস্থল', style: 'headerTexts' },
        { text: 'পদায়নকৃত কর্মস্থল', style: 'headerTexts' },
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

   
  }

  createDocument() {
    this.pdfDefinition = {
      pageSize: 'A4',
      // pageOrientation: 'landscape',
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
          // text: 'প্রধান প্রকৌশলীর কার্যালয়\nগণপূর্ত মনিটরিং এন্ড অডিট সার্কেল,\nপূর্ত ভবন, ঢাকা।\nফোনঃ ০২২২৩৩৮২২০৭',
          text: 'গণপূর্ত অধিদপ্তর\nপূর্ত ভবন, ঢাকা।\nফোনঃ ০২২২৩৩৮২২০৭',
          style: 'header2',
          alignment: 'center',
        },
        '\n\n',
        // '\n\nবিষয়ঃ মাসিক সমন্বয় সভার জন্য অডিট আপত্তি সংক্রান্ত তথ্য',
        // {
        //   columns: [
        //     [{ text: 'মাসের নামঃ __________________________________________' }],
        //     [
        //       {
        //         text: 'টাকার পরিমাণঃ লক্ষ টাকায়',
        //         alignment: 'right',
        //       },
        //     ],
        //   ],
        //   style: 'lineSpacing12',
        // },
        // {text: 'Column/row spans', pageBreak: 'before', style: 'subheader'},
        // {text: 'Column/row spans', style: 'subheader'},
        // 'Each cell-element can set a rowSpan or colSpan',
        {
          style: 'tableSetup',
          // color: '#444',
          // layout: 'lightHorizontalLines',
          table: {
            // widths: [15, '*', 25, 40, 25, 40, 25, 40, 25, 25, 25, 40, 30, 30, 30, 30, 40, 40],
            widths: [30, '*', 150, 150],
            headerRows: 1,
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
