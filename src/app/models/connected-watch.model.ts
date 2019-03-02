import { Customer } from './customer.model';

export class ConnectedWatch{
    public idConnectedWatch: number;
    public customer: Customer;

    constructor (
        public modelWatch: boolean,
        public price: number
    ) {}
}