import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner/lib/ngx-spinner.service';
import { from } from 'rxjs';
import {
  OrderDetailDto,
  OrderDto,
  OrganizationUnitDto,
  PostingConsumeDto,
} from 'src/app/proxy/dto-models/models';
import { OrderService } from 'src/app/proxy/services';
import { ApprovalService } from 'src/app/proxy/services/approval.service';
import { Common } from 'src/app/shared/common/common';
import { PreparationService } from 'src/app/shared/services/preparation.service';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { TreeMode, TreeNgxComponent } from 'tree-ngx';

@Component({
  selector: 'app-transfer-preparation',
  templateUrl: './transfer-preparation.component.html',
  styleUrls: ['./transfer-preparation.component.scss'],
})
export class TransferPreparationComponent implements OnInit {
  @ViewChild(TreeNgxComponent) tree: TreeNgxComponent;
  // @ViewChild(NgSelectComponent) ngSelectComponent: NgSelectComponent;

  subs = new SubSink();
  cacheSVG = true;
  fg: FormGroup;
  decimalPrecision = 2;

  offices: OrganizationUnitDto[] = [];
  fromZoneOffices: OrganizationUnitDto[] = [];
  fromCircleOffices: OrganizationUnitDto[] = [];
  fromDivisionOffices: OrganizationUnitDto[] = [];
  fromSubDivisionOffices: OrganizationUnitDto[] = [];
  toZoneOffices: OrganizationUnitDto[] = [];
  toCircleOffices: OrganizationUnitDto[] = [];
  toDivisionOffices: OrganizationUnitDto[] = [];
  toSubDivisionOffices: OrganizationUnitDto[] = [];

  fromPostings: PostingConsumeDto[] = [];
  toPostings: PostingConsumeDto[] = [];
  orderDetails: OrderDetailDto[] = [];
  orderdto: OrderDto = {} as OrderDto;

  showFromSpinner: boolean = false;
  showToSpinner: boolean = false;

  officerDesignations: any[] = [
    { designation: 'অতিরিক্ত প্রধান প্রকৌশলী', order: 1, tag: 'ACE' },
    { designation: 'তত্ত্বাবধায়ক প্রকৌশলী', order: 2, tag: 'SE' },
    { designation: 'নির্বাহী প্রকৌশলী', order: 3, tag: 'EXEN' },
    { designation: 'উপ-বিভাগীয় প্রকৌশলী', order: 4, tag: 'SDE' },
    { designation: 'সহকারী প্রকৌশলী', order: 5, tag: 'AE' },
    { designation: 'উপ-সহকারী প্রকৌশলী', order: 6, tag: 'SAE' },
    { designation: 'হিসাবরক্ষক', order: 7, tag: 'Accountant' },
    { designation: 'অন্যান্য', order: 8, tag: 'Others' },
  ];

  nodeItems = [
    {
      id: '0',
      name: 'Heros',
      children: [
        {
          id: '1',
          name: 'Batman',
          item: {
            phrase: 'I am the batman',
          },
        },
        {
          id: '2',
          name: 'Superman',
          item: {
            phrase: 'Man of steel',
          },
        },
      ],
    },
    {
      id: '3',
      name: 'Villains',
      children: [
        {
          id: '4',
          name: 'Joker',
          item: {
            phrase: 'Why so serius',
          },
        },
        {
          id: '5',
          name: 'Lex luthor',
          item: {
            phrase: 'I am the villain of this story',
          },
        },
      ],
    },
  ];

  options = {
    mode: TreeMode.SingleSelect,
    checkboxes: false,
    alwaysEmitSelected: false,
  };

  selectedItems = [];

  constructor(
    private fb: FormBuilder,
    private preparationService: PreparationService,
    private cdRef: ChangeDetectorRef,
    private approvalService: ApprovalService,
    private orderService: OrderService, // private router: Router, // private toasterService: ToasterService, // private spinnerService: NgxSpinnerService, // private approvalService: ApprovalService,
  ) {}

