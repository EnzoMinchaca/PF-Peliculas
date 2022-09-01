

const getMovies = async(nameMovie,allMovies) =>{

    if(nameMovie){
        let movie =  await allMovies.filter(e => e.title.toLowerCase().includes(nameMovie.toLowerCase())
         )
        if(movie.length){
          return movie
        } 
        else 'Movie not found';
      }else{
          return allMovies;
      }
};


module.exports = {
   getMovies
}