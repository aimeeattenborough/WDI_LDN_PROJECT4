import React from 'react';

import css from '../../assets/scss/components/tv.scss';


const TelV = () => {
  return (
    <main>
      <iframe id="ytplayer" type="text/html" width="65%" height="80%"
        src="https://www.youtube.com/embed/Jk71bPz5VLo?autoplay=1&modestbranding=1&origin=http://example.com"
        frameBorder="0">
      </iframe>
      <div className="tv-background">
      </div>
    </main>
  );
};

export default TelV;
