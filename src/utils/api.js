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

export  const fetchMovieByCategory=async(category,page=1)=>{
    try {
        const response=await ApiClient.get(`movie/${category}`,{
            params:{
                language: 'en-US',
                page,
            }
        })
        console.log('movies',response.data.results )
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
        console.log('movieDetails:',response.data)
        return response.data||{}
    } catch (error) {
        console.error('fetchMovieById error')
    }
}
// Series
export  const fetchSeriesByCategory=async(category,page=1)=>{
    try {
        const response=await ApiClient.get(`tv/${category}`,{
            params:{
                language: 'en-US',
                page,
            }
        })
        // console.log('series',response.data.results)
        console.log('series',response.data.results)

        return response.data.results || []
    } catch (error) {
        console.log(`error fetching ${category} movies: `, error);
        return []
    }
    
}
//گرفتن جزئیات هر سریال با آی دی 
export  const fetchSeriesById=async(movieId)=>{
    try {
        const response= await axios.get(`https://api.themoviedb.org/3/tv/${movieId}?language=en-US`,{
            headers:{'content-type': 'application/json',
                Authorization:API_KEY
            }
        })
        console.log('SeriesDetails:',response.data)
        return response.data||{}
    } catch (error) {
        console.error('fetchMovieById error')
    }
}
//------
export  const fetchSimilarMovie=async(movieType,movieId,page=1)=>{
    // movieType=>movie/tv
    try {
        const response=await ApiClient.get(`${movieType}/${movieId}/similar`,{
            params:{
                language: 'en-US',
                page,
            }
        })
        return response.data.results || []
    } catch (error) {
        console.log(`error fetching  Similar movies: `, error);
        return []
    }
    
}
//-------------------------------
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





                
//-----  اضافه کردن فیلم به لیست------------
//listType => playlist=2/liked=1
 //movietype => series=2/movie=1
export const  saveMovieTolist=async(token,listType,movieId,movietype)=>{
    try {
        const response = await fetch(`${API_Base_URL_AMIR}playlist/import-movie`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                playListId: listType,
                movieId: movieId,
                movieType:movietype
            })
        })
        return response.status===200
    } catch (error) {
        console.error('Failed to save movie:', error);
        throw error;
    }
}
//-------- حذف کردن فیلم از لیست ها-----------
export const removeMovieFromList = async (token,listType,movieId,movietype) => {
    try {
        const response = await fetch(`${API_Base_URL_AMIR}playlist/remove-movie`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                
                playListId: listType,
                movieId: movieId,
                movieType:movietype
            })
        })
       return response.status===200
    } catch (error) {
        console.error('Failed to remove movie:', error);
        throw error;
    }
}


// چک کردن لایک شدن یا سیو شدن  فیلم ها
               //listType => playlist=2/liked=1
                //movietype => series=2/movie=1
export const  checkSavedOrLiked=async(token,listType,movieId,movieType)=>{
    try {
        const response= await axios.get(`${API_Base_URL_AMIR}playlist/${listType}/movies`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        const result=response.data.map(obj=>(obj.movieType===movieType&&obj.id)).includes(movieId)
       return result
    } catch (error) {
        console.error('Failed to check Liked or Saved movie',error);
        throw error;
    }
}

    //----   گرفتن لیست لایک و سیو شده ها 

    export const  getList=async(token,listType)=>{
        try{
            const response=await axios.get(`${API_Base_URL_AMIR}playlist/${listType}/movies`,{  headers: {
                'authorization': `Bearer ${token}`,
            },
        });
        console.log('data',response.data)
        return response.data
        }catch(error){ 
            console.error('Error getting LikedList :', error);
            throw error;
        }
        }
///****************************************************** */


//گرفتن اطلاعات کاربر
export const getCurrentUser=async(token)=>{
try {
    const response=await axios.get(`${API_Base_URL_AMIR}user`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
} catch (error) {
    console.error('Error getting user',error)
    throw error
}
}
//جست و جوی فیلم و سریال
// endpoin=>tv/movie
export const searchingFunction = async (debounceQuery, endpoint) => {
    try {
        const response = await ApiClient.get(`search/${endpoint}`, {
            params: {
                query: debounceQuery,
                language: 'en-US',  // اضافه کردن زبان
            },
        });

        return response.data.results || [];
    } catch (error) {
        console.error('Error in searchingFunction:', error);
        return [];
    }
};

//گرفتن کامنت ها با id , سریال فیلم
export const getComments=async(movieId,movieType)=>{
    try {
        const response = await axios.get(`${API_Base_URL_AMIR}comment/movie/${movieId}/${movieType}`)
        return response.data
    } catch (error) {
        console.error('Error getting comments', error)
    }}
//گرفتن commnentChiled با id




export const getChildCommentsByParentId = async (parentId, take = 50, skip = 0) => {
    if (!parentId) {
        console.error('Error: parentId is required');
        return null; // مقدار نامعتبر برمی‌گردانیم تا کرش نکند
    }

    try {
        const response = await axios.get(`${API_Base_URL_AMIR}comment/parent/${parentId}`, {
            params: { take, skip }
        });
        console.log('child',response.data.getCommentChildrenResults)
        return response.data.getCommentChildrenResults;
    } catch (error) {
        console.error('Error getting comments:', error);
        return null; // در صورت خطا مقدار `null` برمی‌گردانیم
    }
};


    //گرفتن لینک های دانلود
    export const  getDownloadLinks=async(token,movieName)=>{
        try {
            const response=await axios.get(`${API_Base_URL_AMIR}movie/download-links/${movieName}`,{
                headers:{
                    authorization:`Bearer ${token}` 
                }
            })
        
            return response.data
        } catch (error) {
            console.error('error get download links',error)
        }
    }
//گرفتن زیر نویس ها 
export const getSubTitlesLinks=async(token,movieId,movieType,season=0,episode=0)=>{
    try {
        const response=await axios.get(`${API_Base_URL_AMIR}movie/subtitle/${movieId}/${movieType}`,{
            params:{
                season,
                episode
            },headers:{
                authorization:`Bearer ${token}`
            }
        })
        return response.data.data
    } catch (error) {
        console.error('error get subtitles links',error)
    }
}