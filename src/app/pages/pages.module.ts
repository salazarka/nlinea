import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

// ng2 charts, para la parte de pages/gráficas
import { ChartsModule } from 'ng2-charts';


import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { MenuComponent } from './menu/menu.component';



@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        IncrementadorComponent,
        GraficoDonaComponent, // DELETE
        AccoutSettingsComponent, // DELETE
        MenuComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent
    ],
    imports: [
        SharedModule,
        ColorPickerModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule // es del ng2 charts
    ]
})
export class PagesModule { }
