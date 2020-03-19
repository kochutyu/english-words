import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnNewWordsComponent } from './learn-new-words.component';

describe('LearnNewWordsComponent', () => {
  let component: LearnNewWordsComponent;
  let fixture: ComponentFixture<LearnNewWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnNewWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnNewWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
