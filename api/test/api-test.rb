ENV['RACK_ENV'] = 'test'

require_relative '../api'
require 'test/unit'
require 'test/unit/notify'
require 'rack/test'

class APITest < Test::Unit::TestCase
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  def test_it_responds
    get '/api/spirals'
    assert last_response.ok?
  end

  def test_it_gets_a_spiral
    get '/api/spirals/1'
    assert_equal last_response.body, {
        "modified_at": "2015-07-27 13:01:02.266803-07",
        "id": "1",
        "email": "jasoncbenn@gmail.com",
        "thickness": "5",
        "grid_size": "25",
        "color": "black",
        "image_url": nil
      }.to_json
  end
end
