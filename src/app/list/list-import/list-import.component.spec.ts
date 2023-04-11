import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListImportComponent } from './list-import.component';

describe('ListImportComponent', () => {
  let component: ListImportComponent;
  let fixture: ComponentFixture<ListImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
