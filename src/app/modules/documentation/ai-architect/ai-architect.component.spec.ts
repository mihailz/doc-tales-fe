import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiArchitectComponent } from './ai-architect.component';

describe('AiArchitectComponent', () => {
  let component: AiArchitectComponent;
  let fixture: ComponentFixture<AiArchitectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiArchitectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiArchitectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
