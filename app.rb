require 'sinatra'
require "sinatra/namespace"
require 'sinatra/cross_origin'
require 'data_uri'
require 'json'

configure do
  enable :cross_origin
end

namespace '/api' do
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

  post '/spirals' do
    uri = URI::Data.new(params['image'])
    File.write("images/#{Time.now}.png", uri.data)
    204
  end
end
