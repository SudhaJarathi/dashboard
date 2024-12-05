import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DetailsService } from './details.service';
import { Product } from 'src/app/model/product';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  rowData: any = {};
  id: number | null = null;
  apiUrl: string = 'http://localhost:48612/api/dashboard';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private detailsService: DetailsService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.getData(this.id);
    }
  }

  getData(id: number) {
    this.detailsService.getDetailsData(id).subscribe((data: Product) => {
      this.rowData = data;
    });
  }

  updateData(): void {
    this.detailsService.updateData(this.rowData as Product);
    this.router.navigate(['/']);    
  }

  deleteData(): void {
    this.detailsService.deleteData(this.rowData.id);
    this.router.navigate(['/']);
  }

  backToDashboard(): void {
    this.router.navigate(['/']);  
  }
}