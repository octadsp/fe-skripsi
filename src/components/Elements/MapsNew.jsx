import React from "react";

const GoogleMapsComponent = () => {
  return (
    <div className="h-full ">
      <iframe
        className="w-full h-full rounded-lg "
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.021236029791!2d106.62600897499068!3d-6.260932793727669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fd57d765bbc7%3A0x2ed92dc35ad31e27!2sGuns%20Paint%20Body%20Repair!5e0!3m2!1sen!2sid!4v1704255138801!5m2!1sen!2sid"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoogleMapsComponent;
