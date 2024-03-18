"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import request from "@/app/libs/request";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../inputs/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../Button";

interface SettingsModalProps {
  currentUser: User;
  isOpen?: boolean;
  onClose: () => void;
}

function SettingsModal({ currentUser, isOpen, onClose }: SettingsModalProps) {
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
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    request
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("用户信息修改失败"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              个人资料
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              编辑您的公开信息
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isLoading}
                label="网名"
                id="name"
                errors={errors}
                required
                register={register}
              />
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  头像
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    width={48}
                    height={48}
                    className="rounded-full"
                    src={
                      image ||
                      currentUser?.image ||
                      "/images/userDefaultAvatar.png"
                    }
                    priority
                    alt="user avatar"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onSuccess={handleUpload}
                    uploadPreset="nt7ebijn"
                  >
                    <Button disabled={isLoading} type="button" secondary>
                      更换头像
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button disabled={isLoading} secondary onClick={onClose}>
              取消
            </Button>
            <Button disabled={isLoading} type="submit">
              保存
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default SettingsModal;
