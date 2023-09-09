export class ClassModel {

  constructor(public name: string, public methods: string[]) {
  }

}

export class Project {

  constructor(public id: number, public projectName: string, public classes: ClassModel[]) {
  }

}

