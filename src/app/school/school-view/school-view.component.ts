import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchoolService } from '../../proxy/services';
import { ActivatedRoute } from '@angular/router';
import { BuildingDto, SchoolDto } from '../../proxy/dto-models';
import {
  BuildingInputDto,
  SchoolInputDto,
  StudentInputDto,
} from '../../proxy/input-dtos';
import {toBengaliNumber} from 'bengali-number';

@Component({
  selector: 'app-school-view',
  templateUrl: './school-view.component.html',
  styleUrls: ['./school-view.component.scss'],
})
export class SchoolViewComponent implements OnInit {
  schoolForm: FormGroup;
  buildingForm: FormGroup;
  studentForm: FormGroup;
  cacheSVG = true;
  buildings: BuildingInputDto[] = [];
  id: string = '';
  bIds: number[] = [];
  school: SchoolDto = {} as SchoolDto;
  editId: number = 0;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,

    private schoolService: SchoolService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.loadForm();
    this.loadData();
  }

  loadForm() {
    this.schoolForm = this.fb.group({
      id: [0],
      officeCode: [''],
      sdOfficeCode: [''],
      division: [''],
      district: ['', Validators.required],
      thana: ['', Validators.required],
      sequence: [''],
      name: ['', Validators.required],
      emis: ['', Validators.required],
      headMaster: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      isSaved: [false],
      totalLandDecimals: [0, [Validators.required, Validators.min(0)]],
      undisputedLandDecimals: [0, [Validators.required, Validators.min(0)]],
      hasLandComplications: [false, Validators.required],
      complicatedLandDecimals: [0, Validators.min(0)],
      landRecordedInGovtName: [false, Validators.required],
      boundaryDetermined: [false, Validators.required],
      boundaryWallNeededFeet: [0, [Validators.required, Validators.min(0)]],
      totalTeacherPosts: [0, [Validators.required, Validators.min(0)]],
      workingTeachers: [0, [Validators.required, Validators.min(0)]],
      shiftType: ['Single', Validators.required],
      isRiverErosionProne: [false, Validators.required],
      distanceFromRiverMeters: [0, Validators.min(0)],
      additionalRoomsMethod: ['', Validators.required],
      spaceAvailableForNewBuilding: [false, Validators.required],
      needsTemporaryRoomsDuringConstruction: [false, Validators.required],
      additionalClassroomsRequired: [
        0,
        [Validators.required, Validators.min(0)],
      ],
      recommendation: [''],
      soilFillingCubicFeet: [0, [Validators.required, Validators.min(0)]],
      fieldLengthFeet: [0, [Validators.required, Validators.min(0)]],
      fieldWidthFeet: [0, [Validators.required, Validators.min(0)]],
      fieldHeightFeet: [0, [Validators.required, Validators.min(0)]],
      northBoundaryFeet: [0, [Validators.required, Validators.min(0)]],
      southBoundaryFeet: [0, [Validators.required, Validators.min(0)]],
      eastBoundaryFeet: [0, [Validators.required, Validators.min(0)]],
      westBoundaryFeet: [0, [Validators.required, Validators.min(0)]],
      specialComments: [''],
    });
    this.buildingForm = this.fb.group({
      buildingNumber: [0, [Validators.required, Validators.min(1)]],
      constructionYear: [0, [Validators.required, Validators.min(1900)]],
      projectName: [''],
      foundationFloors: [0, [Validators.required, Validators.min(0)]],
      currentFloors: [0, [Validators.required, Validators.min(0)]],
      usableRooms: [0, [Validators.required, Validators.min(0)]],
      unusableRooms: [0, [Validators.required, Validators.min(0)]],
      isRisky: [false, Validators.required],
      isAbandoned: [false, Validators.required],
      isDamagedDeclared: [false, Validators.required],
      isUnderConstruction: [false, Validators.required],
      expandedOrRepairedLast5Years: [false, Validators.required],
      buildingType: ['', Validators.required],
      comments: [''],
      lengthFeet: [0, [Validators.required, Validators.min(0)]],
      widthFeet: [0, [Validators.required, Validators.min(0)]],
      isProposed: [false, Validators.required],
      schoolId: [0],
    });

    this.studentForm = this.fb.group({
      prePrimary4Plus: [0, [Validators.required, Validators.min(0)]],
      prePrimary5Plus: [0, [Validators.required, Validators.min(0)]],
      class1: [0, [Validators.required, Validators.min(0)]],
      class2: [0, [Validators.required, Validators.min(0)]],
      class3: [0, [Validators.required, Validators.min(0)]],
      class4: [0, [Validators.required, Validators.min(0)]],
      class5: [0, [Validators.required, Validators.min(0)]],
      specialComment: [''],
    });
  }

  calculateTotal() {
    var s = this.school.student;
    if (s)
      return (
        s.class1 +
        s.class2 +
        s.class3 +
        s.class4 +
        s.class5 +
        s.prePrimary4Plus +
        s.prePrimary5Plus
      );
    else return 0;
  }

  loadData() {
    this.schoolService.getById(this.id).subscribe((x: SchoolDto) => {
      console.log(x);
      this.school = x;
      var c = this.schoolForm.controls;
      c.name.setValue(x.name);
      c.emis.setValue(x.emis);
      c.division.setValue(x.division);
      c.district.setValue(x.district);
      c.thana.setValue(x.thana);
      c.sequence.setValue(x.sequence);
      c.headMaster.setValue(x.headMaster);
      c.mobile.setValue(x.mobile);
      c.isSaved.setValue(x.isSaved);
      c.totalLandDecimals.setValue(x.totalLandDecimals);
      c.undisputedLandDecimals.setValue(x.undisputedLandDecimals);
      c.hasLandComplications.setValue(x.hasLandComplications);
      c.complicatedLandDecimals.setValue(x.complicatedLandDecimals);
      c.landRecordedInGovtName.setValue(x.landRecordedInGovtName);
      c.boundaryDetermined.setValue(x.boundaryDetermined);
      c.boundaryWallNeededFeet.setValue(x.boundaryWallNeededFeet);
      c.totalTeacherPosts.setValue(x.totalTeacherPosts);
      c.workingTeachers.setValue(x.workingTeachers);
      c.shiftType.setValue(x.shiftType);
      c.isRiverErosionProne.setValue(x.isRiverErosionProne);
      c.distanceFromRiverMeters.setValue(x.distanceFromRiverMeters);
      c.additionalRoomsMethod.setValue(x.additionalRoomsMethod);
      c.spaceAvailableForNewBuilding.setValue(x.spaceAvailableForNewBuilding);
      c.needsTemporaryRoomsDuringConstruction.setValue(
        x.needsTemporaryRoomsDuringConstruction
      );
      c.additionalClassroomsRequired.setValue(x.additionalClassroomsRequired);
      //c.recommendation.setValue(x.recommendation);
      c.soilFillingCubicFeet.setValue(x.soilFillingCubicFeet);
      c.fieldLengthFeet.setValue(x.fieldLengthFeet);
      c.fieldWidthFeet.setValue(x.fieldWidthFeet);
      c.fieldHeightFeet.setValue(x.fieldHeightFeet);
      c.northBoundaryFeet.setValue(x.northBoundaryFeet);
      c.southBoundaryFeet.setValue(x.southBoundaryFeet);
      c.eastBoundaryFeet.setValue(x.eastBoundaryFeet);
      c.westBoundaryFeet.setValue(x.westBoundaryFeet);
      //c.specialComments.setValue(x.specialComments);
      var c = this.studentForm.controls;
      c.prePrimary4Plus.setValue(x.student.prePrimary4Plus);
      c.prePrimary5Plus.setValue(x.student.prePrimary5Plus);
      c.class1.setValue(x.student.class1);
      c.class2.setValue(x.student.class2);
      c.class3.setValue(x.student.class3);
      c.class4.setValue(x.student.class4);
      c.class5.setValue(x.student.class5);
      c.specialComment.setValue(x.student.specialComment);

      if (x.buildings != null)
        this.buildings = x.buildings as BuildingInputDto[];
      this.cdRef.detectChanges();
    });
  }

  removeBuilding(index: number): void {}

  reset() {
    this.buildingForm.reset();
    this.editId = 0;
    this.cdRef.detectChanges();
  }

  remove(i) {
    console.log(this.buildings[i]);
    var b = this.buildings[i];
    if (b.id > 0) this.bIds.push(b.id);
    this.buildings.splice(i, 1);
  }

  convertNumbersToBengali(num: number) {
    return toBengaliNumber(num);
  }

  convertBooleanToBengali(value: boolean) {
    return value ? 'হ্যাঁ' : 'না';
  }
}
