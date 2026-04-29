import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMaterialIssuanceComponent } from './show-material-issuance.component';

describe('ShowMaterialIssuanceComponent', () => {
  let component: ShowMaterialIssuanceComponent;
  let fixture: ComponentFixture<ShowMaterialIssuanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowMaterialIssuanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowMaterialIssuanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
