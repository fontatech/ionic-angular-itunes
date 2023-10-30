import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RefresherCustomEvent, IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList } from '@ionic/angular/standalone';
import { MessageComponent } from '../message/message.component';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

import { DataService, IosApp } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, MessageComponent],
})
export class HomePage implements OnInit {
  private data = inject(DataService);
  public apps: IosApp[] = []

  constructor() {}

  async ngOnInit() {
    this.apps = await this.data.getAppList();
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  async getApps(): Promise<IosApp[]> {
    return await this.data.getAppList();
  }
}
