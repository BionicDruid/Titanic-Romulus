import { useState } from "react";
import {Box,FormControl,InputLabel, OutlinedInput,Slider,MenuItem,Select,FormControlLabel,Switch} from "@mui/material";
import "../../Styles/page.css";

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

    const handlePassengerId = (event) => {
        setPassengerID(event.target.value);
    };
    
    const handleHomePlanet = (event) => {
        setHomePlanet(event.target.value);
    };
    
    const handleCryoSleep = (event) => {
        setCryoSleep(!cryoSleep);
        console.log(cryoSleep);
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
    
    const handleVip = (event) => {
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

    const handleCabinFinal = (event) => {
        setCabinFinal(cabin1+cabin2+cabin3);
    };

      // Crear array de letras de A a Z
    const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)); // A=65 en ASCII

    // Crear array de números del 1 al 100
    const numbers = Array.from({ length: 100 }, (_, i) => i + 1);
    

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
                </div>
                <div className="item">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Destination</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={homePlanet}
                                label="Age"
                                onChange={handleHomePlanet}>
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
                    getAriaValueText={setAge}
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
                    aria-label="Age"
                    defaultValue={0}
                    getAriaValueText={setAge}
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
                    aria-label="Age"
                    defaultValue={0}
                    getAriaValueText={setAge}
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
                    aria-label="Age"
                    defaultValue={0}
                    getAriaValueText={setAge}
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
                    aria-label="Age"
                    defaultValue={0}
                    getAriaValueText={setAge}
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
                        />
                </FormControl>
                </div>
                <div className="item">
                    <FormControlLabel control={<Switch />} label="Transported" color="warning" onChange={handleTransported}/>
                </div>
                    { cryoSleep ? 
                    <div className="resultado-positivo">EL VIAJE SERÁ EXITOSO</div> 
                    : 
                    <div className="resultado-negativo">EL VIAJE SERA UN FRACASO</div> }
            </Box>
        </div>
    );
}