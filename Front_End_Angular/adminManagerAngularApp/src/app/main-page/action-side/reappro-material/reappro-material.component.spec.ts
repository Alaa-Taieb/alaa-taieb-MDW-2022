import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReapproMaterialComponent } from './reappro-material.component';

describe('ReapproMaterialComponent', () => {
  let component: ReapproMaterialComponent;
  let fixture: ComponentFixture<ReapproMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReapproMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReapproMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
