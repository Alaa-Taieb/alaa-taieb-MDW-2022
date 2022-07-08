import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEnvoiComponent } from './details-envoi.component';

describe('DetailsEnvoiComponent', () => {
  let component: DetailsEnvoiComponent;
  let fixture: ComponentFixture<DetailsEnvoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsEnvoiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsEnvoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
