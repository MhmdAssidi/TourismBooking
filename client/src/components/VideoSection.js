import React from 'react';

function VideoSection() {
  return (
    <section className="sectionVideo">
      <div className="videoSection">
        <video src="/images/2260991-uhd_3840_2160_24fps.mp4" autoPlay loop muted />
        <div className="videoInfo">
          <p>
            Discover the enchanting beauty and rich heritage of Beqaa, Lebanon,
            where nature and culture blend harmoniously
          </p>
        </div>
      </div>
    </section>
  );
}

export default VideoSection;
