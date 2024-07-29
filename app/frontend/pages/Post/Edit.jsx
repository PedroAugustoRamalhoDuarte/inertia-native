import { Link, Head } from '@inertiajs/react'
import Form from './Form'

export default function Edit({ post }) {
  return (
    <>
      <Head title="Editing post" />

      <div className="mx-auto md:w-2/3 w-full px-8 pt-8">
        <h1 className="font-bold text-4xl">Editing post</h1>

        <Form
          post={post}
          onSubmit={(form) => {
            form.transform((data) => ({ post: data }))
            form.patch(`/posts/${post.id}`)
          }}
          submitText="Update post"
        />

        <Link
          href={`/posts/${post.id}`}
          className="ml-2 rounded-lg py-3 px-5 bg-gray-100 inline-block font-medium"
        >
          Show this post
        </Link>
        <Link
          href="/posts"
          className="ml-2 rounded-lg py-3 px-5 bg-gray-100 inline-block font-medium"
        >
          Back to posts
        </Link>
      </div>
    </>
  )
}
