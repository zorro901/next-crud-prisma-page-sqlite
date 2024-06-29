// pages/api/posts/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.id as string;

  if (req.method === 'GET') {
    try {
      const post = await prisma.post.findUnique({
        where: { id: parseInt(postId, 10) },
      });
      if (!post) {
        res.status(404).json({ error: 'Post not found' });
      } else {
        res.status(200).json(post);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching post' });
    }
  } else if (req.method === 'PUT') {
    const { title, content } = req.body;
    try {
      const updatedPost = await prisma.post.update({
        where: { id: parseInt(postId, 10) },
        data: { title, content },
      });
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ error: 'Error updating post' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.post.delete({
        where: { id: parseInt(postId, 10) },
      });
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting post' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
