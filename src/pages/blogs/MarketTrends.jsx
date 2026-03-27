import { TrendingUp } from 'lucide-react';
import BlogCategoryLayout from '../../components/BlogCategoryLayout';
import BlogCard from '../../components/BlogCard';

const MarketTrends = () => {
  const posts = [
    {
      id: 1,
      title: "Wheat Prices Surge: What Farmers Need to Know",
      excerpt: "Global demand and domestic policies are driving wheat prices up. Learn how to capitalize on this trend.",
      date: "March 15, 2024",
      author: "Market Analysis Team",
      authorImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Market Trends",
      readTime: "4 min read",
      views: "2.1k",
      link: "/blogs/market-trends/1"
    },
    {
      id: 2,
      title: "Cotton Prices Dip: Strategic Advice for Farmers",
      excerpt: "Current market trends show softening cotton prices. Here's how to protect your profits.",
      date: "March 14, 2024",
      author: "Market Analysis Team",
      authorImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Market Trends",
      readTime: "3 min read",
      views: "1.5k",
      link: "/blogs/market-trends/2"
    }
  ];

  return (
    <BlogCategoryLayout
      title="Market Trends"
      subtitle="Stay updated with latest crop prices and market insights"
      gradientFrom="from-purple-600"
      gradientTo="to-purple-500"
      icon={<TrendingUp className="w-8 h-8" />}
    >
      <div className="space-y-8">
        {posts.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </BlogCategoryLayout>
  );
};

export default MarketTrends;