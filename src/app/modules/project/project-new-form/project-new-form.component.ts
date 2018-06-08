import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';
import { CommunicationService } from 'app/shared/communication.service';

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

  constructor(
    fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private communication: CommunicationService
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

    this.communication.sendData({ isFetching: true });
    this.projectService.addProject(this.model)
      .subscribe((project: Project) => {
        // If progress bar has been shown, keep it for at least 500ms (to avoid flashing).
        setTimeout(() => this.communication.sendData({ isFetching: false }), 500);

        this.submitted = true;
        this.router.navigate(['/projects']);
      });
  }
}
