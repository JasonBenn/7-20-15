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

namespace '/api' do
  helpers do
    def spiral(id)
      result = DB.exec_params('SELECT * FROM spirals WHERE id = $1;', [id])[0]
    rescue PG => err
      halt 400
    end

    def spirals
      DB.exec('SELECT * FROM spirals;').to_a
    rescue PG => err
      halt 400
    end
  end

  get '/spirals/:id' do
    json spiral(params[:id])
  end

  get '/spirals' do
    json spirals
  end

  post '/spirals' do

    insert_row = <<-SQL
    INSERT INTO spirals (email, thickness, grid_size, color)
    VALUES ($1, $2, $3, $4)
    RETURNING id;
    SQL

    begin
      res = DB.exec_params(insert_row, [params[:email], params[:thickness], params[:gridSize], params[:color]])
    rescue PG => err
      halt 503, "Insertion error!"
    end

    id = res[0]['id']

    uri = URI::Data.new(params['image'])
    File.write("images/#{id}.png", uri.data)

    204
  end
end
