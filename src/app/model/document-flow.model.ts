import {ClassModel} from "./project.model";

export class DocumentFlowModel {

  constructor(public id: number, public projectId: number, public projectName: string, public flowName: string, public classes: ClassModel[]) {
  }

}

