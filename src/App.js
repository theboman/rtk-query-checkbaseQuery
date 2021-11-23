import * as React from 'react'
import { useGetPokByNameMutation} from './services/pokemon'
import { useSelector } from 'react-redux';

export default function App() {
  // Using a query hook automatically fetches data and returns query values
  //const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')
  const [getPokByName, { data: data2, error: error2, isLoading: isLoading2 }] = useGetPokByNameMutation()
  const isExpired = useSelector(state => state.auth.expiredToken)
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  return (
    <div className="App">
      <h2> Token modal is: {isExpired ? 'true' : 'false'} </h2>
      <button onClick={() => getPokByName('bulbasaur')}> Get Bulbasaur </button>
      {error2 ? (
        <>Oh no, there was an error</>
      ) : isLoading2 ? (
        <>Loading...</>
      ) : data2 ? (
        <>
          <h3>{data2.species.name}</h3>
          <img src={data2.sprites.front_shiny} alt={data2.species.name} />
        </>
      ) : null}
    </div>
  )
}

