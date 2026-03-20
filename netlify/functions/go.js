const AFFILIATE_LINKS = {
  'spectra-s1':          'https://www.amazon.com/dp/B00DBKFFJM?tag=jerriwinters-20',
  'nipple-butter':       'https://www.amazon.com/dp/B000JVCBBG?tag=jerriwinters-20',
  'nursing-pillow':      'https://www.amazon.com/dp/B00PC3K7OE?tag=jerriwinters-20',
  'mama-bear-diapers':   'https://www.amazon.com/s?k=mama+bear+diapers&tag=jerriwinters-20',
  'compression-garment': 'https://www.amazon.com/s?k=ChongErfei+compression+garment+postpartum&tag=jerriwinters-20',
  'scar-sheets':         'https://www.amazon.com/s?k=ScarAway+silicone+scar+sheets&tag=jerriwinters-20',
  'frida-mom-kit':       'https://www.amazon.com/s?k=frida+mom+postpartum+recovery+essentials&tag=jerriwinters-20',
  'bentgo-lunchbox':     'https://www.amazon.com/dp/B00PKNO7HO?tag=jerriwinters-20',
  'graco-carseat':       'https://www.amazon.com/s?k=graco+4ever+car+seat&tag=jerriwinters-20',
  'batiste-dry-shampoo': 'https://www.amazon.com/s?k=batiste+dry+shampoo&tag=jerriwinters-20',
  'nym-dry-shampoo':     'https://www.amazon.com/s?k=not+your+mothers+dry+shampoo&tag=jerriwinters-20',
};

export default async (request) => {
  const slug = new URL(request.url).searchParams.get('slug');
  const destination = AFFILIATE_LINKS[slug];

  if (!destination) {
    console.log(JSON.stringify({ event: 'affiliate_miss', slug: slug || '(empty)', timestamp: new Date().toISOString() }));
    return new Response(null, { status: 302, headers: { Location: '/shop' } });
  }

  console.log(JSON.stringify({
    event: 'affiliate_click',
    slug,
    url: destination,
    timestamp: new Date().toISOString(),
    referrer: request.headers.get('referer') || 'direct',
    ua: request.headers.get('user-agent') || 'unknown',
  }));

  return new Response(null, { status: 302, headers: { Location: destination } });
};
