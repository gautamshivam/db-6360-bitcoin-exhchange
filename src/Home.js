import React from 'react'
import Button from './Button'
function Home(){
    const onClick=()=>{
        console.log('click')
    }
    return (
        <div>
            <Button text='Log In' onClick={onClick}/>
            <Button text="register" onClick={onClick}/>
            <h1>Welcome to Bitcoin transaction System</h1>
        </div>
    )
}

export default Home
