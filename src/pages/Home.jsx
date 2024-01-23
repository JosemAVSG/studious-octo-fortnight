import ListDisplay from "../components/ListDisplay";
import Button from "../components/Button";
import PalindromeChecker from "../components/PalindromeChecker";

const Home = () => {
  return (
    <div className="App">
     <div className="pokemonlist">
       <ListDisplay />
      </div>

      <h1>Button Styles with Sass</h1>
      <Button variant="primary">Primary Button</Button>
      
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="dark">Dark Button</Button>
      <Button variant="sketch">Sketch</Button>
      <Button variant="otro">Otro</Button>
      <PalindromeChecker></PalindromeChecker>
    </div>
  );
};
export default Home;
