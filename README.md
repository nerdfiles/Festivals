# Festivals

## Setup

    $ npm install

## Help

    $ node index.js -h

## Usage

    $ node index.js scrape <spreadsheet_url> <file_url>

## Needful

    $ hxextract script austin-festivals\?page\=3 | hxclean  | hxnormalize | hxselect 'script[type="application/ld+json"]'

    $ hxextract "div.fest-card" austin-festivals\?page\=3 | hxnormalize

## Example

    $ node index.js scrape 'https://sheetsu.com/apis/v1.0/1903d815' austin-festivals-0.scripts.html.json

## Review

See [results spreadsheet](https://docs.google.com/spreadsheets/d/1ms1v41EiKlHvXVbYyaHUTGWI7vsitRboMYr29fksvbg/edit?usp=sharing).
