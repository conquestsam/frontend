import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Leaf, Heart, Zap, Users, Shield, Sparkles, Target } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const features = [
    {
      icon: Brain,
      title: "AI Mood Analysis",
      description: "Advanced AI analyzes your text, voice, and facial expressions to understand your emotional state and recommend perfect content.",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    },
    {
      icon: Leaf,
      title: "Eco-Conscious Viewing",
      description: "Discover environmental documentaries and get tips for sustainable viewing habits while making a positive impact.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },
    {
      icon: Heart,
      title: "Mental Health Support",
      description: "Curated content and wellness tips to support your mental health journey with uplifting and therapeutic recommendations.",
      color: "from-red-500 to-rose-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20"
    },
    {
      icon: Zap,
      title: "Real-Time Recommendations",
      description: "Get instant, personalized movie suggestions that adapt to your changing preferences and viewing history.",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20"
    },
    {
      icon: Users,
      title: "Social Integration",
      description: "Share your favorite discoveries, create watchlists with friends, and get recommendations from your social circle.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data stays secure with local processing for mood analysis and encrypted storage for all personal information.",
      color: "from-gray-500 to-slate-500",
      bgColor: "bg-gray-500/10",
      borderColor: "border-gray-500/20"
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-32 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-24"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600/20 to-purple-600/20 backdrop-blur-sm border border-red-600/30 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white">Powerful Features</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Revolutionary
            <span className="block bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
              Recommendation Engine
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the next generation of movie discovery with AI-powered features 
            designed to understand you better than ever before.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative group p-8 rounded-2xl ${feature.bgColor} ${feature.borderColor} border backdrop-blur-sm hover:scale-105 transition-all duration-300`}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl" />
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-lg" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 lg:mt-32"
          id="how-it-works"
        >
          <div className="text-center mb-16">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
              How It Works
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Get personalized recommendations in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Share Your Mood",
                description: "Tell us how you're feeling through text, voice, or facial expression analysis",
                icon: Target
              },
              {
                step: "02", 
                title: "AI Analysis",
                description: "Our advanced AI processes your input to understand your emotional state and preferences",
                icon: Brain
              },
              {
                step: "03",
                title: "Perfect Matches",
                description: "Receive curated movie recommendations tailored specifically to your current mood and interests",
                icon: Sparkles
              }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center relative"
                >
                  {/* Connection line */}
                  {index < 2 && (
                    <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-red-600/50 to-purple-600/50 transform translate-x-4" />
                  )}
                  
                  <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-purple-600 rounded-full mb-6">
                    <Icon className="w-8 h-8 text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-white mb-4">{step.title}</h4>
                  <p className="text-gray-300">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};