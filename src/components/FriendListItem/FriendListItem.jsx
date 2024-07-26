import PropTypes from 'prop-types';
import css from "./FriendListItem.module.css";
import clsx from "clsx";

const FriendListItem = ({ avatar, name, isOnline }) => {
  return <div className={ css.FriendListItem }>
      <img src={ avatar } alt="Avatar" width="48" />
      <p className={ css.name }>{ name }</p>
      <p className={ clsx(css.onlineStatus, isOnline && css.online) }>{ isOnline ? 'Online' : 'Offline' }</p>
  </div>
}

FriendListItem.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isOnline: PropTypes.bool.isRequired,
};

export default FriendListItem;