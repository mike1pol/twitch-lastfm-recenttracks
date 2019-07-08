export function getUserInfo(config, setUser) {
  fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${
      config.username
    }&api_key=${config.key}&format=json`
  )
    .then(r => r.json())
    .then(({ user }) => setUser(user))
    .catch(err => console.error('getUserInfo error:', err));
}

export function recentPlayed(config, setTracks) {
  fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${
      config.username
    }&api_key=${config.key}&format=json`
  )
    .then(r => r.json())
    .then(({ recenttracks: { track } }) => {
      setTracks(track);
      setTimeout(() => recentPlayed(config, setTracks), 1000 * 10);
    })
    .catch(err => {
      console.error('recentPlayed error:', err);
      setTimeout(() => recentPlayed(config, setTracks), 1000 * 10);
    });
}

export function getImageUrl(list, size = 'small') {
  if (list.length === 0) {
    return null;
  }
  const b = list.find(v => v.size === 'small');
  if (!b) {
    return list[0]['#text'];
  }
  return b['#text'];
}
