import { Link } from 'react-router-dom';
import { ArrowLeft, Sprout, Briefcase, MapPin, Clock, DollarSign } from 'lucide-react';

const Careers = () => {
  const jobs = [
    {
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Mumbai (Remote)",
      type: "Full-time",
      salary: "₹15-25 LPA",
      description: "Build scalable solutions for farmers across India"
    },
    {
      title: "Agricultural Specialist",
      department: "Research",
      location: "Pune",
      type: "Full-time",
      salary: "₹8-12 LPA",
      description: "Provide expert insights for farming features"
    },
    {
      title: "UI/UX Designer",
      department: "Design",
      location: "Bangalore",
      type: "Full-time",
      salary: "₹10-18 LPA",
      description: "Create intuitive interfaces for rural users"
    },
    {
      title: "Sales Manager",
      department: "Sales",
      location: "Multiple locations",
      type: "Full-time",
      salary: "₹8-15 LPA + Commission",
      description: "Expand CropCore's reach across India"
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
          <h1 className="text-5xl font-bold mb-6">Join Our Team</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Help us build the future of Indian agriculture
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Work With Us?</h2>
            <p className="text-lg text-gray-600 mb-8">
              At CropCore, you'll work on meaningful technology that directly impacts millions of farmers. 
              We offer competitive salaries, flexible work arrangements, and a culture of innovation.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-green-600">10+</div>
                <div className="text-gray-600">Team Members</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-green-600">5</div>
                <div className="text-gray-600">States Covered</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-green-600">1000+</div>
                <div className="text-gray-600">Farmers Impacted</div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-8">Open Positions</h2>
          <div className="space-y-6">
            {jobs.map((job, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                    <p className="text-gray-600 mb-2">{job.description}</p>
                  </div>
                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                    {job.department}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock size={16} className="mr-2" />
                    <span className="text-sm">{job.type}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign size={16} className="mr-2" />
                    <span className="text-sm">{job.salary}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Briefcase size={16} className="mr-2" />
                    <span className="text-sm">Experience: 2-5 years</span>
                  </div>
                </div>
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;