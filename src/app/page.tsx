
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { motion, easeInOut } from 'framer-motion';
import { Sparkles, Users, BookOpen, ArrowRight, Star, Zap, Target, Trophy } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [isUser, setIsUser] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUser(true);
      } else {
        setIsUser(false);
      }
    });
    return () => unsubscribe();
  }, []);

  if (isUser === null) return null;

  if (isUser === false) {
    router.push('/auth/register');
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: easeInOut // use the imported easing array from Framer Motion
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={floatingAnimation}
        />
        <motion.div 
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-violet-400/10 to-purple-400/10 rounded-full blur-3xl"
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-6xl"
        >
          <Card className="backdrop-blur-xl bg-white/5 border-white/20 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-12 text-center">
              {/* Header Section */}
              <motion.div variants={itemVariants} className="mb-12">
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl shadow-lg mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Sparkles className="w-10 h-10 text-white" />
                </motion.div>
                
                <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-violet-200 bg-clip-text text-transparent">
                  Skill Swap
                </h1>
                
                <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Discover amazing skills, connect with talented people, and learn together in a vibrant community
                </p>

                {/* Stats Section */}
                <motion.div 
                  variants={itemVariants}
                  className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12"
                >
                  <div className="text-center">
                    <motion.div 
                      className="text-3xl font-bold text-white mb-2"
                      whileHover={{ scale: 1.1 }}
                    >
                      10K+
                    </motion.div>
                    <div className="text-purple-200 text-sm">Skills Shared</div>
                  </div>
                  <div className="text-center">
                    <motion.div 
                      className="text-3xl font-bold text-white mb-2"
                      whileHover={{ scale: 1.1 }}
                    >
                      5K+
                    </motion.div>
                    <div className="text-purple-200 text-sm">Active Users</div>
                  </div>
                  <div className="text-center">
                    <motion.div 
                      className="text-3xl font-bold text-white mb-2"
                      whileHover={{ scale: 1.1 }}
                    >
                      98%
                    </motion.div>
                    <div className="text-purple-200 text-sm">Success Rate</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
              >
                <Link href="/skills/browse">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="group"
                  >
                    <Card className="h-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-400/30 backdrop-blur-sm hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300">
                      <CardContent className="p-8 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                          <BookOpen className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Browse Skills</h3>
                        <p className="text-blue-200 text-sm mb-4">Explore thousands of skills from our community</p>
                        <ArrowRight className="w-5 h-5 text-blue-300 mx-auto group-hover:translate-x-1 transition-transform" />
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>

                <Link href="/profile/create">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="group"
                  >
                    <Card className="h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/30 backdrop-blur-sm hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300">
                      <CardContent className="p-8 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                          <Star className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Create Profile</h3>
                        <p className="text-purple-200 text-sm mb-4">Showcase your skills and start your journey</p>
                        <ArrowRight className="w-5 h-5 text-purple-300 mx-auto group-hover:translate-x-1 transition-transform" />
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>

                <Link href="/swaps">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="group"
                  >
                    <Card className="h-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-400/30 backdrop-blur-sm hover:from-emerald-500/30 hover:to-teal-500/30 transition-all duration-300">
                      <CardContent className="p-8 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                          <Users className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">View Swaps</h3>
                        <p className="text-emerald-200 text-sm mb-4">Connect with others and start skill exchanges</p>
                        <ArrowRight className="w-5 h-5 text-emerald-300 mx-auto group-hover:translate-x-1 transition-transform" />
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Feature Highlights */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                <motion.div 
                  className="text-center group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-xl mb-3 group-hover:from-yellow-400/40 group-hover:to-orange-400/40 transition-all">
                    <Zap className="w-6 h-6 text-yellow-300" />
                  </div>
                  <div className="text-sm text-white font-medium">Fast Learning</div>
                </motion.div>

                <motion.div 
                  className="text-center group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-xl mb-3 group-hover:from-green-400/40 group-hover:to-emerald-400/40 transition-all">
                    <Target className="w-6 h-6 text-green-300" />
                  </div>
                  <div className="text-sm text-white font-medium">Goal Focused</div>
                </motion.div>

                <motion.div 
                  className="text-center group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-xl mb-3 group-hover:from-blue-400/40 group-hover:to-indigo-400/40 transition-all">
                    <Users className="w-6 h-6 text-blue-300" />
                  </div>
                  <div className="text-sm text-white font-medium">Community</div>
                </motion.div>

                <motion.div 
                  className="text-center group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-xl mb-3 group-hover:from-purple-400/40 group-hover:to-pink-400/40 transition-all">
                    <Trophy className="w-6 h-6 text-purple-300" />
                  </div>
                  <div className="text-sm text-white font-medium">Achievement</div>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
