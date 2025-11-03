FROM ruby:3.2

ENV BUNDLE_PATH=/usr/local/bundle \
    APP_HOME=/app \
    RAILS_ENV=development

RUN apt-get update -y \
    && apt-get install -y --no-install-recommends build-essential git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR ${APP_HOME}

# Placeholders for Rails app files; project will be initialized in Phase 2
COPY Gemfile Gemfile.lock* ${APP_HOME}/

RUN bash -lc 'if [ -f Gemfile ]; then bundle install; fi'

COPY . ${APP_HOME}

# Ensure Rails bin is executable inside the image
RUN chmod +x bin/rails || true

EXPOSE 3000

CMD ["bash", "-lc", "if [ -f bin/rails ]; then bundle install && chmod +x bin/rails && bin/rails db:prepare && bin/rails s -b 0.0.0.0 -p 3000; else echo \"Rails app not initialized yet.\" && sleep infinity; fi"]


