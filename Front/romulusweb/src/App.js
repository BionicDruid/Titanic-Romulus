import { Container } from "@mui/material";
import "./Styles/App.css";
import Formulario from "./App/Pages/Page";
import Header from "./App/Pages/Header";

function App() {
  return (
    <div className="App">
      <Container>
        <Header />
        <Formulario />
      
      </Container>
    </div>
  );
}

export default App;
