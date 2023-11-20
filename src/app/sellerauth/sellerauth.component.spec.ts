import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerauthComponent } from './sellerauth.component';

describe('SellerauthComponent', () => {
  let component: SellerauthComponent;
  let fixture: ComponentFixture<SellerauthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerauthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
