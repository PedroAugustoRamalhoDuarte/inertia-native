export default function Post({ post }) {
  return (
    <div>
      <p className="my-5">
        <strong className="block font-medium mb-1">Title:</strong>
        {post.title?.toString()}
      </p>
      <p className="my-5">
        <strong className="block font-medium mb-1">Body:</strong>
        {post.body?.toString()}
      </p>
    </div>
  )
}
