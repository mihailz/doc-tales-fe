import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DocumentationService} from "../../../service/documentation.service";
import {Subscription} from "rxjs";
import {DocumentFlowModel} from "../../../model/document-flow.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";

enum TableHeaderColumn {
  'id' = 'Id',
  'flowName' = 'Flow Name',
  'projectName' = 'Project Name',
  'actions' = 'Actions'
}

type IDocumentFlowColumn = {
  [K in keyof DocumentFlowModel]: string
} & 'actions';

type ITableColumns = keyof DocumentFlowModel;

@Component({
  selector: 'app-flows-manager',
  templateUrl: './flows-manager.component.html',
  styleUrls: ['./flows-manager.component.scss']
})
export class FlowsManagerComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isFetchingData: boolean = false;
  tableHeaderColumn = TableHeaderColumn as any;
  displayedColumns: ITableColumns[] = ['id', 'flowName', 'projectName'];
  dataSource: MatTableDataSource<DocumentFlowModel> = new MatTableDataSource();
  displayedColumnsWithActions: string[] = [...this.displayedColumns, 'actions'];
  private _subs$ = new Subscription();

  constructor(private _router: Router,
              private _documentationService: DocumentationService,
              private _cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchAllFlows();
  }

  ngOnDestroy(): void {
    this._subs$?.unsubscribe();
  }

  fetchAllFlows(): void{
    this._documentationService.getDocumentationFlows()
      .subscribe({
        next: (flows: DocumentFlowModel[]) => {
          this.dataSource = new MatTableDataSource(flows);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this._cdr.markForCheck();
        }
      })
  }

  goToUpdateFlow(row: DocumentFlowModel): void {
    this._router.navigate([`/documentation/update-flow/${row.id}`]);
  }

  goBack(): void {
    this._router.navigate(['/documentation/document-generator']);
  }
}
