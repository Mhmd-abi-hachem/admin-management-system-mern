import { createPortal } from "react-dom";

import styles from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  const content = (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        <div>{children}</div>
      </div>
    </div>
  );
  return createPortal(content, document.getElementById("modal-hook")!);
}

export default Modal;
