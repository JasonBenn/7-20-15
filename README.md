### Getting set up
`npm install`
`bundle install`

### Running
`webpack-dev-server --hot`
`ruby app.rb`

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

* Name the saved images by record ID.
* Add ReactRouter
* Fix grody fields in SpiralForm.
* Create scratch route - for testing components in isolation.
