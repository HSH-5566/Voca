import {Link} from 'react-router-dom';
import useFetch from '../hook/useFetch';

export interface Iday {
    id: number;
    day: number;
}

const DayList = () => {
    const days: Iday[] = useFetch('http://localhost:3001/days');
    // const [days, setDays] = useState([]);

    // useEffect(() => {
    //     fetch('http://localhost:3001/days')
    //     .then( res => {
    //         return res.json();
    //     })
    //     .then( data => {
    //         setDays(data);
    //     })
    // }, [])

    if(days.length === 0){
        return <span>Loading ...</span>
    }

    return (
        <ul className="list_day">
            {days.map(day => (
                <li key={day.id}>
                    <Link to={`/day/${day.day}`}>Day{day.day}</Link>
                </li>
            ))}
        </ul>
    );
}

export default DayList;