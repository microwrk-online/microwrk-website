import React, { useEffect, useRef } from "react";

const GoogleAd = () => {
  const adRef = useRef(null);

  useEffect(() => {
    const adElem = adRef.current;

    if (!adElem) return;

    const handle = setTimeout(() => {
      try {
        if (adElem.getAttribute("data-adsbygoogle-status") !== "done") {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }, 500); // Delay to ensure element is mounted and sized

    return () => clearTimeout(handle);
  }, []);

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          minWidth: 250,
          width: "100%",
          height: "100px",
        }}
        data-ad-client="ca-pub-8447659428403971"
        data-ad-slot="7143904524"
        data-ad-format="fluid"
        data-ad-layout-key="-f7+6b-2g-5t+jt"
        ref={adRef}
      />
    </>
  );
};

export default GoogleAd;
