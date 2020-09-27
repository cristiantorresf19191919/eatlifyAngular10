import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingGlobalComponent } from './loading-global.component';

describe('LoadingGlobalComponent', () => {
  let component: LoadingGlobalComponent;
  let fixture: ComponentFixture<LoadingGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingGlobalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
