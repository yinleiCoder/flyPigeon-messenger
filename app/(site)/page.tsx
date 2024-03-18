import { FaEarlybirds } from "react-icons/fa";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <FaEarlybirds size={40} color="rgb(14, 165, 233)" />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          欢迎回来，畅快聊天
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
