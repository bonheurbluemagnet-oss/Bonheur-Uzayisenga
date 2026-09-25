import React from 'react';
import { Category } from '../types';
import { useStore } from '../context/StoreContext';
import { ChevronRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const { setSelectedCategory, setCurrentView } = useStore();

  const handleSelect = () => {
    setSelectedCategory(category);
    setCurrentView('category');
  };

  return (
    <button
      type="button"
      onClick={handleSelect}
      className="group relative flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-400 hover:shadow-lg transition-all duration-200 text-center w-full focus:outline-hidden focus:ring-2 focus:ring-amber-500/20"
    >
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-slate-100 mb-3 border border-slate-100 group-hover:scale-105 transition-transform duration-300">
        <img
          src={category.image}
          alt={category.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>

      <span className="font-heading font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-1">
        {category.name}
      </span>

      <span className="text-[10px] text-slate-400 mt-0.5">
        {category.subcategories?.length || 0} subcategories
      </span>

      <div className="mt-2 text-[10px] font-semibold text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
        <span>Explore</span>
        <ChevronRight className="w-3 h-3" />
      </div>
    </button>
  );
};
