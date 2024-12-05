import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  rowData: any = {};
  apiUrl: string = 'https://your-api-endpoint.com/items'; // Replace with your actual API endpoint

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const rowId = this.route.snapshot.paramMap.get('id');
    if (rowId) {
      this.fetchRowData(rowId);
    }
  }

  fetchRowData(id: string): void {
    this.http.get(`${this.apiUrl}/${id}`).subscribe(
      (response) => {
        this.rowData = response;
      },
      (error) => {
        console.error('Error fetching row data:', error);
      }
    );
  }

  updateRow(): void {
    this.http.put(`${this.apiUrl}/${this.rowData.id}`, this.rowData).subscribe(
      (response) => {
        console.log('Row updated:', response);
        this.router.navigate(['/']); // Navigate back to the dashboard
      },
      (error) => {
        console.error('Error updating row:', error);
      }
    );
  }

  deleteRow(): void {
    this.http.delete(`${this.apiUrl}/${this.rowData.id}`).subscribe(
      (response) => {
        console.log('Row deleted:', response);
        this.router.navigate(['/']); // Navigate back to the dashboard
      },
      (error) => {
        console.error('Error deleting row:', error);
      }
    );
  }
}