import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, ObservableInput } from 'rxjs';

@Injectable()
export class ApiEndpointService {

    private endpoints: Endpoints = null;
    private http: HttpClient;
    private assetsDirectory = 'assets/configurations';
    url = 'api/carowners/'
    public get baseUrl(): string { return this.url; }
    constructor() {
        
    }
}

export class Endpoints {
  baseUrl: string;
}


