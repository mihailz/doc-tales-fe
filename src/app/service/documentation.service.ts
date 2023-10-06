import {Injectable} from "@angular/core";
import {BehaviorSubject, forkJoin, map, Observable, of, Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ClassModel, Project} from "../model/project.model";
import {DocumentFlowModel} from "../model/document-flow.model";
import {DocumentationType} from "../model/documentation-type.model";
import {
  ARCHITECTURES,
  DATA_ARCHITECTURES, DEPLOYMENT_STRATEGIES, DOCUMENTATION_TYPES, SECURITY_AND_AUTHENTICATION,
  TECHNOLOGY_STACK, USER_EXPERIENCE_AND_FRONT_END
} from "../modules/mock-data/documentation-mock-data";
import {AiArchitectFilterModel} from "../model/ai-architect-filter.model";
import {GenerateDocsModel} from "../model/generate-docs.model";

@Injectable()
export class DocumentationService {
  private _selectedFlow: Subject<DocumentFlowModel | null> =
    new BehaviorSubject<DocumentFlowModel | null>(null);

  constructor(private http: HttpClient) {
  }

  setSelectedFlow(flow: DocumentFlowModel): void {
    this._selectedFlow.next(flow);
  }

  getSelectedFlow(): Observable<DocumentFlowModel | null> {
    return this._selectedFlow;
  }

  getDocumentationFlows(): Observable<DocumentFlowModel[]> {
    const URL = 'http://localhost:8080/flows/';
    return this.http.get(URL).pipe(
      tap((res) => console.log(res)),
      map((response: any) => response.map((flowItem: any) => {
        return new DocumentFlowModel(
          flowItem.id, flowItem.projectId, flowItem.projectName, flowItem.flowName,
          JSON.parse(flowItem['classInfoJsonFromFlow']).map((item: any) => new ClassModel(item.className, item.methods))        // JSON.parse(flowItem.classInfoJson).map((item: any) => )
        )
      }))
    );
  }

  getProjectById(id: number): Observable<Project> {
    const URL = `http://localhost:8080/projects/${id}`;
    return this.http.get(URL)
      .pipe(
        map((project: any) =>
          new Project(project.projectId, project.projectName, JSON.parse(project['classInfoJson']).map((item: any) =>
            new ClassModel(item.className, item.methods)))),
      );
  }

  getDocumentationFlowById(flowId: number): Observable<DocumentFlowModel> {
    const URL = `http://localhost:8080/flows/${flowId}`;
    return this.http.get(URL).pipe(
      tap(response => console.log('getFlow: ', response)),
      map((flowItem: any) => {
        return new DocumentFlowModel(
          flowItem.id, flowItem.projectId, flowItem.projectName, flowItem.flowName,
          JSON.parse(flowItem['classInfoJson']).map((item: any) => new ClassModel(item.className, item.methods))        // JSON.parse(flowItem.classInfoJson).map((item: any) => )
        )
      }))
  }

  generateDocumentation(projectId: number, documentationType: DocumentationType): Observable<string> {
    const URL = `http://localhost:8080/flows/generate/live?flowId=${projectId}&type=${documentationType}`;
    return this.http.get(URL).pipe(
      map((res: any) => res['documentationText'])
    )
  }

  getDocumentationTypes(): Observable<string[]> {
    return of(DOCUMENTATION_TYPES);
  }

  getArchitectureTypes(): Observable<string[]> {
    return of(ARCHITECTURES);
  }

  getDataArchitectureOptions(): Observable<string[]> {
    return of(DATA_ARCHITECTURES);
  }

  getDeploymentStrategiesOptions(): Observable<string[]> {
    return of(DEPLOYMENT_STRATEGIES);
  }

  getFrontEndOptions(): Observable<string[]> {
    return of(USER_EXPERIENCE_AND_FRONT_END);
  }

  getSecurityAndAuthOptions(): Observable<string[]> {
    return of(SECURITY_AND_AUTHENTICATION);
  }

  getTechnologyStackOptions(): Observable<string[]> {
    return of(TECHNOLOGY_STACK);
  }

  getAiArchitectFilterOptions(): Observable<AiArchitectFilterModel> {
    return forkJoin([
      this.getArchitectureTypes(),
      this.getDataArchitectureOptions(),
      this.getDeploymentStrategiesOptions(),
      this.getFrontEndOptions(),
      this.getTechnologyStackOptions(),
      this.getSecurityAndAuthOptions()
    ]).pipe(
      map(([architectureOptions, dataArchitectureOptions, deploymentStrategyOptions,
             frontEndOptions, technologyStackOptions, securityOptions]:
             [string[], string[], string[], string[], string[], string[]]) => {
        const filterOptions: AiArchitectFilterModel = {
           architectureOptions, dataArchitectureOptions, deploymentStrategyOptions,
          frontEndOptions, technologyStackOptions, securityOptions
        };
        return filterOptions
      })
    )
  }

  getGenerateDocsOptions(): Observable<GenerateDocsModel> {
    return forkJoin([
      this.getDocumentationFlows(),
      this.getDocumentationTypes()
    ]).pipe(
      map(([flows, documentationOptions]:
             [DocumentFlowModel[], string[]]) => {
          const options: GenerateDocsModel = {
            flows, documentationOptions
          };
          return options;
        }
      ));
  }

  generateArchitecture(filterOptions: AiArchitectFilterModel): Observable<string> {
    const URL = `http://localhost:8080/requirements/generate-architecture`;
    return this.http.post(URL, {
      architecturalPatterns: filterOptions.architectureOptions,
      dataArchitecture: filterOptions.dataArchitectureOptions,
      deploymentStrategy: filterOptions.deploymentStrategyOptions,
      userExperienceAndFrontEnd: filterOptions.frontEndOptions,
      securityAndAuthentication: filterOptions.securityOptions

    }).pipe(
     map((response: any) => response.proposedArchitecture),
      tap(data => console.log(data))
    )
  }
}
