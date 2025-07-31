import { Injectable } from '@angular/core';
import _ from 'lodash';
import {
  ObjectionDto,
  OrganizationUnitDto,
  PostingDto,
  ResponseHistoryDto,
} from 'src/app/proxy/dto-models/models';
import { ObjectionService, ApprovalService } from 'src/app/proxy/services';
import { PreparationService } from './preparation.service';
import { Common } from '../common/common';
import { SubSink } from 'subsink';

@Injectable({
  providedIn: 'root',
})
export class ResponseReportService {

  subs = new SubSink();

  private objection: ObjectionDto = {} as ObjectionDto;
  private responses: ResponseHistoryDto[] = [];

  private officewiseColumns: any[] = [];
  private officewiseColumnWidths: any[] = [];
  private officewiseColumnDatas: any[] = [];
  private offices: OrganizationUnitDto[] = [];

  private officeCode: string = '';
  private officeName: string = '';
  private superiorOfficeComment: string = '';

  constructor(
    private objectionService: ObjectionService,
    private approvalService: ApprovalService,
    private preparationService: PreparationService
  ) {}

  initializeService(): void {
    this.offices = this.preparationService.offices;
    this.officeCode = Common.getOfficeCodeFromOrganizationUnitId();
    this.responses = this.objection.responseHistories;
    this.updateReportColumnsAndWidthsOfficewise();
  }

  // loadData(objectionId: number){
  //   this.subs.sink = this.objectionService.getById(objectionId).subscribe((x) => {
  //     this.objection = x;
  //     console.log(x);
  //     // this.objectionType = this.objectionTypes.find(i => i.value == this.objection.objectionType)?.key;
  //     // this.directorateType = this.directorateTypes.find(i => i.value == this.objection.directorateType)?.key;
  //     // this.tempResponses = x.responseHistories;
  //     // this.loadPostingData();
  //     // this.spinnerService.hide();
  //     // this.cdRef.detectChanges();
  //     this.updateReportColumnsAndWidthsOfficewise();
  //   });
  // }

