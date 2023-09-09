import {FormArray, FormControl} from "@angular/forms";

export interface DocumentationFilterFormModel {
  documentationType: FormControl,
  service: FormControl,
  classes: FormArray,
  outputFile: FormControl
}
