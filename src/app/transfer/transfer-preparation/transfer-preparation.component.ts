import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner/lib/ngx-spinner.service';
import { OrganizationUnitDto } from 'src/app/proxy/dto-models/models';
import { ApprovalService } from 'src/app/proxy/services/approval.service';
import { SubSink } from 'subsink';
import { TreeMode, TreeNgxComponent } from 'tree-ngx';


@Component({
  selector: 'app-transfer-preparation',
  templateUrl: './transfer-preparation.component.html',
  styleUrls: ['./transfer-preparation.component.scss']
})
export class TransferPreparationComponent implements OnInit {
  @ViewChild(TreeNgxComponent) tree: TreeNgxComponent;

  subs = new SubSink();
  cacheSVG = true;
  fg: FormGroup;
  decimalPrecision = 2;
  offices: OrganizationUnitDto[] = [];

  officerDesignations: any[] = [
    {designation: 'অতিরিক্ত প্রধান প্রকৌশলী', order: 1, tag: 'ACE'},
    {designation: 'তত্ত্বাবধায়ক প্রকৌশলী', order: 2, tag: 'SE'},
    {designation: 'নির্বাহী প্রকৌশলী', order: 3, tag: 'EXEN'},
    {designation: 'উপ-বিভাগীয় প্রকৌশলী', order: 4, tag: 'SDE'},
    {designation: 'সহকারী প্রকৌশলী', order: 5, tag: 'AE'},
    {designation: 'উপ-সহকারী প্রকৌশলী', order: 6, tag: 'SAE'},
    {designation: 'হিসাবরক্ষক', order: 7, tag: 'Accountant'},
    {designation: 'অন্যান্য', order: 8, tag: 'Others'},
  ];

  nodeItems = [{
    id: '0',
    name: 'Heros',
    children: [
      {
        id: '1',
        name: 'Batman',
        item: {
          phrase: 'I am the batman'
        }
      },
      {
        id: '2',
        name: 'Superman',
        item: {
          phrase: 'Man of steel'
        }
      }
    ]
  },
  {
    id: '3',
    name: 'Villains',
    children: [
      {
        id: '4',
        name: 'Joker',
        item: {
          phrase: 'Why so serius'
        }
      },
      {
        id: '5',
        name: 'Lex luthor',
        item: {
          phrase: 'I am the villain of this story'
        }
      }
    ]
  }];

  options = {
    mode: TreeMode.SingleSelect,
    checkboxes: false,
    alwaysEmitSelected: false
  };

  selectedItems = [];

  constructor(
    private fb: FormBuilder,
    // private activatedRoute: ActivatedRoute,
    // private router: Router,
    // private cdRef: ChangeDetectorRef,
    // private toasterService: ToasterService,
    // private preparationService: PreparationService,
    // private spinnerService: NgxSpinnerService,
    // private approvalService: ApprovalService,
  ) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.fg = this.fb.group({

    //   directorateType: [this.objection?.directorateType ? this.objection.directorateType : 1],
    //   objectionType: [this.objection?.objectionType ? this.objection.objectionType : 0],
    //   year: [this.objection?.financialYear ? this.objection.financialYear : ''],
    //   value: [this.objection?.value ? this.objection.value : 0],
    //   name: [this.objection?.name ? this.objection.name : ''],
    //   description: [this.objection?.description ? this.objection.description : ''],
    //   response: [this.objection?.response ? this.objection.response : ''],
    //   note: [this.objection?.note ? this.objection.note : ''],
    //   objectionStatus:  [this.objection?.objectionStatus ? this.objection.objectionStatus : ObjectionStatus.BroadSheetNotAnswered],
    //   memoNumber: [this.objection?.memoNumber ? this.objection.memoNumber : ''],
    //   memoDate: [this.objection?.memoDate ? Common.ParseDateForUI(this.objection.memoDate.toString()) : Common.ParseDateForUI(new Date().toString())],
    //   answerCount: [this.objection?.answerCount ? this.objection.answerCount : 0],
    //   comments: [this.objection?.comments ? this.objection.comments : ''],
    //   articleNumber: [this.objection?.articleNumber ? this.objection.articleNumber : ''],
    //   objectionMemoNumber: [this.objection?.objectionMemoNumber ? this.objection.objectionMemoNumber : ''],
    //   objectionDate: [this.objection?.objectionDate ? Common.ParseDateForUI(this.objection.objectionDate.toString()) : Common.ParseDateForUI(new Date().toString())],
    //   associateName: [''],
    //   associateDesignation: [''],
    //   associatePost: [''],
    //   associateNote: [''],
    //   associateBCSID: [''],
    //   selectedOffice: ['']
    });
  }

  onNodeSelect(event: any){
    console.log(event);
  }

  onNodeSelect2(event: any){
    console.log(event);
  }

  selectNodeById(id: string) {
    // Update data manually
    this.updateSelection(this.nodeItems, id);
    // Or use tree API if available (check documentation)
    // this.tree.selectNode(id);
    // Trigger change detection if needed
    this.nodeItems = [...this.nodeItems];
  }

  private updateSelection(nodes: any[], targetId: string) {
    for (const node of nodes) {
      if (node.id === targetId) {
        node.selected = true;
      }
      if (node.children) {
        this.updateSelection(node.children, targetId);
      }
    }
  }

  save(){}

}
