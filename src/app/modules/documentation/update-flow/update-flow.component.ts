import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {DocumentFlowModel} from "../../../model/document-flow.model";
import {DocumentationService} from "../../../service/documentation.service";
import {ActivatedRoute, Params} from "@angular/router";
import {map, mergeMap, Subscription, switchMap} from "rxjs";
import {Project} from "../../../model/project.model";

@Component({
  selector: 'app-update-flow',
  templateUrl: './update-flow.component.html',
  styleUrls: ['./update-flow.component.scss']
})
export class UpdateFlowComponent implements OnInit, OnDestroy {

  updateFlowForm!: FormGroup;
  currentFlow!: DocumentFlowModel;
  currentProject!: Project;
  private _subs$ = new Subscription();

  constructor(private activatedRoute: ActivatedRoute,
              private _documentationService: DocumentationService) { }

  ngOnInit(): void {
    this.initUpdateFlowGroup();
    this.getCurrentFlow();
  }

  ngOnDestroy(): void {
    this._subs$.unsubscribe();
  }

  private getCurrentFlow(): void {
    const sub$ = this.activatedRoute.params
      .pipe(
        map((params: Params) => params['id']),
        switchMap((flowId: number) =>
          this._documentationService.getDocumentationFlowById(flowId)),
        mergeMap((flow: DocumentFlowModel) => {
          this.currentFlow = flow;
          return this._documentationService.getProjectById(flow.projectId);
        })
      )
      .subscribe({
        next: (project: Project) => {
          this.currentProject = project;
          console.log('Project', this.currentProject);
        },
      });

    this._subs$.add(sub$);
  }

  private initUpdateFlowGroup(): void {
    this.updateFlowForm = new FormGroup<any>({
      flowName: new FormControl('', [Validators.required]),
      classes: new FormArray([]),
      methods: new FormArray([])
    })
  }

  private getProject(): void{
    this._documentationService.getProjectById(this.currentFlow.projectId).subscribe({
      next: (value: Project) => {
        console.log("Project", value)
      }
    })
  }
}
