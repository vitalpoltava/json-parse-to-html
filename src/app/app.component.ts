import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {renderContent, search, getLastSearch, getSearchHistory} from './service';
import {documentObject} from './data/doc';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    @ViewChild('documentContent') documentContent: ElementRef;

    ngOnInit(): void {
        this.documentContent.nativeElement.innerHTML = renderContent(documentObject.content);
    }

    get history() {
        return getSearchHistory();
    }

    clearLastSearch() {
        const ids = getLastSearch();
        if (ids && ids.length > 0) {
            ids.forEach(id => {
                const el = this.documentContent.nativeElement.querySelector(`[id="${id}"] [name="search"]`);
                if (el) {
                    el.outerHTML = el.innerHTML;
                }
            });
        }
    }

    searchWord(searchTerm: string) {
        this.clearLastSearch();
        if (!searchTerm) {
            return;
        }
        const ids = search(searchTerm);

        if (ids && ids.length > 0) {
            ids.forEach(id => {
                const el = this.documentContent.nativeElement.querySelector(`[id="${id}"]`);
                el.innerHTML = el.innerHTML
                    .replace(searchTerm, `<span name="search" class="bg-warning text-white">${searchTerm}</span>`);
            });
        }
    }
}
