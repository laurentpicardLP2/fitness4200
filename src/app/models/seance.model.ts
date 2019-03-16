import { Customer } from './customer.model';
import { Item } from './item.model';
import { TimestampFacility } from './timestamp-facility.model';

export class Seance  {
    public timestampFacilities: TimestampFacility [];
    public statusSeance: number;
    
    constructor(public idItem: number,
                public typeItem: string,
                public price : number) { }
}