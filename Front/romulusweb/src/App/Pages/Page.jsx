import { useState, useEffect } from "react";
import {Box,FormControl,InputLabel, OutlinedInput,Slider,MenuItem,Select,FormControlLabel,Switch, Button} from "@mui/material";
import "../../Styles/page.css";
import axios from "axios";

const baseURL = "https://jsonplaceholder.typicode.com/posts/1";

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
    const [vrDeck, setVrDeck] = useState(0);
    const [name, setName] = useState("");
    const [transported, setTransported] = useState(false);
    const [post,setPost] = useState(null);

    const obtenerPrediccion = () => {
        axios.get(baseURL)
        .then((response) => {
            console.log(response);
            setPost(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

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
    
    const handleVrDeck = (event) => {
        setVrDeck(event.target.value); 
    };
    
    const handleName = (event) => {
        setName(event.target.value);
    };
    
    const handleTransported = (event) => {
        setTransported(!transported);
    };

    const AsignacionCabinFinal = () => {
        setCabinFinal(cabin1 + cabin2 + cabin3);
        console.log(cabinFinal);
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
                                <MenuItem value={"Luna"}>Luna</MenuItem>
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
                    <button className="boton" onClick={AsignacionCabinFinal}>Asignar Cabina</button>
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
                                <MenuItem value={"Destino 1"}>Destino 1</MenuItem>
                                <MenuItem value={"Destino 2"}>Destino 2</MenuItem>
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
                    step={10}
                    marks
                    min={10}
                    max={110}
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
                    step={10}
                    marks
                    min={10}
                    max={110}
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
                    step={10}
                    marks
                    min={10}
                    max={110}
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
                    step={10}
                    marks
                    min={10}
                    max={110}
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
                    step={10}
                    marks
                    min={10}
                    max={110}
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
                <div className="item">
                    <FormControlLabel control={<Switch />} label="Transported" color="warning" onChange={handleTransported}/>
                </div>
                    { cryoSleep ? 
                        <div className="resultado-positivo">
                            <h2>EL VIAJE SERÁ UN EXITO</h2>
                            <h1>{cabinFinal}</h1>
                            <Button variant="contained" onClick={AsignacionCabinFinal}>Enviar Datos</Button>
                        </div>
                    : 
                    <div className="resultado-negativo">
                        <h2>EL VIAJE SERÁ DESASTROSO</h2>
                        <h1>{JSON.stringify(post)}</h1>
                        <Button variant="contained" onClick={obtenerPrediccion}>Enviar Datos</Button>
                    </div>}
            </Box>
        </div>
    );
}