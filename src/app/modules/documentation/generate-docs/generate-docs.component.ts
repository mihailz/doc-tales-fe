import {Component, OnInit} from '@angular/core';
import {DocumentationService} from "../../../service/documentation.service";
import {Router} from "@angular/router";
import {GenerateDocsModel} from "../../../model/generate-docs.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DocumentFlowModel} from "../../../model/document-flow.model";
import {finalize} from "rxjs";

@Component({
  selector: 'app-generate-docs',
  templateUrl: './generate-docs.component.html',
  styleUrls: ['./generate-docs.component.scss']
})
export class GenerateDocsComponent implements OnInit {

  filterOptions!: GenerateDocsModel;
  generateDocsForm!: FormGroup;
  markdown = '';
  isLoading = false;

  constructor(private router: Router,
              private _documentationService: DocumentationService) {
  }

  ngOnInit(): void {
    this.initGenerateDocsForm();
    this._documentationService.getGenerateDocsOptions()
      .subscribe({
        next: (options: GenerateDocsModel) => {
          this.filterOptions = options;
        }
      })
  }

  private initGenerateDocsForm(): void {
    this.generateDocsForm = new FormGroup({
      flow: new FormControl('', [Validators.required]),
      documentationType: new FormControl('', [Validators.required])
    })
  }

  generateDocumentation(): void {
    this.setLoading(true);
    if (this.generateDocsForm.invalid) {
      return;
    }
    const {flow, documentationType} = this.generateDocsForm.getRawValue();
    this._documentationService.generateDocumentation(flow.projectId, documentationType)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (res: string) => {
          this.markdown = res.replace(/\\n\\n/g, '<br />\n')
            .replace(/\\n/g, '<br />');
        }
      });
  }

  private setLoading(loading = false): void {
    this.isLoading = loading;
  }
}
