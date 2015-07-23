require 'sinatra'
require "sinatra/namespace"
require 'sinatra/cross_origin'
require 'data_uri'

configure do
  enable :cross_origin
end

namespace '/api' do
  post '/spirals' do
    uri = URI::Data.new(params['image'])
    File.write("images/#{Time.now}.png", uri.data)
    204
  end
end
