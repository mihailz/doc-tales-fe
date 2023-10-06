import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

export interface Platform {
  name: string;
  imageUrl: string;
  description: string;
  navigateTo: string;
}

export const PLATFORMS_MOCK: Platform[] = [
  {
    name: 'Business Helper',
    imageUrl: '/assets/images/app.png',
    description: '3 lines of description of what this functionality from the platform offers',
    navigateTo: '/documentation'
  },
  {
    name: 'Document Generator',
    imageUrl: '/assets/images/document.png',
    description: '3 lines of description of what this functionality from the platform offers',
    navigateTo: '/documentation/document-generator'
  },
  {
    name: 'AI Architect',
    imageUrl: '/assets/images/artificial-intelligence.png',
    description: '3 lines of description of what this functionality from the platform offers',
    navigateTo: '/documentation/ai-architect'
  },
  {
    name: 'DevOps Assistant',
    imageUrl: '/assets/images/agile.png',
    description: '3 lines of description of what this functionality from the platform offers',
    navigateTo: '/documentation'
  },
];

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit {

  platforms = PLATFORMS_MOCK;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateTo(navigateTo: string): void {
      this.router.navigate([navigateTo]);
  }
}
