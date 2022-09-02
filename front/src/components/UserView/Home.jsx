import React from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CardIndividual from './Card';
import NavBar from "./NavBar";
import Order from "./Order";
import Cards from "./Cards";

export default function Home() {
    return (
        <div>
            <NavBar />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <Order />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Cards />
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}