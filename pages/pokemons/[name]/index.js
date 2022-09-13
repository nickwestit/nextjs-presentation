import React from 'react'

export default function PokemonSlug({ pokemon }) {

    return (

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: '100vh' }}>
            <img src={pokemon.sprites.front_default} />
            <p>{pokemon.name}</p>
        </div>
    )

}

export async function getStaticPaths() {

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
    const pokemons = await res.json();

    const paths = pokemons.results.map(pokemon => ({
        params: {
            name: pokemon.name
        }
    }))

    return {
        paths,
        fallback: false, // can also be true or 'blocking'
    }
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${context.params.name}`);
    const pokemon = await res.json();

    return {
        // Passed to the page component as props
        props: {
            pokemon,
        },
        revalidate: 10,
    }
}