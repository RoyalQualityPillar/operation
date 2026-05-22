import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageEquipmentMasterComponent } from './home-page-equipment-master.component';

describe('HomePageEquipmentMasterComponent', () => {
  let component: HomePageEquipmentMasterComponent;
  let fixture: ComponentFixture<HomePageEquipmentMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageEquipmentMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageEquipmentMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
