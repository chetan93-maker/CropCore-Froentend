import { Star } from 'lucide-react';
import BlogCategoryLayout from '../../components/BlogCategoryLayout';
import BlogCard from '../../components/BlogCard';

const SuccessStories = () => {
  const posts = [
    {
      id: 1,
      title: "From 2 Acres to 20 Acres: Rajesh's Journey",
      excerpt: "How a small farmer from Punjab used CropCore to scale his operations and increase profits by 300% in just 3 years.",
      date: "March 12, 2024",
      author: "Rajesh Kumar",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Success Stories",
      readTime: "7 min read",
      views: "4.2k",
      link: "/blogs/success-stories/1"
    },
    {
      id: 2,
      title: "Lakshmi's Organic Farm: A Woman Farmer's Triumph",
      excerpt: "How a woman farmer from Maharashtra built a successful organic farming business and became a role model for women in agriculture.",
      date: "March 10, 2024",
      author: "Lakshmi Bai",
      authorImage: "https://images.unsplash.com/photo-1494790108777-766d2f0f5e8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1494790108777-766d2f0f5e8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Fixed: Added image
      category: "Success Stories",
      readTime: "6 min read",
      views: "3.5k",
      link: "/blogs/success-stories/2"
    },
    {
      id: 3,
      title: "Tech-Savvy Farming: How Suresh Digitized His 50-Acre Farm",
      excerpt: "Learn how a traditional farmer embraced technology and increased his farm's efficiency by 200%.",
      date: "March 5, 2024",
      author: "Suresh Patel",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Success Stories",
      readTime: "8 min read",
      views: "2.8k",
      link: "/blogs/success-stories/3"
    }
  ];

  return (
    <BlogCategoryLayout
      title="Success Stories"
      subtitle="Real farmers, real results with CropCore"
      gradientFrom="from-orange-600"
      gradientTo="to-orange-500"
      icon={<Star className="w-8 h-8" />}
    >
      <div className="space-y-8">
        {posts.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </BlogCategoryLayout>
  );
};

export default SuccessStories;