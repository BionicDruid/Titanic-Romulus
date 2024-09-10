import { useState } from "react";
import {Box,FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput,Grid2} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export default function Formulario() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleUsername = ( event) => {
        setUsername(event.target.value);
    } 

    const handlePassword = ( event) =>{
        setPassword(event.target.value);
    }


    return (
        <div>
            <h1>ROMULUS WEB</h1>
            <Box className ="Formulario">
                <Grid2 container spacing={2} columns={2}>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-username"
                            type="text"
                            label="Username"
                            onChange={handleUsername}
                            className="Input"
                        />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-username"
                            type="text"
                            label="Username"
                            onChange={handleUsername}
                            className="Input"
                        />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-username"
                            type="text"
                            label="Username"
                            onChange={handleUsername}
                            className="Input"
                        />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-username"
                            type="text"
                            label="Username"
                            onChange={handleUsername}
                            className="Input"
                        />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-username"
                            type="text"
                            label="Username"
                            onChange={handleUsername}
                            className="Input"
                        />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-username"
                            type="text"
                            label="Username"
                            onChange={handleUsername}
                            className="Input"
                        />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-username"
                            type="text"
                            label="Username"
                            onChange={handleUsername}
                            className="Input"
                        />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-username"
                            type="text"
                            label="Username"
                            onChange={handleUsername}
                            className="Input"
                        />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-username"
                            type="text"
                            label="Username"
                            onChange={handleUsername}
                            className="Input"
                        />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-username"
                            type="text"
                            label="Username"
                            onChange={handleUsername}
                            className="Input"
                        />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-username"
                            type="text"
                            label="Username"
                            onChange={handleUsername}
                            className="Input"
                        />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-username"
                            type="text"
                            label="Username"
                            onChange={handleUsername}
                            className="Input"
                        />
                    </FormControl>
                </Grid2>
            </Box>
        </div>
    );
}