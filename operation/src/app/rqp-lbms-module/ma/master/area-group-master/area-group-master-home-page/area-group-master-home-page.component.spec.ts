import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaGroupMasterHomePageComponent } from './area-group-master-home-page.component';

describe('AreaGroupMasterHomePageComponent', () => {
  let component: AreaGroupMasterHomePageComponent;
  let fixture: ComponentFixture<AreaGroupMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaGroupMasterHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaGroupMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
