import React, { useState, useEffect } from 'react';

import useTwitch from '../../twitch';
import { getUserInfo, recentPlayed, getImageUrl } from '../../lib';

import Spinner from '../Spinner';
import User from '../User';

import './styles.css';

export default () => {
  const [user, setUser] = useState(null);
  const [tracks, setTracks] = useState(null);

  const { config } = useTwitch('config');

  useEffect(() => {
    if (config && config.username && config.key) {
      if (!user) {
        getUserInfo(config, setUser);
      }
      recentPlayed(config, setTracks);
    }
  }, [config]);
  return (
    <div className="panel-layout">
      {!tracks ? (
        <div style={{ paddingTop: '200px' }}>
          <Spinner />
        </div>
      ) : (
        <div>
          <User user={user} />
          <ul>
            {tracks.map(v => (
              <li
                key={`${v.mbid}-${v.date ? v.date.uts : 'now'}`}
                className={!v.date ? 'track-played' : ''}
              >
                <img src={getImageUrl(v.image)} />
                <a target="_blank" href={v.url}>
                  {v.artist['#text']} - {v.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
