import {DocumentFlowModel} from "./document-flow.model";

export interface AiArchitectFilterModel {
  architectureOptions: string[];
  dataArchitectureOptions: string[];
  deploymentStrategyOptions: string[];
  frontEndOptions: string[];
  technologyStackOptions: string[];
  securityOptions: string[];
  flows?: DocumentFlowModel[];
}
