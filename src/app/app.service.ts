import { environment } from './../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class AppService {

    private loggedIn = new BehaviorSubject(false);
    currentLoggedInStatus = this.loggedIn.asObservable();

    constructor(private httpClient: HttpClient) { }

    validateCode(code: any): Observable<any> {
        return this.httpClient.post<[any]>(environment.apiUrl + '/validate', code);
    }

    createUser(user: any): Observable<any> {
        return this.httpClient.post<[any]>(environment.apiUrl + '/users', user);
    }

    login(email: any, password:any): Observable<any> {
        return this.httpClient.post<[any]>(environment.apiUrl + '/login', {email:email, password:password});
    }

    createComplaint(complaint: any): Observable<any> {
        return this.httpClient.post<[any]>(environment.apiUrl + '/complaints', complaint);
    }

    getTenants(tenantId:any): Observable<any> {
        const token = localStorage.getItem('token');

        const httpHeaders: HttpHeaders = new HttpHeaders({
            Authorization: 'Bearer '+ token, 
            Tenant: tenantId
        });
        return this.httpClient.get<[any]>(environment.apiUrl + '/users', { headers: httpHeaders });
    }


    changedLoggedState(status: boolean) {
        this.loggedIn.next(status);
      }
}