import {ObjectID} from "mongodb";

export class Event {
    public _id?: string | ObjectID;
    public published = false;

    constructor(public title: string,
                public content: string,
                public date: Date,
                published?: boolean) {
        this.published = published || false;
    }
}
