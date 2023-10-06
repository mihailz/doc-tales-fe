import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from "@angular/router";
import {DocumentationLayoutComponent} from "./documentation-layout/documentation-layout.component";
import {GenerateDocsComponent} from "./generate-docs/generate-docs.component";
import {AiArchitectComponent} from "./ai-architect/ai-architect.component";

const routes: Route[] = [
  {
    path: '',
    component: DocumentationLayoutComponent,
    children: [
      {
        path: 'document-generator',
        component: GenerateDocsComponent
      },
      {
        path: 'ai-architect',
        component: AiArchitectComponent
      }
    ]
  },

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
