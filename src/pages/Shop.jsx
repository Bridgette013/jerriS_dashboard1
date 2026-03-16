import React from 'react';

const shopCategories = [
  {
    name: '🍼 Baby & Breastfeeding (Used with All 4 Kids)',
    items: [
      { title: 'My Brest Friend Nursing Pillow', link: 'https://amzn.to/PLACEHOLDER-GET-AMAZON-ID', price: '$39.99', note: 'Saved my back with all 4 babies' },
      { title: 'Medela Breast Pump', link: 'https://amzn.to/PLACEHOLDER-GET-AMAZON-ID', price: '$299.99', note: '2+ years breastfeeding each kid - this was essential' },
      { title: 'Lansinoh Nipple Cream', link: 'https://amzn.to/PLACEHOLDER-GET-AMAZON-ID', price: '$9.99', note: 'Absolute lifesaver. Buy 3.' },
      { title: 'Nursing Cover (Privacy Anywhere)', link: 'https://amzn.to/PLACEHOLDER-GET-AMAZON-ID', price: '$18.99', note: 'Breastfed everywhere with this' },
    ]
  },
  {
    name: '💪 Post-Surgery Recovery (My Tummy Tuck Journey)',
    items: [
      { title: 'Medical Grade Compression Garment', link: 'https://amzn.to/PLACEHOLDER-GET-AMAZON-ID', price: '$49.99', note: 'Non-negotiable for recovery' },
      { title: 'Bio-Oil Scar Treatment', link: 'https://amzn.to/PLACEHOLDER-GET-AMAZON-ID', price: '$15.99', note: 'Actually works - been using 6 months' },
      { title: 'Recovery Wedge Pillow', link: 'https://amzn.to/PLACEHOLDER-GET-AMAZON-ID', price: '$34.99', note: 'Sleep positioning post-surgery' },
      { title: 'Scar Tape Strips', link: 'https://amzn.to/PLACEHOLDER-GET-AMAZON-ID', price: '$12.99', note: 'Helps flatten scars' },
    ]
  },
  {
    name: '🚗 Chaos Management (4 Kids + 2 Cats Survival Kit)',
    items: [
      { title: 'Car Backseat Organizer', link: 'https://amzn.to/PLACEHOLDER-GET-AMAZON-ID', price: '$22.99', note: "Keeps snacks off the floor...mostly" },
      { title: 'Bentgo Kids Lunch Boxes (4-Pack)', link: 'https://amzn.to/PLACEHOLDER-GET-AMAZON-ID', price: '$79.99', note: '4 kids = industrial lunch prep' },
      { title: 'First Aid Kit (Car Emergency)', link: 'https://amzn.to/PLACEHOLDER-GET-AMAZON-ID', price: '$24.99', note: 'After that swing incident...yeah.' },
      { title: 'Reusable Water Bottles (6-Pack)', link: 'https://amzn.to/PLACEHOLDER-GET-AMAZON-ID', price: '$32.99', note: 'Because they lose everything' },
    ]
  },
  {
    name: '🏡 Mom Survival Essentials',
    items: [
      { title: 'Dry Shampoo (Industrial Size)', link: 'https://amzn.to/PLACEHOLDER-GET-AMAZON-ID', price: '$14.99', note: "4pm and still haven't showered? Same." },
      { title: 'Coffee Maker (Programmer)', link: 'https://amzn.to/PLACEHOLDER-GET-AMAZON-ID', price: '$79.99', note: 'Survival juice on a timer' },
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
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block',
                      background: '#0A0A0A',
                      padding: '1rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      border: '1px solid #2A2A2A',
                      transition: 'all 0.2s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#C485FF'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#2A2A2A'}
                  >
                    <span style={{ display: 'block', color: '#fff', fontWeight: '600', marginBottom: '0.25rem' }}>
                      {item.title}
                    </span>
                    <span style={{ color: '#60E1E0', fontWeight: '700', display: 'block', marginBottom: '0.5rem' }}>
                      {item.price}
                    </span>
                    <span style={{ color: '#888', fontSize: '0.875rem', lineHeight: '1.4' }}>
                      {item.note}
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
