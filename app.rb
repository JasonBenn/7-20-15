require 'sinatra'
require "sinatra/namespace"
require 'sinatra/cross_origin'
require 'data_uri'
require 'json'

configure do
  enable :cross_origin
end

namespace '/api' do
  # db = SQLite3::Database.new("db/development.db")

  get '/spirals/:id' do
    content_type :json
    {
      id: 1,
      email: 'jasoncbenn@gmail.com',
      thickness: 5,
      grid_size: 20,
      color: 'blue',
      image_url: 'images/2015-07-23 01/46/28 -0700.png'
    }.to_json
  end

  get '/spirals' do
    # db.execute( "select * from spirals" ) do |row|
    # return array of { image_url, id, email }
  end

  post '/spirals' do
    uri = URI::Data.new(params['image'])
    puts params
    File.write("images/#{Time.now}.png", uri.data)
    # Grab image_url from ^ if operation successful
    # Save into db: { email, thickness, size, color, image_url }, with autoincremented id
    204
  end
end
