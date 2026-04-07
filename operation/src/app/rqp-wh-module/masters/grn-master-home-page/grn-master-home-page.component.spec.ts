import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnMasterHomePageComponent } from './grn-master-home-page.component';

describe('GrnMasterHomePageComponent', () => {
  let component: GrnMasterHomePageComponent;
  let fixture: ComponentFixture<GrnMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrnMasterHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrnMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
