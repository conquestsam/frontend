import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Film Enthusiast",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      rating: 5,
      text: "MovieApp's mood-based recommendations are incredible! It perfectly understood my need for uplifting content during a tough week and suggested movies that genuinely helped my mental health.",
      highlight: "Perfect mood matching"
    },
    {
      name: "Michael Chen",
      role: "Environmental Activist",
      avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
      rating: 5,
      text: "The eco-conscious viewing mode opened my eyes to amazing environmental documentaries I never would have found. It's not just entertainment, it's education and inspiration.",
      highlight: "Eye-opening content"
    },
    {
      name: "Emily Rodriguez",
      role: "Psychology Student",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      rating: 5,
      text: "As someone studying mental health, I'm amazed by how accurately the AI analyzes emotional states. The wellness tips paired with movie recommendations create a holistic experience.",
      highlight: "Scientifically impressive"
    },
    {
      name: "David Thompson",
      role: "Movie Critic",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      rating: 5,
      text: "I've tried every recommendation platform out there. CinemaVault's AI is in a league of its own - it understands nuance and context better than human curators.",
      highlight: "Best in class AI"
    },
    {
      name: "Lisa Park",
      role: "Busy Parent",
      avatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg",
      rating: 5,
      text: "With limited time for movies, I need every recommendation to count. CinemaVault never disappoints - it's like having a personal movie consultant who knows me perfectly.",
      highlight: "Never disappoints"
    },
    {
      name: "James Wilson",
      role: "Tech Professional",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg",
      rating: 5,
      text: "The privacy-first approach gives me confidence to share personal mood data. The local processing is brilliant - powerful AI without compromising privacy.",
      highlight: "Privacy-focused excellence"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-24"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-sm border border-yellow-600/30 rounded-full px-6 py-2 mb-6">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-white">Loved by Users</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            What Our Users
            <span className="block bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Are Saying
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of satisfied users who have transformed their movie discovery experience
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
        >
          {[
            { number: "4.9/5", label: "Average Rating" },
            { number: "500K+", label: "Happy Users" },
            { number: "10M+", label: "Recommendations Made" },
            { number: "98%", label: "Satisfaction Rate" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-gray-400 text-sm lg:text-base">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-20">
                <Quote className="w-8 h-8 text-white" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Highlight Badge */}
              <div className="inline-block bg-gradient-to-r from-red-600/20 to-purple-600/20 border border-red-600/30 rounded-full px-3 py-1 mb-4">
                <span className="text-xs font-medium text-white">{testimonial.highlight}</span>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-300 leading-relaxed mb-6 relative z-10">
                "{testimonial.text}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                />
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>

              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-300 mb-6">
            Ready to join our community of satisfied users?
          </p>
          <motion.button
            className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl shadow-red-600/25 transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(239, 68, 68, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Free Trial
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};