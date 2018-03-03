import { Injectable, Component } from '@angular/core';

@Injectable()
export class TooltipService {

    private show: boolean;
    private typeName: string;
    private attachElement: Element;

    constructor() {
        this.show = false;
    }

    openTooltip(typeName: string, attachElement: Element): void {
        this.show = true;
        this.typeName = typeName;
        this.attachElement = attachElement;
    }

    showTooltip(): boolean {
        return this.show;
    }

    closeTooltip(): void {
        this.show = false;
        this.typeName = '';
        this.attachElement = null;
    }

    getTypeName(): string {
        return this.typeName;
    }

    getTooltipAttachElement(): Element {
        return this.attachElement;
    }

    isOpened(): boolean {
        return this.show;
    }
}
