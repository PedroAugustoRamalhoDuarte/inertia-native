require "test_helper"

class Turbo::PostsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @turbo_post = turbo_posts(:one)
  end

  test "should get index" do
    get turbo_posts_url
    assert_response :success
  end

  test "should get new" do
    get new_turbo_post_url
    assert_response :success
  end

  test "should create turbo_post" do
    assert_difference("Turbo::Post.count") do
      post turbo_posts_url, params: { turbo_post: { body: @turbo_post.body, title: @turbo_post.title } }
    end

    assert_redirected_to turbo_post_url(Turbo::Post.last)
  end

  test "should show turbo_post" do
    get turbo_post_url(@turbo_post)
    assert_response :success
  end

  test "should get edit" do
    get edit_turbo_post_url(@turbo_post)
    assert_response :success
  end

  test "should update turbo_post" do
    patch turbo_post_url(@turbo_post), params: { turbo_post: { body: @turbo_post.body, title: @turbo_post.title } }
    assert_redirected_to turbo_post_url(@turbo_post)
  end

  test "should destroy turbo_post" do
    assert_difference("Turbo::Post.count", -1) do
      delete turbo_post_url(@turbo_post)
    end

    assert_redirected_to turbo_posts_url
  end
end
