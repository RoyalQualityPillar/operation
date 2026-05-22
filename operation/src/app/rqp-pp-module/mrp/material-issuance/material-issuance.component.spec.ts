import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialIssuanceComponent } from './material-issuance.component';

describe('MaterialIssuanceComponent', () => {
  let component: MaterialIssuanceComponent;
  let fixture: ComponentFixture<MaterialIssuanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialIssuanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialIssuanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
