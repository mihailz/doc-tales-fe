import {Injectable} from "@angular/core";
import {BehaviorSubject, map, Observable, Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { ClassModel, Project} from "../model/project.model";
import {DocumentFlowModel} from "../model/document-flow.model";
import {DocumentationType} from "../model/documentation-type.model";

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
          JSON.parse(flowItem['classInfoJsonFromFlow']).map((item: any) => new ClassModel(item.className,item.methods))        // JSON.parse(flowItem.classInfoJson).map((item: any) => )
      )}))
    );
  }

  getProjectById(id: number): Observable<Project>{
    const URL = `http://localhost:8080/projects/${id}`;
    return this.http.get(URL)
      .pipe(
        map((project : any )  =>
      new Project(project.projectId, project.projectName, JSON.parse(project['classInfoJson']).map((item: any) =>
        new ClassModel(item.className,item.methods)))),
        tap(response => console.log('Project: ', response))
      );
  }

  getDocumentationFlowById(flowId: number): Observable<DocumentFlowModel> {
    const URL = `http://localhost:8080/flows/${flowId}`;
    return this.http.get(URL).pipe(
      tap(response => console.log('getFlow: ', response)),
      map((flowItem: any) => {
        return new DocumentFlowModel(
          flowItem.id, flowItem.projectId, flowItem.projectName, flowItem.flowName,
          JSON.parse(flowItem['classInfoJson']).map((item: any) => new ClassModel(item.className,item.methods))        // JSON.parse(flowItem.classInfoJson).map((item: any) => )
        )}))
  }

  generateDocumentation(projectId: number, documentationType: DocumentationType): Observable<string> {
    const URL = `http://localhost:8080/flows/generate/live?flowId=${projectId}&type=${documentationType}`;
    return this.http.get(URL).pipe(
      map((res: any) => res['documentationText'])
    )
  }

}
