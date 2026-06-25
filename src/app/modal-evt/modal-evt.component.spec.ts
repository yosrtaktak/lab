import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEvtComponent } from './modal-evt.component';

describe('ModalEvtComponent', () => {
  let component: ModalEvtComponent;
  let fixture: ComponentFixture<ModalEvtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEvtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEvtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
