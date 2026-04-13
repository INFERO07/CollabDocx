import { Rocket } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Rocket className="w-8 h-8 text-emerald-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">CleverMind</span>
            </div>
            <p className="text-emerald-200">Revolutionizing team collaboration with intelligent document management.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-lg text-emerald-300">Product</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-emerald-200 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-emerald-200 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-emerald-200 hover:text-white transition-colors">Integrations</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-lg text-emerald-300">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-emerald-200 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-emerald-200 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-emerald-200 hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-lg text-emerald-300">Support</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-emerald-200 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-emerald-200 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-emerald-200 hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-emerald-800 text-center">
          <p className="text-emerald-300">&copy; 2024 CollabDocs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;