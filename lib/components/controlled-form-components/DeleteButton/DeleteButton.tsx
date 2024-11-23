import { XMarkIcon } from '@heroicons/react/16/solid';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import clsx from 'clsx';
import { useAction } from 'next-safe-action/hooks';
import { useEffect } from 'react';
import type { InferSafeActionFnResult } from 'next-safe-action';
import { DeleteActionFn } from 'msps/lib/validation/DeleteActionSchema';
import toast from 'react-hot-toast';

interface DeleteButtonProps<T extends DeleteActionFn> {
  id: number;
  className?: string;
  onDelete?: () => void;
  deleteAction: T;
}

const DeleteButton = <T extends DeleteActionFn>({ className, onDelete, deleteAction, id }: DeleteButtonProps<T>) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { execute, result, isExecuting } = useAction(deleteAction);
  useEffect(() => {
    console.log('Result: ', result as InferSafeActionFnResult<T>);
    // console.log('result: ', result);
    if (result.data) {
      onClose();
      onDelete?.();
    } else if (result.serverError) {
      toast.error(`შეცდომა: ${result.serverError || ''}`);
    }
  }, [result, onDelete, onClose]);

  const onExecuteHandler = () => {
    execute({ id });
  };

  return (
    <>
      <div className={clsx('mx-auto md:flex-none w-full', className)}>
        <div className="flex justify-end mt-2">
          <Button color="danger" variant="bordered" type="button" isIconOnly onPress={onOpen}>
            <XMarkIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onClose={onClose}
        isKeyboardDismissDisabled={isExecuting}
        isDismissable={isExecuting}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">დარწმუნებული ხართ?</ModalHeader>
              <ModalBody>ჩანაწერი წაიშლება სამუდამოდ.</ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose} isDisabled={isExecuting}>
                  დახურვა
                </Button>
                <Button color="danger" onPress={onExecuteHandler} isLoading={isExecuting}>
                  ჩანაწერის წაშლა
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteButton;
