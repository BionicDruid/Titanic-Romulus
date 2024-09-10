import { Container } from "@mui/material";
import "./Styles/App.css";
import Formulario from "./App/Pages/Page";
import Header from "./App/Pages/Header";
import Footer from "./App/Pages/Footer";

function App() {
  return (
    <div className="App">
      <Container>
        <Header />
        <Formulario />
        <Footer />
      </Container>
    </div>
  );
}

export default App;
