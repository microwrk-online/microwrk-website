import React, { useEffect } from "react";

const GoogleAd = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className="ad-container">
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8447659428403971"
        crossOrigin="anonymous"
      ></script>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8447659428403971"
        data-ad-slot="4325335342"
        data-ad-format="auto"
        data-full-width-responsive="false"
      ></ins>
    </div>
  );
};

export default GoogleAd;
