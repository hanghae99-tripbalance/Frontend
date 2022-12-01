import React, { useEffect, useState } from "react";
import "./Test.css";
import UseInterval from "../../hooks/useinterval";
import { gsap } from "gsap";

const TestSlide = () => {
  const [currentIndex, setIndex] = useState(0);
  const banner = document.querySelectorAll(".banner");
  const Img1 = "img/default3.jpg";
  const Img2 = "img/default5.jpg";
  const Img3 = "img/default6.jpg";

  const SlideAuto = () => {
    const banner = document.querySelectorAll(".banner");

    let nextIndex = (currentIndex + 1) % 3;

    banner[currentIndex].style.opacity = "0";
    banner[nextIndex].style.opacity = "1";

    banner.forEach((banner) => {
      banner.style.transition = "all 0.5s";
    });

    console.log(currentIndex);
    console.log(nextIndex);

    setIndex((prevstate) => (prevstate + 1) % 3);
  };

  //앞으로가기
  function func() {
    let nextIndex = (currentIndex + 1) % 3; // 0 1 2 0 무한루프

    console.log(nextIndex);
    console.log(currentIndex);

    banner[currentIndex].style.opacity = "0"; //첫 번째 이미지를 안보이게
    banner[nextIndex].style.opacity = "1"; //두 번째 이미지를 보이게

    banner.forEach((banner) => {
      banner.style.transition = "all 0.5s"; //자연스레 바뀌는 효과
    });

    currentIndex = nextIndex; // 함수가 한번 실행될때마다 넥스트값을 커렌트값에 옮겨준다.
  }

  //뒤로가기
  function funct() {
    let nextIndex = currentIndex == 0 ? 2 : currentIndex - 1;

    console.log(nextIndex);
    console.log(currentIndex);

    banner[currentIndex].style.opacity = "0";
    banner[nextIndex].style.opacity = "1";

    banner.forEach((banner) => {
      banner.style.transition = "all 0.5s";
    });

    currentIndex = nextIndex;
  }

  UseInterval(() => {
    SlideAuto();
  }, 6000);

  console.log(currentIndex);

  useEffect(() => {
    switch (currentIndex) {
      case 0:
        gsap.to(".mainboard_title", {
          duration: 1,
          y: 0,
          x: 100,
          opacity: 1,
          ease: "power1.out",
          delay: 1,
        });
        gsap.to(".mainboard_titleshadow", {
          duration: 1,
          y: 0,
          x: 100,
          opacity: 1,
          ease: "power1.out",
          delay: 1.2,
        });
        gsap.to(".mainboard_body", {
          duration: 1,
          y: 0,
          x: 100,
          opacity: 1,
          ease: "power1.out",
          delay: 1.4,
        });
        gsap.to(".mainboard_btn", {
          duration: 1,
          y: 0,
          x: 100,
          opacity: 1,
          ease: "power1.out",
          delay: 1.6,
        });
        gsap.to(".mainboard_img", {
          duration: 1,
          y: 100,
          x: 100,
          opacity: 1,
          ease: "power1.out",
          delay: 1.6,
        });
        gsap.to(".mainboard_imgshadow", {
          duration: 1,
          y: -100,
          x: 100,
          opacity: 1,
          ease: "power1.out",
          delay: 1.6,
        });
        gsap.to(".mainboard_title3", {
          duration: 0,
          opacity: 0,
          x: -100,
          delay: 0,
        });
        gsap.to(".mainboard_titleshadow3", {
          duration: 0,
          opacity: 0,
          x: -100,
          delay: 0,
        });
        gsap.to(".mainboard_body3", {
          opacity: 0,
          x: -100,
          delay: 0,
          duration: 0,
        });
        gsap.to(".mainboard_btn3", {
          opacity: 0,
          x: -100,
          delay: 0,
          duration: 0,
        });
        gsap.to(".mainboard_img3", {
          opacity: 0,
          y: -100,
          x: -100,
          delay: 0,
          duration: 0,
        });
        gsap.to(".mainboard_imgshadow3", {
          opacity: 0,
          y: 100,
          x: -100,
          delay: 0,
          duration: 0,
        });
        break;
      case 1:
        gsap.to(".mainboard_title2", {
          duration: 1,
          y: 0,
          x: 100,
          opacity: 1,
          ease: "power1.out",
          delay: 1,
        });
        gsap.to(".mainboard_titleshadow2", {
          duration: 1,
          y: 0,
          x: 100,
          opacity: 1,
          ease: "power1.out",
          delay: 1.2,
        });
        gsap.to(".mainboard_body2", {
          duration: 1,
          y: 0,
          x: 100,
          opacity: 1,
          ease: "power1.out",
          delay: 1.4,
        });
        gsap.to(".mainboard_btn2", {
          duration: 1,
          y: 0,
          x: 100,
          opacity: 1,
          ease: "power1.out",
          delay: 1.6,
        });
        gsap.to(".mainboard_img2", {
          duration: 1,
          y: 100,
          x: 100,
          opacity: 1,
          ease: "power1.out",
          delay: 1.6,
        });
        gsap.to(".mainboard_imgshadow2", {
          duration: 1,
          y: -100,
          x: 100,
          opacity: 1,
          ease: "power1.out",
          delay: 1.6,
        });
        gsap.to(".mainboard_title", {
          duration: 0,
          opacity: 0,
          x: -100,
          delay: 0,
        });
        gsap.to(".mainboard_titleshadow", {
          duration: 0,
          opacity: 0,
          x: -100,
          delay: 0,
        });
        gsap.to(".mainboard_body", {
          opacity: 0,
          x: -100,
          delay: 0,
          duration: 0,
        });
        gsap.to(".mainboard_btn", {
          opacity: 0,
          x: -100,
          delay: 0,
          duration: 0,
        });
        gsap.to(".mainboard_img", {
          opacity: 0,
          y: -100,
          x: -100,
          delay: 0,
          duration: 0,
        });
        gsap.to(".mainboard_imgshadow", {
          opacity: 0,
          y: 100,
          x: -100,
          delay: 0,
          duration: 0,
        });
        break;
      case 2:
        gsap.to(".mainboard_title3", {
          duration: 1,
          y: 0,
          x: 100,
          opacity: 1,
          ease: "power1.out",
          delay: 1,
        });
        gsap.to(".mainboard_titleshadow3", {
          duration: 1,
          y: 0,
          x: 100,
          opacity: 1,
          ease: "power1.out",
          delay: 1.2,
        });
        gsap.to(".mainboard_body3", {
          duration: 1,
          y: 0,
          x: 100,
          opacity: 1,
          ease: "power1.out",
          delay: 1.4,
        });
        gsap.to(".mainboard_btn3", {
          duration: 1,
          y: 0,
          x: 100,
          opacity: 1,
          ease: "power1.out",
          delay: 1.6,
        });
        gsap.to(".mainboard_img3", {
          duration: 1,
          y: 100,
          x: 100,
          opacity: 1,
          ease: "power1.out",
          delay: 1.6,
        });
        gsap.to(".mainboard_imgshadow3", {
          duration: 1,
          y: -100,
          x: 100,
          opacity: 1,
          ease: "power1.out",
          delay: 1.6,
        });
        gsap.to(".mainboard_title2", {
          duration: 0,
          opacity: 0,
          x: -100,
          delay: 0,
        });
        gsap.to(".mainboard_titleshadow2", {
          duration: 0,
          opacity: 0,
          x: -100,
          delay: 0,
        });
        gsap.to(".mainboard_body2", {
          opacity: 0,
          x: -100,
          delay: 0,
          duration: 0,
        });
        gsap.to(".mainboard_btn2", {
          opacity: 0,
          x: -100,
          delay: 0,
          duration: 0,
        });
        gsap.to(".mainboard_img2", {
          opacity: 0,
          y: -100,
          x: -100,
          delay: 0,
          duration: 0,
        });
        gsap.to(".mainboard_imgshadow2", {
          opacity: 0,
          y: 100,
          x: -100,
          delay: 0,
          duration: 0,
        });
        break;
      default:
    }
  }, [currentIndex]);

  useEffect(() => {}, []);

  return (
    <main className="main">
      <section id="banner_wrap">
        <div className="banner_inner">
          <div className="banner">
            <div className="one">
              <div className="main_board">
                <div>
                  <div className="mainboard_title">여행지 후기 게시판</div>
                  <div className="mainboard_titleshadow">
                    Travel destination review board
                  </div>
                  <div className="mainboard_body">여행지 후기 멘트</div>
                  <button className="mainboard_btn">게시판 가기</button>
                </div>
                <div className="mainboard_imgbox">
                  <div className="mainboard_img">
                    <img src={Img1} alt="" />
                  </div>
                  <div className="mainboard_imgshadow"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="banner">
            <div className="two">
              <div className="main_board">
                <div>
                  <div className="mainboard_title2">추천 여행지</div>
                  <div className="mainboard_titleshadow2">
                    Popular tourist destinations
                  </div>
                  <div className="mainboard_body2">추천 여행지 멘트</div>
                  <button className="mainboard_btn2">게시판 가기</button>
                </div>
                <div className="mainboard_imgbox2">
                  <div className="mainboard_img2">
                    <img src={Img3} alt="" />
                  </div>
                  <div className="mainboard_imgshadow2"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="banner">
            <div className="three">
              <div className="main_board">
                <div>
                  <div className="mainboard_title3">밸런스 게임</div>
                  <div className="mainboard_titleshadow3">Balance game</div>
                  <div className="mainboard_body3">밸런스 게임 멘트</div>
                  <button className="mainboard_btn3">게시판 가기</button>
                </div>
                <div className="mainboard_imgbox3">
                  <div className="mainboard_img3">
                    <img src={Img2} alt="" />
                  </div>
                  <div className="mainboard_imgshadow3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TestSlide;
