import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DashboardService } from './dashboard.service';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  data: Product[] = [];
  hasViewClicked = false;
  rowId: number = 0;

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.dashboardService.getData().subscribe((data) => {
      this.data = data;
    });
  }

  onRowClick(event: any): void {
    this.rowId = event.data.id;
    this.hasViewClicked = true;
    this.router.navigate(['/details', this.rowId]);
  }

  onDetailDataChange(updatedData: string): void {
    this.getData();
    this.hasViewClicked = false;
  }
}
