import React from 'react';

/**
 * PhoneNumber component that ensures phone numbers display correctly in RTL languages
 * 
 * @param {Object} props
 * @param {string} props.number - The phone number to display
 * @param {string} [props.className] - Optional CSS class name
 * @param {boolean} [props.isLink=false] - Whether to render as a clickable tel: link
 * @returns {JSX.Element}
 */
function PhoneNumber({ number, className = "", isLink = false }) {
  const phoneStyles = {
    direction: 'ltr',
    unicodeBidi: 'isolate',
    display: 'inline-block'
  };

  if (isLink) {
    const href = `tel:${number.replace(/\s+/g, '')}`;
    return (
      <a 
        href={href}
        className={className}
        dir="ltr"
        style={phoneStyles}
      >
        {number}
      </a>
    );
  }

  return (
    <span
      dir="ltr"
      style={phoneStyles}
      className={className}
    >
      {number}
    </span>
  );
}

export default PhoneNumber;
