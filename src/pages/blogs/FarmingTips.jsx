import { Link } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import BlogCategoryLayout from '../../components/BlogCategoryLayout';
import BlogCard from '../../components/BlogCard';

const FarmingTips = () => {
  const posts = [
    {
      id: 1,
      title: "10 Essential Tips for Beginner Farmers",
      excerpt: "Start your farming journey with these proven tips from experienced farmers that will help you avoid common mistakes and maximize your yield.",
      date: "March 15, 2024",
      author: "Dr. Rajesh Sharma",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Farming Tips",
      readTime: "5 min read",
      views: "1.2k",
      link: "/blogs/farming-tips/1"
    },
    {
      id: 2,
      title: "Natural Pest Control Methods",
      excerpt: "Eco-friendly ways to protect your crops without harmful chemicals while maintaining ecological balance.",
      date: "March 12, 2024",
      author: "Dr. Priya Patel",
      authorImage: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Farming Tips",
      readTime: "4 min read",
      views: "856",
      link: "/blogs/farming-tips/2"
    },
    {
      id: 3,
      title: "Organic Fertilizer Guide",
      excerpt: "Learn how to make and use organic fertilizers to improve soil health and crop yield naturally.",
      date: "March 8, 2024",
      author: "Dr. Anand Sharma",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Farming Tips",
      readTime: "6 min read",
      views: "2.1k",
      link: "/blogs/farming-tips/3"
    }
  ];

  return (
    <BlogCategoryLayout
      title="Farming Tips"
      subtitle="Practical advice for better farming - from beginners to experts"
      gradientFrom="from-green-600"
      gradientTo="to-green-500"
      icon={<Sprout className="w-8 h-8" />}
    >
      <div className="space-y-8">
        {posts.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </BlogCategoryLayout>
  );
};

export default FarmingTips;