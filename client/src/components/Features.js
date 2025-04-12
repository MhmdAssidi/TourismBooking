import React, { useState } from 'react';

const Features = () => {
  const [visibleSection, setVisibleSection] = useState(null);

  const toggleSection = (section) => {
    setVisibleSection(prev => (prev === section ? null : section));
  };

  return (
<section id="about">
<div className="features" id="features">
        <div className="featureImg">
          <img src="/images/elsewhereDriver.avif" alt="Driver" />
        </div>

        <div className="featureCont">
          <h2>Welcome to Beqaa Tours, your gateway to the breathtaking wonders of Lebanon’s heartland</h2>
          <p>
            From the ancient ruins of Baalbek to the vineyards of Zahle and the serene waters of Qaraoun Lake,
            we craft unforgettable experiences tailored to every traveler.
          </p>

          <div className="cross-respContainer">
            <div className="cross">
              <div className="Aboutbuttons">
                <button
                  onClick={() => toggleSection("how")}
                  className={visibleSection === "how" ? "active-btn" : ""}
                >
                  How does it work?
                </button>
                <button
                  onClick={() => toggleSection("included")}
                  className={visibleSection === "included" ? "active-btn" : ""}
                >
                  What’s included?
                </button>
              </div>

              <div className="featureAnswer">
                {visibleSection === "how" && (
                  <div className="answer animated">
                    <p>
                       Planning your trip is easy:
                      <br />
                      1. Pick your desired travel date and time.<br />
                      2. Choose your departure and return location.<br />
                      3. View available trips with hotels, food, and activities.<br />
                      4. Add them to your cart and checkout securely!
                    </p>
                  </div>
                )}

                {visibleSection === "included" && (
                  <div className="answer animated">
                    <ul>
                      <li><i className="bi bi-bus-front"></i> Comfortable transport</li>
                      <li><i className="bi bi-book"></i> Local guidebook</li>
                      <li><i className="bi bi-telephone"></i> 24/7 assistance</li>
                      <li><i className="bi bi-shield-lock"></i> Secure online payment</li>
                      <li><i className="bi bi-map"></i> Access to secret locations</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
