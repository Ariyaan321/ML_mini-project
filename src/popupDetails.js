import React from "react"
import { useState, useEffect } from "react";
import "./popup.css"

export default function PopupDetails(loc) {
    const [location, setLocation] = useState(loc)
    const [editpop, setEditpop] = useState(true)
    const [type, setType] = useState("")
    const [price, setPrice] = useState("")
    const [storedData, setStoredData] = useState([{
        "Lat": 99.9,
        "Lng": 99.0,
        "Type": "land",
        "Price": 100
    },])

    function formToJSON(e) {
        return (
            {
                "Lat": location.loc[0],
                "Lng": location.loc[1],
                "Type": e.typeLoc.value,
                "Price": e.priceLoc.value,
            }
        )
    }

    function handleType(e) {
        console.log('location useStateis: ', location.loc[0] + ', ' + location.loc[1]);
        setType(e.target.value)
    }
    function handlePrice(e) {
        setPrice(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const updatedData = formToJSON(e.target)
        console.log('++updated Data: ', updatedData);
        const newStoredData = [...storedData, updatedData]; // Adding new data
        setStoredData(newStoredData);  // Update state with new data

        // Storing the data in localStorage
        localStorage.setItem("storedData", JSON.stringify(newStoredData));
        console.log('Stored data in localStorage:', newStoredData);
    }

    function downloadJSON() {
        const json = JSON.stringify(storedData);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "data.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    useEffect(() => {
        if (editpop !== true) {
            setLocation(loc)
            setType("")
            setPrice("")
        }
        setEditpop(true)

        const savedData = localStorage.getItem("storedData");
        if (savedData) {
            setStoredData(JSON.parse(savedData));  // Load stored data on initialization
        }

        return undefined;
    }, [loc])


    return (
        <>
            {editpop && (
                <div className="container">
                    <span className="no1" onClick={() => setEditpop(false)}>&times;</span>
                    <form onSubmit={handleSubmit} className='no2' >
                        {
                            <h3 className="nofalse">Add details</h3>
                        }
                        <p className="no3latlng">{location.loc[0] + ', ' + location.loc[1]}</p>
                        <input type="text" name="typeLoc" value={type} onChange={handleType} placeholder="Type" className="no3" />
                        <input type="number" name="priceLoc" value={price} onChange={handlePrice} placeholder="Price" className="no3" />

                        <input type="submit" value="submit" className="no4" />
                        {/* <button type="button" onClick={() => { console.log('++++++DATASET IS+++++: ' + storedData[storedData.length - 1].Lat); }} className="no4" /> */}
                        <button type="button" onClick={() => { downloadJSON() }} className="no4" />

                    </form>
                </div>
            )}
        </>
    );
}