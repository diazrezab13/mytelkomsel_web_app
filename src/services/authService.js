// src/services/authService.js
export const login = async (phone) => {
  try {
    const response = await fetch('http://localhost:8081/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });

    const result = await response.json();

    if (response.status !== 200) {
      throw new Error(result.message);
    }

    return result;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const verifyOtp = async (phone, otpCode) => {
  try {
    const response = await fetch('http://localhost:8081/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otpCode })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    return result.data;
  } catch (error) {
    console.error("Verify OTP error:", error);
    throw error;
  }
};