import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searches: any[];
  results: string;
  @Input() firstNameSearch: string;
  @Input() lastNameSearch: string;
  

  constructor(private dashboardService: DashboardService) {
    this.searches = [];
    this.results = "";
  }

  searchHistory() {
    this.dashboardService.getSearchHistory().subscribe( (history: any) => {
      this.searches = history;
    });
  }

  searchName() {
    this.dashboardService.searchFirstName(this.firstNameSearch).subscribe(params => {
      if (params.key === this.firstNameSearch) {
        console.log("we got a first name match " + params.key);

        this.dashboardService.searchLastName(this.lastNameSearch).subscribe(params => {
          if (params.key === this.lastNameSearch) {
            console.log("we got a last name match " + params.key);
            this.results = this.firstNameSearch + " " + this.lastNameSearch + " is a valid name"
          }
          else {
            this.results = this.firstNameSearch + " " + this.lastNameSearch + " is not found"
          }
        });
      }
      this.searches.push(this.firstNameSearch + " " + this.lastNameSearch);
    });
  }

  addName() {
    console.log("before");
    this.dashboardService.addName(this.firstNameSearch, this.lastNameSearch);
    console.log("after");
  }
  ngOnInit() {
  }

}
