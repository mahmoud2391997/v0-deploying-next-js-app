import React, { useState } from 'react';
import PropertyCard from './propertyCard';
import { Add } from '@mui/icons-material';
import PropertyForm from './addingProperty';

const properties = [
    {
        id: 1,
        name: 'Luxury Apartment',
        location: 'Downtown',
        price: '$500,000',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 2,
        name: 'Cozy Cottage',
        location: 'Countryside',
        price: '$300,000',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 3,
        name: 'Modern Villa',
        location: 'Beachside',
        price: '$1,200,000',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 8,
        name: 'Modern Villa',
        location: 'Beachside',
        price: '$1,200,000',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 7,
        name: 'Modern Villa',
        location: 'Beachside',
        price: '$1,200,000',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 6,
        name: 'Modern Villa',
        location: 'Beachside',
        price: '$1,200,000',
        image: 'https://via.placeholder.com/150',
    },
];

const PropertiesList = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProperties = properties.filter(
        (property) =>
            property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={styles.container}>
            <h1>Properties List</h1>
            <PropertyForm />
            <input
                type="text"
                placeholder="Search by title or address"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchBar}
            />
            <div style={styles.grid}>
                {filteredProperties.map((property) => (
                    <PropertyCard
                        key={property.id}
                        name={property.name}
                        location={property.location}
                        price={property.price}
                        image={property.image}
                    />
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    searchBar: {
        marginBottom: '20px',
        padding: '10px',
        width: '100%',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '2px',
    },
};

export default PropertiesList;
