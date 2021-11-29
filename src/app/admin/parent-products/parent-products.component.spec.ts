import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ParentProductsComponent } from './parent-products.component';

describe('ParentProductsComponent', () => {
  let component: ParentProductsComponent;
  let fixture: ComponentFixture<ParentProductsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
