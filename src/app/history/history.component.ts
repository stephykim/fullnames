import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  @Input() searchHistory: any[];
  constructor() { 
    this.searchHistory = [];
  }

  ngOnInit() {
  }

}
