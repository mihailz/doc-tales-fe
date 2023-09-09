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
import {MarkdownModule} from "ngx-markdown";
import { GenerateFlowComponent } from './generate-flow/generate-flow.component';
import { FlowsManagerComponent } from './flows-manager/flows-manager.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { UpdateFlowComponent } from './update-flow/update-flow.component';

@NgModule({
  declarations: [
    GenerateDocsComponent,
    TextEditorComponent,
    GenerateFlowComponent,
    FlowsManagerComponent,
    UpdateFlowComponent
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
        MarkdownModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        FormsModule,
    ],
  providers: [
    DocumentationService
  ]
})
export class DocumentationModule {
}
