import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Calendar, Github, Linkedin, Mail } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-2 mb-8">
            <User className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Meet the Developer</span>
          </div>

          {/* Developer Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-32 h-32 lg:w-40 lg:h-40 mx-auto rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
              <img
                src="https://res.cloudinary.com/dt0xkqrvk/image/upload/v1750445411/IMG_20250620_195002_740_inqzoo.jpg"
                alt="Developer"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            About the Developer
          </h2>

          <p className="text-lg lg:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Passionate software developer dedicated to creating innovative solutions and 
            transforming ideas into reality through code.
          </p>

          {/* Developer Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: User,
                title: "3MTT ID",
                description: "3MTT/FE/23/97086379",
                highlight: true
              },
              {
                icon: Calendar,
                title: "Cohort",
                description: "Cohort 3",
                highlight: true
              },
              {
                icon: MapPin,
                title: "Location",
                description: "Nigeria"
              }
            ].map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${
                  info.highlight 
                    ? 'bg-white/20 border-white/40' 
                    : 'bg-white/10 border-white/20'
                } backdrop-blur-sm rounded-xl p-6 border`}
              >
                <info.icon className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">{info.title}</h3>
                <p className="text-white/80 text-sm font-medium">{info.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Skills & Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Technologies & Skills</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "React", "TypeScript", "Node.js", "Python", "JavaScript", 
                "Tailwind CSS", "MongoDB", "Express.js", "Git", "AWS"
              ].map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-white text-sm font-medium"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {[
              { icon: Github, label: "GitHub", href: "#" },
              { icon: Linkedin, label: "LinkedIn", href: "#" },
              { icon: Mail, label: "Email", href: "#" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-5 h-5" />
                {social.label}
              </motion.a>
            ))}
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 pt-8 border-t border-white/20"
          >
            <blockquote className="text-white/90 text-lg italic max-w-2xl mx-auto">
              "Code is not just about solving problems; it's about creating possibilities 
              and building the future one line at a time."
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};