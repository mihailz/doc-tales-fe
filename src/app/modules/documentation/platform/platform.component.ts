import { Component, OnInit } from '@angular/core';

export interface Platform {
  name: string;
  icon: string;
  navigateTo?: string;
}

const PLATFORMS_MOCK: Platform[] = [
  {
    name: 'Document Generator',
    icon: 'library_books',
    navigateTo: '/documentation/document-generator'
  },
  {
    name: 'AI Architect',
    icon: 'developer_mode'
  },
  {
    name: 'DevOps Assistant',
    icon: 'developer_board'
  },
  {
    name: 'Business Helper',
    icon: 'description'
  }
];

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit {

  platforms = PLATFORMS_MOCK;

  constructor() { }

  ngOnInit(): void {
  }

}
