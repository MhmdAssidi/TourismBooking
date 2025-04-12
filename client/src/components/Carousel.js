import React from 'react';

const Carousel = () => {
  return (
    <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="0" className="active"></button>
        <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="2"></button>
      </div>

      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/images/carousellake.jpg" className="d-block w-100" alt="Qaraoun Lake" />
          <div className="carousel-caption d-block d-md-block">
            <h3>Qaraoun Lake - Nature’s Beauty</h3>
            <p>Relax by the largest artificial lake in Lebanon.</p>
          </div>
        </div>

        <div className="carousel-item">
          <img src="/images/zahleCarousel.jpg" className="d-block w-100" alt="Zahle" />
          <div className="carousel-caption d-block d-md-block">
            <h3>Zahle</h3>
            <p>A blend of ancient charm and modern vibrance, nestled by the Litani River.</p>
          </div>
        </div>

        <div className="carousel-item">
          <img src="/images/Beirut-Baalbek-SH1.jpg" className="d-block w-100" alt="Baalbek" />
          <div className="carousel-caption d-block d-md-block">
            <h3>Baalbek - The City of the Sun</h3>
            <p>Explore the ancient Roman ruins and history.</p>
          </div>
        </div>
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
};

export default Carousel;
