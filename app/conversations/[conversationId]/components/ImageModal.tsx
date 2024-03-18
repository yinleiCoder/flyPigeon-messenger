"use client";

import Modal from "@/app/components/Modal";
import Image from "next/image";

interface ImageModalProps {
  src?: string | null;
  isOpen?: boolean;
  onClose: () => void;
}

function ImageModal({ src, isOpen, onClose }: ImageModalProps) {
  if (!src) {
    return null;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image alt={src} src={src} className="object-cover" fill />
      </div>
    </Modal>
  );
}

export default ImageModal;
