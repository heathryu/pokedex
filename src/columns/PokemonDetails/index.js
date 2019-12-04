// Renders the profile and games of a single pokemon
import React, { useState, useEffect } from "react";
import { Spinner } from "@nice-boys/components";
import PokemonProfile from "../../components/PokemonProfile";
import PokemonGamesSection from "../../components/PokemonGamesSection";
import Column from "../../components/Column";
import { fetchPokemonGames, fetchPokemonByName } from "../../api/pokeapi";

const PokemonGames = props => {
  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setGames(null);
    setLoading(true);

    fetchPokemonGames(props.pokemon.game_indices.map(game => game.version.name))
      .then(games => {
        if (cancelled) return;

        setGames(games);
        setLoading(false);
      })
      .catch(error => {
        if (cancelled) return;

        setError(error);
        setLoading(false);
      });

    return () => (cancelled = true);
  }, [props.pokemon]);

  return loading ? (
    <Spinner />
  ) : error ? (
    <div>{error.message}</div>
  ) : (
    games && <PokemonGamesSection games={games} />
  );
};

const Pokemon = props => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!props.name) return;
    let cancelled = false;
    setPokemon(null);
    setLoading(true);

    fetchPokemonByName(props.name)
      .then(pokemon => {
        if (cancelled) return;

        setPokemon(pokemon);
        setLoading(false);
      })
      .catch(error => {
        if (cancelled) return;

        setError(error);
        setLoading(false);
      });

    return () => (cancelled = true);
  }, [props.name]);

  return (
    <Column width={1} p={4}>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        pokemon && (
          <>
            <PokemonProfile pokemon={pokemon} />
            <PokemonGames pokemon={pokemon} />
          </>
        )
      )}
    </Column>
  );
};

export default Pokemon;
