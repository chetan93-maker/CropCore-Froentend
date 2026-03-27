import { X, Calendar, Clock, Eye, Share2, Bookmark, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

const BlogModal = ({ blog, isOpen, onClose }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !blog) return null;

  const getGradient = () => {
    const gradients = {
      'Farming Tips': 'from-green-700 to-green-500',
      'Soil Health': 'from-amber-700 to-amber-500',
      'Seasonal Planning': 'from-emerald-700 to-emerald-500',
      'Planning': 'from-emerald-700 to-emerald-500',
      'Technology': 'from-blue-700 to-blue-500',
      'AI & ML': 'from-indigo-700 to-indigo-500',
      'IoT': 'from-cyan-700 to-cyan-500',
      'Mobile Tech': 'from-sky-700 to-sky-500',
      'Success Stories': 'from-orange-700 to-orange-500',
      'Success Story': 'from-orange-700 to-orange-500',
      'Market Trends': 'from-purple-700 to-purple-500',
      'Wheat': 'from-purple-700 to-purple-500',
      'Cotton': 'from-purple-700 to-purple-500',
      'Market Outlook': 'from-purple-700 to-purple-500',
    };
    return gradients[blog.category] || 'from-green-700 to-green-500';
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto" 
      onClick={onClose}
    >
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay with animation */}
        <div 
          className="fixed inset-0 transition-opacity duration-300 ease-in-out" 
          aria-hidden="true"
          style={{ opacity: isOpen ? 1 : 0 }}
        >
          <div className="absolute inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm"></div>
        </div>

        {/* Modal panel with animation */}
        <div 
          className={`inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all duration-300 ease-out sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full ${
            isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal header with gradient */}
          <div className={`relative bg-gradient-to-r ${getGradient()} px-8 py-6`}>
            {/* Decorative pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
            
            <div className="relative flex justify-between items-center">
              <div>
                <span className="inline-block bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-3 backdrop-blur-sm">
                  {blog.category}
                </span>
                <h2 className="text-2xl font-bold text-white pr-12 leading-tight">
                  {blog.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="absolute top-0 right-0 text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Modal content */}
          <div className="px-8 py-8 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {/* Author and engagement bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <div className="relative">
                  <img 
                    src={blog.authorImage} 
                    alt={blog.author}
                    className="w-16 h-16 rounded-full object-cover border-3 border-green-100"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80';
                    }}
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-900">{blog.author}</p>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-1">
                    <span className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {blog.date}
                    </span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {blog.readTime}
                    </span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="flex items-center">
                      <Eye size={14} className="mr-1" />
                      {blog.views || '1.2k'} views
                    </span>
                  </div>
                </div>
              </div>

              {/* Engagement buttons */}
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 rounded-full transition-colors ${
                    isLiked ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Heart size={20} className={isLiked ? 'fill-current' : ''} />
                </button>
                <button 
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-2 rounded-full transition-colors ${
                    isBookmarked ? 'bg-green-50 text-green-500' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Bookmark size={20} className={isBookmarked ? 'fill-current' : ''} />
                </button>
                <button 
                  onClick={handleShare}
                  className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Featured image with caption */}
            <figure className="mb-8">
              <img 
                src={blog.image} 
                alt={blog.title}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <figcaption className="text-sm text-gray-500 mt-2 text-center italic">
                {blog.imageCaption || 'Image representative of the topic'}
              </figcaption>
            </figure>

            {/* Blog content with enhanced typography */}
            <div 
              className="prose prose-lg max-w-none
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-ul:list-disc prose-ul:pl-6
                prose-li:text-gray-700
                prose-strong:text-gray-900
                prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline
                prose-blockquote:border-l-4 prose-blockquote:border-green-600 prose-blockquote:bg-green-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
                prose-img:rounded-xl prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: blog.fullContent }}
            />

            {/* Tags section */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related posts suggestion */}
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Enjoyed this article?</h4>
              <p className="text-gray-600 mb-4">Check out more articles in our {blog.category} series.</p>
              <button className="text-green-600 font-medium hover:text-green-700 flex items-center">
                Browse Related Articles
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;