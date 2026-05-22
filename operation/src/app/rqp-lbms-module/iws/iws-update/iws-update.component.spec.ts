import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IwsUpdateComponent } from './iws-update.component';

describe('IwsUpdateComponent', () => {
  let component: IwsUpdateComponent;
  let fixture: ComponentFixture<IwsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IwsUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IwsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
