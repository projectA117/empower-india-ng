import { Observable, catchError, of, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private httpClient: HttpClient) {}

  getStates(): Observable<any> {
    return this.httpClient
      .get<any>(`http://localhost:8080/empower_andhra/states`)
      .pipe(
        map((getStates) => {
          return getStates;
        }),
        catchError((error) => of(error))
      );
  }

  getDistricts(): Observable<any> {
    return this.httpClient
      .get<any>(`http://localhost:8080/empower_andhra/districts?stateId=1`)
      .pipe(
        map((Districts) => {
          return Districts;
        }),
        catchError((error) => of(error))
      );
  }
  getMandals(districtCode: any): Observable<any> {
    return this.httpClient
      .get<any>(
        `http://localhost:8080/empower_andhra/mandals?districtId=${districtCode}`
      )
      .pipe(
        map((Mandals) => {
          return Mandals;
        }),
        catchError((error) => of(error))
      );
  }
  getVillages(mandalCode: string): Observable<any> {
    return this.httpClient
      .get<any>(`http://localhost:8080/empower_andhra/villages?mandalId=1`)
      .pipe(
        map((Villages) => {
          return Villages;
        }),
        catchError((error) => of(error))
      );
  }

  getNewProjectDetails(): Observable<any> {
    return this.httpClient
      .get<any>(`http://localhost:8080/empower_andhra/project-categories`)
      .pipe(
        map((projects) => {
          return projects;
        }),
        catchError((error) => of(error))
      );
  }

  getProjects(): Observable<any> {
    return this.httpClient
      .get<any>(`https://jsonplaceholder.typicode.com/posts`)
      .pipe(
        map((Projects) => {
          return Projects;
        }),
        catchError((error) => of(error))
      );
  }

  PostSaveProject(): Observable<any> {
    return this.httpClient
      .post<any>(`https://jsonplaceholder.typicode.com/posts`, {})
      .pipe(
        map((Projects) => {
          return Projects;
        }),
        catchError((error) => of(error))
      );
  }
}
