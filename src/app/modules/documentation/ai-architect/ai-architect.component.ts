import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DocumentationService} from "../../../service/documentation.service";
import {AiArchitectFilterModel} from "../../../model/ai-architect-filter.model";
import {DocumentFlowModel} from "../../../model/document-flow.model";
import {finalize} from "rxjs";

@Component({
  selector: 'app-ai-architect',
  templateUrl: './ai-architect.component.html',
  styleUrls: ['./ai-architect.component.scss']
})
export class AiArchitectComponent implements OnInit {

  aiArchitectFormGroup!: FormGroup;
  filterOptions!: AiArchitectFilterModel;
  markdownString = '';
  isLoading = false;

  constructor(private _documentationService: DocumentationService) {
  }

  ngOnInit(): void {
    this.initAiArchitectFormGroup();
    this._documentationService.getAiArchitectFilterOptions()
      .subscribe((options: AiArchitectFilterModel) => {
        this.filterOptions = options;
      })
  }

  getFControl(path: string): FormControl {
    return this.aiArchitectFormGroup.get(path) as FormControl;
  }

  getFControlErrorMessage(path: string): string {
    if (this.aiArchitectFormGroup.get(path)?.hasError('required')) {
      return 'Field is required!';
    }
    return 'You must enter a value';
  }

  private initAiArchitectFormGroup(): void {
    this.aiArchitectFormGroup = new FormGroup<any>({
      architectureType: new FormControl('', [Validators.required]),
      dataArchitecture: new FormControl('', [Validators.required]),
      deploymentStrategies: new FormControl('', [Validators.required]),
      frontEnd: new FormControl('', [Validators.required]),
      technologyStack: new FormControl('', [Validators.required]),
      securityOptions: new FormControl('', [Validators.required]),
      flow: new FormControl('', [Validators.required])
    });
  };

  generate(): void {
    if (this.aiArchitectFormGroup.invalid) {
      return;
    }
    this.setLoading(true);
    this._documentationService.generateArchitecture(this.aiArchitectFormGroup.getRawValue())
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe({
        next: (markdown: string) => {
          this.markdownString = markdown;
        }
      });
  }

  private setLoading(loading = false): void {
    this.isLoading = loading;
  }
}
