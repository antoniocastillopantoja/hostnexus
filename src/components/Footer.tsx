
import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon } from "lucide-react";
import { AnimatedLogo } from "./AnimatedLogo";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "About",
      links: [
        { name: "How it works", href: "#" },
        { name: "Newsroom", href: "#" },
        { name: "Investors", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Terms of Service", href: "#" }
      ]
    },
    {
      title: "Community",
      links: [
        { name: "Diversity & Belonging", href: "#" },
        { name: "Accessibility", href: "#" },
        { name: "Referrals", href: "#" },
        { name: "Gift cards", href: "#" }
      ]
    },
    {
      title: "Host",
      links: [
        { name: "Host your home", href: "#" },
        { name: "Host an experience", href: "#" },
        { name: "Responsible hosting", href: "#" },
        { name: "Resource center", href: "#" },
        { name: "Community forum", href: "#" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help center", href: "#" },
        { name: "Trust & Safety", href: "#" },
        { name: "Cancellation options", href: "#" },
        { name: "Neighborhood support", href: "#" }
      ]
    }
  ];
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <AnimatedLogo className="mb-6" />
            <p className="text-gray-600 mb-6">
              Find extraordinary places to stay and unique experiences all around the world.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                <FacebookIcon size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                <TwitterIcon size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                <YoutubeIcon size={20} />
              </a>
            </div>
          </div>
          
          {/* Footer Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} HostNexus, Inc. All rights reserved.
          </p>
          <div className="flex gap-5 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
