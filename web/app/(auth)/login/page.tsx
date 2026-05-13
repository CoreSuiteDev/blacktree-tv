import Image from "next/image";
import authBg from "../../../public/assets/images/auth-bg.png";
import { LoginForm } from "../_components/login-form";

const page = () => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={authBg}
          alt="background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
      </div>

      {/* Subtle Background Glows for depth */}
      <div className="absolute right-[-10%] top-[-10%] h-[600px] w-[600px] rounded-full bg-orange-950/20 blur-[120px] pointer-events-none z-1" />
      <div className="absolute left-[-5%] bottom-[10%] h-[500px] w-[500px] rounded-full bg-zinc-900/40 blur-[120px] pointer-events-none z-1" />

      <div className="relative z-10 w-full">
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
