import { Component, Directive, Input, OnInit, OnChanges, SimpleChange,
  ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { PaletteInfoComponent } from './palette-info.component';
import { PaletteConnectionComponent } from './palette-connection.component';

@Directive({
  selector: '[appPaletteHost]',
})
export class PaletteDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.css']
})
export class PaletteComponent implements OnInit, OnChanges {
  @Input() palette: string;
  @ViewChild(PaletteDirective) paletteHost: PaletteDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
  }

  loadComponent(palette: string) {
    let componentFactory;

    switch (palette) {
      case 'info':
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(PaletteInfoComponent);
        break;
      case 'connection':
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(PaletteConnectionComponent);
        break;
      default:
        break;
    }

    const viewContainerRef = this.paletteHost.viewContainerRef;
    viewContainerRef.clear();

    if (palette !== '') {
      viewContainerRef.createComponent(componentFactory);
    }
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    const propName = 'palette';
    const changedProp = changes[propName];
    this.loadComponent(changedProp.currentValue);
  }
}
