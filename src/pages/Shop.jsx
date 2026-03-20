import React from 'react';

const shopCategories = [
  {
    name: '🍼 Baby & Breastfeeding Essentials',
    items: [
      {
        title: 'Spectra S1 Breast Pump (Rechargeable)',
        link: '/go/spectra-s1',
        price: '$199.99',
        note: 'Hospital grade, portable, rechargeable - the one every mom recommends'
      },
      {
        title: 'Earth Mama Organic Nipple Butter',
        link: '/go/nipple-butter',
        price: '$11.99',
        note: 'Lanolin-free, no need to wipe off before nursing. Buy two.'
      },
      {
        title: 'My Brest Friend Nursing Pillow (Deluxe)',
        link: '/go/nursing-pillow',
        price: '$44.99',
        note: 'Flat & firm - way better than the Boppy for actual breastfeeding'
      },
      {
        title: 'Mama Bear Diapers (Size 3, 92ct)',
        link: '/go/mama-bear-diapers',
        price: '$24.99',
        note: 'Amazon brand, surprisingly good quality, way cheaper than Huggies'
      },
    ]
  },
  {
    name: '💪 Post-Surgery Recovery (Tummy Tuck Journey)',
    items: [
      {
        title: 'ChongErfei Compression Garment',
        link: '/go/compression-garment',
        price: '$29.99',
        note: 'Essential for tummy tuck recovery - wore this for weeks'
      },
      {
        title: 'ScarAway Silicone Scar Sheets',
        link: '/go/scar-sheets',
        price: '$19.99',
        note: 'Actually flattens scars - doctor recommended'
      },
      {
        title: 'Frida Mom Postpartum Recovery Kit',
        link: '/go/frida-mom-kit',
        price: '$49.99',
        note: 'Everything you need for recovery in one box'
      },
    ]
  },
  {
    name: '🚗 Chaos Management (4 Kids Survival)',
    items: [
      {
        title: 'Bentgo Kids Lunch Box (5-Compartment)',
        link: '/go/bentgo-lunchbox',
        price: '$29.99',
        note: 'Leak-proof, drop-proof, dishwasher safe - survives all 4 kids'
      },
      {
        title: 'Graco 4Ever Car Seat',
        link: '/go/graco-carseat',
        price: '$249.99',
        note: 'Grows with them from infant to booster - one seat, 10 years'
      },
    ]
  },
  {
    name: '🏡 Mom Survival Kit',
    items: [
      {
        title: 'Batiste Dry Shampoo',
        link: '/go/batiste-dry-shampoo',
        price: '$8.99',
        note: 'Day 3 hair? Nobody has to know.'
      },
      {
        title: "Not Your Mother's Dry Shampoo",
        link: '/go/nym-dry-shampoo',
        price: '$8.99',
        note: 'The other one we swear by'
      },
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
