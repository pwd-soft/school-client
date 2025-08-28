import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchoolService } from '../../proxy/services';
import { ActivatedRoute } from '@angular/router';
import { SchoolDto } from '../../proxy/dto-models';


@Component({
  selector: 'app-school-entry',
  templateUrl: './school-entry.component.html',
  styleUrls: ['./school-entry.component.scss']
})
export class SchoolEntryComponent implements OnInit {
  schoolForm: FormGroup;
  cacheSVG = true;

  id: string = "";

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,

    private schoolService: SchoolService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || "";
    this.loadForm()
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

    // Initialize student counts for predefined class levels
    this.addStudentCount('প্রি-প্রাইমারী (৪+)');
    this.addStudentCount('প্রি-প্রাইমারী (৫+)');
    this.addStudentCount('প্রথম শ্রেণী');
    this.addStudentCount('দ্বিতীয় শ্রেণী');
    this.addStudentCount('তৃতীয় শ্রেণী');
    this.addStudentCount('চতুর্থ শ্রেণী');
    this.addStudentCount('পঞ্চম শ্রেণী');
    this.addBuilding(); 
  }

  loadData() {
    this.schoolService.getById(this.id).subscribe((x:SchoolDto) => {
      console.log(x);
      this.schoolForm.controls.name.setValue(x.name);
      this.schoolForm.controls.emis.setValue(x.emis);
      this.schoolForm.controls.division.setValue(x.division);
      this.schoolForm.controls.district.setValue(x.district);
      this.schoolForm.controls.thana.setValue(x.thana);
      this.schoolForm.controls.sequence.setValue(x.sequence);
      //this.upazilaForm.controls.
      this.cdRef.detectChanges();
    });
  }

  get buildings(): FormArray {
    return this.schoolForm.get('buildings') as FormArray;
  }

  get studentCounts(): FormArray {
    return this.schoolForm.get('studentCounts') as FormArray;
  }

  addBuilding(): void {
    const buildingGroup = this.fb.group({
      id: [0],
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
      schoolId: [0]
    });
    this.buildings.push(buildingGroup);
  }

  removeBuilding(index: number): void {
    this.buildings.removeAt(index);
  }

  addStudentCount(classLevel: string): void {
    const studentCountGroup = this.fb.group({
      id: [0],
      classLevel: [classLevel, Validators.required],
      studentNumber: [0, [Validators.required, Validators.min(0)]],
      schoolId: [0]
    });
    this.studentCounts.push(studentCountGroup);
  }

  removeStudentCount(index: number): void {
    this.studentCounts.removeAt(index);
  }

  onSubmit(): void {
    if (this.schoolForm.valid) {
      this.schoolService.create(this.schoolForm.value).subscribe(
        response => {
          console.log('Form saved successfully', response);
        },
        error => {
          console.error('Error saving form', error);
        }
      );
    } else {
      this.schoolForm.markAllAsTouched();
    }
  }
}
