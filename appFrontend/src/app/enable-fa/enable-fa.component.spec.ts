import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableFaComponent } from './enable-fa.component';

describe('EnableFaComponent', () => {
  let component: EnableFaComponent;
  let fixture: ComponentFixture<EnableFaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnableFaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnableFaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
