# react-geocoder

```
forked repo
```

```
npm i react-geocoder-mapbox
yarn add react-geocoder-mapbox
```

A geocoder component using Mapbox.

## api

An `accessToken` is assumed to be a valid Mapbox accessToken.

More information:
https://www.mapbox.com/api-documentation/#geocoding

```
<Geocoder
  accessToken=required string
  onSelect=required function
  onSuggest=optional function
  source=optional string, default 'mapbox.places'
  endpoint=optional string, default 'http://api.tiles.mapbox.com'
  inputClass=optional string, default ''
  inputPlaceholder=optional string, default 'Search'
  resultClass=optional string, default ''
  resultsClass=optional string, default ''
  showLoader=optional string, default ''
  inputPosition=optional string, default 'top', can be 'bottom'
  resultFocusClass=optional string, default 'strong'
  proximity=optional string, default '',
  bbox=optional string, default '',
  types=optional string, default '',
  language=optional string, default '',
  countries=optional string, default '',
  fuzzyMatch=optional bool, default true,
  limit=optional string, default '5',
  routing=optional bool, default false,
  focusOnMount=optional bool, default true
  />
```
