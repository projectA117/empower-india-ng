import { Observable, catchError, of, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectDetailsService {
  constructor(private httpClient: HttpClient) {}

  showCommittee(id: any): Observable<any> {
    return this.httpClient.get<any>(
      `http://localhost:8080/empower_andhra/api/v1/committee/showCommittee?projectId=${id}`
    );
    // .pipe(
    //   map((getStates) => {
    //     return getStates;
    //   }),
    //   catchError((error) => of(error))
    // );
  }

  addCommittee(payLoad: any, id: any): Observable<any> {
    return this.httpClient
      .post<any>(
        `http://localhost:8080/empower_andhra/api/v1/committee/addCommittee?projectId=${id}`,
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
        `http://localhost:8080/empower_andhra/api/v1/committee/addCommittee?projectId=${id}`,
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
    return this.httpClient.delete<any>(
      `http://localhost:8080/empower_andhra/api/v1/committee/${payLoad.id}/${payLoad.projectId}`
    );
  }

  showDonars(): Observable<any> {
    return this.httpClient
      .get<any>(`http://localhost:8080/empower_andhra/api/v1/donars/showDonars`)
      .pipe(
        map((getStates) => {
          return getStates;
        }),
        catchError((error) => of(error))
      );
  }

  showTransaction(): Observable<any> {
    return this.httpClient
      .get<any>(
        `http://localhost:8080/empower_andhra/api/v1/finance/showTransaction`
      )
      .pipe(
        map((showTransaction) => {
          return showTransaction;
        }),
        catchError((error) => of(error))
      );
  }

  showVendorsDetails(): Observable<any> {
    return this.httpClient
      .get<any>(`http://localhost:8080/empower_andhra/api/v1/vendors`)
      .pipe(
        map((showTransaction) => {
          return showTransaction;
        }),
        catchError((error) => of(error))
      );
  }

  addVendors(payLoad: any, id: any): Observable<any> {
    return this.httpClient.post<any>(
      `http://localhost:8080/empower_andhra/api/v1/vendors?projectId=${id}`,
      payLoad
    );
  }

  addDonars(payLoad: any, id: any): Observable<any> {
    return this.httpClient.post<any>(
      `http://localhost:8080/empower_andhra/api/v1/donars/addDonars?projectId=${id}`,
      payLoad
    );
  }
  updateWIP(payLoad: any): Observable<any> {
    return this.httpClient.post<any>(
      `http://localhost:8080/empower_andhra/api/v1/WIP/updateWIP`,
      payLoad
    );
  }
  updateApproval(payLoad: any): Observable<any> {
    return this.httpClient
      .put<any>(`http://localhost:8080/empower_andhra/api/v1/project`, payLoad)
      .pipe(
        map((getStates: any) => {
          return getStates;
        }),
        catchError((error) => of(error))
      );
  }

  addFinanceExpence(payLoad: any): Observable<any> {
    return this.httpClient.post<any>(
      `http://localhost:8080/empower_andhra/api/v1/finance/addTransaction`,
      payLoad
    );
  }
}
