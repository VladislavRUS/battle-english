import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { TooltipService } from '../../services/tooltip.service';

@Component({
    selector: 'tooltip',
    templateUrl: 'tooltip.component.html'
})

export class TooltipComponent implements OnInit {

    ngOnInit(): void {
    }

    constructor(
        private tooltipService: TooltipService,
        private elementRef: ElementRef) { }

    showTooltip(): boolean {
        return this.tooltipService.showTooltip();
    }

    getTypeName(): string {
        return this.tooltipService.getTypeName();
    }

    getTooltipAttachElement(): any {
        return this.tooltipService.getTooltipAttachElement();
    }

    private setTooltipPosition(tooltipAttachElement: HTMLElement, tooltipElement: HTMLElement): void {

        const viewportOffset = tooltipAttachElement.getBoundingClientRect();

        const top = viewportOffset.top + tooltipAttachElement.offsetHeight / 2 - 5;
        const left = viewportOffset.left - tooltipElement.offsetWidth + tooltipAttachElement.offsetWidth;

        tooltipElement.style.top = `${top}px`;
        tooltipElement.style.left = `${left}px`;
    }

    contentInit(): void {

        const attachElement = this.getTooltipAttachElement();
        const tooltipElement = this.elementRef.nativeElement.querySelector('.tooltip');

        this.setTooltipPosition(attachElement, tooltipElement);

        setTimeout(() => {
            tooltipElement.classList.add('_active');
        });

        const tooltipWrapper = this.elementRef.nativeElement.querySelector('.tooltip__wrapper');

        tooltipWrapper.addEventListener('click', (event) => {
            if (event.target.classList.contains('tooltip__wrapper')) {
                this.tooltipService.closeTooltip();
            }
        });

        window.addEventListener('resize', () => this.setTooltipPosition(attachElement, tooltipElement));
    };
}
