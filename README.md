# Festivals

## Setup

    $ npm install

## Help

    $ node index.js -h

## Spreadsheet

    $ node index.js scrape <spreadsheet_url> <file_url>

## Inner

    $ hxextract script austin-festivals\?page\=3 | hxclean  | hxnormalize | hxselect 'script[type="application/ld+json"]'

    $ hxextract "div.fest-card" austin-festivals\?page\=3 | hxnormalize
