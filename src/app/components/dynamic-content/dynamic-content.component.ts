import { Component, OnInit, ViewChild, ViewContainerRef, Input, ComponentRef, ComponentFactoryResolver, OnDestroy, Output, EventEmitter } from '@angular/core';
import { UserTooltipComponent } from '../user-tooltip/user-tooltip.component';

@Component({
    selector: 'dynamic-content',
    templateUrl: 'dynamic-content.component.html'
})

export class DynamicContentComponent implements OnInit, OnDestroy {

    @ViewChild('container', { read: ViewContainerRef})
    container: ViewContainerRef;

    @Input()
    type: string;

    @Output()
    onContentInit: EventEmitter<void>;

    private componentRef: ComponentRef<{}>;

    private mappings = {
      'userTooltip': UserTooltipComponent
    };

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
        this.onContentInit = new EventEmitter<void>();
    }

    ngOnInit() {
        if (this.type) {
            const componentType = this.getComponentType(this.type);
            const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
            this.componentRef = this.container.createComponent(factory);

            this.onContentInit.emit();
        }
    }

    getComponentType(typeName: string) {
        return this.mappings[typeName];
    }

    ngOnDestroy() {
        if (this.componentRef) {
            this.componentRef.destroy();
            this.componentRef = null;
        }
    }
}
