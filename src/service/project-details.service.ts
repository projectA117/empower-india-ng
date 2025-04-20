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

  getProjectDetailsById(id: number): Observable<any> {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/project/getProjectById?projectId=${id}`)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((error) => of(error))
      );
  }

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

  showDonars(projectId): Observable<any> {
    return this.httpClient
      .get<any>(
        `${environment.apiUrl}/donars/showDonars?projectId=${projectId}`
      )
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

  showVendorsDetails(id): Observable<any> {
    return this.httpClient
      .get<any>(
        `${environment.apiUrl}/vendors/getVendorByProjectId?projectId=${id}`
      )
      .pipe(
        map((showTransaction) => {
          return showTransaction;
        }),
        catchError((error) => of(error))
      );
  }

  addVendors(payLoad: any): Observable<any> {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/vendors`, payLoad)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((error) => of(error))
      );
  }

  deleteVendors(vendorid: any): Observable<any> {
    return this.httpClient
      .delete<any>(`${environment.apiUrl}/vendors/${vendorid}`)
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
        `${environment.apiUrl}/donars/addDonars-image?projectId=${id}`,
        payLoad
      )
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((error) => of(error))
      );
  }

  deleteDonars(donarsid: any, projectid: any): Observable<any> {
    return this.httpClient
      .delete<any>(`${environment.apiUrl}/donars/${donarsid}/${projectid}`)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((error) => of(error))
      );
  }

  searchDonors(searchTerm: string): Observable<any> {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/donars/search?searchTerm=${searchTerm}`)
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

  updateFinanceExpence(payLoad: any, id: any): Observable<any> {
    return this.httpClient
      .put<any>(`${environment.apiUrl}/finance/${id}`, payLoad)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((error) => of(error))
      );
  }

  deleteFinanceExpence(id: number, projectId:  number): Observable<any> {
    return this.httpClient
      .delete<any>(`${environment.apiUrl}/finance/${id}/${projectId}`)
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
    return this.httpClient
      .post<any>(`${environment.apiUrl}/project/publish/${id}`, payload)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((error) => of(error))
      );
  }

  kickOffProject(id) {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/project/kick-off/${id}`, {})
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((error) => of(error))
      );
  }

  showWIP(id: number) {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/project/status/${id}`)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((error) => of(error))
      );
  }

  createWIP(payload: any) {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/project/status`, payload)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((error) => of(error))
      );
  }

  updateWIP(payload: any) {
    return this.httpClient
      .put<any>(`${environment.apiUrl}/project/status`, payload)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((error) => of(error))
      );
  }

  deleteWIP(id: number) {
    return this.httpClient
      .delete<any>(`${environment.apiUrl}/project/status/${id}`)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((error) => of(error))
      );
  }
}
