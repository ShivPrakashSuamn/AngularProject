import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaignPublishComponent } from './compaign-publish.component';

describe('CompaignPublishComponent', () => {
  let component: CompaignPublishComponent;
  let fixture: ComponentFixture<CompaignPublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaignPublishComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompaignPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
