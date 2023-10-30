import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

const route: string = "https://itunes.apple.com/us/rss/toppaidapplications/limit=200/json";

export interface IosApp {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  public appList: IosApp[] = [];

  constructor(private http: HttpClient) { }

  private async fetchAppList(): Promise<IosApp[]> {
    let res: any = await this.http.get(route).toPromise()

    return res?.feed?.entry?.map((itm: any) => {
      return {
        id: itm.id.attributes['im:id'],
        name: itm.title.label,
        imageUrl: itm['im:image'][0].label,
        description: itm.summary.label,
        price: itm['im:price'].label,
        category: itm.category.attributes.label
      }
    })
  }

  public async getAppList(): Promise<IosApp[]> {
    if (!this.appList.length) this.appList = await this.fetchAppList()
    return this.appList;
  }

  public async getAppById(id: string): Promise<IosApp> {
    const list: any = await this.getAppList()
    
    return list.find((el: IosApp) => {
      return id === el.id
    })
  }
}
