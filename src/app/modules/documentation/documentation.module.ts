import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GenerateDocsComponent} from './generate-docs/generate-docs.component';
import {DocumentationRoutingModule} from "./documentation-routing.module";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {DocumentationService} from "../../service/documentation.service";
import {TextEditorComponent} from './text-editor/text-editor.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatInputModule} from "@angular/material/input";
import {GenerateFlowComponent} from './generate-flow/generate-flow.component';
import {FlowsManagerComponent} from '../administrator/flows-manager/flows-manager.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {UpdateFlowComponent} from './update-flow/update-flow.component';
import {MatTreeModule} from '@angular/material/tree';
import {FlowTreeComponent} from './flow-tree/flow-tree.component';
import {MarkdownModule} from "ngx-markdown";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DocumentationLayoutComponent } from './documentation-layout/documentation-layout.component';
import {
  DocumentationNavBarComponent
} from "./documentation-layout/documentation-nav-bar/documentation-nav-bar.component";
import { AiArchitectComponent } from './ai-architect/ai-architect.component';

@NgModule({
  declarations: [
    GenerateDocsComponent,
    TextEditorComponent,
    GenerateFlowComponent,
    FlowsManagerComponent,
    UpdateFlowComponent,
    FlowTreeComponent,
    DocumentationLayoutComponent,
    DocumentationNavBarComponent,
    AiArchitectComponent
  ],
  imports: [
    CommonModule,
    DocumentationRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatTreeModule,
    MarkdownModule,
    MatProgressSpinnerModule
  ],
  providers: [
    DocumentationService
  ]
})
export class DocumentationModule {
}
