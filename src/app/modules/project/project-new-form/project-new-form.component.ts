import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';

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

  onSave() {
    this.model = new Project(this.options.value.id, this.options.value.name,
              this.options.value.type, this.options.value.role, this.options.value.description, Date.now());

    this.projectService.addProject(this.model)
      .subscribe((project: Project) => {
        this.submitted = true;
        this.router.navigate(['/projects']);
      });
  }

  constructor(fb: FormBuilder, private projectService: ProjectService, private router: Router) {
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

}
