"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import request from "@/app/libs/request";
import toast from "react-hot-toast";
import Modal from "@/app/components/Modal";
import Input from "@/app/components/inputs/input";
import Select from "@/app/components/inputs/Select";
import Button from "@/app/components/Button";

interface GroupChatModalProps {
  users: User[];
  isOpen?: boolean;
  onClose: () => void;
}

function GroupChatModal({ users, isOpen, onClose }: GroupChatModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    request
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("创建群聊失败"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              创建群聊
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              创建群聊需要至少2名成员
            </p>
            <div className="mt-6 flex flex-col gap-y-8">
              <Input
                register={register}
                label="群名"
                id="name"
                disabled={isLoading}
                required
                errors={errors}
              />
              <Select
                disabled={isLoading}
                label="群成员"
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value) =>
                  setValue("members", value, {
                    shouldValidate: true,
                  })
                }
                value={members}
              />
            </div>
          </div>
          <div className="mt-2 flex justify-end items-center gap-x-6">
            <Button
              disabled={isLoading}
              onClick={onClose}
              type="button"
              secondary
            >
              取消
            </Button>
            <Button
              disabled={isLoading}
              type="submit"
            >
              创建
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default GroupChatModal;
