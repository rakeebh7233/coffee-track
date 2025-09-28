import { coffeeOptions } from "../utils"
import { useState } from "react"

export default function CoffeeForm() {
    const [selectedCoffee, setSelectedCoffee] = useState(null)
    const [showCoffeeTypes, setShowCoffeeTypes] = useState(false)
    const [coffeeCost, setCoffeeCost] = useState(0)
    const [hour, setHour] = useState(0)
    const [min, setMin] = useState(0)

    function handleSubmitForm() {
        console.log(selectedCoffee, coffeeCost, hour, min)
    }

    return (
        <>
            <div className="section-header">
                <i className="fa-solid fa-pencil"></i>
                <h2>Start Tracking Today</h2>
            </div>
            <h4>Select coffee type</h4>
            <div className="coffee-grid">
                {coffeeOptions.slice(0, 5).map((option, optionIndex) => {
                    return (
                        <button onClick={() => {
                            setSelectedCoffee(option.name)
                            setShowCoffeeTypes(false)
                        }} className={"button-card" + (option.name === selectedCoffee ? ' coffee-button-selected' : ' ')} key={optionIndex}>
                            <h4>{option.name}</h4>
                            <p>{option.caffeine} mg</p>
                        </button>
                    )
                })}
                <button className={"button-card" + (showCoffeeTypes ? ' coffee-button-selected' : ' ')} onClick={() => {
                    setShowCoffeeTypes(true)
                    setSelectedCoffee(null)
                }}>
                    <h4>Other</h4>
                    <p>n/a</p>
                </button>
            </div>
            {showCoffeeTypes && (
                <select onChange={(e) => {
                    setSelectedCoffee(e.target.value)
                    
                }} name="coffee-list" id="coffee-list">
                    <option value={null}>Select Type</option>
                    {coffeeOptions.map((option, optionIndex) => {
                        return (
                            <option value={option.name} key={optionIndex}>
                                {option.name} ({option.caffeine})mg
                            </option>
                        )
                    })}
                </select>
            )}
            
            <h4>Add the cost ($)</h4>
            <input className="w-full" type="number" value={coffeeCost} placeholder="4.50" 
                onChange={(e) => {setCoffeeCost(e.target.value)}} />
            <h4>Time since consumption</h4>
            <div className="time-entry">
                <div>
                    <h6>Hours</h6>
                    <select onChange={(e) => {setHour(e.target.value)}} name="hours-select" id="hours-select">
                        {Array.from({ length: 23 }, (_, i) => (
                            <option value={i} key={i}>{i}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <h6>Mins</h6>
                    <select onChange={(e) => {setMin(e.target.value)}} name="mins-select" id="mins-select">
                        {[0,5,10,15,30,45].map((min, minIndex) => (
                            <option value={min} key={minIndex}>{min}</option>
                        ))}
                    </select>
                </div>
            </div>
            <button onClick={handleSubmitForm}>
                <p>Add Entry</p>
            </button>
        </>
    )
}