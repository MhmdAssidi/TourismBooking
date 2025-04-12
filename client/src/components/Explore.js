import React from "react";

function Explore() {
  return (
    <section className="container p-5" id="about">
      <div className="exploreCont">
        <div className="exploreTitle">
          <div className="text-center mx-5 innerExploreTitle" data-aos="fade-up">
            <p id="planYourTrip">Plan your trip</p>
            <h1 className="mx-5 text-center">Where to next?</h1>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-lg-3 g-3 mt-2">
          {/* Card 1 */}
          <div className="col" data-aos="zoom-in">
            <div className="card border-0 rounded-0">
              <img src="/images/hotel.jpg" className="card-img-top rounded" alt="Hotels" />
            </div>
            <div className="mt-3">
              <h3>HOTELS</h3>
              <p className="mt-2">
                Breakfast daily, spa, dining, or resort credit. Room upgrades, exclusive amenities, and more.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col" data-aos="zoom-in" data-aos-delay="100">
            <div className="card border-0 rounded-0">
              <img src="/images/hiking.jpg" className="card-img-top rounded" alt="Hiking" />
            </div>
            <div className="mt-3">
              <h3>HIKING</h3>
              <p className="mt-2">
                Join guided trails through the scenic mountains and valleys of Beqaa.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col" data-aos="zoom-in" data-aos-delay="200">
            <div className="card border-0 rounded-0">
              <img src="/images/tours.jpg" className="card-img-top rounded" alt="Tours" />
            </div>
            <div className="mt-3">
              <h3>TOURS</h3>
              <p className="mt-2">
                Historical and cultural day trips with expert local guides.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Explore;
