import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StpperFormComponent } from './stpper-form.component';

describe('StpperFormComponent', () => {
  let component: StpperFormComponent;
  let fixture: ComponentFixture<StpperFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StpperFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StpperFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
