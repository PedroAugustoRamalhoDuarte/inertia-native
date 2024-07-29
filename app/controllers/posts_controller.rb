class PostsController < ApplicationController
  before_action :set_post, only: %i[ show edit update destroy ]

  inertia_share flash: -> { flash.to_hash }

  # GET /posts
  def index
    @posts = Post.all
    render inertia: 'Post/Index', props: {
      posts: @posts.map do |post|
        serialize_post(post)
      end
    }
  end

  # GET /posts/1
  def show
    render inertia: 'Post/Show', props: {
      post: serialize_post(@post)
    }
  end

  # GET /posts/new
  def new
    @post = Post.new
    render inertia: 'Post/New', props: {
      post: serialize_post(@post)
    }
  end

  # GET /posts/1/edit
  def edit
    render inertia: 'Post/Edit', props: {
      post: serialize_post(@post)
    }
  end

  # POST /posts
  def create
    @post = Post.new(post_params)

    if @post.save
      redirect_to @post, notice: "Post was successfully created."
    else
      redirect_to new_post_url, inertia: { errors: @post.errors }
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      redirect_to @post, notice: "Post was successfully updated."
    else
      redirect_to edit_post_url(@post), inertia: { errors: @post.errors }
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy!
    redirect_to posts_url, notice: "Post was successfully destroyed."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:title, :body)
    end

    def serialize_post(post)
      post.as_json(only: [
        :id, :title, :body
      ])    end
end
