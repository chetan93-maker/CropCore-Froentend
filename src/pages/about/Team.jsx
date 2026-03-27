import { Link } from 'react-router-dom';
import { ArrowLeft, Sprout, Mail, Linkedin, Twitter } from 'lucide-react';

const Team = () => {
  const team = [
    {
      name: "Rajesh Sharma",
      role: "Founder & CEO",
      bio: "20+ years in agritech, passionate about farmer empowerment",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      email: "rajesh@cropcore.com"
    },
    {
      name: "Priya Patel",
      role: "Head of Agriculture",
      bio: "Agricultural scientist with PhD in sustainable farming",
      image: "https://images.unsplash.com/photo-1494790108777-766d2f0f5e8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      email: "priya@cropcore.com"
    },
    {
      name: "Amit Kumar",
      role: "CTO",
      bio: "Tech innovator building solutions for rural India",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      email: "amit@cropcore.com"
    },
    {
      name: "Sunita Reddy",
      role: "Head of Farmer Relations",
      bio: "Connecting technology with farming communities",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      email: "sunita@cropcore.com"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-2">
              <Sprout className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-800">CropCore</span>
            </Link>
            <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-green-600">
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Team</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Meet the passionate people behind CropCore
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <img src={member.image} alt={member.name} className="w-full h-64 object-cover"/>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-green-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <div className="flex space-x-3">
                  <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-green-600">
                    <Mail size={18} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-green-600">
                    <Linkedin size={18} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-green-600">
                    <Twitter size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;