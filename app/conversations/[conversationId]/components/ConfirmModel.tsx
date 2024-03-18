"use client";

import useConversation from "@/app/hooks/useConversation";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import request from "@/app/libs/request";
import toast from "react-hot-toast";
import Modal from "@/app/components/Modal";
import { FiAlertTriangle } from "react-icons/fi";
import { Dialog } from "@headlessui/react";
import Button from "@/app/components/Button";

interface ConfirmModelProps {
  isOpen?: boolean;
  onClose: () => void;
}

function ConfirmModel({ isOpen, onClose }: ConfirmModelProps) {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(() => {
    setIsLoading(true);

    request
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push("/conversations");
        router.refresh();
      })
      .catch(() => toast.error("删除出错"))
      .finally(() => setIsLoading(false));
  }, [conversationId, router, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 justify-center">
          <FiAlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            删除对话
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              确定删除你们之间的对话吗？(此操作不可逆)
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button disabled={isLoading} danger onClick={onDelete}>
          删除
        </Button>
        <Button disabled={isLoading} secondary onClick={onClose}>
          取消
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmModel;
