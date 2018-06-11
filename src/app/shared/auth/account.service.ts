import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Account } from './account.model';

@Injectable()
export class AccountService  {
  private accountsUrl = 'api/accounts';

  constructor(private http: HttpClient) { }

  get(id: number): Observable<HttpResponse<Account>> {
    const url = `${this.accountsUrl}/${id}`;
    return this.http.get<Account>(url, {observe : 'response'});
  }
}
