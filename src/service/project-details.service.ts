import { Observable, catchError, of, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectDetailsService {
  constructor(private httpClient: HttpClient) {}

  showCommittee(id: any): Observable<any> {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/committee/showCommittee?projectId=${id}`)
      .pipe(
        map((getStates) => {
          return getStates;
        }),
        catchError((error) => of(error))
      );
  }

  addCommittee(payLoad: any, id: any): Observable<any> {
    return this.httpClient
      .post<any>(
        `${environment.apiUrl}/committee/addCommittee?projectId=${id}`,
        payLoad
      )
      .pipe(
        map((getStates) => {
          return getStates;
        }),
        catchError((error) => of(error))
      );
  }

  editCommittee(payLoad: any, id: any): Observable<any> {
    return this.httpClient
      .put<any>(
        `${environment.apiUrl}/committee/addCommittee?projectId=${id}`,
        payLoad
      )
      .pipe(
        map((getStates) => {
          return getStates;
        }),
        catchError((error) => of(error))
      );
  }

  deleteCommittee(payLoad: any): Observable<any> {
    return this.httpClient
      .delete<any>(
        `${environment.apiUrl}/committee/${payLoad.id}/${payLoad.projectId}`
      )
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((error) => of(error))
      );
  }

  showDonars(): Observable<any> {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/donars/showDonars`)
      .pipe(
        map((getStates) => {
          return getStates;
        }),
        catchError((error) => of(error))
      );
  }

  showTransaction(id: any): Observable<any> {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/finance/showTransaction?projectId=${id}`)
      .pipe(
        map((showTransaction) => {
          return showTransaction;
        }),
        catchError((error) => of(error))
      );
  }

  showVendorsDetails(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/vendors`).pipe(
      map((showTransaction) => {
        return showTransaction;
      }),
      catchError((error) => of(error))
    );
  }

  addVendors(payLoad: any, id: any): Observable<any> {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/vendors?projectId=${id}`, payLoad)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((error) => of(error))
      );
  }

  addDonors(payLoad: any, id: any): Observable<any> {
    return this.httpClient
      .post<any>(
        `${environment.apiUrl}/donars/addDonars?projectId=${id}`,
        payLoad
      )
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((error) => of(error))
      );
  }

  searchDonors(searchTerm: string): Observable<any> {
    return this.httpClient
      .get<any>(
        `${environment.apiUrl}/donars/search?searchTerm=${searchTerm}`
      )
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((error) => of(error))
      );
  }

  updateWIP(payLoad: any): Observable<any> {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/WIP/updateWIP`, payLoad)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((error) => of(error))
      );
  }
  updateApproval(payLoad: any): Observable<any> {
    return this.httpClient
      .put<any>(`${environment.apiUrl}/project`, payLoad)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => of(error))
      );
  }

  addFinanceExpence(payLoad: any): Observable<any> {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/finance/addTransaction`, payLoad)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((error) => of(error))
      );
  }

  addBankDetails(payload) {
    return this.httpClient.post(`${environment.apiUrl}/bank`, payload).pipe(
      map((res) => {
        return res;
      }),
      catchError((error) => of(error))
    );
  }

  updateBankDetails(payload) {
    return this.httpClient.put(`${environment.apiUrl}/bank`, payload).pipe(
      map((res) => {
        return res;
      }),
      catchError((error) => of(error))
    );
  }

  getBankDetails(id) {
    return this.httpClient.get<any>(`${environment.apiUrl}/bank/${id}`).pipe(
      map((res) => {
        return res;
      }),
      catchError((error) => of(error))
    );
  }

  publishProject(payload, id) {
    return this.httpClient.post<any>(`${environment.apiUrl}/project/publish/${id}`, payload).pipe(
      map((res) => {
        return res;
      }),
      catchError((error) => of(error))
    );
  }

  kickOffProject(id) {
    return this.httpClient.post<any>(`${environment.apiUrl}/project/kick-off/${id}`, {}).pipe(
      map((res) => {
        return res;
      }),
      catchError((error) => of(error))
    );
  }
}
