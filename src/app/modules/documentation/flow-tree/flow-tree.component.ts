import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTree, MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";

interface FlowNode {
  name: string;
  children?: FlowNode[];
}

const TREE_DATA: FlowNode[] = [
  {
    name: 'Pet',
    children: [{name: 'getPetName()'}, {name: 'setAge()'}],
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-flow-tree',
  templateUrl: './flow-tree.component.html',
  styleUrls: ['./flow-tree.component.scss']
})
export class FlowTreeComponent implements AfterViewInit {
  @ViewChild('tree') tree!: MatTree<FlowNode>;

  ngAfterViewInit() {
    this.tree.treeControl.expandAll();
  }


  private _transformer = (node: FlowNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

}
