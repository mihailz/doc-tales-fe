import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from "@angular/router";
import {GenerateDocsComponent} from "./generate-docs/generate-docs.component";
import {GenerateFlowComponent} from "./generate-flow/generate-flow.component";
import {FlowsManagerComponent} from "./flows-manager/flows-manager.component";
import {UpdateFlowComponent} from "./update-flow/update-flow.component";

const routes: Route[] = [
  {
    path: '',
    component: GenerateDocsComponent
  },
  {
    path: 'generate-flow',
    component: GenerateFlowComponent
  },
  {
    path: 'update-flow/:id',
    component: UpdateFlowComponent
  },
  {
    path: 'flows-manager',
    component: FlowsManagerComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DocumentationRoutingModule { }
