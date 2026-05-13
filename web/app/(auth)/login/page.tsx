import React from 'react'
import { LoginForm } from '../_components/login-form'
import Image from 'next/image'
import authBg from '../../../public/assets/images/auth-bg.png'

const page = () => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#050505] overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute -right-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-orange-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute -left-[5%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-zinc-900/30 blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 w-full">
        <LoginForm />
      </div>
    </div>
  );
};

export default page