import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FacilityCategory } from '../models/facility-category.model';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private httpClient: HttpClient) { }

  // Liste des catégories d'équipements
  private listFacilityCategories: FacilityCategory [] ;

  // La liste observable que l'on rend visible partout dans l'application
  listFacilityCategories$: BehaviorSubject<FacilityCategory[]> = new BehaviorSubject(this.listFacilityCategories);

  /**
   * La fonction getFacilityCategories retourne une liste d'observables contenant la liste des catégories d'équipements.
   */
  public getFacilityCategories(timestamp: string): Observable<FacilityCategory[]> {
    let listFacilitiesCategories: FacilityCategory[] = [];
    return this.httpClient.get<FacilityCategory[]>('http://localhost:8080/facilitycategoryctrl/getfacilitycategories/' + timestamp);
  }

  /** La fonction publishFacilityCategories() est chargée et réactualisée lorsque l'utilisateur affiche 
   * la liste des équipements pour une tranche horaire donnée.
  * 
  */
 public publishFacilityCategories(timestamp: string) {
  this.getFacilityCategories(timestamp).subscribe(
    facilityCategoriesList => {
      
      this.listFacilityCategories = facilityCategoriesList;
      this.listFacilityCategories$.next(this.listFacilityCategories);
    });
}


  public getFacilities(){
    return "getFacilities()"
  }
}
