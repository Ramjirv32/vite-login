"use client"
import { useState, useEffect } from "react"
import { FaGoogle, FaApple, FaMicrosoft } from "react-icons/fa"
import AOS from "aos"
import "aos/dist/aos.css"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"
const dummyUser = {
  email: "user@example.com",
  password: "password123",
}

const MySwal = withReactContent(Swal)
export default function Login() {
  const [email, setEmail] = useState("user@example.com")
  const [password, setPassword] = useState("password123")
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    })
    MySwal.fire({
      title: "Welcome!",
      text: "Please log in to continue.",
      icon: "info",
      confirmButtonText: "Got it",
      confirmButtonColor: "#3B82F6",
      background: "#FFFFFF",
      customClass: {
        popup: "rounded-xl shadow-xl",
        title: "text-blue-600",
        content: "text-gray-700",
      },
    })
  }, [])
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({
        prompt: "select_account",
      })
      const result = await signInWithPopup(auth, provider)
      Swal.fire({
        icon: "success",
        title: "Google Sign-In Successful",
        text: `Welcome, ${result.user.displayName}!`,
        timer: 3000,
      })
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Google Sign-In Failed",
        text: error.message,
        timer: 3000,
      })
    }
  }

  const handleGitHubSignIn = async () => {
    try {
      const provider = new GithubAuthProvider()
      const result = await signInWithPopup(auth, provider)

      Swal.fire({
        icon: "success",
        title: "GitHub Sign-In Successful",
        text: `Welcome, ${result.user.displayName}!`,
        timer: 3000,
      })
    } catch (error) {
      console.error("GitHub Sign-In Error:", error)
      Swal.fire({
        icon: "error",
        title: "GitHub Sign-In Failed",
        text: getErrorMessage(error),
        timer: 3000,
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    MySwal.fire({
      title: "Success!",
      text: "You have successfully logged in.",
      icon: "success",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: "#FFFFFF",
      customClass: {
        popup: "rounded-xl shadow-xl",
        title: "text-green-600",
        content: "text-gray-700",
      },
    })
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl grid md:grid-cols-2 overflow-hidden"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
            alt="Login background"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-blue-600/40 backdrop-blur-sm" />
        </div>

        <div className="p-8 lg:p-12">
          <div className="max-w-md mx-auto space-y-8">
            <div data-aos="fade-left" data-aos-delay="200">
              <h1 className="text-3xl font-bold text-blue-600 animate-fade-in">Welcome Back</h1>
              <p className="text-gray-500 mt-2">Please sign in to continue</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6" data-aos="fade-up" data-aos-delay="300">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    defaultValue="user@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    defaultValue="password123"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Sign in
              </button>
            </form>
            <div data-aos="fade-up" data-aos-delay="400">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              <div className="mt-6 flex flex-col space-y-3">
                <button
                  onClick={handleGoogleSignIn}
                  className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 w-full"
                >
                  <FaGoogle className="h-5 w-5 text-gray-600 mr-2" />
                  <span>Continue with Google</span>
                </button>
                <button
                  onClick={handleGitHubSignIn}
                  className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 w-full"
                >
                  <FaMicrosoft className="h-5 w-5 text-gray-600 mr-2" />
                  <span>Continue with Github</span>
                </button>
                <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 w-full">
                  <FaApple className="h-5 w-5 text-gray-600 mr-2" />
                  <span>Continue with Apple</span>
                </button>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600" data-aos="fade-up" data-aos-delay="800">
              Don't have an account?{" "}
              <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

