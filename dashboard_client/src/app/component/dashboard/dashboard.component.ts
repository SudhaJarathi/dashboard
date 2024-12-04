import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: any[] = [];
  chartData: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
  }

  //Need to move this code to service component.
  fetchData() {
    this.http.get<any[]>('http://localhost:5208/api/dashboard').subscribe((data) => {
      this.data = data;
    });
  }

  //ToDo - extend update and delete functionality.
  onRowClick(event: any) {
    alert('You clicked on: ' + event.data.name);
  }

}
