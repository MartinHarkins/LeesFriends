module leesFriends {
  'use strict';

  class Thing {
    public rank:number;
    public title:string;
    public url:string;
    public description:string;
    public logo:string;

    constructor(title:string, url:string, description:string, logo:string) {
      this.title = title;
      this.url = url;
      this.description = description;
      this.logo = logo;
      this.rank = Math.random();
    }
  }
}