  prepareResponse(responseId: number, objection: ObjectionDto) {
    this.objection = objection;
    this.initializeService();
    // this.loadData(objection.id);
    this.getSuperiorLevelComment();
    this.updateOfficewiseResponse(responseId);
    this.officeName = this.preparationService.offices.find(
      (o) => o.code === this.objection.officeCode
    )?.displayNameBn;
    let responseDocument = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      // watermark: {text:'Public Works Department',color: '#c9c7c7'},
      info: {
        title: 'Broadsheet Response',
      },
      content: [
        {
          text: 'অডিট আপত্তির ব্রডশীট জবাব',
          style: 'lineSpacing12',
          alignment: 'center',
          fontSize: 14,
        },
        {
          text: `মন্ত্রণালয়ের নাম  : \tগৃহায়ন ও গণপূর্ত মন্ত্রণালয় `,
          style: 'tableHeader',
        },
        // {
        //   text: `জোন অফিসের নাম  : \t`,
        //   // টেস্ট
        //   style: 'tableHeader'
        // },
        // {
        //   text: `সার্কেল অফিসের নাম  : \t`,
        //   // টেস্ট
        //   style: 'tableHeader'
        // },
        {
          text: `বিভাগীয় অফিসের নাম  : \t${this.officeName}`,
          // টেস্ট
          style: 'tableHeader',
        },
        {
          text: `অর্থবছর  : \t${this.objection?.financialYear}`,
          // টেস্ট
          style: 'tableHeader',
        },
        {
          text: `অনুচ্ছেদ নং  : \t${this.objection?.articleNumber}`,
          // টেস্ট
          style: 'tableHeader',
        },
        { text: '', style: 'lineSpacing12' },
        {
          style: 'tableSetup',
          // color: '#444',
          // layout: 'lightHorizontalLines',
          table: {
            widths: this.officewiseColumnWidths, //[60,120,'*',100,100,100],
            headerRows: 1,
            // keepWithHeaderRows: 1,
            // dontBreakRows: true,
            body: [
              this.officewiseColumns,
              this.officewiseColumnDatas,
              // [
              //   { text: 'অনুচ্ছেদ নং ও সন', style: 'tableTexts'},
              //   {
              //     text: 'আপত্তির শিরোনাম ও বিবরণ',
              //     style: 'tableTexts',
              //   },
              //   {
              //     text: 'নির্বাহী প্রকৌশলীর জবাব ',
              //     style: 'tableTexts'
              //   },
              //   {
              //     text: 'তত্ত্বাবধায়ক প্রকৌশলীর সুপারিশ',
              //     style: 'tableTexts'
              //   },
              //   {
              //     text: 'প্রধান প্রকৌশলীর সুপারিশ',
              //     style: 'tableTexts'
              //   },
              //   {
              //     text: 'মন্ত্রণালয়/পূর্ত অডিটের সুপারিশ',
              //     style: 'tableTexts'
              //   },
              // ],
              // [
              //   {
              //     text: `অনুচ্ছেদ নং: ${this.objection?.articleNumber} \n অর্থবছর: ${this.objection?.financialYear}`
              //   },
              //   {
              //     text: `শিরোনাম: ${this.objection?.name} \n\nবিবরণ: ${this.objection?.name}`,
              //     alignment: 'justify',
              //   },
              //   {
              //     text: currentResponse,
              //     style: 'tableTexts',
              //     alignment: 'justify',
              //   },
              //   {
              //     text: '',
              //     style: 'tableTexts'
              //   },
              //   {
              //     text: '',
              //     style: 'tableTexts'
              //   },
              //   {
              //     text: '',
              //     style: 'tableTexts'
              //   },
              // ],
            ],
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
                  text: 'Audit Monitong & Reporting System',
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
        tableHeader: {
          fontSize: 10,
          // margin: [0, 5, 0, 0]
        },
        tableTexts: {
          // fontSize: 10,
          margin: [0, 3, 0, 0],
          alignment: 'left',
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
    return responseDocument;
  }

  private updateReportColumnsAndWidthsOfficewise() {
    // this.objection.officeCode = 'ace_';
    this.officewiseColumns = [
      { text: 'অনুচ্ছেদ নং ও সন', style: 'tableTexts' },
      {
        text: 'আপত্তির শিরোনাম ও বিবরণ',
        style: 'tableTexts',
      },
    ];
    if (this.objection.officeCode.startsWith('ee')) {
      this.officewiseColumns.push(
        {
          text: 'নির্বাহী প্রকৌশলীর জবাব ',
          style: 'tableTexts',
        },
        {
          text: 'তত্ত্বাবধায়ক প্রকৌশলীর সুপারিশ',
          style: 'tableTexts',
        },
        {
          text: 'প্রধান প্রকৌশলীর সুপারিশ',
          style: 'tableTexts',
        },
        {
          text: 'মন্ত্রণালয়/পূর্ত অডিটের সুপারিশ',
          style: 'tableTexts',
        }
      );
      // this.officewiseColumns = [
      //   { text: 'অনুচ্ছেদ নং ও সন', style: 'tableTexts'},
      //   {
      //     text: 'আপত্তির শিরোনাম ও বিবরণ',
      //     style: 'tableTexts',
      //   },
      //   {
      //     text: 'নির্বাহী প্রকৌশলীর জবাব ',
      //     style: 'tableTexts'
      //   },
      //   {
      //     text: 'তত্ত্বাবধায়ক প্রকৌশলীর সুপারিশ',
      //     style: 'tableTexts'
      //   },
      //   {
      //     text: 'প্রধান প্রকৌশলীর সুপারিশ',
      //     style: 'tableTexts'
      //   },
      //   {
      //     text: 'মন্ত্রণালয়/পূর্ত অডিটের সুপারিশ',
      //     style: 'tableTexts'
      //   },
      // ];
      this.officewiseColumnWidths = [60, 120, '*', 100, 100, 100];
    }

    if (this.objection.officeCode.startsWith('se')) {
      this.officewiseColumns.push(
        {
          text: 'তত্ত্বাবধায়ক প্রকৌশলীর সুপারিশ',
          style: 'tableTexts',
        },
        {
          text: 'প্রধান প্রকৌশলীর সুপারিশ',
          style: 'tableTexts',
        },
        {
          text: 'মন্ত্রণালয়/পূর্ত অডিটের সুপারিশ',
          style: 'tableTexts',
        }
      );
      // this.officewiseColumns = [
      //   { text: 'অনুচ্ছেদ নং ও সন', style: 'tableTexts'},
      //   {
      //     text: 'আপত্তির শিরোনাম ও বিবরণ',
      //     style: 'tableTexts',
      //   },
      //   {
      //     text: 'তত্ত্বাবধায়ক প্রকৌশলীর সুপারিশ',
      //     style: 'tableTexts'
      //   },
      //   {
      //     text: 'প্রধান প্রকৌশলীর সুপারিশ',
      //     style: 'tableTexts'
      //   },
      //   {
      //     text: 'মন্ত্রণালয়/পূর্ত অডিটের সুপারিশ',
      //     style: 'tableTexts'
      //   },
      // ];
      this.officewiseColumnWidths = [60, 200, '*', 100, 100];
    }

    if (this.objection.officeCode.startsWith('ace')) {
      this.officewiseColumns.push(
        {
          text: 'প্রধান প্রকৌশলীর সুপারিশ',
          style: 'tableTexts',
        },
        {
          text: 'মন্ত্রণালয়/পূর্ত অডিটের সুপারিশ',
          style: 'tableTexts',
        }
      );
      // this.officewiseColumns = [
      //   { text: 'অনুচ্ছেদ নং ও সন', style: 'tableTexts'},
      //   {
      //     text: 'আপত্তির শিরোনাম ও বিবরণ',
      //     style: 'tableTexts',
      //   },
      //   {
      //     text: 'প্রধান প্রকৌশলীর সুপারিশ',
      //     style: 'tableTexts'
      //   },
      //   {
      //     text: 'মন্ত্রণালয়/পূর্ত অডিটের সুপারিশ',
      //     style: 'tableTexts'
      //   },
      // ];
      this.officewiseColumnWidths = [60, 250, '*', 100];
    }
  }

  private updateOfficewiseResponse(id: number) {
    let currentResponse = this.responses.find((x) => x.id === id)?.response;

    this.officewiseColumnDatas = [
      {
        text: `অনুচ্ছেদ নং: ${this.objection?.articleNumber} \n অর্থবছর: ${this.objection?.financialYear}`,
      },
      {
        text: `শিরোনাম: ${this.objection?.name} \n\nবিবরণ: ${this.objection?.name}`,
        alignment: 'justify',
      },
    ];

    if (this.objection.officeCode.startsWith('ee')) {
      this.officewiseColumnDatas.push(
        {
          text: currentResponse,
          style: 'tableTexts',
          alignment: 'justify',
        },
        {
          text: this.superiorOfficeComment,
          style: 'tableTexts',
        },
        {
          text: '',
          style: 'tableTexts',
        },
        {
          text: '',
          style: 'tableTexts',
        }
      );
      // this.officewiseColumnDatas = [
      //   {
      //     text: `অনুচ্ছেদ নং: ${this.objection?.articleNumber} \n অর্থবছর: ${this.objection?.financialYear}`
      //   },
      //   {
      //     text: `শিরোনাম: ${this.objection?.name} \n\nবিবরণ: ${this.objection?.name}`,
      //     alignment: 'justify',
      //   },
      //   {
      //     text: currentResponse,
      //     style: 'tableTexts',
      //     alignment: 'justify',
      //   },
      //   {
      //     text: '',
      //     style: 'tableTexts'
      //   },
      //   {
      //     text: '',
      //     style: 'tableTexts'
      //   },
      //   {
      //     text: '',
      //     style: 'tableTexts'
      //   },
      // ];
    }

    if (this.objection.officeCode.startsWith('se')) {
      this.officewiseColumnDatas.push(
        {
          text: currentResponse,
          style: 'tableTexts',
          alignment: 'justify',
        },
        {
          text: '',
          style: 'tableTexts',
        },
        {
          text: '',
          style: 'tableTexts',
        }
      );
      // this.officewiseColumnDatas = [
      //   {
      //     text: `অনুচ্ছেদ নং: ${this.objection?.articleNumber} \n অর্থবছর: ${this.objection?.financialYear}`
      //   },
      //   {
      //     text: `শিরোনাম: ${this.objection?.name} \n\nবিবরণ: ${this.objection?.name}`,
      //     alignment: 'justify',
      //   },
      //   {
      //     text: currentResponse,
      //     style: 'tableTexts',
      //     alignment: 'justify',
      //   },
      //   {
      //     text: '',
      //     style: 'tableTexts'
      //   },
      //   {
      //     text: '',
      //     style: 'tableTexts'
      //   },
      // ];
    }

    if (this.objection.officeCode.startsWith('ace')) {
      this.officewiseColumnDatas.push(
        {
          text: currentResponse,
          style: 'tableTexts',
          alignment: 'justify',
        },
        {
          text: '',
          style: 'tableTexts',
        }
      );
      // this.officewiseColumnDatas = [
      //   {
      //     text: `অনুচ্ছেদ নং: ${this.objection?.articleNumber} \n অর্থবছর: ${this.objection?.financialYear}`
      //   },
      //   {
      //     text: `শিরোনাম: ${this.objection?.name} \n\nবিবরণ: ${this.objection?.name}`,
      //     alignment: 'justify',
      //   },
      //   {
      //     text: currentResponse,
      //     style: 'tableTexts',
      //     alignment: 'justify',
      //   },
      //   {
      //     text: '',
      //     style: 'tableTexts'
      //   },
      // ];
    }
  }

  private getSuperiorLevelComment() {
    let superiorOffice = this.offices.find(
      (o) => o.code === this.objection.officeCode
    ).parentCode;
    let descendingOrderedCommentsOfSuperiorOffice = _.orderBy(
      this.responses[0].responseComments,
      (r) => r.id,
      'desc'
    ).filter((l) => l.user === superiorOffice);
    console.table(descendingOrderedCommentsOfSuperiorOffice);
    this.superiorOfficeComment =
      descendingOrderedCommentsOfSuperiorOffice.length > 0
        ? descendingOrderedCommentsOfSuperiorOffice[0].comment
        : '';
  }
}
