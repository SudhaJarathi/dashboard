import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DetailsService } from './details.service';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  rowData: any = {};
  id: number | null = null;
  @Output() onDataChange = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private detailsService: DetailsService,
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.getData(this.id);
    }
  }

  getData(id: number): void {
    this.detailsService.getDetailsData(id).subscribe((data: Product) => {
      this.rowData = data;
    });
  }

  createData(): void {
    this.detailsService.createData(this.rowData as Product).subscribe(() => {
      this.reset('New row added successfully');
    });
  }

  updateData(): void {
    this.detailsService.updateData(this.rowData as Product).subscribe(() => {
      this.reset('Row updated successfully');
    });
  }

  deleteData(): void {
    this.detailsService.deleteData(this.rowData.id).subscribe(() => {
      this.reset('Row deleted successfully');
    });
  }

  backToDashboard(): void {
    this.reset('');
  }

  private reset(alertMessage?: string): void {
    if (alertMessage) {
      alert(alertMessage);
    }
    this.onDataChange.emit();
    this.rowData = [];
    this.router.navigate(['']);
  }
}