  ngOnInit(): void {
    this.loadForm();
    this.offices = this.preparationService.offices;
    this.getOfficesByLayers('all');
  }

  loadForm() {
    this.fg = this.fb.group({
      fromZone: [''],
      fromCircle: [''],
      fromDivision: [''],
      fromSubDivision: [''],
      toZone: [''],
      toCircle: [''],
      toDivision: [''],
      toSubDivision: [''],
      fromPost: [''],
      toPost: [''],
      designation: ['উপ-সহকারী প্রকৌশলী বদলীকরণ'],
      memoNo: [''],
      executeDate: [this.todaysDate()],
    });
  }

  todaysDate(){
    return new Date();
  }

  getOfficesByLayers(mode: string) {
    switch (mode) {
      case 'all':
        // this.fg.reset();
        this.fromZoneOffices = this.toZoneOffices = this.offices.filter(
          (office) => office.layer === 'Zone'
        );
        this.fromCircleOffices = this.toCircleOffices = this.offices.filter(
          (office) => office.layer === 'Circle'
        );
        this.fromDivisionOffices = this.toDivisionOffices = this.offices.filter(
          (office) => office.layer === 'Division'
        );
        this.fromSubDivisionOffices = this.toSubDivisionOffices =
          this.offices.filter((office) => office.layer === 'SubDivision');
        break;
      case 'from':
        this.fromZoneOffices = this.offices.filter(
          (office) => office.layer === 'Zone'
        );
        this.fromCircleOffices = this.offices.filter(
          (office) => office.layer === 'Circle'
        );
        this.fromDivisionOffices = this.offices.filter(
          (office) => office.layer === 'Division'
        );
        this.fromSubDivisionOffices = this.offices.filter(
          (office) => office.layer === 'SubDivision'
        );
        break;
      case 'to':
        this.toZoneOffices = this.offices.filter(
          (office) => office.layer === 'Zone'
        );
        this.toCircleOffices = this.offices.filter(
          (office) => office.layer === 'Circle'
        );
        this.toDivisionOffices = this.offices.filter(
          (office) => office.layer === 'Division'
        );
        this.toSubDivisionOffices = this.offices.filter(
          (office) => office.layer === 'SubDivision'
        );
        break;
    }
    this.cdRef.detectChanges();
  }

  reset(mode: string) {
    switch (mode) {
      case 'all':
        this.fg.reset();
        this.fromPostings = this.toPostings = [];
        break;
      case 'from':
        this.fg.controls.fromZone.setValue('');
        this.fg.controls.fromCircle.setValue('');
        this.fg.controls.fromDivision.setValue('');
        this.fg.controls.fromSubDivision.setValue('');
        this.fromPostings = [];
        break;
      case 'to':
        this.toZoneOffices = [];
        this.toCircleOffices = [];
        this.toDivisionOffices = [];
        this.toSubDivisionOffices = [];
        this.toPostings = [];
        break;
    }
    this.getOfficesByLayers(mode);
  }

  onFromZoneChange(event) {
    console.log(event);
    // var officeCode = event.code;
    this.fromCircleOffices = this.offices.filter(
      (office) => office.layer === 'Circle' && office.parentCode === event.code
    );
    this.showFromSpinner = true;
    this.getPostings(event.code, 'from');
    this.fromDivisionOffices = [];
    this.fromSubDivisionOffices = [];
  }

  onFromCircleChange(event) {
    this.fromDivisionOffices = this.offices.filter(
      (office) =>
        office.layer === 'Division' && office.parentCode === event.code
    );
    this.showFromSpinner = true;
    this.getPostings(event.code, 'from');
    this.fromSubDivisionOffices = [];
  }

  onFromDivisionChange(event) {
    this.fromSubDivisionOffices = this.offices.filter(
      (office) =>
        office.layer === 'SubDivision' && office.parentCode === event.code
    );
    this.showFromSpinner = true;
    this.getPostings(event.code, 'from');
  }

