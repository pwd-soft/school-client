import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferPreparationComponent } from './transfer-preparation.component';

describe('TransferPreparationComponent', () => {
  let component: TransferPreparationComponent;
  let fixture: ComponentFixture<TransferPreparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferPreparationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferPreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
