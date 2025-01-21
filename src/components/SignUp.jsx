const dummyUsers = []
import { useState, useEffect } from "react"
import { FaGoogle, FaApple, FaMicrosoft, FaGithub } from "react-icons/fa"
import AOS from "aos"
import "aos/dist/aos.css"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, GithubAuthProvider } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"
const MySwal = withReactContent(Swal)
export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    })
  }, [])
  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({
        prompt: "select_account",
      })
      const result = await signInWithPopup(auth, provider)
      MySwal.fire({
        icon: "success",
        title: "Account Created Successfully",
        text: `Welcome, ${result.user.displayName}!`,
        timer: 2000,
        showConfirmButton: false,
        background: "#FFFFFF",
        customClass: {
          popup: "rounded-xl shadow-xl",
          title: "text-green-600",
        },
      }).then(() => {
        navigate("/login")
      })
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Sign Up Failed",
        text: error.message,
        timer: 3000,
        background: "#FFFFFF",
        customClass: {
          popup: "rounded-xl shadow-xl",
          title: "text-red-600",
        },
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      MySwal.fire({
        icon: "error",
        title: "Passwords Don't Match",
        text: "Please ensure both passwords are identical",
        background: "#FFFFFF",
        customClass: {
          popup: "rounded-xl shadow-xl",
          title: "text-red-600",
        },
      })
      return
    }

    if (dummyUsers.some((user) => user.email === email)) {
      MySwal.fire({
        icon: "error",
        title: "Email Already Exists",
        text: "Please use a different email address",
        background: "#FFFFFF",
        customClass: {
          popup: "rounded-xl shadow-xl",
          title: "text-red-600",
        },
      })
      return
    }

    dummyUsers.push({ name, email, password })

    MySwal.fire({
      icon: "success",
      title: "Account Created Successfully",
      text: "Welcome to Oodser Platform!",
      timer: 2000,
      showConfirmButton: false,
      background: "#FFFFFF",
      customClass: {
        popup: "rounded-xl shadow-xl",
        title: "text-green-600",
      },
    }).then(() => {
      navigate("/")
    })
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-6xl grid md:grid-cols-2 overflow-hidden"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div
          className="hidden md:block bg-gradient-to-br from-blue-600 to-blue-800 p-12 relative overflow-hidden"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-blue-800/90" />
          <div className="relative z-10 h-full flex flex-col justify-center text-white space-y-6">
            <h2 className="text-3xl font-bold" data-aos="fade-up" data-aos-delay="400">
              Join Oodser Platform
            </h2>
            <p className="text-blue-100" data-aos="fade-up" data-aos-delay="500">
              Create an account to access all features and start managing your tasks efficiently.
            </p>
          </div>
        </div>
        <div className="p-6 lg:p-8">
          <div className="max-w-lg mx-auto space-y-8">
            <div data-aos="fade-left" data-aos-delay="200">
              <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
              <p className="text-gray-500 mt-2">Sign up to get started</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6" data-aos="fade-up" data-aos-delay="300">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
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
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Create Account
              </button>
            </form>
            <div data-aos="fade-up" data-aos-delay="400">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-3">
                <button
                  onClick={handleGoogleSignUp}
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors"
                >
                  <FaGoogle className="h-5 w-5 text-gray-600 mr-2" />
                  <span>Sign up with Google</span>
                </button>
                <button
                  onClick={() => {}}
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors"
                >
                  <FaMicrosoft className="h-5 w-5 text-gray-600 mr-2" />
                  <span>Sign up with Microsoft</span>
                </button>
                <button
                  onClick={handleGitHubSignIn}
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors"
                >
                  <FaGithub className="h-5 w-5 text-gray-600 mr-2" />
                  <span>Sign up with GitHub</span>
                </button>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600" data-aos="fade-up" data-aos-delay="500">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                Sign in
              </button>
            </p>
            <p className="text-center text-sm text-gray-600" data-aos="fade-up" data-aos-delay="800">
             Already have an account?{" "}
              <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
             Log In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

