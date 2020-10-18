import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from '../../app.component';
import { SearchComponent } from './search.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SearchComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [AppComponent, SearchComponent],
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(SearchComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
