import { useEffect, useState,useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonpag,setPages,setTotalResults} from '../redux/actions';  
import Pagination from './PaginationComponent';

const ListDisplay = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const pokemonData = useSelector((state) => state.pokemon.data);
  const pokemonimg = useSelector((state)=>state.pokemon.results)
  const combinedPokemonData = useMemo(() => {
    return { ...pokemonData, ...pokemonimg };
  }, [pokemonData, pokemonimg]);
 
  const totalResults = useSelector(state => state.pag.totalResults);
  const pageS = useSelector(state=>state.pag.pageSize);
  const currentPage = useSelector(state => state.pag.currentPage);
  
  // useEffect(() => {
  //   dispatch(fetchPokemonpag())
  //   .then(() =>
  //     setIsLoading(false)
  //      ) 
  //     // Una vez que se completó la solicitud, se cambia el estado isLoading a false
  //     .catch((error) => {
  //       console.error('Error fetching data:', error.message);
  //       setIsLoading(false); // En caso de error, también se cambia el estado isLoading a false
  //     });
  // }, [dispatch])
  useEffect(() => {
    if (!isLoading) {
      const total = combinedPokemonData?.data?.count;
      const pages = combinedPokemonData?.data?.results?.length;
      const last = Math.ceil(total / pages);
      if (total && pages>=last) {
        const pageresult = Math.ceil(total / pages); //calculo total de paginas
          dispatch(setTotalResults(total));
          dispatch(setPages(pageresult));
        
      }
    }
  }, [isLoading,combinedPokemonData,dispatch]);
  

  useEffect(() => {
    dispatch(fetchPokemonpag(currentPage, pageS))
    .then(() => {  
            
            setIsLoading(false);
  })
      .catch((error) => {
        console.error('Error fetching data:', error.message);
        setIsLoading(true);
      });
    }, [dispatch, currentPage, pageS, totalResults]);
        
    if (isLoading ) {
      return <div>Cargando...</div>; // Muestra un mensaje de carga mientras isLoading es true
    }
    

  //  if(isLoading===false){
  //   const total = combinedPokemonData?.data?.count;
  //   const pages = combinedPokemonData?.data?.results?.length;
  //     const pageresult = Math.ceil(total / pages);
  //     console.log(pageresult);
  //     dispatch(setTotalResults(total));
  //     dispatch(setPages(pageresult));
  //   }
    



  return (
    <div>          
      <h1>Lista de Pokémon</h1>
      
      <div className="row">

        {combinedPokemonData.results.map((pokemon, index) => (
        
          <div className="col-3" key={index}>
            
        <div className="card  mt-4">
          <img className="card-img-top" src={pokemon.sprites.other.home.front_default} alt={pokemon.name}/>
            <div className="card-body">
              <h5 className="card-title">{pokemon.name}</h5>
             
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

