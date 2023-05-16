import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachesComponent } from './eaches.component';

describe('EachesComponent', () => {
  let component: EachesComponent;
  let fixture: ComponentFixture<EachesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
