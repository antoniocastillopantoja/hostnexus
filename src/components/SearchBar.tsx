
import { useState } from "react";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function SearchBar() {
  const [activeTab, setActiveTab] = useState(0);
  const { t } = useLanguage();
  
  const tabs = [
    { name: t('search.where'), icon: MapPin, placeholder: t('search.destination') },
    { name: t('search.when'), icon: Calendar, placeholder: t('search.dates') },
    { name: t('search.who'), icon: Users, placeholder: t('search.guests') }
  ];
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {tabs.map((tab, index) => (
          <button
            key={tab.name}
            className={`group relative flex-1 flex items-center p-5 ${
              index !== tabs.length - 1 ? "border-b md:border-b-0 md:border-r" : ""
            } border-gray-200 transition-colors ${
              activeTab === index ? "bg-white" : "hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab(index)}
          >
            <div className="flex items-center gap-3 flex-1">
              <tab.icon size={20} className="text-gray-600" />
              <div className="text-left flex-1">
                <p className="text-sm font-medium">{tab.name}</p>
                <p className="text-gray-500 text-sm truncate">{tab.placeholder}</p>
              </div>
            </div>
            {activeTab === index && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black md:w-full" />
            )}
          </button>
        ))}
        
        <div className="p-3 bg-white">
          <button className="bg-[#0284C7] hover:bg-[#0369A1] transition-colors text-white rounded-lg h-14 px-6 flex items-center justify-center gap-2 font-medium">
            <Search size={18} />
            <span>{t('search.button')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
