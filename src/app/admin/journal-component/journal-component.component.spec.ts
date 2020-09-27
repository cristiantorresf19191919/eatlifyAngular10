import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalComponentComponent } from './journal-component.component';

describe('JournalComponentComponent', () => {
  let component: JournalComponentComponent;
  let fixture: ComponentFixture<JournalComponentComponent>;

  beforeEach(async(() => {
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
