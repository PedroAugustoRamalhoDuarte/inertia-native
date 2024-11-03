json.extract! turbo_post, :id, :title, :body, :created_at, :updated_at
json.url turbo_post_url(turbo_post, format: :json)
