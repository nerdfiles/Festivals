function fests_extract () {
  hxextract script $1 | hxclean | hxnormalize | hxselect 'script[type="application/ld+json"]';
}

function fests_extract_normalize () {
  hxextract "div.fest-card" $1 | hxnormalize;
}

#alias fests.extract=fests_extract
#alias fests.extract_normalize=fests_extract_normalize
