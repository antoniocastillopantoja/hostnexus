
import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon } from "lucide-react";
import { AnimatedLogo } from "./AnimatedLogo";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  
  const footerLinks = [
    {
      title: t('footer.about'),
      links: [
        { name: t('footer.howItWorks'), href: "#" },
        { name: t('footer.newsroom'), href: "#" },
        { name: t('footer.investors'), href: "#" },
        { name: t('footer.careers'), href: "#" },
        { name: t('footer.terms'), href: "#" }
      ]
    },
    {
      title: t('footer.community'),
      links: [
        { name: t('footer.diversity'), href: "#" },
        { name: t('footer.accessibility'), href: "#" },
        { name: t('footer.referrals'), href: "#" },
        { name: t('footer.giftCards'), href: "#" }
      ]
    },
    {
      title: t('footer.host'),
      links: [
        { name: t('footer.hostHome'), href: "#" },
        { name: t('footer.hostExperience'), href: "#" },
        { name: t('footer.responsibleHosting'), href: "#" },
        { name: t('footer.resourceCenter'), href: "#" },
        { name: t('footer.communityForum'), href: "#" }
      ]
    },
    {
      title: t('footer.support'),
      links: [
        { name: t('footer.helpCenter'), href: "#" },
        { name: t('footer.trustSafety'), href: "#" },
        { name: t('footer.cancellationOptions'), href: "#" },
        { name: t('footer.neighborhoodSupport'), href: "#" }
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
              {t('footer.description')}
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
            © {currentYear} HostNexus, Inc. {t('footer.rights')}
          </p>
          <div className="flex gap-5 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
              {t('footer.privacy')}
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
              {t('footer.terms')}
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
              {t('footer.sitemap')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
