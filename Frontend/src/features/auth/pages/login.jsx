import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
// Import a simple eye icon (you can also use an SVG or Lucide-React if you have it)
import { Eye, EyeOff } from 'lucide-react' 

const Login = () => {
    // CHANGE: Destructure 'login' instead of 'handleLogin' to match your Context
    const { loading, login, user } = useAuth() 
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    // New state for password visibility
    const [ showPassword, setShowPassword ] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // CHANGE: Call 'login' here
        const result = await login(email, password)
        
        if (result.success) {
            navigate('/')
        } else {
            alert(result.message || "Login failed. Please check your email and password.")
        }
    }

    if(loading){
        return (<main><h1>Loading.......</h1></main>)
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" 
                            id="email" 
                            name='email' 
                            required
                            placeholder='Enter email address' 
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-wrapper" style={{ position: 'relative' }}>
                            <input
                                onChange={(e) => { setPassword(e.target.value) }}
                                // Toggle type between 'password' and 'text'
                                type={showPassword ? "text" : "password"} 
                                id="password" 
                                name='password' 
                                required
                                placeholder='Enter password' 
                                style={{ width: '100%' }}
                            />
                            {/* Eye Button */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '0'
                                }}
                            >
                                {showPassword ? "🙈" : "👁️"} 
                            </button>
                        </div>
                    </div>
                    <button className='button primary-button' type="submit">Login</button>
                </form>
                <p>Don't have an account? <Link to={"/register"} >Register</Link> </p>
            </div>
        </main>
    )
}

export default Login