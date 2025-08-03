import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PreparationService } from '../../shared/services/preparation.service';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  cacheSVG: boolean = true;
  isPrep: boolean = false;
  isOfficeAdmin: boolean = false;
  isAuditAdmin: boolean = false;
  canView: boolean = false;
  showSubordinateOfficeResponses: boolean = true;
  officeName: string = "";
  subs = new SubSink();
  sfiValue: string = '';
  nonSFIValue: string = '';
  draftValue: string = '';
  totalValue: string = '';

  // objections: ObjectionDto[] = [];

  // filterModel:ObjectionFilterModel = {
  //   officeCode: '',
  //   financialYear: '',
  //   objectionType: 0,
  //   directorateType: 0,
  //   objectionStatus: ObjectionStatus.None,
  //   offset: 0,
  //   limit: 5,
  //   pageNo: 0,
  //   pageSize: 0,
  //   isDesc: false,
  // };

  constructor(
    private prep:PreparationService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private spinnerService: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.prep.refresh();

    // if(this.prep.isAuditAdmin())
    //   this.router.navigateByUrl('/audit/monitor');

    // this.isOfficeAdmin = this.prep.isOfficeAdmin();
    // this.isAuditAdmin = this.prep.isAuditAdmin();
    // this.canView = this.prep.isValid() || this.isAuditAdmin;
    // this.showSubordinateOfficeResponses = !this.prep.getUserName().startsWith('ee_');

    // if(!this.isOfficeAdmin && !this.canView)
    //   this.router.navigateByUrl('/error/denied');
    // this.loadSummaries();
    // this.loadObjections();
  }

  // loadSummaries() {
  //   this.spinnerService.show();
  //   this.filterModel.officeCode = this.prep.posting.userName;
  //   this.summaryService.getByOfficeByOfficeCode(this.filterModel.officeCode).subscribe((x) => {
  //     this.spinnerService.hide();
  //     this.summary = x;
  //     this.prepareSummaryCard();
  //     this.officeName = this.prep.offices.find(x => x.code == this.filterModel.officeCode)?.displayNameBn;
  //     this.cdRef.detectChanges();
  //   })
  // }

  // prepareSummaryCard() {
  //   let sfiInfo = this.summary.summaryLines[0];
  //   this.sfiValue = `আপত্তি ${this.toLocal(sfiInfo.count.toString())} টি \nজড়িত টাকা ${this.toLocal(sfiInfo.value)}/- \nব্রডশীট জবাব প্রদান \nহয়েছে: ${this.toLocal(sfiInfo.broadSheet)} টি, হয় নাই: ${this.toLocal(sfiInfo.nonBroadSheet)} টি \nনিষ্পত্তি ${this.toLocal(sfiInfo.resolved)} টি`;
  //   // \nব্রডশীট জবাব প্রদান করা
  //   let nonSFIInfo = this.summary.summaryLines[1];
  //   this.nonSFIValue = `আপত্তি ${this.toLocal(nonSFIInfo.count.toString())} টি \nজড়িত টাকা ${this.toLocal(nonSFIInfo.value)}/- \nব্রডশীট জবাব প্রদান \nহয়েছে: ${this.toLocal(nonSFIInfo.broadSheet)} টি, হয় নাই: ${this.toLocal(nonSFIInfo.nonBroadSheet)} টি \nনিষ্পত্তি ${this.toLocal(nonSFIInfo.resolved)} টি`;

  //   let draftInfo = this.summary.summaryLines[2];
  //   this.draftValue = `আপত্তি ${this.toLocal(draftInfo.count.toString())} টি \nজড়িত টাকা ${this.toLocal(draftInfo.value)}/- \nব্রডশীট জবাব প্রদান  \nহয়েছে: ${this.toLocal(draftInfo.broadSheet)} টি, হয় নাই: ${this.toLocal(draftInfo.nonBroadSheet)} টি \nনিষ্পত্তি ${this.toLocal(draftInfo.resolved)} টি`;

  //   let totalInfo = this.summary.summaryLines[3];
  //   this.totalValue = `আপত্তি ${this.toLocal(totalInfo.count.toString())} টি \nজড়িত টাকা ${this.toLocal(totalInfo.value)}/- \nব্রডশীট জবাব প্রদান  \nহয়েছে: ${this.toLocal(totalInfo.broadSheet)} টি, হয় নাই: ${this.toLocal(totalInfo.nonBroadSheet)} টি \nনিষ্পত্তি ${this.toLocal(totalInfo.resolved)} টি`;
  // }

  // loadObjections(){
  //   this.spinnerService.show();
  //   this.subs.sink = this.objectionService.searchObjectionsByFilterCriteria(this.filterModel)
  //     .subscribe((responseDto: ObjectionDto[]) => {
  //       this.spinnerService.hide();
  //       this.objections = [] = responseDto;
  //       console.log(this.objections);
  //       this.cdRef.detectChanges();
  //     }, (error) => {
  //     });

  // }

  toLocal(i: any): string {
    return (+i).toLocaleString("bn-BD");
  }

  getViewRouting(id: number){
    return `/audit/objection/view/${id}`;
  }

  getBoolText(x) {
    return x == true ? "হয়েছে" : "হয় নাই ";
  }

  // enumToText(type: string, value: number):string{
  //   if(type === 'directorate')
  //     return directorateTypeOptions.find(o => o.value === +value)?.key;
  //   if(type === 'objection')
  //     return objectionTypeOptions.find(o => o.value === +value)?.key;
  // }

}

