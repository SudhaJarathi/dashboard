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

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.dashboardService.getData().subscribe((data) => {
      this.data = data;
    });
  }

  onRowClick(event: any) {
    const rowId = event.data.id;
    this.hasViewClicked = true;
    this.router.navigate(['/details', rowId]);
  }

  onDetailDataChange(updatedData: string) {
    this.hasViewClicked = false;
  }
}
