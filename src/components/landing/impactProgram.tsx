import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, Target, BookOpen, Code, Globe, Lightbulb } from 'lucide-react';

export const ImpactOfProgram: React.FC = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-2 mb-8">
            <TrendingUp className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Program Impact</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            The Impact of 3MTT Program
            <span className="block">on My Journey</span>
          </h2>

          <p className="text-lg lg:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            The 3 Million Technical Talent (3MTT) program has been transformative, 
            providing world-class training and opportunities that have shaped my career in technology.
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: Users,
              number: "3M+",
              label: "Nigerians Trained",
              description: "Across various tech disciplines"
            },
            {
              icon: Code,
              number: "12+",
              label: "Months Training",
              description: "Intensive skill development"
            },
            {
              icon: Award,
              number: "100%",
              label: "Certification",
              description: "Industry-recognized credentials"
            },
            {
              icon: Target,
              number: "85%",
              label: "Job Placement",
              description: "Success rate for graduates"
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center"
            >
              <stat.icon className="w-8 h-8 text-white mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
              <h3 className="text-white font-semibold mb-2">{stat.label}</h3>
              <p className="text-white/80 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Program Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Program Benefits</h3>
            <div className="space-y-4">
              {[
                {
                  icon: BookOpen,
                  title: "Comprehensive Curriculum",
                  description: "Cutting-edge technologies and industry best practices"
                },
                {
                  icon: Users,
                  title: "Expert Mentorship",
                  description: "Guidance from seasoned professionals and industry leaders"
                },
                {
                  icon: Globe,
                  title: "Global Standards",
                  description: "Training aligned with international tech industry requirements"
                },
                {
                  icon: Target,
                  title: "Career Placement",
                  description: "Direct pathways to employment opportunities"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 bg-white/5 rounded-lg p-4"
                >
                  <benefit.icon className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">{benefit.title}</h4>
                    <p className="text-white/80 text-sm">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Personal Journey</h3>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <div>
                    <h4 className="text-white font-semibold">Frontend Development Mastery</h4>
                    <p className="text-white/80 text-sm">Gained expertise in React, TypeScript, and modern web technologies</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-white/70 rounded-full"></div>
                  <div>
                    <h4 className="text-white font-semibold">Industry Best Practices</h4>
                    <p className="text-white/80 text-sm">Learned professional development workflows and methodologies</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-white/50 rounded-full"></div>
                  <div>
                    <h4 className="text-white font-semibold">Real-world Projects</h4>
                    <p className="text-white/80 text-sm">Built portfolio projects that demonstrate practical skills</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                  <div>
                    <h4 className="text-white font-semibold">Career Readiness</h4>
                    <p className="text-white/80 text-sm">Prepared for professional opportunities in the tech industry</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          <Lightbulb className="w-12 h-12 text-white mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-white mb-4">Vision for Nigeria's Digital Future</h3>
          <p className="text-white/90 text-lg leading-relaxed max-w-3xl mx-auto mb-6">
            The 3MTT program is not just about individual growth—it's about building Nigeria's 
            digital economy. By training 3 million technical talents, we're creating a workforce 
            that will drive innovation, attract global investments, and position Nigeria as a 
            leading technology hub in Africa.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Digital Innovation",
              "Economic Growth",
              "Global Competitiveness",
              "Youth Empowerment"
            ].map((vision, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-white text-sm font-medium"
              >
                {vision}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-white/90 text-lg mb-6">
            Ready to be part of Nigeria's tech transformation?
          </p>
          <motion.a
            href="https://3mtt.nitda.gov.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:bg-gray-100 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More About 3MTT
            <TrendingUp className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};