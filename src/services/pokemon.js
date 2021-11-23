import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseQuery = fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' })

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
    getPokByName: builder.mutation({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

export const { useGetPokemonByNameQuery, useGetPokByNameMutation } = pokemonApi
