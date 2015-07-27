### Getting set up
```
(cd web && npm install) && (cd api && bundle install)
```

### Running
`foreman start`

### Component outline:
```
// Index page:
ThumbnailGridContainer // GETs /spirals
  ThumbnailGrid // presentation concern
    #render
    #renderThumbnail

SpiralDetailContainer // GETs /spirals/:id
  SpiralDetail // maintains inputs state, re-renders Canvas (???)
    SpiralCanvas
    SpiralForm // POSTs to /spirals
      TextInput x 4
```

### TODO:

* Make React Router work
* Create scratch route - for testing components in isolation.
* Improve grody `fields` in SpiralForm?
* Validate inputs before state change
