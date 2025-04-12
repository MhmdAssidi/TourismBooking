import React from 'react';

function VideoSection() {
  return (
    <section>
      <div className="videoSection">
        <video src="/images/WhatsApp Video 2025-03-03 at 12.59.58 AM.mp4" autoPlay loop muted />
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
