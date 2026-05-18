import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageEquipInstMasterComponent } from './home-page-equip-inst-master.component';

describe('HomePageEquipInstMasterComponent', () => {
  let component: HomePageEquipInstMasterComponent;
  let fixture: ComponentFixture<HomePageEquipInstMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageEquipInstMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageEquipInstMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
