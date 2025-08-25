import { Helmet } from 'react-helmet-async';
import useFacebookPixel from '@/hooks/useFacebookPixel';

const FACEBOOK_PIXEL_ID = import.meta.env.VITE_FACEBOOK_PIXEL_ID;

function FacebookPixel() {
  // Initialize Facebook Pixel
  useFacebookPixel();

  // Don't render script if no Pixel ID is available
  if (!FACEBOOK_PIXEL_ID) {
    console.warn('Facebook Pixel ID not found - Facebook Pixel not loaded');
    return null;
  }

  return (
    <Helmet>
      {/* Meta Pixel Code */}
      <script>
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${FACEBOOK_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </script>
      <noscript>
        <img 
          height="1" 
          width="1" 
          style={{display: 'none'}}
          src={`https://www.facebook.com/tr?id=${FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </Helmet>
  );
}

export default FacebookPixel;
