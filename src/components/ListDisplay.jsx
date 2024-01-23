import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPokemonpag,
  setLastPage,
  setPages,
  setTotalResults,
} from "../redux/actions";
import Pagination from "./PaginationComponent";
import pokeball from "../assets/pokeball.png";
const ListDisplay = () => {
  
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const pokemonData = useSelector((state) => state.pokemon.data);
  const pokemonimg = useSelector((state) => state.pokemon.results);
  const combinedPokemonData = useMemo(() => {
    return { ...pokemonData, ...pokemonimg };
  }, [pokemonData, pokemonimg]);
  const totalResults = useSelector((state) => state.pag.totalResults);
  const pageS = useSelector((state) => state.pag.pageSize);
  const currentPage = useSelector((state) => state.pag.currentPage);

  useEffect(() => {
    if (!isLoading) {
      const total = combinedPokemonData?.data?.count;
      const pages = combinedPokemonData?.data?.results?.length;

      const last = Math.ceil(total / pages);

      if (total && currentPage + last - 1 === last) {
        dispatch(setPages(pages));
        dispatch(setTotalResults(total));

        dispatch(setLastPage(last));
      }
    }
  }, [isLoading, combinedPokemonData, currentPage, dispatch]);

  useEffect(() => {
    dispatch(fetchPokemonpag(currentPage, pageS))
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
        setIsLoading(true);
      });
  }, [dispatch, currentPage, pageS, totalResults]);

  if (isLoading) {
    return <div>Cargando...</div>; // Muestra un mensaje de carga mientras isLoading es true
  }
    console.log(combinedPokemonData);

  return (
    <div>
      <h1>Lista de Pokémon</h1>

      <div className="row">
        {combinedPokemonData.results.map((pokemon, index) => (
          <div className="col-3" key={index}>
            <div className="card  mt-4">
              <img
                className="card-img-top"
                src={pokemon.sprites.other.home.front_default || pokeball}
                alt={pokemon.name}
              />
              <div className="card-body">
                <h5 className="card-title">Nombre: {pokemon.name}</h5>
                <h6 className="card-pokemontype">Tipo: {pokemon.types[0].type?.name}</h6>
               
              </div>
            </div>
          </div>
        ))}
        <Pagination></Pagination>
      </div>
    </div>
  );
};

export default ListDisplay;
