import { CloseOutlined } from '@ant-design/icons';
import type { ModalProps } from 'antd';
import { Modal as AntModal, Button } from 'antd';
import type { PropsWithChildren, ReactElement } from 'react';
import { cloneElement, createContext, useContext, useState } from 'react';

type ModalContextType = {
  openName: string | null;
  showModal: (name: string) => void;
  hideModal: () => void;
};

const ModalContext = createContext<ModalContextType>({
  openName: null,
  showModal: () => {},
  hideModal: () => {},
});

const ModalOpens = (props: { opens: string; children: ReactElement }) => {
  const { opens, children } = props;
  const { showModal } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => showModal(opens) });
};
const ModalWindow = (props: { children: ReactElement; name: string; modalProps?: ModalProps }) => {
  const { name, children, modalProps = {} } = props;
  const { openName, hideModal } = useContext(ModalContext);

  const modalStyles: ModalProps['styles'] = {
    content: { padding: 0 },
    body: { padding: 12 },
  };

  const open = openName === name && openName !== null;

  const titleContent = (
    <div className='flex items-center justify-between gap-2 rounded-t-md p-2'>
      <span className='text-ms font-semibold'>{modalProps.title}</span>
      <Button type='text' icon={<CloseOutlined />} onClick={hideModal} />
    </div>
  );

  return (
    <AntModal
      {...modalProps}
      destroyOnClose
      title={titleContent}
      open={open}
      onCancel={hideModal}
      footer={null}
      styles={modalStyles}
      closable={false}
    >
      {cloneElement(children, { onCloseModal: hideModal })}
    </AntModal>
  );
};

const Modal = ({ children }: PropsWithChildren) => {
  const [openName, setOpenName] = useState<string | null>(null);

  const showModal = (name: string) => {
    setOpenName(name);
  };
  const hideModal = () => setOpenName(null);

  const value = {
    openName,
    showModal,
    hideModal,
  };
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

Modal.Opens = ModalOpens;
Modal.Window = ModalWindow;

export default Modal;
