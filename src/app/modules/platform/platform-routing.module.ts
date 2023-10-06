import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from "@angular/router";
import {PlatformComponent} from "./platform/platform.component";

const routes: Route[] = [
  {
    path: '',
    component: PlatformComponent
  }
];

@NgModule({
  declarations: [PlatformComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [PlatformComponent]
})
export class PlatformRoutingModule { }
