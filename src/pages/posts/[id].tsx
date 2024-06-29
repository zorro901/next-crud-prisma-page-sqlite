// pages/posts/[id].tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { Post } from '@prisma/client';

const PostDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post|null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        try {
          const res = await axios.get(`/api/posts/${id}`);
          setPost(res.data);
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${id}`);
      router.push('/'); // 削除後、トップページにリダイレクト
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      {post ? (
        <>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <div>
            <button onClick={handleDelete}>Delete</button>
            <Link href={`/posts/${id}/update`}>
              Update
            </Link>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <Link href={`/`}>
        Top Page
      </Link>
    </div>
  );
};

export default PostDetailPage;
