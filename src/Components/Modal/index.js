import React, { memo } from 'react';
import './styles.scss';

const Modal = ({ modalHeader, modalContent, modalFooter, modalClass, onCancel, canCloseFromOverlay, hasFooter, hasHeader, hideCancel }) => {
    const closeFromOverlay = () => {
        if (canCloseFromOverlay) {
            onCancel();
        }
    };

    const getContent = () => <div className="modalContent">{modalContent}</div>;

    const getFooter = () => {
        if (hasFooter) {
            return <div className="modalFooter">{modalFooter}</div>;
        }

        return null;
    };

    return (
        <div className="modal">
            <div className={`modalInnerContent ${modalClass}`}>
                {hasHeader && (
                    <div className="modalHeader">
                        <div className="modalTitle">{modalHeader}</div>
                        {!hideCancel && (
                            <button type="button" onClick={onCancel} className="close">
                                x
                            </button>
                        )}
                    </div>
                )}
                {getContent()}
                {getFooter()}
            </div>
            <span role="button" tabIndex={0} className="backdropOverlay" onClick={closeFromOverlay} />
        </div>
    );
};

Modal.defaultProps = {
    canCloseFromOverlay: true,
    hasFooter: true,
    hasHeader: true,
    hideCancel: false,
    modalClass: '',
};

export default memo(Modal);