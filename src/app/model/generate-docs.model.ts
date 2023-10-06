import {DocumentFlowModel} from "./document-flow.model";

export interface GenerateDocsModel {
  flows: DocumentFlowModel[];
  documentationOptions: string[];
}
