import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchoolService } from '../../proxy/services';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-school-entry',
  templateUrl: './school-entry.component.html',
  styleUrls: ['./school-entry.component.scss']
})
export class SchoolEntryComponent implements OnInit {
  upazilaForm: FormGroup;
  id: string = "";

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,

    private schoolService: SchoolService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || "";
    this.loadForm()
    this.addSchool();
    this.loadData();
  }

  loadForm() {
    this.upazilaForm = this.fb.group({
      district: ['', Validators.required],
      upazila: ['', Validators.required],
      schools: this.fb.array([]),
      aueoName: ['', Validators.required],
      aueoMobile: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      saeAeName: ['', Validators.required],
      saeAeMobile: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      ueoName: ['', Validators.required],
      ueoMobile: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]]
    });
  }

  loadData() {
    this.schoolService.getById(this.id).subscribe((x) => {
      console.log(x);
      //this.upazilaForm.controls.
      this.cdRef.detectChanges();
    });
  }

  get schools(): FormArray {
    return this.upazilaForm.get('schools') as FormArray;
  }

  addSchool(): void {
    const schoolGroup = this.fb.group({
      name: ['', Validators.required],
      emisCode: ['', Validators.required],
      upazila: ['', Validators.required],
      district: ['', Validators.required],
      headTeacherName: ['', Validators.required],
      headTeacherMobile: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
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
      additionalClassroomsRequired: [0, [Validators.required, Validators.min(0)]],
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
      buildings: this.fb.array([]),
      studentCounts: this.fb.array([])
    });
    this.schools.push(schoolGroup);
    this.addBuilding(this.schools.length - 1);
    this.addStudentCount(this.schools.length - 1, 'প্রি-প্রাইমারী (৪+)');
    this.addStudentCount(this.schools.length - 1, 'প্রি-প্রাইমারী (৫+)');
    this.addStudentCount(this.schools.length - 1, 'প্রথম শ্রেণী');
    this.addStudentCount(this.schools.length - 1, 'দ্বিতীয় শ্রেণী');
    this.addStudentCount(this.schools.length - 1, 'তৃতীয় শ্রেণী');
    this.addStudentCount(this.schools.length - 1, 'চতুর্থ শ্রেণী');
    this.addStudentCount(this.schools.length - 1, 'পঞ্চম শ্রেণী');
  }

  removeSchool(index: number): void {
    this.schools.removeAt(index);
  }

  getBuildings(schoolIndex: number): FormArray {
    return this.schools.at(schoolIndex).get('buildings') as FormArray;
  }

  addBuilding(schoolIndex: number): void {
    const buildingGroup = this.fb.group({
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
      isProposed: [false, Validators.required]
    });
    this.getBuildings(schoolIndex).push(buildingGroup);
  }

  removeBuilding(schoolIndex: number, buildingIndex: number): void {
    this.getBuildings(schoolIndex).removeAt(buildingIndex);
  }

  getStudentCounts(schoolIndex: number): FormArray {
    return this.schools.at(schoolIndex).get('studentCounts') as FormArray;
  }

  addStudentCount(schoolIndex: number, classLevel: string): void {
    const studentCountGroup = this.fb.group({
      classLevel: [classLevel, Validators.required],
      studentNumber: [0, [Validators.required, Validators.min(0)]]
    });
    this.getStudentCounts(schoolIndex).push(studentCountGroup);
  }

  removeStudentCount(schoolIndex: number, countIndex: number): void {
    this.getStudentCounts(schoolIndex).removeAt(countIndex);
  }

  onSubmit(): void {
    if (this.upazilaForm.valid) {
      this.schoolService.create(this.upazilaForm.value).subscribe(
        response => {
          console.log('Form saved successfully', response);
        },
        error => {
          console.error('Error saving form', error);
        }
      );
    } else {
      this.upazilaForm.markAllAsTouched();
    }
  }
}
