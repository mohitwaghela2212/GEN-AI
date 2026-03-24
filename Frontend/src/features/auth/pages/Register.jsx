import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // State for password visibility toggle
    const [showPassword, setShowPassword] = useState(false)

    // CHANGE: Destructure 'register' instead of 'handleRegister'
    const { loading, register } = useAuth()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // CHANGE: Pass arguments directly as defined in your AuthContext
        const result = await register(username, email, password)
        
        if (result.success) {
            navigate("/")
        } else {
            alert(result.message || "Registration failed. Please try again.")
        }
    }

    if (loading) {
        return (<main><h1>Loading.......</h1></main>)
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text" 
                            id="username" 
                            name='username' 
                            required
                            placeholder='Enter username' 
                        />
                    </div>
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
                                    padding: '0',
                                    fontSize: '1.2rem'
                                }}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>

                    <button className='button primary-button' type="submit">Register</button>
                </form>

                <p>Already have an account? <Link to={"/login"} >Login</Link> </p>
            </div>
        </main>
    )
}

export default Register