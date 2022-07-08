import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunionDetailsComponent } from './reunion-details.component';

describe('ReunionDetailsComponent', () => {
  let component: ReunionDetailsComponent;
  let fixture: ComponentFixture<ReunionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReunionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReunionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
