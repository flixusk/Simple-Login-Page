import React, { useState } from 'react';

const Login = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log(formData);
    let responseData;
    await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  const sign_up = async () => {
    console.log("Signup function executed", formData);
    try {
      const responseData = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then((response) => response.json());

      console.log('Response Data:', responseData);

      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while signing up. Please try again.');
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-stone-900">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-stone-900 text-2xl font-semibold mb-6">{state}</h3>
        <div className="space-y-4">
          {state === "Sign Up" && (
            <input
              name="name"
              value={formData.name}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="text"
            placeholder="Email"
            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <button
          onClick={() => (state === "Login" ? login() : sign_up())}
          className="w-full mt-6 bg-red-500 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Continue
        </button>
        <p className="mt-4 text-center text-stone-900">
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-red-500 underline cursor-pointer"
              >
                Login
              </span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-red-500 underline cursor-pointer"
              >
                Register
              </span>{" "}
              Here
            </>
          )}
        </p>
        <div className="flex items-center mt-6 space-x-2">
          <input type="checkbox" id="terms" className="form-checkbox" />
          <label htmlFor="terms" className="text-sm text-stone-600">
            By continuing, I agree to the terms of use & privacy policy.
          </label>
        </div>
      </div>
    </section>
  );
};

export default Login;