  onFromSubDivisionChange(event) {
    this.showFromSpinner = true;
    this.getPostings(event.code, 'from');
  }

  onToZoneChange(event) {
    this.toCircleOffices = this.offices.filter(
      (office) => office.layer === 'Circle' && office.parentCode === event.code
    );
    this.showToSpinner = true;
    this.getPostings(event.code, 'to');
    this.toDivisionOffices = [];
    this.toSubDivisionOffices = [];
  }

  onToCircleChange(event) {
    this.toDivisionOffices = this.offices.filter(
      (office) =>
        office.layer === 'Division' && office.parentCode === event.code
    );
    this.showToSpinner = true;
    this.getPostings(event.code, 'to');
    this.toSubDivisionOffices = [];
  }

  onToDivisionChange(event) {
    this.toSubDivisionOffices = this.offices.filter(
      (office) =>
        office.layer === 'SubDivision' && office.parentCode === event.code
    );
    this.showToSpinner = true;
    this.getPostings(event.code, 'to');
  }

  onToSubDivisionChange(event) {
    this.showToSpinner = true;
    this.getPostings(event.code, 'to');
  }

  getPostings(officeCode: string, mode: string) {
    this.approvalService
      .officePostingsByUserName(officeCode)
      .subscribe((postings) => {
        if (mode === 'from') {
          this.fromPostings = this.extractSAEs(postings);
          this.showFromSpinner = false;
        } else {
          this.toPostings = this.extractSAEs(postings);
          this.showToSpinner = false;
        }
        this.cdRef.detectChanges();
      });
  }

  extractSAEs(postings: PostingConsumeDto[]) {
    const saes = postings.filter((posting) =>
      posting.post.includes('Sub-Assistant Engineer')
    );
    return saes;
  }

  toLocal(i: any): string {
    return (+i).toLocaleString('bn-BD');
  }

  extractEmployeeInfo(posting: PostingConsumeDto, onlyPost: boolean) {
    if (onlyPost) {
      return `${posting.designationBn} - ${posting.officeBn}`;
    }
    return `${posting.nameBn} - ${posting.designationBn} - ${posting.officeBn}`;
  }

  // onTypeChange() {
  //   // this.ngSelectComponent.handleClearClick();
  //   if (
  //     +this.fg.controls.type.value === 1 ||
  //     +this.fg.controls.type.value === 4
  //   )
  //     this.fg.controls.subType.setValue('0');
  // }

  add() {
    if (this.fg.controls.fromPost.value === '') {
      Swal.fire({
        icon: 'warning',
        title: 'থামুন...',
        text: 'বর্তমান কর্মস্থল নির্বাচন করুন!',
      });
      return;
    }
    if (this.fg.controls.toPost.value === '') {
      Swal.fire({
        icon: 'warning',
        title: 'থামুন...',
        text: 'পদায়নকৃত কর্মস্থল নির্বাচন করুন!',
      });
      return;
    }
    let fromPost = this.fromPostings.find(
      (post) => post.id === this.fg.controls.fromPost.value
    );
    let toPost = this.toPostings.find(
      (post) => post.id === this.fg.controls.toPost.value
    );
    const orderDetail: OrderDetailDto = {
      employeeId: fromPost.id ? fromPost.id : '',
      employeeNameBn: fromPost.nameBn ? fromPost.nameBn : '',
      postFromId: fromPost.postingId ? fromPost.postingId : 0,
      postFromNameBn: fromPost.designationBn ? fromPost.designationBn : '',
      postFromOfficeBn: fromPost.officeBn ? fromPost.officeBn : '',
      postToId: toPost.postingId ? toPost.postingId : 0,
      postToNameBn: toPost.nameBn ? toPost.nameBn : '',
      postToOfficeBn: toPost.officeBn ? toPost.officeBn : '',
      orderId: 0,
      sequence:
        this.officerDesignations.find(
          (od) => od.designation === 'উপ-সহকারী প্রকৌশলী'
        )?.orderId || 0,
    };
    this.orderDetails.push(orderDetail);
    this.fg.controls.fromPost.setValue('');
    this.fg.controls.toPost.setValue('');
  }

