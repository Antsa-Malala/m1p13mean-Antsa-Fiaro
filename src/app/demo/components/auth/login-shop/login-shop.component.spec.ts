import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginShopComponent } from './login-shop.component';

describe('LoginShopComponent', () => {
  let component: LoginShopComponent;
  let fixture: ComponentFixture<LoginShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginShopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
