import React from "react";
import Slider from "react-slick";
import image1 from "../assets/images/slider-image-1.jpeg";
import image2 from "../assets/images/slider-image-2.jpeg";
import image3 from "../assets/images/slider-image-3.jpeg";
import blog1 from "../assets/images/blog-img-1.jpeg";
import blog2 from "../assets/images/blog-img-2.jpeg";

export default function Header() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
  };

  return (
    <>
      <div className="  hidden md:flex   mb-6">
        <Slider className="w-2/3" {...settings}>
          <img src={image1} alt="" className=" h-[400px] object-cover" />
          <img src={image2} alt="" className=" h-[400px] object-cover" />
          <img src={image3} alt="" className="  h-[400px] object-cover" />
        </Slider>
        <div className="w-1/3 ">
          <img src={blog1} alt="" className=" h-[200px] w-full object-cover" />
          <img src={blog2} alt="" className=" h-[200px] w-full object-cover" />
        </div>
      </div>
    </>
  );
}
