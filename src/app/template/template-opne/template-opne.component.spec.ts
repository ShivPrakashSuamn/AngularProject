import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateOpneComponent } from './template-opne.component';

describe('TemplateOpneComponent', () => {
  let component: TemplateOpneComponent;
  let fixture: ComponentFixture<TemplateOpneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateOpneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateOpneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
