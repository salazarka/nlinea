import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import {
  SettingsService,
  SidebarService,
  SharedService,
  GameService,
  MenuService
} from './service.index';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    GameService,
    MenuService

  ],
  declarations: []
})
export class ServiceModule { }
