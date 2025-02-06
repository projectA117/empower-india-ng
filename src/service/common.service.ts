import { Observable, catchError, of, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  constructor(private httpClient: HttpClient) {}
  getDistricts(): Observable<any> {
    return this.httpClient
      .get<any>(`https://jsonplaceholder.typicode.com/posts`)
      .pipe(
        map((Districts) => {
          return Districts;
        }),
        catchError((error) => of(error))
      );
  }
  getMandals(): Observable<any> {
    return this.httpClient
      .get<any>(`https://jsonplaceholder.typicode.com/posts`)
      .pipe(
        map((Mandals) => {
          return Mandals;
        }),
        catchError((error) => of(error))
      );
  }
  getVillages(): Observable<any> {
    return this.httpClient
      .get<any>(`https://jsonplaceholder.typicode.com/posts`)
      .pipe(
        map((Villages) => {
          return Villages;
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
