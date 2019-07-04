import React, {
  createContext,
  useLayoutEffect,
  useContext,
  useState,
  useMemo
} from 'react';

const twitch = window.Twitch ? window.Twitch.ext : null;

export default function useTwitch() {
  const keys = [].slice.call(arguments);
  const defaultProp = {
    twitch,
    isReady: false,
    config: {},
    saveConfig: (type = 'broadcaster', data) =>
      twitch.configuration.set(type, '', JSON.stringify(data))
  };
  const [prop, changeProp] = useState(defaultProp);

  let mounted = false;

  useLayoutEffect(() => {
    mounted = true;
    twitch.onAuthorized(() => {
      prop.isReady = true;
      if (mounted) {
        changeProp({ ...prop });
      }
    });
    if (keys.includes('config')) {
      twitch.configuration.onChanged(() => {
        if (twitch.configuration.broadcaster) {
          try {
            const config = JSON.parse(twitch.configuration.broadcaster.content);
            prop.config = config;
            if (mounted) {
              changeProp({ ...prop });
            }
          } catch (error) {
            console.log('config not parsed', error);
          }
        }
      });
    }
    return () => (mounted = false);
  }, []);

  return useMemo(() => {
    const data = {};
    keys.forEach(key => {
      if (key in prop) {
        data[key] = prop[key];
      }
    });
    return data;
  }, [prop]);
}
