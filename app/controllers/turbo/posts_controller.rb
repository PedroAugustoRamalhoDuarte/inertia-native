class Turbo::PostsController < ApplicationController
  include Rails.application.routes.url_helpers
  layout "application_turbo"
  before_action :set_turbo_post, only: %i[ show edit update destroy ]

  # GET /turbo/posts or /turbo/posts.json
  def index
    @turbo_posts = Post.all
  end

  # GET /turbo/posts/1 or /turbo/posts/1.json
  def show
  end

  # GET /turbo/posts/new
  def new
    @turbo_post = Post.new
  end

  # GET /turbo/posts/1/edit
  def edit
  end

  # POST /turbo/posts or /turbo/posts.json
  def create
    @turbo_post = Post.new(turbo_post_params)

    respond_to do |format|
      if @turbo_post.save
        format.html { redirect_to turbo_post_url(@turbo_post), notice: "Post was successfully created." }
        format.json { render :show, status: :created, location: @turbo_post }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @turbo_post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /turbo/posts/1 or /turbo/posts/1.json
  def update
    respond_to do |format|
      if @turbo_post.update(turbo_post_params)
        format.html { redirect_to turbo_post_url(@turbo_post), notice: "Post was successfully updated." }
        format.json { render :show, status: :ok, location: @turbo_post }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @turbo_post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /turbo/posts/1 or /turbo/posts/1.json
  def destroy
    @turbo_post.destroy!

    respond_to do |format|
      format.html { redirect_to turbo_posts_url, notice: "Post was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_turbo_post
      @turbo_post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def turbo_post_params
      params.require(:turbo_post).permit(:title, :body)
    end
end
