import css from "./Profile.module.css";

const Profile = ({ name, tag, location, image, stats }) => {
  return <div className={ css.card }>
  <div className={ css.topOfCard }>
    <img
      className={ css.avatar }
      src={ image }
      alt="User avatar"
    />
    <p className={ css.name }>{ name }</p>
    <p className={ css.underName }>@{ tag }</p>
    <p className={ css.underName }>{ location }</p>
  </div>

  <ul className={ css.stats }>
    <li>
      <span>Followers</span>
      <span className={ css.statsCount }>{ stats.followers }</span>
    </li>
    <li>
      <span>Views</span>
      <span className={ css.statsCount }>{ stats.views }</span>
    </li>
    <li>
      <span>Likes</span>
      <span className={ css.statsCount }>{ stats.likes }</span>
    </li>
  </ul>
</div>
}
export default Profile;