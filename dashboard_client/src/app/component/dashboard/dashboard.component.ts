import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { DashboardService } from './dashboard.service';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnChanges {
  data: Product[] = [];
  hasViewClicked = false;

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hasViewClicked']) {
      this.getData();
    }
  }

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
