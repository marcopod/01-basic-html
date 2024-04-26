"use client"

import { useState, useEffect } from 'react';
import { Character } from '@/types/character';
import Favorite_icon from "@/public/Favorite_icon";

function CharacterList() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCharacters(data.results);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });

    // Load favorites from sessionStorage when the component mounts
    const storedFavorites = sessionStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleFavorite = (id: number) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter(favId => favId !== id) // If already favorited, remove it
      : [...favorites, id]; // If not favorited, add it
    setFavorites(updatedFavorites);
    sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  if (loading) return <div>Loading characters...</div>;
  if (error) return <div>Error fetching characters: {error}</div>;

  return (
    <div>
      <a href="/favorites" className="bg-indigo-600">Click to see your favorite characters</a>
      <div className="grid grid-cols-4 gap-4">
        {characters.map(character => (
          <div key={character.id} className='flex flex-col items-center'>
            <a href={`/c/${character.id}`}
               className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-md flex justify-center flex-col">
              <img src={character.image} alt={`${character.name}'s image`}></img>
              <p className="text-center">
                {character.name} - {character.species}
              </p>
            </a>
            <button
              className='flex justify-center'
              title='favorite'
              onClick={() => handleFavorite(character.id)}>
              <Favorite_icon
                color={favorites.includes(character.id) ? '#F67E4B' : '#B4B4B4'}
                hoverColor='#F67E4B'
                className='favorite-svg-hover'
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CharacterList;
