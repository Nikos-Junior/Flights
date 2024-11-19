import React from "react";

const FlightCard = ({ flight }) => {
    const { price, departureCity, arrivalCity, departureDate, arrivalDate, direct } = flight;

    return (
        <table className="flight-card">
            <thead>
                <tr>
                    <th colSpan="2">From {departureCity} to {arrivalCity}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Price :</strong></td>
                    <td>{price}</td>
                </tr>
                <tr>
                    <td><strong>Start :</strong></td>
                    <td>{departureDate}</td>
                </tr>
                <tr>
                    <td><strong>End :</strong></td>
                    <td>{arrivalDate}</td>
                </tr>
                <tr>
                    <td><strong>Vol direct :</strong></td>
                    <td>{direct ? "yes" : "No"}</td>
                </tr>
            </tbody>
        </table>
    );
};

const FlightList = ({ flights }) => {
    if (!flights || flights.length === 0) {
        return <p>Aucun vol trouvé. Essayez une autre recherche.</p>;
    }
    return (
        <div>
            <div className="">
                {flights.map((flight, index) => (
                    <FlightCard key={index} flight={flight} />
                ))}
            </div>
        </div>
    );
}

export default FlightList;
