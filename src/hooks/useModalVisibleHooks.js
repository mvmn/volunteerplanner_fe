import { useCallback, useState } from 'react';

export const useModalVisibleHook = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const onCloseHandler = useCallback(() => setModalVisible(false), []);
  const onOpenHandler = useCallback(() => setModalVisible(true), []);

  return { isModalVisible, onCloseHandler, onOpenHandler };
};
