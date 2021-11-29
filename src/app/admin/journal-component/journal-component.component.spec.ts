import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JournalComponentComponent } from './journal-component.component';

describe('JournalComponentComponent', () => {
  let component: JournalComponentComponent;
  let fixture: ComponentFixture<JournalComponentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
