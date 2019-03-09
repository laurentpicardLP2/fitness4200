import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FacilityAvailableAdaptater } from '../models/facility-available-adaptater.model';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private httpClient: HttpClient) { }

  // Liste des catégories d'équipements
  private listFacilityCategories: FacilityAvailableAdaptater [] ;

  // La liste observable que l'on rend visible partout dans l'application
  listFacilityCategories$: BehaviorSubject<FacilityAvailableAdaptater[]> = new BehaviorSubject(this.listFacilityCategories);

  /**
   * La fonction getFacilityCategories retourne une liste d'observables contenant la liste des catégories d'équipements.
   */
  public getFacilityCategories(timestamp: string): Observable<FacilityAvailableAdaptater[]> {
    
    return this.httpClient.get<FacilityAvailableAdaptater[]>('http://localhost:8080/facilitycategoryctrl/getfacilitycategories/' + timestamp);
  }

  
  /** La fonction publishFacilityCategories() est chargée et réactualisée lorsque l'utilisateur affiche 
   * la liste des équipements pour une tranche horaire donnée.
  * 
  */
 public publishFacilityCategories(timestamp: string) {
  this.getFacilityCategories(timestamp).subscribe(
    facilityCategoriesList => {
      this.listFacilityCategories = facilityCategoriesList;
      for(let i of this.listFacilityCategories) {
        for(let j of i.facilities) {
          console.log(j.facilityName);
        }
      }
      this.listFacilityCategories$.next(this.listFacilityCategories);
    });
}

public timestampSubject: BehaviorSubject<string> = new BehaviorSubject(null);

public  setTimestampSubject(value: string){
    if(value){
      this.timestampSubject.next(value);
    } else {
      this.timestampSubject.next(null);
    }
  }


  
}
