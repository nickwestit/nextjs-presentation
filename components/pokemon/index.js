import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function Pokemon({ pokemon }) {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {

            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                const data = await res.json();

                setData(data);
                setLoading(false);
            }
            catch {
                console.log("Kan niet worden opgehaald")
            }

        })()
    }, [])


    if (loading) {
        return (
            <p>loading...</p>
        )
    }

    return (
        <Link href={`/pokemons/${data.name}`}>
            <div style={{ cursor: "pointer" }}>
                <img src={data.sprites.front_default} />
                <p>{data.name}</p>
            </div>
        </Link>
    )
}
