// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const Content = () => {
  const elementRef = useRef(null);
const navigate = useNavigate()
  useEffect(() => {
    // Use GSAP to animate the element
    gsap.to(elementRef.current, {
      duration: 1,
      opacity: 1, 
    });
  }, []);
const logout = () =>{
  localStorage.removeItem("user"),
  navigate('/login')
}
  return (
    <div ref={elementRef} style={{ opacity: 0 }} className='content'>
      <div style={{color:"white", textAlign:"center", position:"relative", top:"50%", }}  className='homeText'>Welcome To Home Page </div>
      <button  style=
      {{  position:"absolute",
      left:"1135px",
      padding:"14px",
      backgroundColor:"#0d55f1",
      color:"#ffffff",
      borderStyle:"none",
      borderRadius:"4px",
      cursor:"pointer"
    }} onClick={logout}>Logout</button>
    </div>
  );
};

export default Content;
