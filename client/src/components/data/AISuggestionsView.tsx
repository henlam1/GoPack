import { SuggestedItem } from '../../models/ItemModel';
import SuggestionCategory from './SuggestionCategory';

interface AISuggestionsViewProps {
  suggestions: Record<string, SuggestedItem[]>;
  setSuggestions: React.Dispatch<
    React.SetStateAction<Record<string, SuggestedItem[]>>
  >;
}

const mockData = {
  Clothing: [
    { name: 'Underwear', quantity: 10 },
    { name: 'Socks', quantity: 8, note: 'Mix of walking & hiking socks' },
    { name: 'T-shirts/Tops', quantity: 6, note: 'Moisture-wicking for hiking' },
    { name: 'Long-Sleeve Shirts', quantity: 2 },
    { name: 'Hiking Pants/Trousers', quantity: 1 },
    { name: 'Casual Pants/Jeans', quantity: 1 },
    { name: 'Shorts/Skirt', quantity: 1, note: 'Weather dependent' },
    { name: 'Waterproof/Windproof Jacket', quantity: 1 },
    { name: 'Fleece/Sweater', quantity: 1 },
    { name: 'Pajamas', quantity: 2 },
  ],
  Electronics: [
    { name: 'Phone Charger', quantity: 1 },
    { name: 'Portable Power Bank', quantity: 1 },
    { name: 'Travel Adapter', quantity: 1, note: 'Type A/B, 100V for Japan' },
    { name: 'Headphones', quantity: 1 },
    { name: 'Camera', quantity: 1, note: 'Optional, for sightseeing' },
  ],
  Essentials: [
    { name: 'Passport', quantity: 1 },
    {
      name: 'Visa',
      quantity: 1,
      note: "Check Japan's requirements for your nationality",
    },
    {
      name: 'Wallet & Local Currency (JPY)',
      quantity: 1,
      note: 'Credit/Debit Cards',
    },
    { name: 'Phone', quantity: 1 },
    { name: 'Daypack', quantity: 1, note: 'For daily excursions and hiking' },
  ],
};

export function AISuggestionsView({
  suggestions,
  setSuggestions,
}: AISuggestionsViewProps) {
  // Helper functions to edit suggestions
  function removeCategory(category: string) {
    setSuggestions((prev) => {
      const newObj = { ...prev };
      delete newObj[category];
      return newObj;
    });
  }
  function renameCategory(oldName: string, newName: string) {
    setSuggestions((prev) => {
      const newObj = { ...prev }; // copy top-level object
      newObj[newName] = newObj[oldName]; // assign old items to new key
      delete newObj[oldName]; // remove old key
      return newObj; // return new object
    });
  }

  function addItem(category: string, newItem: SuggestedItem) {
    setSuggestions((prev) => ({
      ...prev,
      [category]: [...(prev[category] || []), newItem],
    }));
  }

  function removeItem(category: string, index: number) {
    setSuggestions((prev) => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i != index),
    }));
  }

  function editItem(
    category: string,
    index: number,
    updatedItem: SuggestedItem,
  ) {
    setSuggestions((prev) => ({
      ...prev,
      [category]: prev[category].map((v, i) => (i == index ? updatedItem : v)),
    }));
  }

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(suggestions).map(([category, items]) => (
        <SuggestionCategory
          category={category}
          items={items}
          removeCategory={removeCategory}
          renameCategory={renameCategory}
          addItem={addItem}
          removeItem={removeItem}
          editItem={editItem}
        />
      ))}
    </div>
  );
}
