import {Component, OnDestroy, OnInit} from '@angular/core';
import {DocumentFlowModel} from "../../../model/document-flow.model";
import {DocumentationService} from "../../../service/documentation.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {forkJoin, map, Subscription, switchMap} from "rxjs";
import {ClassModel, Project} from "../../../model/project.model";

interface FlowMode {
  name: string;
  children?: FlowMode[];
}

@Component({
  selector: 'app-update-flow',
  templateUrl: './update-flow.component.html',
  styleUrls: ['./update-flow.component.scss']
})
export class UpdateFlowComponent implements OnInit, OnDestroy {

  currentFlow!: DocumentFlowModel;
  currentProject!: Project;

  projectClasses: string[] = [];
  selectedClasses: string[] = [];

  flowMethods: string[] = [];
  selectedMethods: string[] = [];

  private _subs$ = new Subscription();

  constructor(private activatedRoute: ActivatedRoute,
              private _router: Router,
              private _documentationService: DocumentationService) {
  }

  ngOnInit(): void {
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
          forkJoin([
            this._documentationService.getDocumentationFlowById(flowId),
            this._documentationService.getProjectById(flowId)
          ])
        ),
      )
      .subscribe({
        next: ([flow, project]: [DocumentFlowModel, Project]) => {
          this.currentFlow = flow;
          this.currentProject = project;
          this.projectClasses = this.currentProject.classes.map((classItem: ClassModel) => classItem.name);
          this.selectedClasses = this.currentFlow.classes.map((classItem: ClassModel) => classItem.name);
          this.filterSelectedMethods(this.selectedClasses);
        },
      });
    this._subs$.add(sub$);
  }

  filterSelectedMethods(selectedClasses: string[]): void {
    const classes = this.currentProject.classes.filter((projectClass: ClassModel) =>
      selectedClasses.some((selectedClass: string) => projectClass.name === selectedClass));

    const currentMethods: string[] = [];
    classes.forEach((classItem: ClassModel) =>
      classItem.methods.forEach((method: string) =>
        currentMethods.push(method)));

    const currentSelectedMethods: string[] = [];
    this.currentFlow.classes.forEach((classItem: ClassModel) =>
      classItem.methods.forEach((method: string) =>
        currentSelectedMethods.push(method)
      ))

    this.flowMethods = [...currentMethods];
    this.selectedMethods = [...currentSelectedMethods];
  }

  onClassSelectionChange(selectedClasses: string[]): void {
    this.selectedClasses = selectedClasses;
    this.filterSelectedMethods(this.selectedClasses);
  }

  goBack(): void {
    this._router.navigate(['/documentation/flows-manager']);
  }
}
