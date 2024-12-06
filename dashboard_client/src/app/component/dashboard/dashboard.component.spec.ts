import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { Router } from '@angular/router';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to details page on row click', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    const fixture = TestBed.createComponent(DashboardComponent);
    const component = fixture.componentInstance;
    component.onRowClick({ data: { id: 1 } });

    expect(router.navigate).toHaveBeenCalledWith(['/details', 1]);
  });
});
