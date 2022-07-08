import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEnvoiComponent } from './add-envoi.component';

describe('AddEnvoiComponent', () => {
  let component: AddEnvoiComponent;
  let fixture: ComponentFixture<AddEnvoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEnvoiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEnvoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
