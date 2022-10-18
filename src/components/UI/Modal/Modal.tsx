import { FC, ReactNode } from 'react';
import cl from './Modal.module.css';

interface ModalProps {
    children: ReactNode;
    visible: boolean;
    setVisible: (b: boolean) => void;
}

const Modal: FC<ModalProps> = ({children, visible, setVisible}) => {

    const rootClasses = [cl.myModal];
    if (visible) {
        rootClasses.push(cl.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.myModalContent} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;