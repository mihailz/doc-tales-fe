import {Component, Input, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {
  @Input() markdownText!: string;
  @Input() isLoading = false;

  constructor(private renderer: Renderer2) { }

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
    this.copyToClipboard(this.markdownText);
  }
}
