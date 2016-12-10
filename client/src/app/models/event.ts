export class Event {
  constructor(
    public title: string,
    public content: string,
    public date: Date) {
  }

  public _id?: string;
}
