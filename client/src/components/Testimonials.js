import React from 'react';

function Testimonials() {
  return (
    <section data-aos="fade-up" className="pt-5">
      <div id="carouselExampleSlidesOnly" className="carousel slide pt-5" data-bs-ride="carousel">
        <div className="text-center pt-3 pb-5">
          <h1>What Our Clients Say</h1>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item text-center active">
            <div className="px-5 clientsCont">
              <p className="px-5">
                "Perhaps travel cannot prevent bigotry, but by demonstrating that all people cry,
                laugh, eat, worry and die, it can introduce the idea that if we try and understand
                each other, we may even become friends."
              </p>
            </div>
            <div className="col-md-12">
              <div className="card-body">
              <img src="/images/team-1.png" className="rounded-circle testimonial-img" alt="client1" />

                <div className="d-block">
                  <div className="card-text">Brian Clark</div>
                </div>
              </div>
            </div>
          </div>

          {/* Duplicate this block for more testimonials */}
          <div className="carousel-item text-center">
            <div className="px-5">
              <p className="px-5">
                "Travel helps us see that we’re more alike than different."
              </p>
            </div>
            <div className="col-md-12">
              <div className="card-body">
              <img src="/images/team-2.png" className="rounded-circle testimonial-img" alt="client2"/>
              <div className="d-block">
                  <div className="card-text">Kevin Clark</div>
                </div>
              </div>
            </div>
          </div>

          <div className="carousel-item text-center">
            <div className="px-5">
              <p className="px-5">
                "You gain more than memories from traveling. You gain perspective."
              </p>
            </div>
            <div className="col-md-12">
              <div className="card-body">
              <img src="/images/team-3.png" className="rounded-circle testimonial-img" alt="client3"/>

                <div className="d-block">
                  <div className="card-text">David Clark</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
