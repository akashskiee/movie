import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Translations} from '@common/core/translations/translations.service';

const MORE_TEXT = 'more';
const LESS_TEXT = 'less';
const SUFFIX = '...';

@Directive({
    selector: '[moreLessText]',
})
export class MoreLessTextDirective implements OnChanges {
    @Input('moreLessText') limit = 100;
    @Input('textContent') textContent: string;

    private expanded = false;
    private shortenedContent: string;
    private originalContent: string;
    private button: HTMLButtonElement;
    private textContainer: HTMLSpanElement;
    private readonly moreText: string;
    private readonly lessText: string;

    constructor(
        private el: ElementRef<HTMLElement>,
        private i18n: Translations,
    ) {
        this.moreText = this.i18n.t(MORE_TEXT);
        this.lessText = this.i18n.t(LESS_TEXT);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.updateContents(changes.textContent ? changes.textContent.currentValue : '');
    }

    private updateContents(text: string) {
        this.originalContent = text || '';
        const limit = +this.limit;
        const shouldShorten = this.originalContent.length > limit;

        this.shortenedContent = shouldShorten ?
            this.originalContent.slice(0, limit - SUFFIX.length) + SUFFIX :
            this.originalContent;

        this.createTextContainer();

        if (shouldShorten) {
            this.createButton();
        }
    }

    private onButtonClick() {
        if (this.expanded) {
            this.textContainer.textContent = this.shortenedContent;
            this.button.textContent = this.moreText;
            this.expanded = false;
        } else {
            this.textContainer.textContent = this.originalContent;
            this.button.textContent = this.lessText;
            this.expanded = true;
        }
    }

    private createTextContainer() {
        this.el.nativeElement.textContent = '';
        this.textContainer = document.createElement('span');
        this.textContainer.textContent = this.shortenedContent;
        this.el.nativeElement.appendChild(this.textContainer);
    }

    private createButton() {
        this.button = document.createElement('button');
        this.button.classList.add('no-style', 'more-less-button');
        this.button.textContent = this.moreText;
        this.button.addEventListener('click', () => this.onButtonClick());
        this.el.nativeElement.appendChild(this.button);
    }
}
