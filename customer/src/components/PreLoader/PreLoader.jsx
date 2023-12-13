import React , {useEffect} from 'react';
import '../../styles/preLoader.css';
import * as animation from '../../assets/animation/Animation - 1702145675573.json';
import Lottie from 'react-lottie';
import AOS from 'aos'
import "aos/dist/aos.css";


export const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animation.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

function PreLoader() {
    useEffect(() => {
      AOS.init(); 
    }, []);
  return (
    <div data-aos="fade-out" className='bg-primary'>
      <div className=' relative w-screen h-screen flex justify-center items-start top-44'>
        <div className='loader-container'>
          <Lottie options={defaultOptions} height={220} width={220} />
          <svg width='650' height='150'>
            <text x='20%' y='57%' textAnchor='middle' className='text-draw first' fontSize='60'>
              PREST
            </text>
            <text x='60%' y='57%' textAnchor='middle' className='text-draw second' fontSize='60'>
              IGIOUS
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default PreLoader;
