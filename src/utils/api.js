import axios from "axios";
const API_Base_URL='https://api.themoviedb.org/3/'
const API_KEY='Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjQ5MjcxOTA3ZGE1NzQ3MWYzZDY5MDc2OTQzMDMzNCIsIm5iZiI6MTczMjgxODkxOS4yODcwMDAyLCJzdWIiOiI2NzQ4YjdlNzE5OTJkNzEwZDNhY2JlNmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Eu9JxWvD7U5Y34dHgMC9JpHHtbeI9NJgZAnz7oa1spY'

const ApiClient=axios.create({
    baseURL:API_Base_URL,
    headers:{
        Authorization:API_KEY,
    }
})
export  const fetchMovieByCategory=async(category,page=1)=>{
    try {
        const response=await ApiClient.get(`movie/${category}`,{
            params:{
                language: 'en-US',
                page,
            }
        })
        return response.data.results || []
    } catch (error) {
        console.log(`error fetching ${category} movies: `, error);
        return []
    }
    
}

export const fetchGenreOfMovie=async()=>{
try{
    const response=await ApiClient.get('genre/movie/list',{
        params:{
            language:'en'
        }
    })
    return response.data.genres || []
}
catch(error){
console.log(`error fetching movie genre:`,error);
return []
}
}