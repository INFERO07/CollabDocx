
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Lock, 
  Shield, 
  CloudLightning, 
  CheckCircle,
  Workflow,
  Clock,
  Edit,
  Share2
} from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Link } from 'react-router-dom';

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
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-50/30">
        <Navbar />
        <div className="container mx-auto px-4 pb-16 pt-28 max-w-6xl">
        <motion.header 
          className="text-center mb-16 relative"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-emerald-300/10 to-teal-300/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-emerald-300/10 to-teal-300/10 rounded-full blur-2xl"></div>
          </div>

          <motion.h1 
            className="text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-800 to-teal-800 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Collab Desk
          </motion.h1>
          <motion.p 
            className="text-xl text-emerald-800/80 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Revolutionizing collaborative document management with intelligent real-time editing and robust security.
          </motion.p>
        </motion.header>

        {/* Key Features Section */}
        <motion.section 
          className="grid md:grid-cols-3 gap-6 mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Card className="h-full bg-white/80 backdrop-blur-sm border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-emerald-900 mb-3">Real-Time Collaboration</h3>
                <p className="text-emerald-700">
                  Seamless multi-user editing with instant synchronization across team members.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full bg-white/80 backdrop-blur-sm border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mb-4">
                  <Lock className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-emerald-900 mb-3">Intelligent Locking</h3>
                <p className="text-emerald-700">
                  Advanced document protection preventing conflicting edits and ensuring data integrity.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full bg-white/80 backdrop-blur-sm border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-emerald-900 mb-3">Granular Access Control</h3>
                <p className="text-emerald-700">
                  Flexible permission levels with read, write, and owner access management.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        {/* Detailed Explanation Sections */}
        <motion.div 
          className="space-y-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Locking System Section */}
          <motion.section 
            className="grid md:grid-cols-2 gap-8 items-center"
            variants={itemVariants}
          >
            <div className='text-center md:text-left'>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-800 to-teal-800 bg-clip-text text-transparent mb-6">How Our Locking System Works</h2>
              <div className="space-y-4 text-emerald-800">
                <div className="flex items-center p-3 bg-white/60 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mr-4">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <p>Prevents simultaneous conflicting edits</p>
                </div>
                <div className="flex items-center p-3 bg-white/60 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mr-4">
                    <Workflow className="w-5 h-5 text-emerald-600" />
                  </div>
                  <p>Real-time section-level document locking</p>
                </div>
                <div className="flex items-center p-3 bg-white/60 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mr-4">
                    <CloudLightning className="w-5 h-5 text-emerald-600" />
                  </div>
                  <p>Automatic conflict resolution mechanisms</p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-emerald-100">
              <pre className="text-emerald-800 text-sm">
{`// Simplified Locking Mechanism
function lockDocumentSection(documentId, sectionId, userId) {
  const section = getDocumentSection(documentId, sectionId);
  
  if (section.isLocked) {
    return LockStatus.CONFLICT;
  }
  
  section.lock(userId);
  return LockStatus.ACQUIRED;
}`}
              </pre>
            </div>
          </motion.section>

          <motion.section 
            className="mt-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h2 
              className="text-3xl font-bold bg-gradient-to-r from-emerald-800 to-teal-800 bg-clip-text text-transparent text-center mb-12"
              variants={itemVariants}
            >
              How Collaboration Works
            </motion.h2>

            <motion.div 
              className="grid md:grid-cols-3 gap-6"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <Card className="h-full bg-white/80 backdrop-blur-sm border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mb-4">
                      <Share2 className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-emerald-900 mb-3">Document Sharing</h3>
                    <p className="text-emerald-700">
                      Invite team members and set precise access levels for each document.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="h-full bg-white/80 backdrop-blur-sm border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mb-4">
                      <Edit className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-emerald-900 mb-3">Real-Time Editing</h3>
                    <p className="text-emerald-700">
                      Multiple users can edit simultaneously with instant synchronization.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="h-full bg-white/80 backdrop-blur-sm border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mb-4">
                      <Clock className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-emerald-900 mb-3">Version Tracking</h3>
                    <p className="text-emerald-700">
                      Comprehensive history of changes with ability to revert to previous versions.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.section>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          variants={itemVariants}
        >
          <Link to={'/signup'}>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 px-8 py-6 text-lg rounded-full"
            >
              Get Started Now
            </Button>
          </Link>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;