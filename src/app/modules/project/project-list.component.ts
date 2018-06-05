import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Project } from './project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  displayedColumns = ['name', 'type', 'role', 'lastUpdated'];
  dataSource: MatTableDataSource<Project>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    const projects: Project[] = [
    {
      name: "szy1",
      type: "normal",
      role: "admin",
      lastUpdated: 1521170361180
    },
    {
      name: "szy2",
      type: "normal",
      role: "viewer",
      lastUpdated: 1521170361180
    },
    {
      name: "szy3",
      type: "library",
      role: "editor",
      lastUpdated: 1521170361180
    },
    {
      name: "szy4",
      type: "normal",
      role: "admin",
      lastUpdated: 1521170361180
    },
    {
      name: "szy5",
      type: "library",
      role: "admin",
      lastUpdated: 1521170361180
    },
    {
      name: "szy6",
      type: "normal",
      role: "admin",
      lastUpdated: 1521170361180
    }
  ];

    this.dataSource = new MatTableDataSource(projects);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
