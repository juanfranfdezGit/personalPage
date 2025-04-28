import { useState } from "react";
import avatarImg from '../assets/avatar.jpg'

export default function Avatar() {

    const [stepClass, setStepClass] = useState("");
    
    return (
        <div class={`illustration ${stepClass}`}>
            <img src={avatarImg} alt="illustration"></img>
        </div>
    )
}