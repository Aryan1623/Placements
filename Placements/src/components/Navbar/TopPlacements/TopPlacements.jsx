import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopPlacements.css';

// Define the initial state with objects in the items array including an image field
const initialState = {
    query: '',
    items: [
        { name: 'Ankur', batch: '2024', branch: 'IT', package: '56 LPA', company: 'Google', image: 'https://i.pinimg.com/originals/a0/60/be/a060be70906ff02fea00add1144e4ad7.jpg' },
        { name: 'Rashmika', batch: '2024', branch: 'ECE', package: '43 LPA', company: 'Microsoft', image: 'https://c.stocksy.com/a/o5e400/z9/1107432.jpg' },
        { name: 'Avinash', batch: '2024', branch: 'CSE', package: '34 LPA', company: 'Atlassian', image: 'https://knowinsiders.com/stores/news_dataimages/minhlt/112020/22/20/0613_handsome-men-8.jpg?rt=20201122200616?randTime=1628878835' },
        { name: 'Akshat', batch: '2024', branch: 'CSE', package: '28 LPA', company: 'Accenture', image: 'https://i.pinimg.com/736x/07/6d/98/076d98265d5d25371521c16e92577b00.jpg' },
        { name: 'Bharath', batch: '2024', branch: 'IT', package: '56 LPA', company: 'Google', image: 'https://cmkt-image-prd.freetls.fastly.net/0.1.0/ps/5397226/1820/2730/m1/fpnw/wm1/ndvld9i93olzarioqzuu6a3bbnxody4gfmpvjyorvip7x9alegcm2kti4tc3ktsv-.jpg?1542627643&s=cfeb8b5f8850e9a99b7761a2c34e27f8' },
        { name: 'Chetan', batch: '2024', branch: 'ECE', package: '43 LPA', company: 'Microsoft', image: 'https://list.lisimg.com/image/8567816/740.jpg' },
        { name: 'Harshika', batch: '2024', branch: 'IT', package: '34 LPA', company: 'Atlassian', image: 'https://tse2.mm.bing.net/th?id=OIP.-HS36-jp_ahyDTyyo6SlLQHaFj&pid=Api&P=0&h=180' },
        { name: 'Harsh', batch: '2024', branch: 'CSE', package: '28 LPA', company: 'Accenture', image: 'https://www.findhealthtips.com/wp-content/uploads/2018/05/Imran-Abbas-handsome-men-world-2018.jpg' }
    ],
    filteredItems: []
};

// Reducer function to handle state updates
const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_QUERY': {
            const query = action.payload || '';
            const filteredItems = Array.isArray(state.items)
                ? state.items.filter(item => 
                    item.name.toLowerCase().includes(query.toLowerCase()) ||
                    item.batch.toLowerCase().includes(query.toLowerCase()) ||
                    item.branch.toLowerCase().includes(query.toLowerCase()) ||
                    item.package.toLowerCase().includes(query.toLowerCase()) ||
                    item.company.toLowerCase().includes(query.toLowerCase())
                )
                : [];
            return {
                ...state,
                query,
                filteredItems
            };
        }
        default:
            return state;
    }
};

const TopPlacements = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

    const handleItemClick = (item) => {
        navigate(`/persondisplay/${item.name}`);
    };

    return (
        <div className="top-placements">
            <input
                type="text"
                value={state.query}
                onChange={(e) => dispatch({ type: 'SET_QUERY', payload: e.target.value })}
                placeholder="Search by name, batch, branch, package, or company..."
                className="search-bar"
            />
            {state.query && (
                <ul className="filtered-list">
                    {state.filteredItems.map((item, index) => (
                        <li key={index} onClick={() => handleItemClick(item)}>
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
            <div className="item-section">
                {state.items.map((item, index) => (
                    <div key={index} className="item-card" onClick={() => handleItemClick(item)}>
                        <img src={item.image} alt={item.name} />
                        <div className="item-details">
                            <h3>{item.name}</h3>
                            <p>{item.batch} - {item.branch}</p>
                            <p>Package: {item.package}</p>
                            <p>Company: {item.company}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TopPlacements;
