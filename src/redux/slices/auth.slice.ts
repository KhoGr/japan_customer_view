/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import userApi from '../../api/userApi';
import { RegisterLocalRequest, postLoginRequest, getMeResponse } from '../../types/User';
import { fetchCustomerByUserId } from './customer.slice'; // ⬅️ Gọi sang slice customer nếu cần

export interface CustomerInfo {
  customer_id: number;
  vip_id: number;
  loyalty_point: number;
  total_spent: number;
}

export interface UserProfile {
  email: string;
  id: number;
  account_id: number;
  name: string;
  username: string;
  avatar: string | null;
  phone: string | null;
  address: string;
  role: string;
  created_at: string;
  updated_at: string;
  customer?: CustomerInfo | null; 
}

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

// Đăng ký
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterLocalRequest, { rejectWithValue }) => {
    try {
      const response = await userApi.register(userData);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || 'Đăng ký thất bại');
    }
  }
);

// Đăng nhập + lấy thông tin user qua getMe
export const loginUser = createAsyncThunk(
  'auth/login',
  async (loginData: postLoginRequest, { dispatch, rejectWithValue }) => {
    try {
      const response = await userApi.login(loginData);
      const { token, expires } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('tokenExpires', expires);

      const meRes = await userApi.getMe();
      const user = meRes.data.user;

 

      return { token, user };
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || 'Đăng nhập thất bại');
    }
  }
);

// Lấy lại user (ví dụ khi reload trang)
export const getMe = createAsyncThunk(
  'auth/getMe',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await userApi.getMe();
      const user = response.data.user as UserProfile;

      // if (user?.customer?.customer_id) {
      //   dispatch(fetchCustomerByUserId(user.customer.customer_id));
      // }

      return user;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || 'Không thể lấy thông tin người dùng');
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpires');
    },
  },
  extraReducers: (builder) => {
    builder
      // Đăng ký
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // Có thể nhận user từ payload nếu BE trả về
        state.user = (action.payload as any)?.user ?? null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Đăng nhập
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
          console.log('🔐 [loginUser.fulfilled] user payload:', action.payload.user); // 👈 thêm dòng này

        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // getMe
      .addCase(getMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
          console.log('🙋‍♂️ [getMe.fulfilled] user payload:', action.payload); // 👈 thêm dòng này

        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpires');
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
