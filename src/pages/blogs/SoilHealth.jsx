import { Droplets } from 'lucide-react';
import BlogCategoryLayout from '../../components/BlogCategoryLayout';
import BlogCard from '../../components/BlogCard';

const SoilHealth = () => {
  const posts = [
    {
      id: 1,
      title: "Understanding Soil Health: A Complete Guide",
      excerpt: "Soil health is the foundation of successful farming. Learn everything about maintaining optimal soil conditions for better yields.",
      date: "March 10, 2024",
      author: "Dr. Priya Patel",
      authorImage: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Soil Health",
      readTime: "8 min read",
      views: "2.3k",
      link: "/blogs/soil-health/1"
    },
    {
      id: 2,
      title: "Soil Testing: When, Why, and How",
      excerpt: "Learn the importance of regular soil testing and how to interpret the results for better farm management.",
      date: "March 7, 2024",
      author: "Dr. Anand Sharma",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Soil Health",
      readTime: "6 min read",
      views: "1.5k",
      link: "/blogs/soil-health/2"
    }
  ];

  return (
    <BlogCategoryLayout
      title="Soil Health"
      subtitle="The foundation of successful farming"
      gradientFrom="from-amber-600"
      gradientTo="to-amber-500"
      icon={<Droplets className="w-8 h-8" />}
    >
      <div className="space-y-8">
        {posts.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </BlogCategoryLayout>
  );
};

export default SoilHealth;