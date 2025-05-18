import React from 'react';
import { ProductCategory } from '@/types';

interface CategoryFilterProps {
  selectedCategory: ProductCategory | 'all';
  onSelectCategory: (category: ProductCategory | 'all') => void;
  className?: string;
}

const CategoryFilter = ({ selectedCategory, onSelectCategory, className = '' }: CategoryFilterProps) => {
  const categories = Object.values(ProductCategory);
  
  return (
    <div className={`flex flex-wrap gap-2 mb-6 ${className}`}>
      <div 
        className={`category-chip ${selectedCategory === 'all' ? 'active' : ''}`}
        onClick={() => onSelectCategory('all')}
      >
        All Items
      </div>
      {categories.map((category) => (
        <div
          key={category}
          className={`category-chip ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
