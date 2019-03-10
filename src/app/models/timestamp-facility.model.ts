import { Facility } from './facility.model';
import { FacilityCategory } from './facility-category.model';
import { Seance } from './seance.model';

export class TimestampFacility {
    public idTimestampFacillity: number;
    public refTimestamp: string;
    public facility: Facility;
    public facilityCategory: FacilityCategory;
    public seance: Seance;

    constructor() {}
}



	