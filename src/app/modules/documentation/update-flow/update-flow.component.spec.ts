import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFlowComponent } from './update-flow.component';

describe('UpdateFlowComponent', () => {
  let component: UpdateFlowComponent;
  let fixture: ComponentFixture<UpdateFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
