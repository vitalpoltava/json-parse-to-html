# json-parse-to-html
Parse json into html (with search and replace)

## To be mentioned first:

### Search
As per the challenge description there should be search by `any text inserted by the user`, yet below only search by `words` mentioned. In the end I decided to implement something in-between and provide search within text nodes, provided by the input `json` module.

### Search performance
To make the search faster I added some kind of `text indexing` -- text nodes all have their own `id`'s which are also added to memory store. While searching we identify the list of `ids` which refer to text nodes those have search matches for sure. This could improve performance for big documents as we traversing the `DOM` using fast ID lookup transactions and in specific document places.

Also searches are being memoized.

### `JSON` config input
As no clear mention on how `json` data should be provided I decided to make in all `frontend-only` and put it as a module into `/src/app/data` folder. For inspection purposes you can replace the content with the same structure to `doc.ts` module.

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

