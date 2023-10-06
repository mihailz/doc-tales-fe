import { Component, OnInit } from '@angular/core';
import {PLATFORMS_MOCK} from "../../../platform/platform/platform.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-documentation-nav-bar',
  templateUrl: './documentation-nav-bar.component.html',
  styleUrls: ['./documentation-nav-bar.component.scss']
})
export class DocumentationNavBarComponent implements OnInit {

  platforms = PLATFORMS_MOCK;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateTo(navigateTo: string) {
    this.router.navigate([navigateTo]);
  }
}
