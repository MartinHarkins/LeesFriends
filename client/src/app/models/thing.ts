/** @ngInject */
export class Thing {
  //public rank:string;
  public title:string;
  public url:string;
  public description:string;
  public logo:string;

  constructor(title:string, url:string, description:string, logo:string) {
    this.title = title;
    this.url = url;
    this.description = description;
    this.logo = logo;
    //this.rank = Math.random();
  }
}
