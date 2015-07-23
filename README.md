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

* Possibly the presentation concern in SpiralDetailContainer into SpiralDetail? https://gist.github.com/chantastic/fc9e3853464dffdb1e3c
* Create scratch route - for testing components in isolation.
* Add ReactRouter
* Finish writing serialize() for SpiralForm.
* Name the saved images something guaranteed to be unique given the inputs.
* Actually persist objects to a database in app.rb.
* Reduce duplication in SpiralCanvas between componentDidUpdate & componentDidMount?
* Is jQuery necessary? No - since I removed a serializeJSON() utility I only need it for $.get, lol
* Why don't propTypes throw errors if I pass a prop that is the wrong type?
* Write simple Rails-style db tasks like db:create and db:migrate.

```
db = SQLite3::Database.new("db/development.db")
create_spirals_table = <<SQL
create table spirals (
  id INTEGER PRIMARY KEY,
  email TEXT,
  thickness INTEGER,
  grid_size INTEGER,
  color TEXT,
  image_url TEXT
)
SQL
db.execute(create_spirals_table)
```
