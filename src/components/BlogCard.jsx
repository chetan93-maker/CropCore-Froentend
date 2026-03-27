import { Link } from 'react-router-dom';
import { Calendar, Clock, Eye, ChevronRight, User } from 'lucide-react';

const BlogCard = ({ post }) => {
  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
          }}
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-4 py-1.5 bg-green-600 text-white rounded-full text-sm font-medium shadow-lg">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Calendar size={16} className="mr-1" />
            {post.date}
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            {post.readTime}
          </div>
          <div className="flex items-center">
            <Eye size={16} className="mr-1" />
            {post.views}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-green-600 transition-colors">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Author and Read More */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <img 
              src={post.authorImage} 
              alt={post.author}
              className="w-10 h-10 rounded-full object-cover border-2 border-green-100"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80';
              }}
            />
            <div>
              <p className="font-medium text-gray-900">{post.author}</p>
              <p className="text-xs text-gray-500">Expert Contributor</p>
            </div>
          </div>
          <Link 
            to={post.link}
            className="flex items-center text-green-600 hover:text-green-700 font-medium text-sm group"
          >
            Read More
            <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;