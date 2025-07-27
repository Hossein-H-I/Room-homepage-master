import { useEffect, useState } from "react";
import Nav from "./Nav";

export default function Header(){
  
  const [sliderContent, setSliderContent]= useState([]);
  const[current, setCurrent] = useState(0); // the current slide
  
  useEffect(()=>{
    fetch('json/sliderData.json')
    .then((response)=>{
      if(!response.ok){
        throw new Error("Failed to load slider");
      }
      return response.json();
    })
    .then((data) => setSliderContent(data) )
    .catch((error)=> console.error("error fetching slider: ", error))
  },[]);
  
  const total = sliderContent.length; // the slider length

function nextSlide(){
  setCurrent((prev)=> prev + 1 >= total ? 0 : prev + 1);
}

function prevSlide(){
  setCurrent((prev)=> prev - 1 < 0 ? total - 1 : prev - 1);
}

if (!sliderContent.length) return null; // prevent rendering before data is ready

const currentSlide = sliderContent[current];

    return(
        <>
        <header>
        <Nav/>
            <div className="slide-container">
                <div className="slide-img-box">
                    <picture>
                      <source media="(max-width: 768px)" srcSet={currentSlide.img.mobile}/>
                      <img className="slide-img" src={currentSlide.img.desktop} width={'100%'} alt="" />
                    </picture>
                    <div className="slide-nav-box">
                        <button className="slide-next-btn slide-nav-btn" onClick={nextSlide}>
                            <svg width="14" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M13 0L1 12l12 12" stroke="#FFF" fill="none" fill-rule="evenodd"/></svg>
                        </button>
                        <button className="slide-prev-btn slide-nav-btn" onClick={prevSlide}>
                            <svg width="14" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M1 0l12 12L1 24" stroke="#FFF" fill="none" fill-rule="evenodd"/></svg>
                        </button>
                    </div>
                </div>
                <div className="slide-text-box">
                    <h1 className="slide-heading">{currentSlide.title}</h1>
                    <p className="slide-paragraph">{currentSlide.content}</p>
                    <a href="#">
                        <button className="cta-btn">
                            shop now
                            <svg width="40" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M34.05 0l5.481 5.527h.008v.008L40 6l-.461.465v.063l-.062-.001L34.049 12l-.662-.668 4.765-4.805H0v-1h38.206l-4.82-4.86L34.05 0z" fill-rule="nonzero"/></svg>
                        </button>
                    </a>
                </div>
            </div>
        </header>
        </>
    )
}