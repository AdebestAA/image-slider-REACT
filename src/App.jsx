import React, { useEffect, useState } from 'react'
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";


const url = "https://picsum.photos/v2/list?page=1&limit=10"

const ImageSlider = () => {
    const [image,setImage] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    const [currentSlide,setCurrentSlide] = useState(0)
    const fetchData = async(url)=> {
    try {
    setLoading(true)
    const res = await fetch(url)
    const response = await res.json()
    if (!res.ok) {
    setError(true)
    }
    else{
    setImage(response)
    setLoading(false)
    }
// console.log(image);
    } catch (error) {
        setError(true)
        setLoading(false)
    }
    }

    useEffect(()=>{
    fetchData(url) 
    if (error) {
    return (
    <div>
    there was an error
    </div>
    )
    }
    if (loading) {
    return (
    <div>Loading data</div>
    )

    }
    },[])
const handleLeftMove = ()=>{
if (currentSlide === 0) {
    setCurrentSlide(image.length - 1)

}
else{
    setCurrentSlide(currentSlide - 1)
}
  
}
const handleRighttMove = ()=>{
setCurrentSlide(currentSlide === image.length - 1 ? 0 :currentSlide + 1)
}

  return (
    <div className='container'>
        <FaCircleArrowLeft  
        size={30}
         className='arrow-left'
         onClick={handleLeftMove}/>
    {image && image.length > 0 && image.map((item,index)=>{
    return(
    <img key={index} src={item.
    download_url} alt={item.author} className={`${currentSlide === index ? 'image' : "image hide-image"}`} />
    )
    })}
    <FaCircleArrowRight
    size={30} 
    className='arrow-right'
    onClick={handleRighttMove}
    />
    <div className='target-container'>
    {image && image.length > 0 && image.map((item,index)=>{
    return (
    <span key={index} className={currentSlide === index ? "each-target active-target" : "each-target"} ></span>
    )
    })}
    </div>
    </div>
    )
    }

export default ImageSlider
