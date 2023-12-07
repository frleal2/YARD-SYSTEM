// src/ProcessList.js
import React from 'react';

const steps = [
  "Gather Your Car's Information",
  "Determine a Selling Price",
  "Prepare Your Car",
  "Create an Online Listing",
  "Write a Compelling Description",
  "Respond to Inquiries",
  "Negotiate and Finalize the Deal",
  "Transfer Ownership",
  "Receive Payment",
  "Remove License Plates and Cancel Insurance"
];

function ProcessList() {
  return (
    <div>
      <h2>Process to Sell Your Car</h2>
      <ol>
        {steps.map((step, index) => (
          <li key={index}>{`${index + 1}. ${step}`}</li>
        ))}
      </ol>
    </div>
    
  );
}

export default ProcessList;
