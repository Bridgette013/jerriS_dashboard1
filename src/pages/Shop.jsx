import React from 'react';

const shopCategories = [
  {
    name: 'Kitchen Favorites',
    items: [
      { title: 'Organizer Bins (Set of 6)', link: '#', price: '$24.99' },
      { title: 'Lunch Containers', link: '#', price: '$18.99' },
      { title: 'Reusable Storage Bags', link: '#', price: '$12.99' },
    ]
  },
  {
    name: 'Home Organization',
    items: [
      { title: 'Bathroom Caddy', link: '#', price: '$19.99' },
      { title: 'Cable Management Kit', link: '#', price: '$14.99' },
      { title: 'Closet Organizers', link: '#', price: '$29.99' },
    ]
  },
  {
    name: 'Mom Life Essentials',
    items: [
      { title: 'Car Organizer', link: '#', price: '$22.99' },
      { title: 'Planner & Stickers', link: '#', price: '$16.99' },
      { title: 'Self Care Kit', link: '#', price: '$34.99' },
    ]
  },
];

const Shop = () => {
  return (
    <div className="page shop-page" style={{ padding: '3rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          fontFamily: 'Montserrat, sans-serif', 
          fontSize: '2rem', 
          marginBottom: '0.5rem',
          background: 'linear-gradient(135deg, #C485FF 0%, #60E1E0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Shop My Favorites
        </h1>
        <p style={{ color: '#888', marginBottom: '2rem' }}>
          Things I actually use and love. As an Amazon Associate, I earn from qualifying purchases.
        </p>
        
        <div style={{ display: 'grid', gap: '2rem' }}>
          {shopCategories.map((category) => (
            <div key={category.name} style={{ 
              background: '#1F1F1F', 
              borderRadius: '12px', 
              padding: '1.5rem',
              border: '1px solid #2A2A2A'
            }}>
              <h2 style={{ 
                fontSize: '1.25rem', 
                marginBottom: '1rem',
                color: '#C485FF'
              }}>
                {category.name}
              </h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '1rem'
              }}>
                {category.items.map((item) => (
                  <a 
                    key={item.title}
                    href={item.link}
                    style={{
                      display: 'block',
                      background: '#0A0A0A',
                      padding: '1rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      border: '1px solid #2A2A2A',
                      transition: 'border-color 0.2s'
                    }}
                  >
                    <span style={{ display: 'block', color: '#fff', fontWeight: '600', marginBottom: '0.25rem' }}>
                      {item.title}
                    </span>
                    <span style={{ color: '#60E1E0', fontWeight: '700' }}>
                      {item.price}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
