require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Sonaka
  class Application < Rails::Application
    config.load_defaults 7.1

    # API-only app; we can trim middleware if needed
    config.api_only = true
  end
end


