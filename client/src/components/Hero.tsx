import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FileText, Users, Clock, PenTool, Waves, FileEdit, Send, Delete } from 'lucide-react';
import { useRecoilValue } from 'recoil';
import { authAtom } from '@/store/auth';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const auth = useRecoilValue(authAtom)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const floatingVariants = {
    float: {
      y: [0, 20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Floating Background Elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden"
        initial={{ opacity: 0.2 }}
        animate={{ 
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Blurred Gradient Circles */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

        {/* Floating Icons */}
        <motion.div 
          className="absolute top-1/4 left-10 opacity-30"
          variants={floatingVariants}
          animate="float"
        >
          <PenTool size={64} className="text-emerald-400" />
        </motion.div>
        <motion.div 
          className="absolute top-[200px] right-10 opacity-30"
          variants={floatingVariants}
          animate="float"
        >
          <FileEdit size={64} className="text-teal-400" />
        </motion.div>
        <motion.div 
          className="absolute bottom-1/4 left-[200px] opacity-30"
          variants={floatingVariants}
          animate="float"
        >
          <Waves size={64} className="text-cyan-400" />
        </motion.div>
        <motion.div 
          className="absolute bottom-[40px] left-1/3 opacity-30"
          variants={floatingVariants}
          animate="float"
        >
          <Delete size={64} className="text-emerald-400" />
        </motion.div>
        <motion.div 
          className="absolute bottom-[100px] right-[300px] opacity-30"
          variants={floatingVariants}
          animate="float"
        >
          <Send size={64} className="text-teal-400" />
        </motion.div>
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600"
        >
          Collaborate Without Limits
        </motion.h1>

        <motion.p 
          className="text-xl md:text-2xl mb-10 max-w-3xl text-gray-600"
          variants={itemVariants}
        >
          Seamlessly create, share, and collaborate on documents with powerful version control and intelligent access management.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          {!auth.isAuthenticated && (
            <>
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                  Get Started
                </Button>
              </Link>
              <Link to="/signin">
                <Button size="lg" variant="outline" className="border-2 border-teal-500 text-teal-700 hover:bg-teal-50">
                  Sign In
                </Button>
              </Link>
            </>
          )}
          {auth.isAuthenticated && (
            <Link to="/mydocs">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                Go to My Docs
              </Button>
            </Link>
          )}
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8 w-full max-w-4xl"
          variants={containerVariants}
        >
          {[
            {
              Icon: FileText,
              color: "text-emerald-500",
              title: "Smart Documents",
              description: "Create rich, collaborative documents with intelligent real-time editing."
            },
            {
              Icon: Users,
              color: "text-teal-500",
              title: "Team Collaboration",
              description: "Invite team members with granular, customizable access controls."
            },
            {
              Icon: Clock,
              color: "text-cyan-500",
              title: "Version History",
              description: "Comprehensive version tracking with easy rollback and comparison."
            }
          ].map(({ Icon, color, title, description }) => (
            <motion.div 
              key={title}
              className="bg-white/80 p-8 rounded-2xl border border-emerald-100 shadow-lg hover:shadow-xl backdrop-blur-sm hover:bg-white/90 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Icon className={`mx-auto mb-4 ${color}`} size={48} />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;