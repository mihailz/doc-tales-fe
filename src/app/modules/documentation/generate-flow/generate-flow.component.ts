import { Component, OnInit } from '@angular/core';
import {DocumentationService} from "../../../service/documentation.service";
import {Observable} from "rxjs";
import {DocumentFlowModel} from "../../../model/document-flow.model";
import {MatSelectChange} from "@angular/material/select";
import {HttpClient} from "@angular/common/http";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";
import {ClassModel} from "../../../model/project.model";

@Component({
  selector: 'app-generate-flow',
  templateUrl: './generate-flow.component.html',
  styleUrls: ['./generate-flow.component.scss']
})
export class GenerateFlowComponent implements OnInit {

  selectedFlow!: Observable<DocumentFlowModel | null>;
  classes: ClassModel[] = [];
  selectedClass!: ClassModel;
  selectedMethods: string[] = [];

  constructor(private _documentationService: DocumentationService, private http: HttpClient) { }

  ngOnInit(): void {
    this.selectedFlow = this._documentationService.getSelectedFlow();
  }

  onClassSelectionChange(changeObject: MatSelectChange): void {
    this.selectedClass = changeObject.value;
  }

  onMethodsSelectionChange($event: MatSelectChange): void {
   this.selectedMethods = $event.value;
  }
}
