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

namespace '/api' do
  DB = PG.connect('postgres://jasonbenn@localhost/spirals')

  helpers do
    def spiral(id)
      result = DB.exec_params('SELECT * FROM spirals WHERE id = $1;', [id])
    rescue PG => err
      halt 400
    else
      result[0]
    end

    def spirals
      DB.exec('SELECT * FROM spirals;')
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

    # Grab image_url from ^ if operation successful

    insert_row = <<-SQL
    INSERT INTO spirals (email, thickness, grid_size, color, image_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id;
    SQL

    # make sure this doesn't fail
    begin
      res = DB.exec_params(insert_row, [params[:email], params[:thickness], params[:gridSize], params[:color], params[:imageUrl]])
    rescue PG => err
      halt 503, "Insertion error!"
    end
    puts res.inspect
    puts res[0]

    begin
      uri = URI::Data.new(params['image'])
      File.write("images/#{Time.now}.png", uri.data)
    rescue
      # couldn't write file?
    end

    # if successful, no content
    204

    # if not successful, service unavailable
    # 503
  end
end
