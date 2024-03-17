import { FaEarlybirds } from "react-icons/fa";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <div className="w-10 h-10 text-center">
          <FaEarlybirds className="w-full h-full text-sky-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          欢迎回来，畅快聊天
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
