import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotLearnedWordsComponent } from './not-learned-words.component';

describe('NotLearnedWordsComponent', () => {
  let component: NotLearnedWordsComponent;
  let fixture: ComponentFixture<NotLearnedWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotLearnedWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotLearnedWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
