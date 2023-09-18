import {Component, Input, OnInit, Renderer2} from '@angular/core';
import {DocumentFlowModel} from "../../../model/document-flow.model";
import {DocumentationService} from "../../../service/documentation.service";
import {finalize} from "rxjs";
import {DocumentationType} from "../../../model/documentation-type.model";

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {
  show: boolean = false;
  markdown = '';
  isLoading = false;
  documentationType = DocumentationType;
  @Input() flow!: DocumentFlowModel;

  constructor(private renderer: Renderer2, private documentationService: DocumentationService) { }

  ngOnInit(): void {
  }

  copyToClipboard(text: string): void {
    const textarea = this.renderer.createElement('textarea');
    this.renderer.setAttribute(textarea, 'readonly', 'true');
    this.renderer.setStyle(textarea, 'position', 'absolute');
    this.renderer.setStyle(textarea, 'left', '-9999px');
    this.renderer.setProperty(textarea, 'value', text);

    this.renderer.appendChild(document.body, textarea);
    textarea.select();
    document.execCommand('copy');
    this.renderer.removeChild(document.body, textarea);
  }

  copyText(): void {
    this.copyToClipboard(this.markdown);
  }

  generateDocumentation(documentationType: DocumentationType): void {
    if (this.flow) {
      this.setLoading(true);
      this.documentationService.generateDocumentation(this.flow.projectId, documentationType)
        .pipe(
          finalize(() => this.isLoading = false)
        )
        .subscribe({
          next: (res: string) =>  {
            this.markdown = res.replace(/\\n\\n/g, '<br />\n')
              .replace(/\\n/g, '<br />');
          }
        });
    }
  }

  private setLoading(loading = false): void {
    this.isLoading = loading;
  }
}
