import { useState } from "react";
import {Box,FormControl,InputLabel, OutlinedInput,Slider,MenuItem,Select,FormControlLabel,Switch} from "@mui/material";
import "../../Styles/page.css";

export default function Formulario() {
    const [passengerID, setPassengerID] = useState("");
    const [homePlanet, setHomePlanet] = useState("");
    const [cryoSleep, setCryoSleep] = useState(false);
    const [cabin, setCabin] = useState("");
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
        setCryoSleep(event.target.value);  // Asumimos que es un checkbox
    };
    
    const handleCabin = (event) => {
        setCabin(event.target.value);
    };
    
    const handleDestination = (event) => {
        setDestination(event.target.value);
    };
    
    const handleAge = (event) => {
        setAge(event.target.value);  // Convertimos el valor a número
    };
    
    const handleVip = (event) => {
        setVip(event.target.checked);  // Asumimos que es un checkbox
    };
    
    const handleRoomService = (event) => {
        setRoomService(event.target.value);  // Convertimos el valor a número
    };
    
    const handleFoodCourt = (event) => {
        setFoodCourt(event.target.value);  // Convertimos el valor a número
    };
    
    const handleShoppingMall = (event) => {
        setShoppingMall(event.target.value);  // Convertimos el valor a número
    };
    
    const handleVrDeck = (event) => {
        setVrDeck(event.target.value);  // Convertimos el valor a número
    };
    
    const handleName = (event) => {
        setName(event.target.value);
    };
    
    const handleTransported = (event) => {
        setTransported(event.target.value);  // Asumimos que es un checkbox
    };
    

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
                    <FormControlLabel control={<Switch defaultChecked/>} label="Cryo-Sleep" color="warning"/>
                </div>
                <div className="item">
                <FormControl >
                        <InputLabel id="demo-simple-select-label">Home Planet</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={homePlanet}
                                label="Age"
                                onChange={handleHomePlanet}>
                                <MenuItem value={"a"}>a</MenuItem>
                                <MenuItem value={"b"}>b</MenuItem>
                                <MenuItem value={"c"}>c</MenuItem>
                            </Select>
                    </FormControl>
                    <FormControl >
                        <InputLabel id="demo-simple-select-label">Home Planet</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={homePlanet}
                                label="Age"
                                onChange={handleHomePlanet}>
                                <MenuItem value={"0"}>0</MenuItem>
                                <MenuItem value={"1"}>1</MenuItem>
                                <MenuItem value={"2"}>2</MenuItem>
                            </Select>
                    </FormControl>
                    <FormControl >
                        <InputLabel id="demo-simple-select-label">Home Planet</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={homePlanet}
                                label="Age"
                                onChange={handleHomePlanet}>
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
                    <FormControlLabel control={<Switch defaultChecked/>} label="VIP" color="warning"/>
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
                        <InputLabel htmlFor="outlined-adornment-username">Name</InputLabel>
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
                    <FormControlLabel control={<Switch defaultChecked/>} label="Transported" color="warning"/>
                </div>
            </Box>
        </div>
    );
}