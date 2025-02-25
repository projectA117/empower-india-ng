import { Observable, catchError, of, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private httpClient: HttpClient) {}

  getStates(): Observable<any> {
    return this.httpClient.get<any>(
      `http://localhost:8080/empower_andhra/v1/api/lookup/states`
    );
    // .pipe(
    //   map((getStates) => {
    //     return getStates;
    //   }),
    //   catchError((error) => of(error))
    // );
  }

  getDistricts(): Observable<any> {
    return this.httpClient.get<any>(
      `http://localhost:8080/empower_andhra/api/v1/lookup/districts?stateId=1`
    );
    // .pipe(
    //   map((Districts) => {
    //     return Districts;
    //   }),
    //   catchError((error) => of(error))
    // );
  }
  getMandals(districtCode: any): Observable<any> {
    return this.httpClient.get<any>(
      `http://localhost:8080/empower_andhra/api/v1/lookup/mandals?districtId=${districtCode}`
    );
    // .pipe(
    //   map((Mandals) => {
    //     return Mandals;
    //   }),
    //   catchError((error) => of(error))
    // );
  }
  getVillages(mandalCode: string): Observable<any> {
    return this.httpClient.get<any>(
      `http://localhost:8080/empower_andhra/api/v1/lookup/villages?mandalId=${mandalCode}`
    );
    // .pipe(
    //   map((Villages) => {
    //     return Villages;
    //   }),
    //   catchError((error) => of(error))
    // );
  }

  getProjectCategories(): Observable<any> {
    return this.httpClient.get<any>(
      `http://localhost:8080/empower_andhra/api/v1/lookup/project-categories`
    );
    // .pipe(
    //   map((projects) => {
    //     return projects;
    //   }),
    //   catchError((error) => of(error))
    // );
  }

  getProjects(): Observable<any> {
    return this.httpClient.get<any>(
      `http://localhost:8080/empower_andhra/api/v1/project`
    );
    // .pipe(
    //   map((projects) => {
    //     return projects;
    //   }),
    //   catchError((error) => of(error))
    // );
  }

  getProjectDMVSearch(payLoad: any): Observable<any> {
    return this.httpClient
      .get<any>(
        `http://localhost:8080/empower_andhra/api/v1/project/search?${payLoad}`
      )
      .pipe(
        map((projects) => {
          return projects;
        }),
        catchError((error) => of(error))
      );
  }

  saveProject(payLoad: any): Observable<any> {
    return this.httpClient
      .post<any>(`http://localhost:8080/empower_andhra/api/v1/project`, payLoad)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => of(error))
      );
  }

  updateProject(payLoad: any): Observable<any> {
    return this.httpClient
      .put<any>(
        `http://localhost:8080/empower_andhra/api/v1/project`,
        payLoad
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => of(error))
      );
  }
}
