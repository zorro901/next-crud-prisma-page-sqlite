// pages/index.tsx
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Post } from '@prisma/client';

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/posts');
        setPosts(res.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Welcome to My Blog</h1>
      <div>
        <Link href="/posts/create">
          Create a New Post
        </Link>
      </div>
      <div>
        <h2>Existing Posts:</h2>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
