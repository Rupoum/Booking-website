"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { register } from "./axios/mainaxios";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { authState } from "./atoms/atomauth";
import { user } from "@nextui-org/theme";

const Signup = () => {
  // State variables to handle form input, loading, and error states
  const [formdata, setFormdata] = useState({ email: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [auth, setAuth] = useRecoilState(authState);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const signupData = {
      name: formdata.name,
      email: formdata.email,
      password: formdata.password,
      // reason: "ds" // Include any additional parameters you need
  };

    try {
      const response = await axios.post("http://localhost:5000/api/admin/signup",signupData)
      const USer=response.data.user;
      if (response.status === 200) {
        setAuth({
          isAuthenticated: true, 
          user: response.data.user,
          token:null,
        //  role:USer.role
        role:"a"
        });
        // Redirect to OTP verification pages
        router.push('/admin/otp');
        localStorage.setItem('tempUserData', JSON.stringify(signupData));
      } else {
        setError(response.data.message || "Signup failed. Please try again.");
      }
      setError("Please try again later.");
        console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (auth?.isAuthenticated) return <div>You are already Signed in</div>;

  return (
    <div className="mt-24 rounded-xl bg-black/80 py-10 px-6 md:mt-0 md:max-w-sm md:px-14">
      <form action="" onSubmit={handleSignup}>
        <div className="flex justify-center">
          <h1 className="text-3xl font-semibold text-white ">Signup</h1>
        </div>
        <div className="space-y-4 mt-5">
          <Input
            type="name"
            name="name "
            value={formdata.name}
            onChange={(e) => setFormdata({ ...formdata, name: e.target.value })}
            placeholder="Name"
            className="bg-[#333] placeholder:text-xs text-white placeholder:text-gray-400 w-full inline-block"
            required
            disabled={loading}
         />
          <Input
            type="email"
            name="email "
            placeholder="Email"
            value={formdata.email}
            onChange={(e) => setFormdata({ ...formdata, email: e.target.value })}
            required
            disabled={loading}
            className="bg-[#333] placeholder:text-xs text-white placeholder:text-gray-400 w-full inline-block"
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formdata.password}
            onChange={(e) => setFormdata({ ...formdata, password: e.target.value })}
            className="bg-[#333] placeholder:text-xs text-white placeholder:text-gray-400 w-full inline-block"
            required
            disabled={loading}
          />

          <Button
           type="submit"
            variant="destructive"
            className="bg-[#e50914] text-black w-full "
            disabled={loading}
         >
 {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      <div className="text-gray-500 text-sm mt-2">
        Already have an account ?
        <Link href="/login" className="text-white  ml-1 hover:underline">
          Log in now !
        </Link>
      </div>
    </div>
  );
};

export default Signup;
