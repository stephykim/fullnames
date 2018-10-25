import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class DashboardService {
  searchHistoryRef: any;
  firstNamesRef: any;
  lastNamesRef: any;
  

  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase,
    private http: HttpClient
    ) {
    this.searchHistoryRef = this.db.list(`currentSession/${this.loginService.userUid}/searches`);
    this.firstNamesRef = this.db.list(`currentSession/${this.loginService.userUid}/firstNames/`);
    this.lastNamesRef = this.db.list(`currentSession/${this.loginService.userUid}/lastNames/`);
    
  }

  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }

  searchFirstName(first: string) {
    return this.db.object(`firstNames/${first}`).snapshotChanges();
  }

  searchLastName(last: string) {
    return this.db.object(`lastNames/${last}`).snapshotChanges();
  }

  addName(first: string, last: string) {
    console.log("helloo");
    this.firstNamesRef.push(first, "true");
    this.lastNamesRef.push(last, "true");
  }
}
