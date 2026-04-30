import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageColumnPerfmTestRegComponent } from './home-page-column-perfm-test-reg.component';

describe('HomePageColumnPerfmTestRegComponent', () => {
  let component: HomePageColumnPerfmTestRegComponent;
  let fixture: ComponentFixture<HomePageColumnPerfmTestRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageColumnPerfmTestRegComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageColumnPerfmTestRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
