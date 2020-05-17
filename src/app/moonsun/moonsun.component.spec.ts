import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoonsunComponent } from './moonsun.component';

describe('MoonsunComponent', () => {
  let component: MoonsunComponent;
  let fixture: ComponentFixture<MoonsunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoonsunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoonsunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
