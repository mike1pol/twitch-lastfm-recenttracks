import React, { useState, useEffect } from 'react';

import useTwitch from '../../twitch';

import './styles.css';

export default () => {
  const [sp, setSP] = useState(false);
  const { config, isReady, saveConfig } = useTwitch(
    'config',
    'isReady',
    'saveConfig'
  );
  return (
    <div className="config-layout">
      <div className="config-logo">
        <img
          className="logo"
          src="https://www.last.fm/static/images/logo_static.png"
        />
      </div>
      <div className="config-form pure-form pure-form-stacked">
        <label htmlFor="config-key">API key:</label>
        <div style={{ position: 'relative' }}>
          <input
            id="config-key"
            type={sp ? 'text' : 'password'}
            defaultValue={config.key || null}
            onChange={e => setConfig({ ...config, key: e.target.value })}
          />
          <button onClick={() => setSP(!sp)} className="action-button">
            {sp ? '-' : '+'}
          </button>
        </div>
        <div className="pure-form-message">
          Create API key{' '}
          <a target="_blank" href="https://www.last.fm/api/account/create">
            https://www.last.fm/api/account/create
          </a>
        </div>
        <label htmlFor="config-username">Login:</label>
        <input
          id="config-username"
          type="text"
          defaultValue={config.username || null}
          onChange={e => setConfig({ ...config, username: e.target.value })}
        />
        <div style={{ textAlign: 'center' }}>
          <button
            className="pure-button pure-button-primary"
            onClick={() => saveConfig('broadcaster', config)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
