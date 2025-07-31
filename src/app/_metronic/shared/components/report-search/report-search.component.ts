import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReportFilterModel } from 'src/app/proxy';
import { OrganizationUnitDto } from 'src/app/proxy/dto-models';
import { objectionTypeOptions, directorateTypeOptions, DirectorateType, ObjectionType, ObjectionStatus } from 'src/app/proxy/enum';
import { ApprovalService } from 'src/app/proxy/services';
import { Common } from 'src/app/shared/common/common';
import { PreparationService } from 'src/app/shared/services/preparation.service';
import { SearchResetService } from '../../crud-table/services/search-reset.service';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-report-search',
  templateUrl: './report-search.component.html',
  styleUrls: ['./report-search.component.scss']
})
export class ReportSearchComponent implements OnInit {

  @Input() searchCriteriaViewOptions;

  fg: FormGroup;

  // objectionTypes: any[] = objectionTypeOptions;
  // directorateType: any[] = directorateTypeOptions;
  objectionTypes = Common.objectionTypes;
  directorateType: any[] = Common.directorateTypes;
  financialYears: any[] = [];
  offices: OrganizationUnitDto[] = [];
  objectionStatuses = Common.objectionStatusesInBangla;

  // filterModel = Common.reportFilterGeneralCriteria;
  filterModel:ReportFilterModel = {
    directorateType: DirectorateType.None,
    objectionType: ObjectionType.None,
    objectionStatus: ObjectionStatus.None,
    offices: [],
    financialYear: 0,
    offset: 0,
    limit: 0,
    pageNo: 0,
    pageSize: 100,
    isDesc: false,
  };

  @Output() searchCriteriaEvent = new EventEmitter<ReportFilterModel>();
  @ViewChild(NgSelectComponent) ngSelectComponent: NgSelectComponent;

  constructor(
    private fb: FormBuilder,
    private approvalService:ApprovalService,
    private preparationService:PreparationService,
    private searchResetService: SearchResetService,
        private cdRef: ChangeDetectorRef,) { }

  ngOnInit(): void {
    this.financialYears = Common.generateFinancialYears();console.log(this.financialYears)
    this.loadForm();

    this.approvalService.getUserByRoleByRoleName(Common.AuditOfficeAdmin)
      .subscribe((response) => {
        this.offices = Common.getOfficeList(this.preparationService.offices, response); console.log(this.offices)
      }, (error) => {

      });

    this.searchResetService.getData().subscribe(data => {
      if(data){
        this.loadForm();
        this.updateFilterModel();
      }
    });

    this.searchCriteriaEvent.emit(this.filterModel);
  }

  loadForm() {
    this.fg = this.fb.group({

      directorateType: [DirectorateType.None],
      objectionType: [ObjectionType.None],
      objectionStatus: [ObjectionStatus.None],
      office: [''],
      financialYear: [0],
      selectedOffices: []

    });
  }

  onSelectionChange(){
    console.log(this.fg.controls.selectedOffices.value);

    this.updateFilterModel();
    this.searchCriteriaEvent.emit(this.filterModel);
  }

  updateFilterModel(){
    let values = this.fg.value;
    this.filterModel.directorateType = values.directorateType;
    this.filterModel.objectionType = values.objectionType;
    this.filterModel.financialYear = values.financialYear;
    this.filterModel.objectionStatus = values.objectionStatus;
    let selectedOffices = this.fg.controls.selectedOffices.value;
    if(selectedOffices?.length > 0){
      this.filterModel.offices = [];
      this.filterModel.offices = selectedOffices;
    } else {
      this.filterModel.offices = [];
    }
    // if(values.office !== ''){
    //   this.filterModel.offices = [];
    //   this.filterModel.offices.push(values.office);
    // } else {
    //   this.filterModel.offices = [];
    // }
  }

  clearMultipleSelection(){
    this.ngSelectComponent.clearModel();
    console.log(this.fg.controls.selectedOffices.value);
  }

}
