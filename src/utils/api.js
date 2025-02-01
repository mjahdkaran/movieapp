import axios from "axios";
const API_Base_URL='https://api.themoviedb.org/3/'
const API_KEY='Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjQ5MjcxOTA3ZGE1NzQ3MWYzZDY5MDc2OTQzMDMzNCIsIm5iZiI6MTczMjgxODkxOS4yODcwMDAyLCJzdWIiOiI2NzQ4YjdlNzE5OTJkNzEwZDNhY2JlNmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Eu9JxWvD7U5Y34dHgMC9JpHHtbeI9NJgZAnz7oa1spY'
const API_Base_URL_AMIR='http://65.109.177.24:2024/api/'

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
//گرفتن جزئیات هر فیلم با آی دی 
export  const fetchMovieById=async(movieId)=>{
    try {
        const response= await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,{
            headers:{'content-type': 'application/json',
                Authorization:API_KEY
            }
        })
        return response.data||{}
    } catch (error) {
        console.error('fetchMovieById error')
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



export const fetchLanguages=async()=>{
    try {
        const response=await ApiClient.get('/configuration/languages ',{  headers: {
            'Accept': 'application/json'  // اضافه کردن هدر Accept
        }})
 return response.data.map(lang=>({name:lang.english_name,code:lang.iso_639_1}))
    } catch (error) {
        console.error('somthing is wrong',error)
        return[]
    }
}

// این درخواست برای بررسی ذخیره بودن فیلم در پلی‌لیست است
export const  checkSavedMovie=async(token,movieId)=>{
try{
    const response=await axios.get(`${API_Base_URL_AMIR}playlist/2/movies`,{  headers: {
        'authorization': `Bearer ${token}`,
    },
});
return response.data.includes(movieId)
}catch(error){ 
    console.error('Error checking saved movie:', error);
    throw error;
}
}
//گرفتن لیست پلی لیست
export const  getPlayList=async(token)=>{
    try{
        const response=await axios.get(`${API_Base_URL_AMIR}playlist/2/movies`,{  headers: {
            'authorization': `Bearer ${token}`,
        },
    });
    return response.data
    }catch(error){ 
        console.error('Error getting playList :', error);
        throw error;
    }
    }
//این درخواست برای اضافه کردن فیلم به پلی لیست است
export const  saveMovieToPlaylist=async(token,movieId)=>{
    try {
        const response = await fetch(`${API_Base_URL_AMIR}playlist/import-movie`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                playListId: 2,
                movieId: movieId
            })
        })
        return response.status===200
    } catch (error) {
        console.error('Failed to save movie:', error);
        throw error;
    }
}

//این درخواست برای حذف فیلم ها از پلی لیست است
export const removeMovieFromPlaylist = async (token,movieId) => {
    try {
        const response = await fetch(`${API_Base_URL_AMIR}playlist/remove-movie`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                playListId: 2,
                movieId: movieId
            })
        })
       return response.status===200
    } catch (error) {
        console.error('Failed to remove movie:', error);
        throw error;
    }
}
//این درخواست برای بررسی فیلم های لایک شده است
export const  checkLikedMovie=async(token,movieId)=>{
    try {
        const response= await axios.get(`${API_Base_URL_AMIR}playlist/1/movies`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        return response.data.includes(movieId)
    } catch (error) {
        console.error('Failed to check Liked movie',error);
        throw error;
    }
}

// این درخواست برای گرفتن لیست فیلم های لایک شده است 
export const  getLikedList=async(token)=>{
    try{
        const response=await axios.get(`${API_Base_URL_AMIR}playlist/1/movies`,{  headers: {
            'authorization': `Bearer ${token}`,
        },
    });
    return response.data
    }catch(error){ 
        console.error('Error getting LikedList :', error);
        throw error;
    }
    }
//این درخواست برای اضفافه شدن فیلم به پلی لیست لایک شده ها است 
export const saveMovieToLikedList=async(token,movieId)=>{
try {
    const response=await axios.post(`${API_Base_URL_AMIR}playlist/import-movie`,{
        playListId:1,
        movieId:movieId
    },
{headers:{
    Authorization:`Bearer ${token}`,
    "Content-Type": "application/json"

}
})
return response.status===200
} catch (error) {
    console.error('Failed to import liked movie:', error);
    throw error;
}

}
//این درخواست برای حذف فیلم از لیست لایک شده ها است 
export const removeMovieFromLikedList=async(token,movieId)=>{
    try {
        const response=await axios.post(`${API_Base_URL_AMIR}playlist/remove-movie`,{
            playListId:1,
            movieId:movieId
        },
    {headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type": "application/json"
    
    }
    })
    return response.status===200
    } catch (error) {
        console.error('Failed to remove liked movie:', error);
        throw error;
    }
    
    }
