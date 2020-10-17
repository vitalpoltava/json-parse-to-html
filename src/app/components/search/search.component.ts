import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
    @Input() history?: Array<string>;
    @Output() searchEmitter = new EventEmitter<string>();

    searchControl = new FormControl('');

    get searchButtonDisabled() {
        return !this.searchControl.value;
    }

    onHistoryItemSelect(searchItem: string) {
        this.searchControl.setValue(searchItem);
        this.emitSearch();
    }

    emitSearch() {
        this.searchEmitter.emit(this.searchControl.value);
    }
}
