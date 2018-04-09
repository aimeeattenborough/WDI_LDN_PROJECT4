import React from 'react';

import css from '../../assets/scss/components/tv.scss';


const TelV = () => {
  return (
    <main className="tv-background">
      <div className="tv">
        <iframe id="ytplayer" type="text/html" width="922" height="680"
        src="https://www.youtube.com/embed/Jk71bPz5VLo?autoplay=1&modestbranding=1&origin=http://example.com"
        frameborder="0">
        </iframe>
      </div>
    </main>
  )
}

export default TelV;
