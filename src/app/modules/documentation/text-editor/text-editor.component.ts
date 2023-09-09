import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {
  markdown = `## Functionality Overview\\n\\nThe given Java code pertains to defining authorization and functionalities in a Spring-based web application, intended to manage and retrieve data related to specialties of a vet clinic.\\n\\nThe \`getSpecialty(Integer specialtyId)\` method under a class annotated with \`@PreAuthorize(\\"hasRole(@roles.VET_ADMIN)\\")\` is designed to fetch the particular specialty data based on the provided specialty ID, only if the executor holds a 'VET_ADMIN' role.\\n\\nThe \`findSpecialtyById\` method under \`clinicService\` serves as a data access utility responsible for retrieving the specific \`Specialty\` entity from the database using \`specialtyRepository.findById(specialtyId)\`.\\n\\nLastly, the \`Specialty\` class annotated with \`@Entity\` and \`@Table(name = \\"specialties\\")\` represents the \`specialties\` table in the underlying database and acts as an object-relational model in the application. It extends from \`NamedEntity\`.\\n\\n## Usage\\n\\nTo use the \`getSpecialty\` method, a user must have 'VET_ADMIN' role. They need to call this method with a single argument, the ID of the desired specialty. If the specialty data associated with the given ID exists, the method will return this data wrapped in a \`SpecialtyDto\` object; if not, the method will return a \`ResponseEntity\` object that represents a NOT_FOUND HTTP status.\\n\\n## Parameters and Returns\\n\\n\`getSpecialty(Integer specialtyId)\`:\\n- **Parameters**: \\n  - \`specialtyId\` (Integer): The identifier (ID) associated with the desired specialty.\\n- **Returns**: \\n  - If a specialty with the given ID is found, it returns a \`ResponseEntity\` object that includes the specialty's data transformed into a \`SpecialtyDto\` and a HTTP status of OK.\\n  - If no specialty is found matching the given ID, it returns a \`ResponseEntity\` object carrying a HTTP status of NOT_FOUND.\\n\\n\`findSpecialtyById(int specialtyId)\`:\\n- **Parameters**: \\n  - \`specialtyId\` (int): The identifier (ID) associated with the desired specialty.\\n- **Returns**: \\n  - If a specialty with the provided ID exists, it returns the \`Specialty\` object associated with that ID.\\n  - If an exception is thrown (i.e., when the specialty with given ID is not found), it catches the \`ObjectRetrievalFailureException\` or \`EmptyResultDataAccessException\` and returns NULL.\\n\\nFinally, the \`Specialty\` entity class does not have any directly declared fields, only the inherited ones from the \`NamedEntity\` class. It corresponds to the \`specialties\` table in a database, with each instance representing a single row in that table.`

  constructor() { }

  ngOnInit(): void {
    this.markdown = this.markdown.replace(/\\n\\n/g, '<br />\n')
      .replace(/\\n/g, '<br />');
  }

}
