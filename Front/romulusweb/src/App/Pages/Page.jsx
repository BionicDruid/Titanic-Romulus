import { useState} from "react";
import {Box,FormControl,InputLabel, OutlinedInput,Slider,MenuItem,Select,FormControlLabel,Switch, Button} from "@mui/material";
import "../../Styles/page.css";
import axios from "axios";
import SaveAltIcon from '@mui/icons-material/SaveAlt';

const enviodatosURLPrueba = "http://184.72.104.18:8080/predict"
// Local casa const enviodatosURLPrueba = "http://192.168.68.115:8080/predict"

export default function Formulario() {
    const [passengerID, setPassengerID] = useState("");
    const [homePlanet, setHomePlanet] = useState("");
    const [cryoSleep, setCryoSleep] = useState(false);
    const [cabin1, setCabin1] = useState("");
    const [cabin2, setCabin2] = useState("");
    const [cabin3, setCabin3] = useState("");
    const [cabinFinal,setCabinFinal] = useState("");
    const [destination, setDestination] = useState("");
    const [age, setAge] = useState(0);
    const [vip,setVip] = useState(false);
    const [roomService, setRoomService] = useState(0);
    const [foodCourt, setFoodCourt] = useState(0);
    const [shoppingMall, setShoppingMall] = useState(0);
    const [spa,setSpa] = useState(0);
    const [vrDeck, setVrDeck] = useState(0);
    const [name, setName] = useState("");
    const [prediccion,setPrediccion] = useState(false);
    const [def, setDefault] = useState(false);

    const enviarParametros = async (data) => {
        try {
            const response = await axios.post(enviodatosURLPrueba, data);
            console.log("Datos enviados y respuesta recibida:", response.data.prediction[1]);

            if(response.data.prediction[1] === "1"){
                setPrediccion(true);
            }else{
                setPrediccion(false);
            }
        } catch (error) {
            console.log("Error en enviar Parametros:", error);
        }
    };
    
    
    const parametrosEnviados = {
        PassengerId: passengerID,
        HomePlanet: homePlanet,
        CryoSleep: cryoSleep,
        Cabin: cabinFinal,
        Destination: destination,
        Age: age,
        VIP: vip,
        RoomService: roomService,
        FoodCourt: foodCourt,
        ShoppingMall: shoppingMall,
        Spa: spa,
        VRDeck: vrDeck,
        Name: name
    };

    const resetParametros = () => {
        setPassengerID("");
        setHomePlanet("");
        setCryoSleep(false);
        setCabin1("");
        setCabin2("");
        setCabin3("");
        setCabinFinal("");
        setDestination("");
        setAge(0);
        setVip(false);
        setRoomService(0);
        setFoodCourt(0);
        setShoppingMall(0);
        setSpa(0);
        setVrDeck(0);
        setName("");
    };
    
    
    const handlePassengerId = (event) => {
        setPassengerID(event.target.value);
    };
    
    const handleHomePlanet = (event) => {
        setHomePlanet(event.target.value);
    };
    
    const handleCryoSleep = () => {
        setCryoSleep(!cryoSleep);
    };
    
    const handleCabin1 = (event) => {
        setCabin1(event.target.value);
    };

    const handleCabin2 = (event) => {
        setCabin2(event.target.value);
    };

    const handleCabin3 = (event) => {
        setCabin3(event.target.value);
    };
    
    const handleDestination = (event) => {
        setDestination(event.target.value);
    };
    
    const handleAge = (event) => {
        setAge(event.target.value);  
    };
    
    const handleVip = () => {
        setVip(!vip);  
    };
    
    const handleRoomService = (event) => {
        setRoomService(event.target.value); 
    };
    
    const handleFoodCourt = (event) => {
        setFoodCourt(event.target.value); 
    };
    
    const handleShoppingMall = (event) => {
        setShoppingMall(event.target.value); 
    };

    const handleSpa = (event) => {
        setSpa(event.target.value);
    };
    
    const handleVrDeck = (event) => {
        setVrDeck(event.target.value); 
    };
    
    const handleName = (event) => {
        setName(event.target.value);
    };
    
    const AsignacionCabinFinal = () => {
        setCabinFinal(cabin1 + "/" + cabin2 + "/" +cabin3);
    }

    const handleDefault = () => {
        setDefault(!def);
    }

      // Crear array de letras de A a Z
    const letters = Array.from({ length: 7 }, (_, i) => String.fromCharCode(65 + i)); // A=65 en ASCII
    letters.push('T');

    // Crear array de números del 1 al 100
    const numbers = Array.from({ length: 300 }, (_, i) => i + 1);

    return (
        <div className="Page">
            <Box className ="Formulario">
                <div className="item">
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-username">Passenger ID</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-username"
                            type="text"
                            label="Username"
                            onChange={handlePassengerId}
                            className="Input"
                            value={passengerID}
                        />
                    </FormControl>
                </div>
                <div className="item">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Home Planet</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={homePlanet}
                                label="Age"
                                onChange={handleHomePlanet}>
                                <MenuItem value={"Tierra"}>Tierra</MenuItem>
                                <MenuItem value={"Europa"}>Europa</MenuItem>
                                <MenuItem value={"Marte"}>Marte</MenuItem>
                            </Select>
                    </FormControl>
                </div>
                <div className="item">
                    <FormControlLabel control={<Switch />} label="Cryo-Sleep" color="warning" onChange={handleCryoSleep}/>
                </div>
                <div className="item">
                    <h2>Cabin</h2>
                <FormControl size="small">
                        <InputLabel id="demo-simple-select-label">Letter</InputLabel>
                            <Select
                                labelId="letter-select-label"
                                id="letter-select"
                                value={cabin1}
                                label="Letter"
                                onChange={handleCabin1}
                                sx={{ width: 100 }}
                                >
                                {letters.map((char) => (
                                    <MenuItem key={char} value={char}>
                                    {char}
                                    </MenuItem>
                                ))}
                            </Select>
                    </FormControl>
                    <FormControl size="small">
                        <InputLabel id="demo-simple-select-label">Number</InputLabel>
                            <Select
                                labelId="number-select-label"
                                id="number-select"
                                value={cabin2}
                                label="Number"
                                onChange={handleCabin2}
                                sx={{ width: 100 }}
                                >
                                {numbers.map((num) => (
                                    <MenuItem key={num} value={num}>
                                    {num}
                                    </MenuItem>
                                ))}
                            </Select>
                    </FormControl>
                    <FormControl size="small">
                        <InputLabel id="demo-simple-select-label">P o S</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={cabin3}
                                label="Age"
                                onChange={handleCabin3}
                                sx={{ width: 100 }}
                                >
                                <MenuItem value={"P"}>P</MenuItem>
                                <MenuItem value={"S"}>S</MenuItem>
                            </Select>
                    </FormControl>
                    <SaveAltIcon className="save-button" onClick={AsignacionCabinFinal} />
                </div>
                <div className="item">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Destination</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={destination}
                                label="Age"
                                onChange={handleDestination}>
                                <MenuItem value={"TRAPPIST-1e"}>TRAPPIST-1e</MenuItem>
                                <MenuItem value={"55 Cancri e"}>55 Cancri e</MenuItem>
                                <MenuItem value={"PSO J318.5-22"}>PSO J318.5-22</MenuItem>
                            </Select>
                    </FormControl>
                </div>
                
                <div className="item">
                <h3>Age</h3>
                <Slider
                    aria-label="Age"
                    defaultValue={0}
                    value={age}
                    onChange={handleAge}
                    valueLabelDisplay="auto"
                    shiftStep={30}
                    step={1}
                    marks
                    min={0}
                    max={80}
                    />
                </div>
                <div className="item">
                    <FormControlLabel control={<Switch />} label="VIP" color="warning" onChange={handleVip}/>
                </div>
                <div className="item">
                <h3>RoomService</h3>
                <Slider
                    aria-label="Room Service"
                    defaultValue={0}
                    value={roomService}
                    onChange={handleRoomService}
                    valueLabelDisplay="auto"
                    shiftStep={30}
                    step={200}
                    marks
                    min={0}
                    max={15000}
                    />
                </div>
                <div className="item">
                <h3>Food Court</h3>
                <Slider
                    aria-label="Food Court"
                    defaultValue={0}
                    value={foodCourt}
                    onChange={handleFoodCourt}
                    valueLabelDisplay="auto"
                    shiftStep={30}
                    step={500}
                    marks
                    min={0}
                    max={30000}
                    />
                </div>
                <div className="item">
                <h3>Shopping-Mall Spa</h3>
                <Slider
                    aria-label="Shopping-Mall Spa"
                    defaultValue={0}
                    value={shoppingMall}
                    onChange={handleShoppingMall}
                    valueLabelDisplay="auto"
                    shiftStep={30}
                    step={500}
                    marks
                    min={0}
                    max={24000}
                    />
                </div>
                <div className="item">
                <h3>Spa</h3>
                <Slider
                    aria-label="Spa"
                    defaultValue={0}
                    value={spa}
                    onChange={handleSpa}
                    valueLabelDisplay="auto"
                    shiftStep={30}
                    step={500}
                    marks
                    min={0}
                    max={23000}
                    />
                </div>
                <div className="item">
                <h3>VR Deck</h3>
                <Slider 
                    aria-label="VR Deck"
                    defaultValue={0}
                    value={vrDeck}
                    onChange={handleVrDeck}
                    valueLabelDisplay="auto"
                    shiftStep={30}
                    step={500}
                    marks
                    min={0}
                    max={25000}
                    />
                </div>
                <div className="item">
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-username">FullName</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-username"
                            type="text"
                            label="Username"
                            onChange={handleName}
                            className="Input"
                            value={name}
                        />
                </FormControl>
                </div>
                { def ? 
                    <div className="item-doble">
                        { prediccion ? 
                            <div className="item-resultadoPositivo">
                                <div className="texto-resultado">
                                    <h2>EL VIAJE SERÁ UN EXITO</h2>
                                </div>
                                <div className="botones-resultado">
                                    <Button className ="botonResultado-Positivo" variant="contained" onClick={() => enviarParametros(parametrosEnviados)}>Enviar Datos</Button>
                                    <Button className ="botonResultado-Positivo" variant="contained" onClick={() =>{resetParametros();handleDefault()}}>Reset Parametros</Button>
                                </div>
                            </div>
                        : 
                            <div className="item-resultadoNegativo">
                                <div className="texto-resultado">
                                    <h2>EL VIAJE SERÁ UN FRACASO</h2>
                                </div>
                                <div className="botones-resultado">
                                    <Button className ="botonResultado-Negativo" variant="contained" onClick={() => enviarParametros(parametrosEnviados)}>Enviar Datos</Button>
                                    <Button className ="botonResultado-Negativo" variant="contained" onClick={() =>{resetParametros();handleDefault()}}>Reset Parametros</Button>
                                </div>
                            </div>
                        }
                    </div>
                : 
                    <div className="item-default">
                        <div className="texto-default">
                            <h2>Eliga los parametros para la predicción</h2>
                        </div>
                        <div className="botones-default">
                            <Button className ="boton-default" variant="contained" onClick={() => {enviarParametros(parametrosEnviados);handleDefault()}}>Enviar Datos</Button>
                            <Button className ="boton-default" variant="contained" onClick={resetParametros}>Reset Parametros</Button>
                        </div>
                    </div>
                }

            </Box>
        </div>
    );
}