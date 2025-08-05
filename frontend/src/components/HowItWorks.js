import React from 'react';
import './HowItWorks.css';

const steps = [
  {
    title: "Sourcing premium meat, directly from its point of origin",
    description: "No chemicals, no preservatives, no antibiotics, our team scrutinises and sources directly from unique cultivation and rearing spots, taking extra care of the quality of the products."
  },
  {
    title: "State-of-the-art production and conservation",
    description: "Science meets health! Maintaining the natural goodness of the products and the quality, we have temperature controlled units adhering to the highest quality standards."
  },
  {
    title: "Quality checks and certifications",
    description: "We comply with FSSAI norms and certifications at every step and our premium quality meat and seafood is HALAL-certified, recognised globally."
  },
  {
    title: "Freshness delivered right at your doors",
    description: "We take extra care in delivering fresh meat and seafood delivered to your doorstep in the quickest time possible."
  }
];

const HowItWorks = () => {
  return (
    <div className="how-it-works">
      <h2>How Bharakath Mutton Curry Shop Does It?</h2>
      <div className="steps">
        {steps.map((step, index) => (
          <div key={index} className="step-card">
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
