import { Observable, catchError, of, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { effect, Injectable, signal, Signal } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  user = signal<any>(null);
  roles = signal<any[]>([]);
  projectStatus = signal<any[]>([]);

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

    this.getUserRoles().subscribe((response) => {
      if (response) {
        this.roles.set(response);
      }
    });

    this.getProjectStatus().subscribe((response) => {
      if (response) {
        this.projectStatus.set(response);
      }
    });
  }

  getProjectStatus(): Observable<any> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/status`).pipe(
      map((response) => {
        return response.filter((status) => !status.isDeleted);
      }),
      catchError((error) => of(error))
    );
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

  villageslookupProjects(payLoad: any): Observable<any> {
    return this.httpClient
      .get<any>(
        `${environment.apiUrl}/project/districts-mandal-villages?${payLoad}`
      )
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
      .post<any>(`${environment.apiUrl}/project/project-image`, payLoad)
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

  getAllSponsers(payload: any): Observable<any> {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/donars/all-donars?${payload}`)
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

  //4304

  getVillagesDemography(payLoad: any): Observable<any> {
    return (
      this.httpClient
        // .get<any>(`${environment.apiUrl}/villages/demography?${payLoad}`)
        .get<any>(`${environment.apiUrl}/village/village-project/${payLoad}`)
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

  getSelectedSponsors(donarId: any): Observable<any> {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/donars/donar-project-info/${donarId}`)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => of(error))
      );
  }

  getProjectProgressImages(payLoad: any): Observable<any> {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/project/status/${45}`)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => of(error))
      );
  }

  getUserRoles(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/roles`).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => of(error))
    );
  }

  getUsers(query = '', roleId = 0, districtId = 0) {
    let url = `${environment.apiUrl}/users`;
    let queryParam = '';
    if (query) {
      queryParam += `?query=${query}`;
    }
    if (roleId) {
      if (queryParam) {
        queryParam += `&roleId=${roleId}`;
      } else {
        queryParam = `?roleId=${roleId}`;
      }
    }
    if (districtId) {
      if (queryParam) {
        queryParam += `&districtId=${districtId}`;
      } else {
        queryParam = `?districtId=${districtId}`;
      }
    }
    return this.httpClient.get<any>(url + queryParam).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => of(error))
    );
  }

  activeDeActiveUser(userId: Number, isActive: number) {
    let url = `${environment.apiUrl}/users/${userId}/status?isActive=${isActive}`;
    return this.httpClient.put<any>(url, {});
  }

  getGalleryImages(): Observable<any> {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/gallery-images/`)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => of(error))
      );
  }

  addNewImages(payLoad: any): Observable<any> {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/gallery-images/uploadImage`, payLoad)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((error) => of(error))
      );
  }
}
