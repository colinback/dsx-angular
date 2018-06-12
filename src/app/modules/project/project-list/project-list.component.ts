import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';
import { ConfirmDialogComponent } from 'app/modules/project/confirm-dialog/confirm-dialog.component';
import { Subscription } from 'rxjs';
import { EventManager } from 'app/shared/event-manager.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, OnDestroy {
  displayedColumns = ['name', 'type', 'role', 'lastUpdated', 'action'];
  dataSource: MatTableDataSource<Project>;
  headlinks = [
    {
      name: 'Projects',
      url: '/projects'
    }
  ];

  isOpened = false;
  previousOpenPalette = '';
  paletteListener: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private projectService: ProjectService,
    private deleteConfirmDialog: MatDialog,
    private eventManager: EventManager
  ) {
    this.paletteListener = eventManager.subscribe('dsxApp.header', (response) => {
      const palette = response.content;

      if (!this.isOpened) {
        // open palette
        this.isOpened = true;
        this.previousOpenPalette = palette;
      } else if (palette === this.previousOpenPalette) {
        // close palette
        this.isOpened = false;
        this.previousOpenPalette = '';
      } else {
        this.previousOpenPalette = palette;
      }
    });
  }

  ngOnInit() {
    this.getProjects();
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    if (this.paletteListener !== undefined && this.paletteListener !== null) {
      this.eventManager.destroy(this.paletteListener);
    }
  }

  getProjects(): void {
    this.eventManager.broadcast({name: 'dsxApp.progress-bar', content: true});
    this.projectService.getProjects()
      .subscribe(projects => {
        // If progress bar has been shown, keep it for at least 500ms (to avoid flashing).
        setTimeout(() => this.eventManager.broadcast({name: 'dsxApp.progress-bar', content: false}), 500);

        this.dataSource = new MatTableDataSource(projects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  onRemove(id: number) {
    this.eventManager.broadcast({name: 'dsxApp.progress-bar', content: true});
    this.projectService.deleteProject(id)
      .subscribe(() => {
        // If progress bar has been shown, keep it for at least 500ms (to avoid flashing).
        setTimeout(() => this.eventManager.broadcast({name: 'dsxApp.progress-bar', content: false}), 500);

        this.dataSource.data = _.reject(this.dataSource.data, {'id': id});
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDeleteConfirmDialog(project: Project): void {
    const dialogRef = this.deleteConfirmDialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { name: project.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'toDelete') {
        this.onRemove(project.id);
      }
    });
  }
}
