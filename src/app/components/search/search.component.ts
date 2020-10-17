import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
    @Output() searchEmitter = new EventEmitter<string>();

    searchControl = new FormControl('');

    get searchButtonDisabled() {
        return !this.searchControl.value;
    }

    emitSearch() {
        this.searchEmitter.emit(this.searchControl.value);
    }
}
