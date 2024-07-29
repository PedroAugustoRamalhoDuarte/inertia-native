import { Link, Head } from '@inertiajs/react'
import { Fragment } from 'react'
import Post from './Post'

export default function Index({ posts, flash }) {
  return (
    <>
      <Head title="Posts" />
      <div className="mx-auto md:w-2/3 w-full px-8 pt-8">
        {flash.notice && (
          <p className="py-2 px-3 bg-green-50 mb-5 text-green-500 font-medium rounded-lg inline-block">
            {flash.notice}
          </p>
        )}
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-4xl">Posts</h1>
          <Link
            href="/posts/new"
            className="rounded-lg py-3 px-5 bg-blue-600 text-white block font-medium"
          >
            New post
          </Link>
        </div>

        <div className="min-w-full">
          {posts.map((post) => (
            <Fragment key={post.id}>
              <Post post={post} />
              <p>
                <Link
                  href={`/posts/${post.id}`}
                  className="ml-2 rounded-lg py-3 px-5 bg-gray-100 inline-block font-medium"
                >
                  Show this post
                </Link>
              </p>
            </Fragment>
          ))}
        </div>
      </div>
    </>
  )
}
