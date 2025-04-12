import React from 'react';

const FAQ = () => {
  return (
    <section className="faq-section py-5" data-aos="fade-up">

      <div className="container">
        <h2 className="text-center mb-4 text-dark">Frequently Asked Questions</h2>

        <div className="accordion" id="faqAccordion">

          <div className="accordion-item">
            <h2 className="accordion-header" id="faq1">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1">
                What destinations are included in your Beqaa trips?
              </button>
            </h2>
            <div id="collapse1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Our trips cover top Beqaa destinations including Baalbek, Zahle, Qaraoun Lake, Anjar, and more.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faq2">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2">
                Are meals and accommodations included in the trip package?
              </button>
            </h2>
            <div id="collapse2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Yes! All packages include at least one meal and a hotel stay depending on the option selected.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faq3">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3">
                Can I customize my trip dates and departure times?
              </button>
            </h2>
            <div id="collapse3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Absolutely! You can filter by your preferred departure/return dates and times directly in the booking page.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faq4">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4">
                How do I pay and is it secure?
              </button>
            </h2>
            <div id="collapse4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                We offer secure online payments with encrypted connections and trusted gateways.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;
