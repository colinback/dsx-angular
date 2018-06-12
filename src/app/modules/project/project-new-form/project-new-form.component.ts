import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';
import { EventManager } from 'app/shared/event-manager.service';

@Component({
  selector: 'app-project-new-form',
  templateUrl: './project-new-form.component.html',
  styleUrls: ['./project-new-form.component.css']
})
export class ProjectNewFormComponent implements OnInit {
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
  }

  ngOnInit() {
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
