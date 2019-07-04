import React from 'react';

import { getImageUrl } from '../../lib';

import './styles.css';

export default ({ user }) => {
  if (!user) {
    return null;
  }
  const avatar = getImageUrl(user.image, 'small');
  return (
    <div className="user">
      <div>
        <img className="user-avatar" src={avatar}/>
        <div className="user-name">
          {user.realname && <div>{user.realname}</div>}
          <a target="_blank" href={user.url}>{user.name}</a>
        </div>
      </div>
      <img className="user-logo" src="https://www.last.fm/static/images/logo_static.png"/>
    </div>
  )
}
