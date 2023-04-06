import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaignCreateComponent } from './compaign-create.component';

describe('CompaignCreateComponent', () => {
  let component: CompaignCreateComponent;
  let fixture: ComponentFixture<CompaignCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaignCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompaignCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
