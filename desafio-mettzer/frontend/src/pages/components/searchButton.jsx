import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export default function SearchButton({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    const termo = query.trim();
    if (termo !== '') {
      onSearch(termo);
    } else {
      alert('Digite uma palavra para pesquisar.');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Pesquisar artigos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded text-white"
      />
      <button
        onClick={handleSearch}
        className="flex items-center gap-1 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
