export class Event {
  public published = false;

  constructor(public title: string,
              public content: string,
              public date: Date,
              published?: boolean,
              public _id?: string) {
    this.published = published || false;
  }

  public static clone(base): Event {
    return new Event(base.title, base.content, base.date, base.published, base._id);
  }
}
