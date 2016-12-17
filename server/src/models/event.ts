export class Event {
    public _id?: string;
    public published = false;

    constructor(public title: string,
                public content: string,
                public date: Date,
                published?: boolean) {
        this.published = published || false;
    }
}
