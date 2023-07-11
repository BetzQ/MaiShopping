import { useState } from 'react';

export const useStoreState = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  return {
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
  };
};
