"use client"

import { useState, useEffect } from 'react';
import { Character } from '@/types/character';

function CharacterList({ params }: { params: { id: string } }) {

    const [character, setCharacter] = useState<Character | null>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Attempting to fetch character ID:", params.id);
        fetch(`https://rickandmortyapi.com/api/character/${params.id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("data: ", data)
                setCharacter(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Fetch error:", error);
                setError(error.message);
                setLoading(false);
            });
    }, [params.id]);

    if (loading) return <div>Loading character...</div>;
    if (error) return <div>Error fetching character: {error}</div>;

    return (
        <div className='w-full h-screen flex flex-col justify-center items-center'>
            <a href="/" className="bg-indigo-600">Click to see all the characters</a>

            {
                character ?
                    <div
                        className="flex flex-col mt-10 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-md justify-center">
                        <img src={character.image}></img>
                        <p className="text-center">
                            {character.name} - {character.species} - {character.gender}
                        </p>
                        {
                            character.location &&
                            <p className="">
                                Origin: {" "}
                                {character.location.name}
                            </p>
                        }
                        {
                            character.episode &&
                            <ul>
                                {character.episode.map((e, i) => {
                                    if (i < 10) return <li>{e}</li>
                                })}
                            </ul>
                        }
                    </div>
                    : <p>Loading...</p>
            }
        </div>
    );
}

export default CharacterList
