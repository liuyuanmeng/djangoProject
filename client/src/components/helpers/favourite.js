import axios from 'axios'
import { useNavigate } from 'react-router-dom'



export const deleteFavourite = async (token,jewelleryId,userId) => {
  
 
  
  await axios.delete(`/api/auth/profile/${userId}/favourite/`, {
   
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    data: {
      jewelleryId: jewelleryId,
    },
  })
  


}

export const addFavourite = async (token, jewelleryId, userId) => {
  
  
  await axios.post(`/api/auth/profile/${userId}/favourite/`, {
    jewelleryId: jewelleryId,
  }, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  
 
}


export const handleFavouriteButton = (token, jewelleryId, userId, addButtonText, setAddButtonText) => {
 
  
 
 
  try {
    if (addButtonText === 'Add to Favourite') {
      addFavourite(token, jewelleryId, userId)
      setAddButtonText('Remove from Favourite')
   
    
      
      
      
    } else {
      deleteFavourite(token, jewelleryId, userId)
      setAddButtonText('Add to Favourite')
      
     
      
    }
   
  } catch (error) {
    console.log(error.response)
  }
}