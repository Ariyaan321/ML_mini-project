import React from "react"
import { useState, useEffect } from "react";
// import ApiData from './myApi/apiData'
import "./popup.css"

export default function PopupDetails(loc) {
    const [location, setLocation] = useState(loc)
    const [editpop, setEditpop] = useState(true)
    const [type, setType] = useState("")
    const [bhk, setBhk] = useState("")
    const [sqftValue, setSqftValue] = useState("")
    // const [apiResponse, setApiResponse] = useState("")
    const [storedData, setStoredData] = useState([{
        "Lat": 99.9,
        "Lng": 99.0,
        "Type": "land",
        "Bhk": 3,
        "Sqft": 99
    },])

    function formToJSON(e) {
        return (
            {
                "Lat": location.loc[0],
                "Lng": location.loc[1],
                "Type": e.typeLoc.value,
                "Bhk": e.bhkLoc.value,
                "Sqft": e.sqftLoc.value,
            }
        )
    }

    function handleType(e) {
        setType(e.target.value)
    }
    function handleBhk(e) {
        setBhk(e.target.value)
    }
    function handleSqft(e) {
        setSqftValue(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const updatedData = formToJSON(e.target)
        console.log('++updated Data: ', updatedData);
        // setApiResponse(await ApiData("post", updatedData))  // Post data into DB
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
            setBhk("")
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
                            <h1 className="nofalse">Add details</h1>
                        }
                        <p className="no3latlng">{location.loc[0] + ', ' + location.loc[1]}</p>
                        <h2>Type</h2>
                        <input type="text" name="typeLoc" value={type} onChange={handleType} placeholder="Type" className="no3" />
                        <h2>BHK</h2>
                        <input type="number" name="bhkLoc" value={bhk} onChange={handleBhk} placeholder="BHK" className="no3" />
                        <h2>Sqft</h2>
                        <input type="number" name="sqftLoc" value={sqftValue} onChange={handleSqft} placeholder="Sqft" className="no3" />

                        <input type="submit" value="submit" className="button-8" />
                        <button type="button" onClick={() => { downloadJSON() }} className="button-8" >Downlaod dataset</button>
                        {/* {
                            apiResponse !== "" &&
                            <p style={{ fontSize: 'small', color: 'black' }}>
                                {apiResponse}
                            </p>
                        } */}
                    </form>
                </div>
            )}
        </>
    );
}