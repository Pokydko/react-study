import css from "./ImageCard.module.css";

const ImageCard = ({
  viewInModal,
  photo: { user, urls, description, alt_description },
}) => {
  const handleClickOnImage = (e) => {
    e.preventDefault();
    viewInModal({
      href: urls.regular,
      description: description,
      name: user.name,
    });
  };

  return (
    <div className={css.item}>
      <a
        href={urls.regular}
        className={css.imageLink}
        onClick={handleClickOnImage}
      >
        <img src={urls.small} alt={alt_description} className={css.image} />
      </a>
      <a
        href={`https://unsplash.com/@${user.username}`}
        target="_blank"
        rel="noreferrer"
        className={css.author}
      >
        <img
          src={user.profile_image.small}
          alt={user.name}
          className={css.avatar}
        />
        <span className={css.authorName}>{user.name}</span>
        <span className={css.description}>{alt_description}</span>
      </a>
    </div>
  );
};
export default ImageCard;
