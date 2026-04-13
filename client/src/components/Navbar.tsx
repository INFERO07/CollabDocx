import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogTrigger 
} from "@/components/ui/dialog";

// Icons
import { 
  Rocket, 
  Menu, 
  FileText,
  Home,
  Info,
  LogOut,
  Edit
} from 'lucide-react';

// Local imports
import { authAtom } from '@/store/auth';
import EditProfileDialog from './EditProfileDialog';

// Type definitions
interface UserProfile {
  name: string;
  email: string;
  profileImage: string;
}

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [auth, setAuth] = useRecoilState(authAtom);
  const navigate = useNavigate();

  // Simulated user profile with fallback values
  const userProfile: UserProfile = {
    name: auth.user?.name || "John Doe",
    email: auth.user?.email || "john.doe@example.com",
    profileImage: auth.user?.profileImage || "https://via.placeholder.com/150",
  };

  const handleLogout = () => {
    setAuth({ user: null, isAuthenticated: false });
    localStorage.removeItem('token');
    navigate('/');
  };

  // const handleProfileEdit = () => {
  //   setIsProfileDialogOpen(true);
  // };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm border-b border-emerald-100">
      <div className="container mx-auto max-w-[1500px] flex justify-between items-center py-4 px-4 lg:px-4">
        {/* Logo Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-3"
        >
          <Rocket className="w-8 h-8 text-emerald-600" />
          <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">CleverMind</span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link to={'/'}>
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <Link to={'/about'}>
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              >
                <Info className="w-4 h-4 mr-2" />
                About
              </Button>
            </Link>
            
            {auth.user && (
              <Link to={'/myDocs'}>
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  My Docs
                </Button>
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {!auth.user ? (
              <>
                <Link to="/signin">
                  <Button variant="ghost" className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
                    Get Started
                  </Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <img
                      src={userProfile.profileImage}
                      alt="Profile"
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userProfile.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userProfile.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
                    <DialogTrigger asChild>
                      <DropdownMenuItem className="cursor-pointer">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <EditProfileDialog isOpen={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen} />
                  </Dialog>
                  <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-700">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </Button>
                </Link>
                <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <Info className="mr-2 h-4 w-4" />
                    About
                  </Button>
                </Link>
                {auth.user && (
                  <Link to="/mydocs" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      My Docs
                    </Button>
                  </Link>
                )}
                {!auth.user ? (
                  <div className="flex flex-col gap-2">
                    <Link to="/signin" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Profile
                        </Button>
                      </DialogTrigger>
                      <EditProfileDialog isOpen={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen} />
                    </Dialog>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </Button>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;