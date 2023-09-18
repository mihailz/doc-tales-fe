import {Component, OnDestroy, OnInit} from '@angular/core';
import {DocumentationService} from "../../../service/documentation.service";
import {DocumentFlowModel} from "../../../model/document-flow.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-generate-docs',
  templateUrl: './generate-docs.component.html',
  styleUrls: ['./generate-docs.component.scss']
})
export class GenerateDocsComponent implements OnInit, OnDestroy {

  documentationFlows: DocumentFlowModel[] = [];
  private _subs$ = new Subscription();
  selectedFlow!: DocumentFlowModel;

  constructor(private router: Router,
              private _documentationService: DocumentationService) { }

  ngOnInit(): void {
    // this.initDocumentationFilterForm();
    this.getDocumentationFlows();
  }

  ngOnDestroy(): void {
    this._subs$?.unsubscribe();
  }

  private getDocumentationFlows(): void {
    this._documentationService.getDocumentationFlows()
      .subscribe({
        next: (flows: DocumentFlowModel[]) => {
          this.documentationFlows = flows;
        }
      });
  }

  onFlowSelectionChange(changeObject: MatSelectChange) {
    this._documentationService.setSelectedFlow(changeObject.value);
    this.selectedFlow = changeObject.value;
  }

  navigateToRegisterFlowPage(): void {
    this.router.navigate(['/documentation/flows-manager']);
  }

  goBack(): void {
    this.router.navigate(['/documentation/']);
  }
}
