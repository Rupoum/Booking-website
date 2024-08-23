"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { authState } from "./atoms/atomauth";

const Login = () => {
  const [formdata, setFormdata] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [auth, setAuth] = useRecoilState(authState);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from refreshing the page on submit
    setLoading(true);
    setError("");

    const login = { email: formdata.email, password: formdata.password };

    try {
      const response = await axios.post("http://localhost:5000/api/admin/login", login);

      if (response.status === 200) {
        const { token, user } = response.data;
            //  console.log(token,user);
        setAuth({
          isAuthenticated: true,
          user,
          token,
          role:"sd"
        });
        localStorage.setItem('authtoken', token);
      console.log(user.role);
        router.push('/');
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (error) {
      setError("Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (auth.isAuthenticated) return <div>You are already logged in</div>;

  return (
    <div className="mt-24 rounded-xl bg-black/80 py-10 px-6 md:mt-0 md:max-w-sm md:px-14">
      <form onSubmit={handleLogin}>
        <div className="flex justify-center">
          <h1 className="text-3xl font-semibold text-white">Login</h1>
        </div>
        <div className="space-y-4 mt-5">
          <Input
            type="email"
            name="email"
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
            className="bg-[#e50914] text-black w-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      <div className="text-gray-500 text-sm mt-2">
        Don't have an account?
        <Link href="/signup" className="text-white ml-1 hover:underline">
          Sign up now!
        </Link>
      </div>
    </div>
  );
};

export default Login;
