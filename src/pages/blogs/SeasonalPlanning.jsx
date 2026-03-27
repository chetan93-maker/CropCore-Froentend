import { Calendar } from 'lucide-react';
import BlogCategoryLayout from '../../components/BlogCategoryLayout';
import BlogCard from '../../components/BlogCard';

const SeasonalPlanning = () => {
  const posts = [
    {
      id: 1,
      title: "Complete Seasonal Crop Planning Guide",
      excerpt: "What to plant and when - a comprehensive guide for Indian farmers to maximize yield throughout the year.",
      date: "March 5, 2024",
      author: "Agricultural Team",
      authorImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Seasonal Planning",
      readTime: "10 min read",
      views: "3.1k",
      link: "/blogs/seasonal-planning/1"
    },
    {
      id: 2,
      title: "Kharif Season: Best Practices for Monsoon Crops",
      excerpt: "Maximize your yield during the monsoon season with these proven techniques for rice, cotton, and maize cultivation.",
      date: "February 28, 2024",
      author: "Dr. Meera Singh",
      authorImage: "https://images.unsplash.com/photo-1494790108777-766d2f0f5e8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Seasonal Planning",
      readTime: "8 min read",
      views: "2.4k",
      link: "/blogs/seasonal-planning/2"
    },
    {
      id: 3,
      title: "Rabi Season: Winter Crop Management",
      excerpt: "Essential tips for growing wheat, mustard, and gram during the winter season for maximum profitability.",
      date: "February 20, 2024",
      author: "Agricultural Team",
      authorImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Seasonal Planning",
      readTime: "9 min read",
      views: "1.9k",
      link: "/blogs/seasonal-planning/3"
    }
  ];

  return (
    <BlogCategoryLayout
      title="Seasonal Planning"
      subtitle="Maximize your yield with proper seasonal planning"
      gradientFrom="from-emerald-600"
      gradientTo="to-emerald-500"
      icon={<Calendar className="w-8 h-8" />}
    >
      <div className="space-y-8">
        {posts.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </BlogCategoryLayout>
  );
};

export default SeasonalPlanning;