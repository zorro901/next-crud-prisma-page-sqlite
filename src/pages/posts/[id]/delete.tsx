// pages/posts/[id]/delete.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const DeletePostPage = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.delete(`/api/posts/${id}`)
        .then(res => {
          console.log('Deleted post:', res.data);
          router.push('/'); // 削除後、ホームページにリダイレクト
        })
        .catch(err => console.error('Error deleting post:', err));
    }
  }, [id, router]);

  return (
    <div>
      <p>Deleting post...</p>
    </div>
  );
};

export default DeletePostPage;
