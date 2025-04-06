import React, { useEffect, useState } from "react";

const GoogleAd = () => {
  const [isAdVisible, setIsAdVisible] = useState(false);

  useEffect(() => {
    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsAdVisible(true); // Load the ad when it comes into view
          observer.unobserve(entry.target); // Stop observing once loaded
        }
      });
    };

    // Set up Intersection Observer to detect when the ad is in view
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "200px", // Load the ad before it's fully in view for a smooth experience
    });

    const adElement = document.getElementById("google-ad");
    if (adElement) {
      observer.observe(adElement);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Dynamically load the AdScript once the ad is visible
  useEffect(() => {
    if (isAdVisible) {
      try {
        const script = document.createElement("script");
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8447659428403971";
        script.async = true;
        script.crossOrigin = "anonymous";
        script.onload = () => {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        };
        document.body.appendChild(script);
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, [isAdVisible]);

  return (
    <div id="google-ad" className="ad-container">
      {isAdVisible && (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-8447659428403971"
          data-ad-slot="4325335342"
          data-ad-format="auto"
          data-full-width-responsive="false"
        ></ins>
      )}
    </div>
  );
};

export default GoogleAd;
