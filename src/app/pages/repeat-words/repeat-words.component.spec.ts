import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatWordsComponent } from './repeat-words.component';

describe('RepeatWordsComponent', () => {
  let component: RepeatWordsComponent;
  let fixture: ComponentFixture<RepeatWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepeatWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
