import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirflightComponent } from './airflight.component';

describe('AirflightComponent', () => {
  let component: AirflightComponent;
  let fixture: ComponentFixture<AirflightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirflightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirflightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
