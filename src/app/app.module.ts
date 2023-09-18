import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {LayoutComponent} from "./components/layout/layout.component";
import {ImagesService} from "./service/images.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Route, RouterModule} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MarkdownModule} from "ngx-markdown";
import { FlowTreeComponent } from './components/shared/flow-tree/flow-tree.component';

const routes: Route[] = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module')
      .then(m => m.AuthModule),
  },
  {
    path: 'documentation',
    loadChildren: () => import('./modules/documentation/documentation.module')
      .then(m => m.DocumentationModule)
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
]

@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        FlowTreeComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        MarkdownModule.forRoot(),
    ],
    providers: [ImagesService],
    exports: [
        FlowTreeComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
