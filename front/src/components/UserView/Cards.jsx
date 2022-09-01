import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CardIndividual from './Card';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function Cards(){
    const movies=[{
        title:"The Vast of Night" ,
        date:"June 12, 2020" ,
        description: "One night in 1950, in the city of Caluya, a radio operator and a DJ discover a strange frequency that will change their lives and the town where they live forever. Mysterious clues and strange events lead the two young men on a quest Towards the unknown.",
        rating:2.8 ,
        platform:"Amazon" ,
        image: "https://es.web.img2.acsta.net/c_310_420/pictures/20/05/06/19/07/3028518.jpg",
        duration: "1h 31min",
        cast: ["Sierra McCormick", "Jake Horowitz", "Gail Cronauer"],
        director:"Andrew Patterson (I)",
        genres: ["Drama", "Science Fiction"],
        trailer: "https://youtu.be/ZEiwpCJqMM0"
      },
      
      {
        title:"Samaritan" ,
        date:"August 26, 2022" ,
        description: "A young man discovers that a mythical superhero, who disappeared 20 years ago after a dramatic event, may still be alive. This original idea-based sci-fi thriller stars veteran actor Sylvester Stallone.",
        rating: 3.3 ,
        platform:"Netflix" ,
        image: "https://es.web.img3.acsta.net/c_310_420/pictures/22/07/11/17/07/2506648.jpg",
        duration: "1h 42min",
        cast: ["Sylvester Stallone", "Javon “Wanna” Walton", "Pilou Asbæk"],
        director: "Julius Avery",
        genres: ["Action", "Thriller"],
        trailer: "https://youtu.be/9FKnTxSC16E"
      },
      
      
      {
        title:"Cinderella" ,
        date:"September 3, 2021" ,
        description: "This fantasy family comedy is a modern reimagining of the traditional Cinderella story, made popular by writer Charles Perrault. This musical remake of the classic fairy tale is born from an idea by actor and comedian James Corden.",
        rating: 3.3 ,
        platform:"HBO" ,
        image: "https://es.web.img2.acsta.net/c_310_420/pictures/21/08/04/09/24/2258349.jpg",
        duration: "1h 53min",
        cast: ["Camila Cabello", "Nicholas Galitzine", "Idina Menzel"],
        director: "Kay Cannon",
        genres: ["Fantasy", "Music", "Musical Comedy"],
        trailer: "https://youtu.be/h5R9JJIvvHs"
      },
      
      {
        title:"The Voyeurs" ,
        date:"September 10, 2021" ,
        description: "Pippa and Thomas move into the apartment of their dreams. There, they find that its windows open directly onto the apartment across the street, inviting them to witness the attractive couple's relationship across the street. But when they try to intercede anonymously in their lives unknowingly set in motion a chain of events that will lead to disaster.",
        rating: 3.3 ,
        platform:"Disney+" ,
        image: "https://es.web.img3.acsta.net/c_310_420/pictures/21/08/17/11/11/5648054.jpg",
        duration: "1h 56min",
        cast: ["Sydney Sweeney", "Justice Smith", "Ben Hardy"],
        director: "Michael Mohan" ,
        genres: ["Thriller"],
        trailer: "https://youtu.be/_fiCdELSwwI"
      }
      ,
      {
        title:"Beautiful boy, you will always be my son" ,
        date: "March 15, 2019",
      description: "The moving and inspiring story of survival, relapse and recovery of a family dealing with addiction for many years, testing their love and commitment. As Nic Sheff (Timothée Chalamet), a charming boy beloved by everyone, relapses repeatedly, the life of the Sheffs can be twisted to the limits ...",
        rating: 3.3 ,
        platform:"Paramount" ,
        image: "https://es.web.img3.acsta.net/c_310_420/pictures/19/02/12/17/07/2867428.jpg",
        duration: "2h 01min",
        cast: ["Steve Carell", "Timothée Chalamet", "Jack Dylan Grazer"],
        director: "Felix Van Groeningen" ,
        genres: ["Drama"],
        trailer: "https://youtu.be/7R48QOsSbZQ"
      },
      
      {
        title:"Bliss" ,
        date:"February 5, 2021" ,
      description:"What if your suspicions about living in a virtual world weren't just suspicions, but actually probable? What if that person could move between simulation and reality with ease? This is exactly the situation in which Greg (Wilson) encounters when he meets Isabel (Hayek). A chance encounter allows Isabel to reveal to Greg that the nature of his world is not what it seems.",
        rating: 3.2 ,
        platform:"Amazon" ,
        image: "https://es.web.img2.acsta.net/c_310_420/pictures/21/01/13/07/43/4660253.jpg",
        duration: "1h 44min",
        cast: ["Owen Wilson", "Salma Hayek", "Madeline Zima"],
        Director: "Mike Cahill",
        genres: ["Drama", "Romantic", "Science Fiction"],
        trailer: "https://youtu.be/ZHtPm8v-yNw"
      }]
    return (
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            {movies?.map((movie)=>{
                return (
                <Grid item xs={3} md={4}>
                    <CardIndividual
                    title={movie.title}
                    image={movie.image}
                    genres={movie.genres}
                    platform={movie.platform}/>
                </Grid>
              )
            })}
        </Grid>
      </Box>
    )
}