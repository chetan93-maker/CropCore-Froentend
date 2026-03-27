import { Cpu } from 'lucide-react';
import BlogCategoryLayout from '../../components/BlogCategoryLayout';
import BlogCard from '../../components/BlogCard';

const Technology = () => {
  const posts = [
    {
      id: 1,
      title: "AI in Agriculture: The Future is Here",
      excerpt: "How artificial intelligence is transforming farming practices with predictive analytics, crop monitoring, and automated decisions.",
      date: "March 14, 2024",
      author: "Dr. Amit Kumar",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Technology",
      readTime: "6 min read",
      views: "1.8k",
      link: "/blogs/technology/1"
    },
    {
      id: 2,
      title: "IoT Sensors for Smart Farming",
      excerpt: "Monitor soil health, weather, and crop conditions in real-time with Internet of Things technology.",
      date: "March 11, 2024",
      author: "Priya Singh",
      authorImage: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Technology",
      readTime: "5 min read",
      views: "1.2k",
      link: "/blogs/technology/2"
    },
    {
      id: 3,
      title: "Mobile Apps Every Farmer Needs",
      excerpt: "Top agricultural apps to boost your farm productivity, from weather tracking to market prices and farm management.",
      date: "March 8, 2024",
      author: "Rahul Verma",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Technology",
      readTime: "4 min read",
      views: "956",
      link: "/blogs/technology/3"
    }
  ];

  return (
    <BlogCategoryLayout
      title="Agricultural Technology"
      subtitle="Innovations shaping the future of farming"
      gradientFrom="from-blue-600"
      gradientTo="to-blue-500"
      icon={<Cpu className="w-8 h-8" />}
    >
      <div className="space-y-8">
        {posts.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </BlogCategoryLayout>
  );
};

export default Technology;