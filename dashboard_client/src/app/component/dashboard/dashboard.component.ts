import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DashboardService } from './dashboard.service';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: Product[] = [];

  constructor(private router: Router, private dashboardService: DashboardService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.dashboardService.getData().subscribe((data) => {
      this.data = data;
    });
  }

  //ToDo - extend update and delete functionality.
  onRowClick(event: any) {
    const rowId = event.data.id;
    this.router.navigate(['/details', rowId]); // Navigate to details page with the row ID
  }

}
