import PropTypes from 'prop-types';
import FriendListItem from "../FriendListItem/FriendListItem"
import css from "./FriendList.module.css"

const FriendList = ({friends}) => (
  <ul className={css.FriendListUl}>
        {friends.map((friend) => {
        return <li key={ friend.id }><FriendListItem 
            avatar={ friend.avatar }
            name={ friend.name }
            isOnline={ friend.isOnline }
        /></li>})
        }
  </ul>
);

FriendList.propTypes = {
  friends: PropTypes.array.isRequired,
};

export default FriendList;