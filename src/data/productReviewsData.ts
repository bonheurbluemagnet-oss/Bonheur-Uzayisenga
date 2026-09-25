export interface CustomerReviewItem {
  id: string;
  productId: string;
  authorName: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export const INITIAL_PRODUCT_REVIEWS: Record<string, CustomerReviewItem[]> = {
  'prod-01': [
    {
      id: 'rev-01-1',
      productId: 'prod-01',
      authorName: 'Jean-Paul Habimana',
      location: 'Kimihurura, Kigali',
      rating: 5,
      date: '2 days ago',
      comment: 'Arrived hot within 30 minutes! The crust is authentic and the chicken was super tender. The moto driver was polite and called ahead before arriving at our gate.',
      verifiedPurchase: true,
      helpfulCount: 14
    },
    {
      id: 'rev-01-2',
      productId: 'prod-01',
      authorName: 'Diane Uwera',
      location: 'Nyarutarama, Kigali',
      rating: 5,
      date: '1 week ago',
      comment: 'Best pizza delivery in Kigali hands down. We ordered two large pizzas for a family movie night and everyone loved them. Tracking on the map was spot on.',
      verifiedPurchase: true,
      helpfulCount: 9
    },
    {
      id: 'rev-01-3',
      productId: 'prod-01',
      authorName: 'Eric Mugabo',
      location: 'Kacyiru, Kigali',
      rating: 4,
      date: '2 weeks ago',
      comment: 'Very tasty and generous cheese toppings. Delivery took about 38 mins due to rain, but driver kept the thermal bag completely sealed and dry.',
      verifiedPurchase: true,
      helpfulCount: 5
    }
  ],
  'prod-02': [
    {
      id: 'rev-02-1',
      productId: 'prod-02',
      authorName: 'Aline Mukamana',
      location: 'Gisozi, Kigali',
      rating: 5,
      date: '3 days ago',
      comment: 'Real Musanze red potatoes! Cleaned and weighed properly. The price is much better than buying from local kiosks and saved me a trip to Kimironko.',
      verifiedPurchase: true,
      helpfulCount: 12
    },
    {
      id: 'rev-02-2',
      productId: 'prod-02',
      authorName: 'Patrick Ndayisaba',
      location: 'Remera, Kigali',
      rating: 5,
      date: '1 week ago',
      comment: 'Top quality potatoes for boiling and making chips. Very fresh harvest with zero spoiled pieces. Recommending to my neighbors!',
      verifiedPurchase: true,
      helpfulCount: 7
    }
  ],
  'prod-03': [
    {
      id: 'rev-03-1',
      productId: 'prod-03',
      authorName: 'Chantal Uwamahoro',
      location: 'Kiyovu, Kigali',
      rating: 5,
      date: '4 days ago',
      comment: 'Stunning craftsmanship! The Agaseke peace basket came with an authentic artisan authenticity certificate. I bought this as a gift for a visiting colleague and they were thrilled.',
      verifiedPurchase: true,
      helpfulCount: 18
    },
    {
      id: 'rev-03-2',
      productId: 'prod-03',
      authorName: 'David Bizimana',
      location: 'Kanombe, Kigali',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Proud of Rwandan artisans. Hand-woven perfection and the colors match the photos exactly. Packaged beautifully in eco-friendly wrapping.',
      verifiedPurchase: true,
      helpfulCount: 11
    }
  ],
  'prod-premium-wireless-headphones': [
    {
      id: 'rev-hp-1',
      productId: 'prod-premium-wireless-headphones',
      authorName: 'Eric Mugisha',
      location: 'Nyarutarama, Kigali',
      rating: 5,
      date: 'Yesterday',
      comment: 'Incredible sound quality for 45,000 RWF! The bass is punchy without distorting vocals, and the battery lasted me 4 full workdays before needing a charge. Ishema Express delivered it in 35 minutes via moto.',
      verifiedPurchase: true,
      helpfulCount: 16
    },
    {
      id: 'rev-hp-2',
      productId: 'prod-premium-wireless-headphones',
      authorName: 'Diane Uwase',
      location: 'Kimihurura, Kigali',
      rating: 5,
      date: '3 days ago',
      comment: 'I ordered the Platinum Silver color. The ear cushions are so soft that I wear them during long Zoom meetings without any ear fatigue. Microphone is clear and loud.',
      verifiedPurchase: true,
      helpfulCount: 12
    },
    {
      id: 'rev-hp-3',
      productId: 'prod-premium-wireless-headphones',
      authorName: 'Jean-Claude Habimana',
      location: 'Gishushu, Kigali',
      rating: 5,
      date: '5 days ago',
      comment: 'Super fast Bluetooth 5.3 pairing with both my MacBook and Android phone. The USB-C quick charge is super convenient. Highly recommend Ishema Electronics!',
      verifiedPurchase: true,
      helpfulCount: 8
    },
    {
      id: 'rev-hp-4',
      productId: 'prod-premium-wireless-headphones',
      authorName: 'Sandrine Mutoni',
      location: 'Remera, Kigali',
      rating: 4,
      date: '1 week ago',
      comment: 'Worth every franc. Came sealed in official packaging with 1-year warranty card and backup AUX audio cable. Quick delivery right to my door.',
      verifiedPurchase: true,
      helpfulCount: 5
    }
  ]
};

export const getFallbackReviews = (productId: string, productName: string): CustomerReviewItem[] => {
  return [
    {
      id: `rev-gen-${productId}-1`,
      productId,
      authorName: 'Christian Nshimiyimana',
      location: 'Kimihurura, Kigali',
      rating: 5,
      date: '3 days ago',
      comment: `Excellent quality! The ${productName} matched the description exactly. Fast dispatch by Ishema Express driver.`,
      verifiedPurchase: true,
      helpfulCount: 6
    },
    {
      id: `rev-gen-${productId}-2`,
      productId,
      authorName: 'Marie Claire Gasana',
      location: 'Remera, Kigali',
      rating: 5,
      date: '1 week ago',
      comment: 'Very reliable merchant. Delivered right to my compound gate with zero hassle. Will definitely reorder soon.',
      verifiedPurchase: true,
      helpfulCount: 4
    }
  ];
};
