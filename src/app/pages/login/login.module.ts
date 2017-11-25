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


@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    NgSelectModule,
    routing
  ],
  declarations: [
    LoginComponent,
    GoogleMaps
  ],
  providers: [MockdataService]
})
export class LoginModule {}
