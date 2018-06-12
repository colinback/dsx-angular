import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';
import { Subscription } from 'rxjs';
import { EventManager } from 'app/shared/event-manager.service';

@Component({
  selector: 'app-project-new-form',
  templateUrl: './project-new-form.component.html',
  styleUrls: ['./project-new-form.component.css']
})
export class ProjectNewFormComponent implements OnInit, OnDestroy {
  types = ['Normal', 'Library'];
  submitted = false;
  // model = new Project(0, '', '', '', '', 0);
  model: Project;
  options: FormGroup;

  headlinks = [
    {
      name: 'Projects',
      url: '/projects'
    }, {
      name: 'Create Project',
      url: '/projects/new'
    }
  ];

  isOpened = false;
  previousOpenPalette = '';
  paletteListener: Subscription;

  constructor(
    fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private eventManager: EventManager
  ) {
    this.options = fb.group({
      'id': [null, Validators.min(1)],
      'name': '',
      'description': '',
      'type': 'Normal',
      'role': 'Admin'
    });

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

  ngOnInit() { }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    if (this.paletteListener !== undefined && this.paletteListener !== null) {
      this.eventManager.destroy(this.paletteListener);
    }
  }

  onSave() {
    this.model = new Project(
      this.options.value.id,
      this.options.value.name,
      this.options.value.type,
      this.options.value.role,
      this.options.value.description,
      Date.now()
    );

    this.eventManager.broadcast({name: 'dsxApp.progress-bar', content: true});
    this.projectService.addProject(this.model)
      .subscribe((project: Project) => {
        // If progress bar has been shown, keep it for at least 500ms (to avoid flashing).
        setTimeout(() => this.eventManager.broadcast({name: 'dsxApp.progress-bar', content: false}), 500);

        this.submitted = true;
        this.router.navigate(['/projects']);
      });
  }
}
