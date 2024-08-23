import axiosInstance from './axios';
import { useSetRecoilState } from 'recoil';
import { authState } from '../atoms/atomauth';
import axios from 'axios';
export const register = async (userData: any) => {
  try {
    const response = await axiosInstance.post('customer/signup', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// export const login = async (credentials: any) => {
//   try {
//     const response = await axiosInstance.post('customer/login', credentials);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
const login = async (email: string, password: string) => {
  try {
    const response = await axios.post("/api/login", { email, password });
    const token = response.data.token;

    //  const token = response.data.token;
    const user = response.data.user;

    const setAuthState = useSetRecoilState(authState);

    setAuthState((prevState) => ({
      ...prevState,
      isAuthenticated: true,
      user,
      token,
    }));

    localStorage.setItem("token", token);
  } catch (error) {
    console.error("Login failed", error);
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post('customer/logout');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const googleAuthSignIn = async (tokenId: string) => {
  try {
    const response = await axiosInstance.post('customer/google', { tokenId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    const response = await axiosInstance.get(`customer/findbyemail?email=${email}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const verifyOtp = async (otp:any) => {
  try {
    const response = await axiosInstance.post('customer/verifyotp', { otp });
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const resetPassword = async (passwordData: any) => {
  try {
    const response = await axiosInstance.put('customer/forgotpassword', passwordData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const adminregister = async (userData: any) => {
  try {
    const response = await axiosInstance.post('admin/signup', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const adminlogin = async (credentials: any) => {
  try {
    const response = await axiosInstance.post('admin/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const adminlogout = async () => {
  try {
    const response = await axiosInstance.post('admin/logout');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const admingoogleAuthSignIn = async (tokenId: string) => {
  try {
    const response = await axiosInstance.post('admin/google', { tokenId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findadminByEmail = async (email: string) => {
  try {
    const response = await axiosInstance.get(`admin/findbyemail?email=${email}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const adminverifyOtp = async (otp: string) => {
  try {
    const response = await axiosInstance.post('admin/verifyotp', { otp });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const managerregister = async (userData: any) => {
  try {
    const response = await axiosInstance.post('manager/signup', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const managerlogin = async (credentials: any) => {
  try {
    const response = await axiosInstance.post('manager/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const managerlogout = async () => {
  try {
    const response = await axiosInstance.post('manager/logout');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const madnagergoogleAuthSignIn = async (tokenId: string) => {
  try {
    const response = await axiosInstance.post('manager/google', { tokenId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const managerfindUserByEmail = async (email: string) => {
  try {
    const response = await axiosInstance.get(`manger/findbyemail?email=${email}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const managerverifyOtp = async (otp: string) => {
  try {
    const response = await axiosInstance.post('manager/verifyotp', { otp });
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const managerresetPassword = async (passwordData: any) => {
  try {
    const response = await axiosInstance.put('manager/forgotpassword', passwordData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const adminresetPassword = async (passwordData: any) => {
  try {
    const response = await axiosInstance.put('admin/forgotpassword', passwordData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
