import "./ImageModal.css";
import Modal from "react-modal";

const ImageModal = ({ isOpen, onClose, children: { href, description } }) => {
  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="modalBackdrop"
      className="modalContent"
      ariaHideApp={false}
      closeTimeoutMS={500}
      onRequestClose={() => onClose()}
    >
      <div className="pictureWrapper">
        <img src={href} alt={description} className="picture" />

        <span className="aboutPicture">{description}</span>
      </div>
      <button
        onClick={onClose}
        aria-label="modal window close button"
        className="modalCloseBtn"
      >
        &times;
      </button>
    </Modal>
  );
};
export default ImageModal;