  save() {
    if (!this.validateInput()) {
      return;
    }
    this.orderdto = {
      designation: this.fg.controls.designation.value,
      memoNo: this.fg.controls.memoNo.value,
      executeDate: this.fg.controls.executeDate.value,
      orderDetails: this.orderDetails,
    };
    this.orderService.create(this.orderdto).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'সফল',
        text: 'সফলভাবে তৈরি হয়েছে!',
      });
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'ত্রুটি',
        text: 'দুঃখিত, অর্ডারটি তৈরি করতে সমস্যার সৃষ্টি হয়েছে!',
      });
    });
  }

  validateInput(): boolean {

    let isValid = true;
    // if (this.fg.controls.designation.value) {
    //   if (this.fg.controls.designation.value === '') {
    //     Swal.fire({
    //       icon: 'warning',
    //       title: 'থামুন...',
    //       text: 'পদ করুন!',
    //     });
    // isValid = false;
    //   }
    // }
    if (this.fg.controls.memoNo.value === '') {
      Swal.fire({
        icon: 'warning',
        title: 'থামুন...',
        text: 'স্মারক নম্বর এন্ট্রি করুন!',
      });
      isValid = false;
    }
    if (this.fg.controls.executeDate.value === '') {
      Swal.fire({
        icon: 'warning',
        title: 'থামুন...',
        text: 'তারিখ এন্ট্রি করুন!',
      });
      isValid = false;
    }
    if (this.orderDetails.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'থামুন...',
        text: 'কর্মকর্তা যোগ করুন!',
      });
      isValid = false;
    }
    return isValid;// validateInput(mode: string): boolean {
    // switch (mode) {
    //   case 'order':
    //     let isValid = true;
    //     // if (this.fg.controls.designation.value) {
    //     //   if (this.fg.controls.designation.value === '') {
    //     //     Swal.fire({
    //     //       icon: 'warning',
    //     //       title: 'থামুন...',
    //     //       text: 'পদ করুন!',
    //     //     });
    //     // isValid = false;
    //     //   }
    //     // }
    //     if (this.fg.controls.memoNo.value) {
    //       if (this.fg.controls.memoNo.value === '') {
    //         Swal.fire({
    //           icon: 'warning',
    //           title: 'থামুন...',
    //           text: 'স্মারক নম্বর এন্ট্রি করুন!',
    //         });
    //         isValid = false;
    //       }
    //     }
    //     if (this.fg.controls.executeDate.value) {
    //       if (this.fg.controls.executeDate.value === '') {
    //         Swal.fire({
    //           icon: 'warning',
    //           title: 'থামুন...',
    //           text: 'তারিখ এন্ট্রি করুন!',
    //         });
    //         isValid = false;
    //       }
    //     }
    //     return isValid;

    //   case 'orderDetails':
    //     if (this.orderDetails.length === 0) {
    //       Swal.fire({
    //         icon: 'warning',
    //         title: 'থামুন...',
    //         text: 'কর্মকর্তা যোগ করুন!',
    //       });
    //     }
    //     return false;
    //   default:
    //     return false;
    // }
  }

  // onNodeSelect(event: any){
  //   console.log(event);
  // }

  // onNodeSelect2(event: any){
  //   console.log(event);
  // }

  // selectNodeById(id: string) {
  //   // Update data manually
  //   this.updateSelection(this.nodeItems, id);
  //   // Or use tree API if available (check documentation)
  //   // this.tree.selectNode(id);
  //   // Trigger change detection if needed
  //   this.nodeItems = [...this.nodeItems];
  // }

  // private updateSelection(nodes: any[], targetId: string) {
  //   for (const node of nodes) {
  //     if (node.id === targetId) {
  //       node.selected = true;
  //     }
  //     if (node.children) {
  //       this.updateSelection(node.children, targetId);
  //     }
  //   }
  // }
}
