import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyFaComponent } from './verify-fa.component';

describe('VerifyFaComponent', () => {
  let component: VerifyFaComponent;
  let fixture: ComponentFixture<VerifyFaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyFaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifyFaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
