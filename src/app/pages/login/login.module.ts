import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import {GoogleMaps} from "../maps/components/googleMaps/googleMaps.component"
import { LoginComponent } from './login.component';
import { routing }       from './login.routing';
import {MockdataService} from "./services/mockdata.service";
import {NgSelectModule} from "@ng-select/ng-select";
import {TextMaskModule} from "angular2-text-mask";
import {AgmCoreModule} from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    NgSelectModule,
    TextMaskModule,
    routing,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDQKO1d7NuDk_hP_ly_Uhu_CfSgfzagVS4'}),
  ],
  declarations: [
    LoginComponent,
    GoogleMaps
  ],
  providers: [MockdataService]
})
export class LoginModule {}
