import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCakeComponent } from './new-cake.component';

describe('NewCakeComponent', () => {
  let component: NewCakeComponent;
  let fixture: ComponentFixture<NewCakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCakeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
