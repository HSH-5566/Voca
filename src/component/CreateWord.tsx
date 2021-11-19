import useFetch from "../hook/useFetch";
import React, { useRef, useState } from 'react';
import { useHistory } from "react-router";
import { Iday } from "./DayList";

const CreateWord = () => {
    const days: Iday[] = useFetch("http://localhost:3001/days");
    const history = useHistory();
    const [isLoding, setIsLoading] = useState(false);
    
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(!isLoding && dayRef.current && engRef.current && korRef.current){
            setIsLoading(true);

            const day = dayRef.current.value;
            const eng = engRef.current.value;
            const kor = korRef.current.value

            fetch(`http://localhost:3001/words`, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    day,
                    eng,
                    kor,
                    isDone : false,
                }),
            })
            .then(res => {
                if(res.ok){
                    alert('생성완료!');
                    history.push(`/day/${day}`);
                    setIsLoading(false);
                }
            })
        }
    }

    const engRef = useRef<HTMLInputElement>(null);
    const korRef = useRef<HTMLInputElement>(null);
    const dayRef = useRef<HTMLSelectElement>(null);

    return (
        <form onSubmit={onSubmit}>
            <div className="input_area">
                <label>Eng</label>
                <input type="text" placeholder="computer" ref={engRef}/>
            </div>
            <div className="input_area">
                <label>Kor</label>
                <input type="text" placeholder="컴퓨터" ref={korRef}/>
            </div>
            <div className="input_area">
                <label>Day</label>
                <select ref={dayRef}>
                    {days.map(day => (
                        <option key={day.id} value={day.day}>{day.day}</option>
                    ))}
                </select>
            </div>
            <button style={
                {opacity: isLoding ? 0.3 : 1,}
            }>
                {isLoding ? "Saving..." : "저장"}
            </button>
        </form>
    )
}

export default CreateWord;