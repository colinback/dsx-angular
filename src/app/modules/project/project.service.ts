import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConnectableObservable, Observable, of } from 'rxjs';
import { catchError, map, tap, publishLast } from 'rxjs/operators';

import { Project } from './project.model';
import { LoggerService } from 'app/shared/logger.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProjectService {
  // projects: Observable<Project[]>;
  private projectsUrl = 'api/projects';  // URL to web api

  constructor(private http: HttpClient, private logger: LoggerService) {
    // this.projects = this.getProjects();
  }

  getProjects(): Observable<Project[]> {
    const projects = this.http.get<Project[]>(this.projectsUrl)
      .pipe(
        tap(responseProjects => this.logger.log('getProjects', responseProjects)),
        catchError(this.handleError('getProjects', []))
      );

    return projects;
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectsUrl, project, httpOptions)
      .pipe(
        tap(responseProject => this.logger.log('posted project', responseProject)),
        catchError(this.handleError('addProject', project))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
