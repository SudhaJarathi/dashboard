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
    this.id = 1; //Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.getData(this.id);
    }
  }

  getData(id: number) {
    this.detailsService.getDetailsData(id).subscribe((data: Product) => {
      this.rowData = data;
    });
  }

  createData(): void {
    this.detailsService.createData(this.rowData as Product).subscribe(() => {
      alert('New row added successfully');
      this.onDataChange.emit();
      this.router.navigate(['']);
    });
  }

  updateData(): void {
    this.detailsService.updateData(this.rowData as Product).subscribe(() => {
      alert('Row updated successfully');
      this.onDataChange.emit();
      this.router.navigate(['']);
    });
  }

  deleteData(): void {
    this.detailsService.deleteData(this.rowData.id).subscribe(() => {
      alert('Row deleted successfully');
      this.onDataChange.emit();
      this.router.navigate(['']);
    });
  }

  backToDashboard(): void {
    this.onDataChange.emit();
    this.router.navigate(['']);
  }
}
