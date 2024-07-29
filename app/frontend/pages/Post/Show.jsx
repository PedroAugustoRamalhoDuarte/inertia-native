import { Link, Head } from '@inertiajs/react'
import Post from './Post'

export default function Show({ post, flash }) {
  const onDestroy = (e) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      e.preventDefault()
    }
  }

  return (
    <>
      <Head title={`Post #${post.id}`} />

      <div className="mx-auto md:w-2/3 w-full px-8 pt-8">
        <div className="mx-auto">
          {flash.notice && (
            <p className="py-2 px-3 bg-green-50 mb-5 text-green-500 font-medium rounded-lg inline-block">
              {flash.notice}
            </p>
          )}

          <h1 className="font-bold text-4xl">Post #{post.id}</h1>

          <Post post={post} />

          <Link
            href={`/posts/${post.id}/edit`}
            className="mt-2 rounded-lg py-3 px-5 bg-gray-100 inline-block font-medium"
          >
            Edit this post
          </Link>
          <Link
            href="/posts"
            className="ml-2 rounded-lg py-3 px-5 bg-gray-100 inline-block font-medium"
          >
            Back to posts
          </Link>
          <div className="inline-block ml-2">
            <Link
              href={`/posts/${post.id}`}
              onClick={onDestroy}
              as="button"
              method="delete"
              className="mt-2 rounded-lg py-3 px-5 bg-gray-100 font-medium"
            >
              Destroy this post
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
