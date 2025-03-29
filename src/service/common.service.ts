import { Observable, catchError, of, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { effect, Injectable, signal, Signal } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  user = signal<any>(null);
  constructor(private httpClient: HttpClient) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user.set(JSON.parse(storedUser));
    }

    // Save to localStorage when the signal changes
    effect(() => {
      if (this.user()) {
        localStorage.setItem('user', JSON.stringify(this.user()));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  getStates(): Observable<any> {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/lookup/states?stateId=1`)
      .pipe(
        map((getStates) => {
          return getStates;
        }),
        catchError((error) => of(error))
      );
  }

  getDistricts(): Observable<any> {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/lookup/districts?stateId=1`)
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
        `${environment.apiUrl}/lookup/mandals?districtId=${districtCode}`
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
      .get<any>(`${environment.apiUrl}/lookup/villages?mandalId=${mandalCode}`)
      .pipe(
        map((Villages) => {
          return Villages;
        }),
        catchError((error) => of(error))
      );
  }

  getProjectCategories(): Observable<any> {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/lookup/project-categories`)
      .pipe(
        map((projects) => {
          return projects;
        }),
        catchError((error) => of(error))
      );
  }

  getProjects(payLoad: any): Observable<any> {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/project?${payLoad} `)
      .pipe(
        map((projects) => {
          return projects;
        }),
        catchError((error) => of(error))
      );
  }

  getProjectDMVSearch(payLoad: any): Observable<any> {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/project/search?${payLoad}`)
      .pipe(
        map((projects) => {
          return projects;
        }),
        catchError((error) => of(error))
      );
  }

  saveProject(payLoad: any): Observable<any> {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/project`, payLoad)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => of(error))
      );
  }

  updateProject(payLoad: any): Observable<any> {
    return this.httpClient
      .put<any>(`${environment.apiUrl}/project`, payLoad)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => of(error))
      );
  }

  getTopSponsers(): Observable<any> {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/donars/all-donars?topN=5`)
      .pipe(
        map((sponsors) => {
          return sponsors;
        }),
        catchError((error) => of(error))
      );
  }

  getAllSponsers(): Observable<any> {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/donars/all-donars`)
      .pipe(
        map((allSponsors) => {
          return allSponsors;
        }),
        catchError((error) => of(error))
      );
  }

  contactSubmit(payLoad: any): Observable<any> {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/contact-us/submit`, payLoad)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => of(error))
      );
  }

  signin(payLoad: any): Observable<any> {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/login`, payLoad)
      .pipe(
        map((response) => {
          this.setUser(response);
          return response;
        }),
        catchError((error) => of(error))
      );
  }

  // headers: { 'Content-Type': 'multipart/form-data' }

  register(payLoad: any): Observable<any> {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/users`, payLoad)
      .pipe(
        map((response) => {
          //this.setUser(response);
          return response;
        }),
        catchError((error) => of(error))
      );
  }

  onLogout() {
    this.user.set(null);
  }

  setUser(user: any) {
    this.user.set(user);
  }

  getVillagesDemography(payLoad: any): Observable<any> {
    return (
      this.httpClient
        // .get<any>(`${environment.apiUrl}/villages/demography?${payLoad}`)
        .get<any>(`${environment.apiUrl}/village/${payLoad}`)
        .pipe(
          map((response) => {
            return response;
          }),
          catchError((error) => of(error))
        )
    );
  }

  villagelookups(): Observable<any> {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/lookup/village-lookups`)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => of(error))
      );
  }

  saveVilageData(payLoad: any): Observable<any> {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/village`, payLoad)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => of(error))
      );
  }

  updateCommunityVilageData(payLoad: any): Observable<any> {
    return this.httpClient
      .put<any>(`${environment.apiUrl}/village/${payLoad.id}`, payLoad)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => of(error))
      );
  }

  getSelectedSponsors(payLoad: any): Observable<any> {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/donars/donar-project-info/10`)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => of(error))
      );
  }
}
