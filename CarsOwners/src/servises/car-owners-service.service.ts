import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AddCarEntity } from 'src/app/models/AddCarEntity';
import { AddOwnerEntity } from 'src/app/models/AddOwnerEntity';
import { CarEntity } from 'src/app/models/CarEntity';
import { ICarOwnersService } from 'src/app/models/interfaces/ICarOwnersService';
import { OwnerEntity } from 'src/app/models/OwnerEntity';
import { ApiEndpointService } from './apiEndpoint.service';

@Injectable({
  providedIn: 'root'
})
export class CarOwnersServiceService implements ICarOwnersService {
  private Url = '';
  constructor( private http: HttpClient,
               private enpoints: ApiEndpointService 
    ) {
        this.Url = this.enpoints.baseUrl;
     }

  getOwners(): Observable<OwnerEntity[]> {
   return this.http.get(this.Url).pipe(
     map((entitys: OwnerEntity[]) => {
       if (entitys != undefined) return entitys;
     })
   );
  }
  getOwnerById(aId: number): Observable<OwnerEntity> {
   return this.http.get<OwnerEntity>(this.Url + 'id?' + aId).pipe(
     map((entity:OwnerEntity)=>{
      if(entity!=undefined)
      return entity
     })
   )
  }
  createOwner(aLastName: string, aFirstName: string, aMiddleName: string, aCars: AddCarEntity[]): Observable<OwnerEntity> {
    let newovnwe = new AddOwnerEntity(aLastName, aFirstName, aMiddleName, aCars)
    return this.http.post<OwnerEntity>(this.Url, newovnwe).pipe(
      map((entity: OwnerEntity) =>{
        if(entity!=undefined)
      return entity
      })
    )
  }
  editOwner(aOwner: OwnerEntity): Observable<OwnerEntity> {
    return this.http.put<OwnerEntity>(this.Url, aOwner).pipe(
      map((entity: OwnerEntity) =>{
        if (entity)
            {return entity}
        else{
        }}
      ))
  }
  
  deleteOwner(aOwnerId: number): Observable<OwnerEntity[]> {
    return this.http.delete<OwnerEntity[]>(this.Url + 'id?'+ aOwnerId).pipe(
      map((entitys:OwnerEntity[])=>{
        if(entitys!=undefined)
          return entitys
      })
    )
  }
}
