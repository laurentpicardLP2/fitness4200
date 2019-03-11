import { Customer } from './customer.model';
import { Item } from './item.model';
import { TimestampFacility } from './timestamp-facility.model';

export class Seance extends Item {
    public timestampFacilities: TimestampFacility [];
    
    constructor(public idItem: number,
                public price : number) {
        super(idItem, price);
    }
}