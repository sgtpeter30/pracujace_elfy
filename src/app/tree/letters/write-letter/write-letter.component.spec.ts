import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteLetterComponent } from './write-letter.component';

describe('WriteLetterComponent', () => {
  let component: WriteLetterComponent;
  let fixture: ComponentFixture<WriteLetterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WriteLetterComponent]
    });
    fixture = TestBed.createComponent(WriteLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
