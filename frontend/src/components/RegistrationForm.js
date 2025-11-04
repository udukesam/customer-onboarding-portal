import React, {useState} from 'react';

export default function RegistrationForm(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const submit = async () => {
        // minimal demo - no backend call
        alert(`Registering ${name} <${email}>`);
    }
    return (<div>
        <h2>Register Customer</h2>
        <input placeholder='Name' value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} />
        <button onClick={submit}>Register</button>
    </div>)
}
