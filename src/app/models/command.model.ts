import { Item } from './item.model';
import { User } from './user.model';
import { Seance } from './seance.model';

export class Command{
    public idCommand: number;
    public totalPrice: number;
    public statusCommand: number;
    public user:User;
    public dateOfCommand: Date;
    public items: Item[] = [];

    constructor() {}


}