import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
    @Input() history?: Array<string>;
    @Input() found?: number;
    @Output() searchEmitter = new EventEmitter<string>();
    @Output() replaceEmitter = new EventEmitter<string[]>();
    @ViewChild('searchInput') searchInput: ElementRef;
    @ViewChild('replaceInput') replaceInput: ElementRef;

    searchControl = new FormControl('');
    replaceControl = new FormControl('');

    get searchButtonDisabled() {
        return !this.searchControl.value;
    }

    onHistoryItemSelect(searchItem: string) {
        this.searchControl.setValue(searchItem);
        this.emitSearch();
    }

    clearSearch() {
        this.searchInput.nativeElement.focus();
        this.searchControl.setValue('');
        this.emitSearch();
    }

    emitSearch() {
        this.searchEmitter.emit(this.searchControl.value);
    }

    clearReplace() {
        this.replaceInput.nativeElement.focus();
        this.replaceControl.setValue('');
    }

    emitReplace() {
        this.replaceEmitter.emit([this.searchControl.value, this.replaceControl.value]);
        this.searchControl.setValue('');
        this.replaceControl.setValue('');
        this.emitSearch();
    }
}
