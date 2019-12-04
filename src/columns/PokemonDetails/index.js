// Renders the profile and games of a single pokemon
import React from "react";
import { Spinner } from "@nice-boys/components";
import PokemonProfile from "../../components/PokemonProfile";
import PokemonGamesSection from "../../components/PokemonGamesSection";
import Column from "../../components/Column";
import { usePokemon, usePokemonGames } from "../../hooks";

const PokemonGames = props => {
  const [games, loading, error] = usePokemonGames(props.pokemon);

  return loading ? (
    <Spinner />
  ) : error ? (
    <div>{error.message}</div>
  ) : (
    games && <PokemonGamesSection games={games} />
  );
};

const Pokemon = props => {
  const [pokemon, loading, error] = usePokemon(props.name);

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
