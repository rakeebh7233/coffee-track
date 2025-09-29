import { useState } from "react"
import { useAuth } from "../context/AuthContext"

export default function Authentication(props) {
    const { handleCloseModal } = props
    const [isRegistration, setIsRegistration] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [error, setError] = useState(null)

    const { signup, login } = useAuth()

    async function handleAuthentication() {
        if (!email || !email.includes('@') ||!password || password.length < 6 || isAuthenticating) {
            setError("Invalid Login")
            return
        }

        try {
            setIsAuthenticating(true)
            setError(null)

            if (isRegistration) {
                await signup(email, password)
            } else {
                await login(email, password)
            }
            handleCloseModal()
        } catch (err) {
            console.log(err.message)
            setError(err.message)
        } finally {
            setIsAuthenticating(false)
        }
    }

    return (
        <>
            <h2 className="sign-up-text">{isRegistration ? 'Sign Up' : "Login"}</h2>
            <p>{isRegistration ? 'Create an account!' : 'Sign into your account!'}</p>
            {error && (
                <p><i class="fa fa-exclamation-circle" aria-hidden="true" style={{ color: "red" }}></i> {error}</p>
            )}
            <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="text" placeholder="Email" />
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="*********" />

            <button onClick={handleAuthentication}><p>{isAuthenticating ? 'Authenticating...' : 'Submit'}</p></button>
            <hr />
            <div className="register-content">
                <p>{isRegistration ? 'Already have an account?' : 'Don\'t have an account?'}</p>
                <button onClick={() => { setIsRegistration(!isRegistration) }}><p>{isRegistration ? 'Sign In' : "Sign Up"}</p></button>
            </div>
        </>
    )
}