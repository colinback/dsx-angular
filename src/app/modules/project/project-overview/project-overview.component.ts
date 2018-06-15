import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

export interface NotebookElement {
  name: string;
  status: string;
  language: string;
  lastUpdated: number;
}

const NOTEBOOK_DATA: NotebookElement[] = [
  {name: 'nb1', status: '', language: 'Scala', lastUpdated: 1521170361180},
  {name: 'nb2', status: '',  language: 'Python', lastUpdated: 1521170361180}
];

export interface DatasetElement {
  name: string;
  type: string;
  size: number;
  lastUpdated: number;
  datasource: string;
}

const DATASET_DATA: DatasetElement[] = [
  {name: 'customer', type: 'TABLE', size: -1, lastUpdated: 1521170361180, datasource: 'db2z'},
  {name: 'tent', type: 'CSV',  size: 16500, lastUpdated: 1521170361180, datasource: 'Local File'}
];

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.css']
})
export class ProjectOverviewComponent implements OnInit {
  headlinks: any;

  nbDisplayedColumns = ['name', 'status', 'language', 'lastUpdated'];
  nbDataSource = NOTEBOOK_DATA;

  dsDisplayedColumns = ['name', 'type', 'size', 'lastUpdated', 'datasource'];
  dsDataSource = DATASET_DATA;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.headlinks = [
      {
        name: 'Projects',
        url: '/projects'
      }, {
        name: `${id}`,
        url: `/projects/${id}`
      }
    ];
  }
}
