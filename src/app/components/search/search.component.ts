import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
    @Input() history?: Array<string>;
    @Output() searchEmitter = new EventEmitter<string>();
    @ViewChild('searchInput') searchInput: ElementRef;

    searchControl = new FormControl('');

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
}
