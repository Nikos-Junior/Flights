import React, { useState } from "react";
import axios from "axios";

const SearchForm = () => {
    const [where_from, setWhere_from] = useState("");
    const [where_to, setWhere_to] = useState("");
    const [begin_date, setBegin_date] = useState('');
    const [end_date, setEnd_date] = useState("");

    const headers = {
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
        'x-rapidapi-key': '2737308949msh382e961e2776040p1bd4a2jsn9b3386fee451'
    };

    const fetchSkid = async (city) => {
        try {
            const response = await axios.get(`https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${city}`, { headers });
            const Skid = response.data.data;

            if (Skid.length === 1) {
                return { skyId: Skid[0].skyId, entityId: Skid[0].entityId };
            } else if (Skid.length === 0) {
                throw new Error(`No airports found for ${city}`);
            } else {
                return Skid.map(item => ({ skyId: item.skyId, entityId: item.entityId }));
            }
        } catch (error) {
            console.error(`Airport search error for ${city}:`, error);
            throw error;
        }
    };

    const fetchFlights = async ({ fromSkyId, toSkyId, begin_date, fromEntityId, toEntityId }) => {
        try {
            const response = await axios.get(
                `https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights`, {
                    params: {
                        originSkyId: fromSkyId,
                        destinationSkyId: toSkyId,
                        originEntityId: fromEntityId,
                        destinationEntityId: toEntityId,
                        date: begin_date,
                        cabinClass: "economy",
                        adults: 1,
                        sortBy: "best",
                        currency: "USD",
                        market: "en-US",
                        countryCode: "US"
                    },
                    headers
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error("Flight search error:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (new Date(begin_date) > new Date(end_date)) {
            alert("The start date cannot be later than the end date.");
            return;
        }

        try {
            const fromSkyData = await fetchSkid(where_from);
            const toSkyData = await fetchSkid(where_to);

            if (Array.isArray(fromSkyData) || Array.isArray(toSkyData)) {
                alert("Several airports found. Please specify.");
                return;
            }

            await fetchFlights({
                fromSkyId: fromSkyData.skyId,
                toSkyId: toSkyData.skyId,
                begin_date,
                fromEntityId: fromSkyData.entityId,
                toEntityId: toSkyData.entityId,
            });
        } catch (error) {
            alert("An error has occurred. Please check your entries.");
        }
    };

    return (
        <section className="flex justify-center">
            <div className="bg-rose-100/70 mt-12 rounded-xl px-5 sm:px-10 pt-8 pb-4 relative bg-no-repeat bg-right bg-contain ">
                <div className="text-rose-400 font-semibold text-lg">Flights</div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-6 grid grid-cols-1 xs:grid-cols-2 gap-y-6 gap-x-6 md:flex md:space-x-6 md:gap-x-0"
                >
                    <div className="mt-6 grid sm:grid-cols-12 md:grid-cols-4 max-w-max gap-x-6">
                        <div className="flex flex-col md:w-40 text-gray-600 text-sm space-y-2 font-semibold">
                            <label>Where from</label>
                            <div className="inline-flex relative">
                                <input
                                    className="bg-rose-400 text-white px-4 py-3 rounded-lg appearance-none w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300"
                                    value={where_from}
                                    onChange={(e) => setWhere_from(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:w-40 text-gray-600 text-sm space-y-2 font-semibold">
                            <label>Where to</label>
                            <div className="inline-flex relative">
                                <input
                                    className="bg-blue-600/70 text-white px-4 py-3 rounded-lg appearance-none w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300"
                                    value={where_to}
                                    onChange={(e) => setWhere_to(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:w-40 text-gray-600 text-sm space-y-2 font-semibold">
                            <label>Begin Date</label>
                            <div className="inline-flex relative">
                                <input
                                    className="bg-indigo-800/80 text-white tracking-wider pl-4 pr-10 py-3 rounded-lg appearance-none w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300"
                                    type="date"
                                    value={begin_date}
                                    onChange={(e) => setBegin_date(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:w-40 text-gray-600 text-sm space-y-2 font-semibold">
                            <label>End Date</label>
                            <div className="inline-flex relative">
                                <input
                                    className="bg-indigo-800/50 text-white tracking-wider pl-4 pr-10 py-3 rounded-lg appearance-none w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300"
                                    type="date"
                                    value={end_date}
                                    onChange={(e) => setEnd_date(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-6 md:mt-12">
                        <button
                            type="submit"
                            className="bg-indigo-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300"
                        >
                            Search
                        </button>
                    </div>
                </form>
        
            </div>
        </section>
    );
};

export default SearchForm;
