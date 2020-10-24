# json-parse-to-html
Parse json into html (with search and replace). Implementing of multi leaf tree parsing into DOM tree.

## To be mentioned first:

### Search
Search is being going within text nodes, provided by the input `json` module.

Out of scope: I understand there is a possibility to design more sophisticated algorithm to check closest nodes to check if the search term is included into both (or even spreads across multiple nodes) and highlight the whole term, but I decided not to go that deep :)

### Search performance
To make the search faster I added some kind of `text indexing` -- text nodes all have their own `id`'s which are also added to memory store. While searching we identify the list of `ids` which refer to text nodes those have search matches for sure. This could improve performance for big documents as we traversing the `DOM` using fast ID lookup transactions and in specific document places.

Also searches are being memoized.

### `JSON` config input
Date module is put into `/src/app/data` folder (`doc.ts`).

### Accessibility
Basic accessibility added - you can make all `search`/`replace` actions with keyboard only.

## Running the app

1. `git clone https://github.com/vitalpoltava/json-parse-to-html.git`
2. Change folder to `json-parse-to-html`
3. `npm i`
4. `npm start`
5. Run `http://localhost:4200/` in your browser

![Screenshot1](./Screenshot1.png?raw=true)

![Screenshot2](./Screenshot2.png?raw=true)

![Screenshot3](./Screenshot3.png?raw=true)

