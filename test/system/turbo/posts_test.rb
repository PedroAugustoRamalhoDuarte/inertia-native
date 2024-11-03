require "application_system_test_case"

class Turbo::PostsTest < ApplicationSystemTestCase
  setup do
    @turbo_post = turbo_posts(:one)
  end

  test "visiting the index" do
    visit turbo_posts_url
    assert_selector "h1", text: "Posts"
  end

  test "should create post" do
    visit turbo_posts_url
    click_on "New post"

    fill_in "Body", with: @turbo_post.body
    fill_in "Title", with: @turbo_post.title
    click_on "Create Post"

    assert_text "Post was successfully created"
    click_on "Back"
  end

  test "should update Post" do
    visit turbo_post_url(@turbo_post)
    click_on "Edit this post", match: :first

    fill_in "Body", with: @turbo_post.body
    fill_in "Title", with: @turbo_post.title
    click_on "Update Post"

    assert_text "Post was successfully updated"
    click_on "Back"
  end

  test "should destroy Post" do
    visit turbo_post_url(@turbo_post)
    click_on "Destroy this post", match: :first

    assert_text "Post was successfully destroyed"
  end
end
