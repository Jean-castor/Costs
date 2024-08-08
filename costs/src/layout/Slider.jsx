import  styles from './Slider.module.css';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import image1 from '../img/images/1.jpg';
import image2 from '../img/images/2.jpg';
import image3 from '../img/images/3.jpg';
import image4 from '../img/images/4.jpg';



const images = [image1, image2, image3, image4];

function Slider(){ 
    const carousel = useRef();
    const [width, setWidth] = useState(0);


    useEffect(() => {
        //console.log(carousel.current?.scrollWidth, carousel.current?.offsetWidth);
        setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth)
      }, [])
    

   return(     
    <div className={styles.slider}>
       <motion.div ref={carousel} className={styles.carousel} whileTap={{cursor: "grabbing"}}>
         <motion.div className={styles.inner} drag="x" dragConstraints={{ right: 0,  left: -width}}>

          {images.map(image => (
            <motion.div className={styles.item} key={image}>
              <img src={image} alt='Imagens'/>
            </motion.div>
          ))}
          
        </motion.div>
      </motion.div>
    </div>
  )}

export default Slider;