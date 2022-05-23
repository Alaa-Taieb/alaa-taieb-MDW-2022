import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterPopupComponent } from './affecter-popup.component';

describe('AffecterPopupComponent', () => {
  let component: AffecterPopupComponent;
  let fixture: ComponentFixture<AffecterPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffecterPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffecterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
