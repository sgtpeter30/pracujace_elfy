import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWriteLetterComponent } from './new-write-letter.component';

describe('NewWriteLetterComponent', () => {
  let component: NewWriteLetterComponent;
  let fixture: ComponentFixture<NewWriteLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewWriteLetterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewWriteLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
