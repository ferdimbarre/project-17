import { useState, useEffect } from 'react';

function Gallery() {
    const [tours, setTours] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch daily sales data from API
        const site = 'https://api.allorigins.win/get?url=https://course-api.com/react-tours-project'; //api 
        fetch(site)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Unable to provide tour info');//throws error
                }
                return response.json();
            })
            .then(data => setTours(JSON.parse(data.contents)))
            .catch(error => {
                console.error('Unable to fetch tour information', error); //catches error
            }).finally(() =>setIsLoading(false));
    }, []); // Empty array 

    const notInterested = (id) => {setTours(tours.filter((tour) => tour.id !== id));
    }; // to create not interested button
    const readMore = (id) => {
setTours(tours.map((tour) => 
            tour.id === id ? { ...tour, showMore: !tour.showMore } : tour
        ));
    }; // to create the read more button


    if (isLoading){
        return <p>Loading</p>
    };

    return (
        <div>
            <h2>TOUR INFORMATION</h2>
            <ul>
                {tours.map(tour => (
                    <li key={tour.id}>
                        <p id= "name">{tour.name}: ${tour.price} </p> 
                        <p>{tour.showMore ? tour.info : `${tour.info.substring(0, 100)}...`}
                            <button onClick={() => readMore(tour.id)}>
                                {tour.showMore ? 'Show Less' : 'Read More'}
                            </button>
                        </p>
                        <img src={tour.image} alt="tour-image" />
                        <p></p>
                        <button onClick={() => notInterested(tour.id)}>
                            Not Interested
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
} 

export default Gallery;


