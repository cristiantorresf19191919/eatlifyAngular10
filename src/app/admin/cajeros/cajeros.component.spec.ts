import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CajerosComponent } from './cajeros.component';

describe('CajerosComponent', () => {
  let component: CajerosComponent;
  let fixture: ComponentFixture<CajerosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CajerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CajerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
