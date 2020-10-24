import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { renderContent, search, getSearchHistory, replaceInSource } from './service';
import { documentObject } from './data/doc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('documentContent', {static: true}) documentContent: ElementRef;
  found = 0;

  ngOnInit(): void {
    this.documentContent.nativeElement.innerHTML = renderContent(documentObject.content);
  }

  get history() {
    return getSearchHistory();
  }

  clearSearch() {
    this.found = 0;
    const els = this.documentContent.nativeElement.querySelectorAll(`[role="search"]`);
    if (els && els.length) {
      for (const el of els) {
        el.outerHTML = el.innerHTML;
      }
    }
  }

  searchWord(searchTerm: string, replacement?: string) {
    let found = 0;
    this.clearSearch();
    if (!searchTerm) {
      return;
    }
    const ids = search(searchTerm);

    if (ids && ids.length > 0) {
      if (replacement) {
        replaceInSource(ids, searchTerm, replacement);
      }
      ids.forEach(id => {
        const el = this.documentContent.nativeElement.querySelector(`[id="${id}"]`);
        if (el) {
          const reg = new RegExp(searchTerm, 'ig');
          const content = el.innerHTML;
          el.innerHTML = content.replace('&amp;', '&').replace(reg, function(match) {
            found++;
            return replacement ? replacement : `<span role="search" class="bg-warning text-white">${match}</span>`;
          });
        }
      });
    }
    this.found = found;
  }

  replaceWord(payload: string[]) {
    const [searchTerm, replaceTerm] = payload;
    this.searchWord(searchTerm, replaceTerm);
  }
}
