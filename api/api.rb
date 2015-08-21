require 'pry-remote'
require 'sinatra'
require "sinatra/namespace"
require "sinatra/json"
require 'sinatra/cross_origin'
require 'data_uri'
require 'json'
require 'pg'

require "sinatra/reloader" if development?

configure do
  enable :cross_origin
end

set :port, 4567
set :public_folder, 'images'

DB = PG.connect('postgres://jasonbenn@localhost/spirals')

module SpiralAndSpiralImageAggregate
  def setup
    # prepared statement - a way to cache the lexing, parsing, and analyzing of a SQL string
    # execution is all that remains.
  end

  def all
  end

  def get
    # call methods on spiral and points
  end
end

module SpiralAndSpiralImageTransaction
  # mapping of identity
  def transact
    # DB.exec('begin')
    # store apis...
    # DB.exec('commit')
    # begin, commit = SQL transactions
    # Run a txn that guar
  end
end

module SpiralRecordSet
  extend self

  def setup
    # create table
  end

  def reset
    # truncate, setup
  end

  # mapping of identity => record.

  def all
    DB.exec('SELECT * FROM spirals;').to_a
  end

  def get(id)
    DB.exec_params('SELECT * FROM spirals WHERE id = $1;', [id]).to_a.first
  end

  def put # provides id. yo client - make sure it's unique!
    # use postgres upsert?
    # insert or ignore and update # ?? research
    # given an id and a record, guarantee that it's been written when you return them a value.
  end

  # def del(id)
    # does pg freak out when i delete an id that doesn't exist? if not, idempotent delete is easy.
  # end
end

module SpiralImageBlobSet
  # same API as above record set.
  # mapping of identity => blob data. How I choose to store that is encapsulated here.
end

binding.pry

namespace '/api' do
  # this should be web code.

  get '/spirals/:id' do
    # define a validation function elsewhere, if it fails, short circuit.
    json spiral(params[:id]) || halt(404)
  end

  get '/spirals' do
    json spirals
  end

  post '/spirals' do
    # generate uuid (128bit?)

    insert_row = <<-SQL
    INSERT INTO spirals (id, email, thickness, grid_size, color)
    VALUES ($1, $2, $3, $4, $5)
    SQL

    begin
      # File != web
      res = DB.exec_params(insert_row, id, [params[:email], params[:thickness], params[:gridSize], params[:color]])
    rescue PG => err
      halt 503, "Insertion error!"
    end

    id = res[0]['id']

    uri = URI::Data.new(params['image'])
    # File != web
    File.write("images/#{id}.png", uri.data)

    204
  end
end
