import storeItems from '../data/items.json'

export const filterItems = (searchTerm: string, selectedCategory: string, items: typeof storeItems) => {
  let filteredItems = items;

  if (selectedCategory !== 'all') {
    filteredItems = filteredItems.filter((item) => item.category === selectedCategory);
  }

  if (searchTerm !== '') {
    filteredItems = filteredItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return filteredItems;
};

export const showAllItems = (searchTerm: string, selectedCategory: string) => {
  return searchTerm === '' && selectedCategory === 'all';
};
