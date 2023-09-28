import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowsManagerComponent } from './flows-manager.component';

describe('FlowsManagerComponent', () => {
  let component: FlowsManagerComponent;
  let fixture: ComponentFixture<FlowsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowsManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
