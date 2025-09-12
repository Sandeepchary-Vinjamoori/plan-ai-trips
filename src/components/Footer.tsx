import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg"></div>
              <h3 className="text-xl font-bold">TravelPlanner</h3>
            </div>
            <p className="text-background/80 leading-relaxed mb-6">
              Making travel planning simple, smart, and stress-free. Your next adventure starts here.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <div className="space-y-3">
              <a href="#" className="block text-background/80 hover:text-primary transition-colors">
                About Us
              </a>
              <a href="#" className="block text-background/80 hover:text-primary transition-colors">
                Our Team
              </a>
              <a href="#" className="block text-background/80 hover:text-primary transition-colors">
                Careers
              </a>
              <a href="#" className="block text-background/80 hover:text-primary transition-colors">
                Press
              </a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <div className="space-y-3">
              <a href="#" className="block text-background/80 hover:text-primary transition-colors">
                Help Center
              </a>
              <a href="#" className="block text-background/80 hover:text-primary transition-colors">
                Contact Us
              </a>
              <a href="#" className="block text-background/80 hover:text-primary transition-colors">
                Travel Guides
              </a>
              <a href="#" className="block text-background/80 hover:text-primary transition-colors">
                Community
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <div className="space-y-3">
              <a href="#" className="block text-background/80 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-background/80 hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="block text-background/80 hover:text-primary transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="block text-background/80 hover:text-primary transition-colors">
                GDPR
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-background/60 text-sm">
            © 2024 TravelPlanner. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <div className="flex items-center space-x-2 text-sm text-background/60">
              <div className="w-2 h-2 bg-feature-accent rounded-full"></div>
              <span>Trusted & Secure</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-background/60">
              <div className="w-2 h-2 bg-feature-primary rounded-full"></div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;