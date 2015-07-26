require 'sinatra'
require "sinatra/namespace"
require 'sinatra/cross_origin'
require 'data_uri'
require 'json'
require 'pg'

configure do
  enable :cross_origin
end

namespace '/api' do
  conn = PG.connect('postgres://jasonbenn@localhost/spirals')

  get '/spirals/:id' do
    content_type :json
    begin
      result = conn.exec_params('SELECT * FROM spirals WHERE id = $1;', [params[:id]])[0]
    rescue PG => err
      puts "Query failed!"
    end
    result.to_json
  end

  get '/spirals' do
    conn.exec('SELECT * FROM spirals;')
    # db.execute( "select * from spirals" ) do |row|
    # return array of { image_url, id, email }
  end

  post '/spirals' do
    uri = URI::Data.new(params['image'])

    File.write("images/#{Time.now}.png", uri.data)
    # Grab image_url from ^ if operation successful

    insert_row = <<-SQL
    INSERT INTO spirals (email, thickness, grid_size, color, image_url) 
    VALUES ($1, $2, $3, $4, $5);
    SQL

    conn.exec_params(insert_row, [params[:email], params[:thickness], params[:gridSize], params[:color], params[:imageUrl]])
    204
  end
end
