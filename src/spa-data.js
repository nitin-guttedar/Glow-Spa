// Glow Spa Data Architecture & Specifications
// Expanded with full 12 modalities, 8 Kalaburagi localities, FAQs, stats, and client reviews

export const SPA_CONFIG = {
  brandName: "Glow Spa",
  brandLegacy: "Glow Spa",
  tagline: "Sanctuary of Contemporary Wellness & Tactile Serenity",
  rating: 5.0,
  reviewsCount: 238,
  address: {
    line1: "Office No. 2, First Floor",
    building: "Above Onyx The Italian Marble Store",
    corridor: "Ram Mandir Service Road, Near Dhanvantari Hospital",
    area: "Daryapur / Kotnoor",
    city: "Kalaburagi (Gulbarga)",
    state: "Karnataka",
    pincode: "585102",
    country: "India",
    full: "Office No. 2, 1st Floor, Above Onyx The Italian Marble Store, Ram Mandir Service Road, Near Dhanvantari Hospital, Daryapur / Kotnoor, Kalaburagi, Karnataka 585102"
  },
  coordinates: {
    lat: 17.299732,
    lng: 76.819915,
    zoom: 17
  },
  hours: {
    days: "Monday – Sunday (All 7 Days Open)",
    time: "11:00 AM – 10:00 PM",
    lastAppointment: "09:00 PM"
  },
  contact: {
    phone: "+91 94801 82920",
    phoneDisplay: "+91 94801 82920",
    whatsapp: "919480182920",
    email: "concierge@glowspa.in"
  }
};

export const STATS = [
  { number: "99%", target: 99, suffix: "%", label: "Client Satisfaction" },
  { number: "230+", target: 230, suffix: "+", label: "Verified 5-Star Reviews" },
  { number: "12+", target: 12, suffix: "+", label: "Curated Therapies & Packages" },
  { number: "7 Days", target: 7, suffix: " Days", label: "11:00 AM – 10:00 PM Open" }
];

export const SPATIAL_SPACES = [
  {
    id: "reception-desk",
    title: "Walnut Fluted Reception & Illuminated Lotus",
    subtitle: "The Arrival Threshold",
    category: "Arrival",
    image: "/assets/reception-desk.jpg",
    description: "Defined by handcrafted vertical fluted dark walnut wood paneling, an illuminated pure white lotus emblem, and polished Carrara marble flooring. The entrance creates an immediate transition from the bustling corridor into a quiet sanctuary.",
    features: ["Vertical Fluted Walnut Paneling", "Backlit Lotus Insignia", "Carrara Marble Veining", "Concierge Check-in Desk"]
  },
  {
    id: "reception-lounge",
    title: "Welcome Lounge & Crystal Chandelier",
    subtitle: "Sanctuary Waiting Lounge",
    category: "Arrival",
    image: "/assets/reception-lounge.jpg",
    description: "Features a circular halo-lit recessed ceiling dome, delicate crystal pendant chandelier, plush suede sofa seating, and illuminated recessed wall alcoves with living botanicals.",
    features: ["Circular Halo Cove Lighting", "Crystal Chandelier Drop", "Teal Geometric Wallpaper", "Living Indoor Botanicals"]
  },
  {
    id: "therapy-suite-purple",
    title: "Private Therapy Suite with Chromotherapy",
    subtitle: "Chromotherapy Sanctuary",
    category: "Suites",
    image: "/assets/therapy-suite-purple.jpg",
    description: "Individual private treatment sanctuary featuring therapeutic lilac-violet ambient downlighting designed to lower heart rate and cortisol levels. Solid timber massage bed, marble vanity, and dedicated climate control.",
    features: ["Lilac-Violet Ambient Diodes", "Solid Timber Treatment Table", "Personal Climate Control (Acer AC)", "Private Handwash & Mirror Vanity"]
  },
  {
    id: "therapy-suite-shower",
    title: "Private En-Suite Hydrotherapy Suite",
    subtitle: "With En-Suite Glass Shower",
    category: "Hydrotherapy",
    image: "/assets/therapy-suite-shower.jpg",
    description: "Every private therapy suite is paired with an en-suite frosted glass shower cubicle, ensuring complete privacy from start to finish without needing to step into shared corridors.",
    features: ["En-Suite Frosted Glass Shower", "High-Pressure Hot Water System", "Single-Use Sanitized Linens", "Private Lockable Storage"]
  },
  {
    id: "master-suite",
    title: "Master Couples & VIP Sanctuary Suite",
    subtitle: "Synchronized Dual Relaxation",
    category: "Suites",
    image: "/assets/master-suite.jpg",
    description: "An expansive suite adorned with deep textured geometric acoustic wall coverings, dual therapist circulation space, dedicated leather seating, and en-suite hydrotherapy shower.",
    features: ["Deep Geometric Acoustic Wallpaper", "Master Timber Treatment Bed", "Leather Armchair Lounge", "Private Hydro Shower Enclosure"]
  },
  {
    id: "tatami-thai-suite",
    title: "Traditional Thai & Floor Bodywork Suite",
    subtitle: "Grounded Energy Balancing",
    category: "Traditional",
    image: "/assets/tatami-thai-suite.jpg",
    description: "Designed for traditional Thai yoga bodywork and deep acupressure stretching. Features a low platform cushioned mat with luxury folded towel art and gold-line geometric wallpaper.",
    features: ["Low Platform Tatami Massage Bed", "Black & Gold Architectural Wallpaper", "Folded Swan Linen Presentation", "Recliner Relaxation Armchair"]
  }
];

export const SERVICES = [
  {
    id: "hammam-turkish-bath",
    category: "Hydrothermal",
    name: "Hammam Signature Turkish Bath",
    duration: "60 / 90 min",
    priceRange: "₹2,499 – ₹3,999",
    basePrice: 2499,
    tag: "Signature Hydrothermal",
    image: "/assets/therapy-suite-shower.jpg",
    isPopular: true,
    shortDesc: "Mediterranean hydrothermal ritual combining eucalyptus steam, natural castile foam cleansing, and vigorous Kessa glove body exfoliation.",
    fullDesc: "Our signature hydrothermal journey takes place in a dedicated heated wet room. Warm eucalyptus vapors open pores and detoxify the respiratory system before an authentic olive-oil castile foam bath and gentle friction peeling remove dead skin cells, leaving the skin glowing and deeply nourished.",
    benefits: ["Full-body dermal exfoliation", "Deep pulmonary steam detoxification", "Stimulates lymphatic drainage", "Restores silky skin texture"],
    includes: ["Eucalyptus Steam Inhalation", "Kessa Mitt Exfoliation", "Castile Olive Foam Cloud", "Private En-Suite Shower", "Warm Herbal Infusion Drink"]
  },
  {
    id: "swedish-relaxation",
    category: "Therapeutic",
    name: "Classic Swedish Muscle Relaxation",
    duration: "60 / 90 min",
    priceRange: "₹1,500 – ₹2,000",
    basePrice: 1500,
    tag: "Stress Relief",
    image: "/assets/therapy-suite-purple.jpg",
    isPopular: true,
    shortDesc: "Gentle effleurage, kneading, and rhythmic friction strokes with warmed cold-pressed sweet almond oil to dissolve daily fatigue.",
    fullDesc: "The quintessential therapeutic massage designed to alleviate tension, increase arterial blood flow, and induce profound somatic relaxation. Using continuous fluid strokes and gentle petrissage, our therapists melt muscle stiffness while honoring personal pressure preferences.",
    benefits: ["Eases chronic nervous tension", "Improves circulation and oxygenation", "Relieves travel and work stiffness", "Promotes restorative deep sleep"],
    includes: ["Warmed Cold-Pressed Almond Oil", "Full Body Effleurage Work", "Hot Towel Foot Compress", "Private En-Suite Shower"]
  },
  {
    id: "kerala-ayurvedic-abhyanga",
    category: "Traditional",
    name: "Kerala Authentic Ayurvedic Abhyanga",
    duration: "60 / 90 min",
    priceRange: "₹1,800 – ₹2,500",
    basePrice: 1800,
    tag: "Authentic Ayurveda",
    image: "/assets/master-suite.jpg",
    isPopular: false,
    shortDesc: "Centuries-old Kerala healing tradition using warm dosha-specific medicated herbal oils applied in 7 classical rhythmic marma postures.",
    fullDesc: "Administered according to time-tested Vedic principles, warm herbalized oils (taila) are massaged deeply along the energy meridians (nadis). This holistic therapy calms the Vata dosha, lubricates joint articulation, nourishes cutaneous tissues, and eliminates metabolic toxins.",
    benefits: ["Balances Vata and nervous constitution", "Strengthens immunity (Ojas)", "Tones muscles and lubricates joints", "Deeply pacifies emotional anxiety"],
    includes: ["Warm Medicated Kerala Herbal Taila", "7-Posture Rhythmic Strokes", "Marma Energy Point Alignment", "Herbal Hot Towel Wipe & Shower"]
  },
  {
    id: "deep-tissue-recovery",
    category: "Deep Tissue",
    name: "Intensive Deep Muscle Recovery",
    duration: "60 / 90 min",
    priceRange: "₹1,800 – ₹2,400",
    basePrice: 1800,
    tag: "Postural & Sports",
    image: "/assets/therapy-suite-purple.jpg",
    isPopular: true,
    shortDesc: "Focused slow-stroke myofascial pressure targeting deep muscular knots, chronic neck stiffness, and lower back tension.",
    fullDesc: "Engineered specifically for individuals with chronic postural strain from long desk hours, driving, or intense physical training. Therapists utilize forearms, palms, and knuckles to release adhesions within muscle fibers and realign tissue layers.",
    benefits: ["Releases chronic muscular adhesions (knots)", "Corrects desk and driving posture strain", "Restores mobility in shoulders & lumbar", "Accelerates muscle recovery"],
    includes: ["Deep Tissue Botanical Liniment", "Targeted Trigger Point Compression", "Spinal & Trapezius Work", "Private En-Suite Shower"]
  },
  {
    id: "thai-yoga-bodywork",
    category: "Holistic",
    name: "Traditional Thai Yoga Bodywork",
    duration: "60 / 90 min",
    priceRange: "₹1,699 – ₹2,499",
    basePrice: 1699,
    tag: "Floor Bodywork",
    image: "/assets/tatami-thai-suite.jpg",
    isPopular: false,
    shortDesc: "Performed on a low floor tatami mat: passive assisted yogic stretching and thumb acupressure along natural sen energy lines.",
    fullDesc: "Often described as 'assisted yoga', this dynamic dry therapy combines rhythmic acupressure, gentle rocking, and guided stretches without oils. Worn in loose, comfortable attire, it enhances joint flexibility, unblocks energy blockages, and releases tension throughout the kinetic chain.",
    benefits: ["Dramatically improves joint flexibility", "Rebalances kinetic alignment", "Releases fascia without oil residue", "Leaves body feeling light and energized"],
    includes: ["Dedicated Low Tatami Suite", "Full-Body Assisted Yogic Stretches", "Acupressure Sen Work", "Herbal Green Tea Service"]
  },
  {
    id: "couples-indulgence-suite",
    category: "Couples",
    name: "Glow Signature Couples Sanctuary Suite",
    duration: "90 / 120 min",
    priceRange: "₹3,499 – ₹4,999",
    basePrice: 3499,
    tag: "Couples Experience",
    image: "/assets/master-suite.jpg",
    isPopular: true,
    shortDesc: "Side-by-side synchronized full-body massage in our spacious master VIP suite, complete with ambient candlelight and private en-suite shower.",
    fullDesc: "Designed for couples, spouses, or close companions seeking an exclusive retreat together. Two dedicated senior therapists provide synchronized therapies in our master suite, paired with soothing aromatic steam and complimentary refreshments.",
    benefits: ["Shared rejuvenating wellness experience", "Private spacious VIP suite booking", "Synchronized therapist pairing", "Complete privacy with en-suite shower"],
    includes: ["Master Suite Exclusive Use", "Synchronized Dual Full-Body Massage", "Aromatic Steam Session", "Private Shower Access", "Signature Refreshment Tray"]
  },
  {
    id: "balinese-aromatherapy",
    category: "Therapeutic",
    name: "Balinese Exotic Aromatherapy Ritual",
    duration: "60 / 90 min",
    priceRange: "₹1,700 – ₹2,200",
    basePrice: 1700,
    tag: "Sensory Calm",
    image: "/assets/reception-lounge.jpg",
    isPopular: false,
    shortDesc: "Harmonious blend of skin-rolling, gentle kneading, and essential oils of lavender, lemongrass, and ylang-ylang.",
    fullDesc: "Originating in Indonesian royal courts, Balinese massage combines gentle stretches, acupressure, and aromatherapy to stimulate the flow of blood, oxygen, and 'qi' (energy) around your body, bringing deep peacefulness to mind and spirit.",
    benefits: ["Induces deeply sedative relaxation", "Harmonizes sensory nervous system", "Nourishes skin with botanical aromas", "Relieves headaches and mental fatigue"],
    includes: ["Custom Essential Oil Selection", "Palm & Thumb Pressure Work", "Scalp & Temples Massage", "Private Shower Session"]
  },
  {
    id: "full-body-spa-massage",
    category: "Therapeutic",
    name: "Full Body Spa & Harmonic Massage",
    duration: "60 / 90 min",
    priceRange: "₹1,600 – ₹2,200",
    basePrice: 1600,
    tag: "Head to Toe",
    image: "/assets/therapy-suite-purple.jpg",
    isPopular: true,
    shortDesc: "Comprehensive top-to-toe therapy targeting muscles from scalp to soles. Restores vital circulation and dispels chronic fatigue.",
    fullDesc: "A complete restorative ritual designed to rebalance the entire kinetic body. Incorporates rhythmic Swedish techniques, acupressure along spinal meridians, and warm foot compresses to leave you fully refreshed.",
    benefits: ["Comprehensive whole-body reset", "Relieves sciatic and neck tension", "Improves blood circulation", "Soothes overworked muscles"],
    includes: ["Warm Botanical Oil Blend", "Full Head-to-Toe Bodywork", "Hot Towel Compression", "En-Suite Shower"]
  },
  {
    id: "jacuzzi-hydro-bath",
    category: "Hydrothermal",
    name: "Jacuzzi Spa & Hydro Jet Relaxation",
    duration: "45 / 60 min",
    priceRange: "₹1,499 – ₹1,999",
    basePrice: 1499,
    tag: "Hydro Jet Relief",
    image: "/assets/therapy-suite-shower.jpg",
    isPopular: false,
    shortDesc: "Warm pressurized water jets massage spine, calves, and shoulders while soothing mineral salts detoxify the skin.",
    fullDesc: "Immerse yourself in pressurized hydro-massage jets. The pulsating warm mineral water relieves pressure on joints, stimulates lymphatic return, and primes muscular tissue for deep rest.",
    benefits: ["Decompresses spinal vertebrae", "Stimulates arterial blood flow", "Relieves arthritic joint stiffness", "Provides weightless physical comfort"],
    includes: ["Therapeutic Bath Salt Infusion", "High-Pressure Multi-Jet System", "Plush Microfiber Robe & Towels", "Cool Hydration Beverage"]
  },
  {
    id: "herbal-steam-addon",
    category: "Hydrothermal",
    name: "Eucalyptus Herbal Steam Bath",
    duration: "30 / 45 min",
    priceRange: "₹699 – ₹999",
    basePrice: 699,
    tag: "Herbal Detox",
    image: "/assets/therapy-suite-shower.jpg",
    isPopular: false,
    shortDesc: "Infused with organic Nilgiri eucalyptus leaves to open skin pores, relieve sinus congestion, and warm muscles.",
    fullDesc: "The perfect detoxifying ritual. The therapeutic steam chamber warms and softens muscular tissues, allowing subsequent massage strokes to penetrate deeper with minimal friction.",
    benefits: ["Opens dermal pores for oil absorption", "Clears bronchial and sinus passages", "Relaxes superficial myofascia", "Prepares body for deep therapy"],
    includes: ["Organic Nilgiri Eucalyptus Infusion", "Private Steam Chamber Access", "Cold Towel Compress", "Electrolyte Hydration Drink"]
  },
  {
    id: "reflexology-session",
    category: "Holistic",
    name: "Foot & Hand Acupressure Reflexology",
    duration: "45 / 60 min",
    priceRange: "₹1,199 – ₹1,599",
    basePrice: 1199,
    tag: "Acupressure",
    image: "/assets/tatami-thai-suite.jpg",
    isPopular: false,
    shortDesc: "Stimulates precise reflex zones on feet and palms corresponding to internal organs and glands to restore natural equilibrium.",
    fullDesc: "An ancient healing modality focusing on nerve endings in the feet and hands. By applying firm thumb-and-finger walking pressure, therapists break down crystalline calcium deposits and stimulate vitality.",
    benefits: ["Relieves foot pain and plantar fatigue", "Improves organ vitality and digestion", "Deeply grounding and calming", "Can be received in comfortable clothing"],
    includes: ["Warm Herbal Foot Soak", "Reflex Zone Acupressure Cream", "Calf & Ankle Mobilization", "Herbal Refreshment"]
  },
  {
    id: "dry-sauna-detox",
    category: "Hydrothermal",
    name: "Dry Sauna Thermal Detox Session",
    duration: "30 / 45 min",
    priceRange: "₹899 – ₹1,299",
    basePrice: 899,
    tag: "Thermal Cleansing",
    image: "/assets/therapy-suite-shower.jpg",
    isPopular: false,
    shortDesc: "Dry heat induces profuse sweating to eliminate environmental impurities, soothe joint stiffness, and enhance calorie burn.",
    fullDesc: "Step into dry therapeutic warmth. The radiant heat raises skin temperature, improves cardiovascular circulation, and triggers endorphin release for a clean, renewed sensation.",
    benefits: ["Flushes heavy toxins through perspiration", "Accelerates post-workout muscle repair", "Relieves rheumatologic stiffness", "Clears mind and boosts circulation"],
    includes: ["Private Sauna Cabin Session", "Cold Water Facial Mist", "Plush Bath Sheet", "Hydrating Coconut Water"]
  }
];

export const REVIEWS = [
  {
    name: "Anand Guttedar",
    location: "Kalaburagi City",
    rating: 5,
    date: "Verified Google Review",
    text: "The best and most professional spa experience in Kalaburagi by far. The reception desk and walnut wooden interior give a 5-star hotel feel. I took the Swedish massage and the therapist was very skilled and respectful. Having the private shower right inside the room is a huge plus!"
  },
  {
    name: "Pooja & Sachin Patil",
    location: "Sedam Road, Gulbarga",
    rating: 5,
    date: "Verified Google Review",
    text: "Booked the Couples Signature suite for our anniversary. Exceptional ambiance with the purple ambient lights, clean marble floors, and spotless towels. Extremely family and couple friendly. Highly recommended!"
  },
  {
    name: "Dr. Vikram Deshmukh",
    location: "Near Dhanvantari Hospital",
    rating: 5,
    date: "Verified Google Review",
    text: "Being a physician right down the corridor near Dhanvantari Hospital, I experience heavy back fatigue. Their deep tissue muscle recovery therapy was truly therapeutic. Clean, hygienic, and very well maintained."
  },
  {
    name: "Mallikarjun K.",
    location: "Station Road, Kalaburagi",
    rating: 5,
    date: "Verified Google Review",
    text: "I was surprised to find authentic Turkish Hammam and Kerala Ayurvedic Abhyanga in Gulbarga. The booking via WhatsApp was instant and transparent pricing without hidden charges. 10/10 hygiene standards."
  },
  {
    name: "Sneha Reddy",
    location: "Jewargi Road, Kalaburagi",
    rating: 5,
    date: "Verified Google Review",
    text: "Very peaceful and dignified atmosphere. Female-friendly, secure, with attentive staff. The hot herbal shower after the massage was heavenly. Glow Spa is definitely the premier wellness place in our city."
  },
  {
    name: "Rameshwar Rao",
    location: "Jagat Circle, Kalaburagi",
    rating: 5,
    date: "Verified Google Review",
    text: "Top-notch cleanliness. Fresh sheets, sanitized rooms, and private AC in each room. The traditional Thai bodywork relieved my chronic sciatic pain. Great job to the team."
  },
  {
    name: "Kavitha Sharan",
    location: "High Court Ring Road",
    rating: 5,
    date: "Verified Google Review",
    text: "Loved the quiet, discreet atmosphere. They don't compromise on hygiene—fresh disposable undergarments and spotless towels. The therapists understand proper anatomy and pressure."
  },
  {
    name: "Vijaykumar Biradar",
    location: "MSK Mill Road, Gulbarga",
    rating: 5,
    date: "Verified Google Review",
    text: "I have visited many spas across Karnataka and Glow Spa matches 5-star resort quality. Authentic herbal oils, friendly front desk, and direct WhatsApp booking. Will visit regularly."
  }
];

export const HYGIENE_PILLARS = [
  {
    icon: "sparkles",
    title: "100% Single-Use & Fresh Linens",
    desc: "Every therapy bed receives freshly laundered, medical-grade sanitized linens, disposable undergarments, and headrest covers for every single guest."
  },
  {
    icon: "droplet",
    title: "Private En-Suite Glass Showers",
    desc: "No shared corridors or communal showers. Each private therapy room includes its own dedicated hot-water glass shower cabin, sanitized between visits."
  },
  {
    icon: "leaf",
    title: "Cold-Pressed Botanical Oils",
    desc: "We exclusively use pure, skin-grade cold-pressed sweet almond, virgin sesame, and certified Ayurvedic herbal preparations free from mineral oils."
  },
  {
    icon: "shield-check",
    title: "Certified & Background-Verified Staff",
    desc: "Our therapists are certified graduates of accredited wellness academies with verified professional credentials and strict hospitality decorum."
  },
  {
    icon: "wind",
    title: "Independent Climate Control",
    desc: "Individual silent inverter AC systems (Acer) in each treatment room allow you to set your exact preferred thermal comfort level throughout your session."
  },
  {
    icon: "lock",
    title: "Dignified & Family-Friendly",
    desc: "A strictly professional, family-welcoming wellness sanctuary maintaining high moral standards, respectful boundaries, and discreet guest privacy."
  }
];

export const NEIGHBORHOOD_GUIDES = [
  {
    zone: "Ram Mandir & Daryapur Corridor",
    distance: "0 mins • On-site corridor",
    directions: "Located directly on the Ram Mandir Service Road, on the First Floor above Onyx The Italian Marble Store, adjacent to Dhanvantari Hospital. Dedicated on-site parking available."
  },
  {
    zone: "Station Road & Railway Station",
    distance: "4.2 km • ~10 mins drive",
    directions: "Head south-east via Station Road towards Ram Mandir Service Road corridor. Perfect for arriving travelers seeking recovery after long train journeys."
  },
  {
    zone: "Jagat Circle & Central Market",
    distance: "3.5 km • ~8 mins drive",
    directions: "Follow Main Road south toward Kotnoor/Daryapur junction. Easily accessible by auto-rickshaw or personal vehicle with prominent signage above Onyx Marble."
  },
  {
    zone: "Sedam Road & Medical Hub",
    distance: "5.8 km • ~12 mins drive",
    directions: "Take the Ring Road connector toward Ram Mandir bypass. Convenient weekend retreat for doctors, faculty, and residents of eastern Kalaburagi."
  },
  {
    zone: "Jewargi Road & Kotnoor D",
    distance: "2.1 km • ~6 mins drive",
    directions: "Direct route via Jewargi main corridor into Ram Mandir Service Road. Quick access for neighboring residential townships."
  },
  {
    zone: "Old City & Kalaburagi Fort Area",
    distance: "5.0 km • ~12 mins drive",
    directions: "Travel south-west via Fort Road towards Daryapur cross. Direct route with minimal traffic during afternoon and evening hours."
  },
  {
    zone: "High Court & Ring Road Corridor",
    distance: "6.5 km • ~14 mins drive",
    directions: "Fast bypass via Ring Road into Ram Mandir Service Road. Favored by legal professionals and corporate executives."
  },
  {
    zone: "MSK Mill Road & Shanti Nagar",
    distance: "3.0 km • ~7 mins drive",
    directions: "Direct east-bound drive along connecting service lanes with easy parking."
  }
];

export const FAQS = [
  {
    q: "What should I wear during my massage or spa session?",
    a: "We provide high-grade disposable spa undergarments, fresh towels, and plush robes. During your session, therapists practice professional draping techniques, ensuring only the specific area being massaged is exposed. For dry therapies like Thai Yoga bodywork, loose comfortable attire is provided."
  },
  {
    q: "Are the therapists certified and verified?",
    a: "Yes, 100%. All therapists at Glow Spa are certified graduates of accredited wellness academies with documented professional credentials and police background verifications. They maintain strict ethical standards and courteous decorum at all times."
  },
  {
    q: "Is advance booking required, or can I walk in?",
    a: "While walk-ins are accommodated subject to room availability, we strongly recommend booking at least 1–2 hours in advance via our instant WhatsApp link or direct call. This guarantees your preferred private suite, AC temperature pre-setting, and therapist preference."
  },
  {
    q: "Are showers and clean towels provided in each room?",
    a: "Yes. Every private therapy suite at Glow Spa is equipped with its own attached, en-suite frosted glass hot-water shower cabin. You do not need to walk through shared hallways. Freshly laundered towels, body wash, and hair dryers are provided complimentary."
  },
  {
    q: "Do you offer couple and family-friendly packages?",
    a: "Absolutely. Glow Spa (celebrated as Glow Spa) is proud to be a strictly professional, family-friendly sanctuary. We offer our spacious Master VIP Suite with side-by-side tables for couples, spouses, or close family members."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major payment methods upon arrival: UPI (Google Pay, PhonePe, Paytm), Credit & Debit Cards, and Cash. No online advance payment or card details are required to reserve your slot."
  }
];

export const TOP_SERVICES = [
  {
    id: "deep-tissue-recovery",
    name: "Deep Tissue Muscle Recovery",
    category: "Deep Therapy",
    duration: "60 / 90 min",
    price: "₹1,699",
    image: "/assets/master-suite.jpg",
    tag: "Intense Fascia Relief",
    desc: "Firm, targeted trigger-point pressure designed to break down chronic postural knots, alleviate neck & lower back strain, and release deep myofascial tension."
  },
  {
    id: "swedish-relaxation",
    name: "Swedish Royal Relaxation",
    category: "Relaxation",
    duration: "60 / 90 min",
    price: "₹1,499",
    image: "/assets/therapy-suite-purple.jpg",
    tag: "Gentle Calming Flow",
    desc: "Gentle, rhythmic effleurage and friction strokes using warm botanical oils to melt systemic anxiety, regulate circulation, and soothe your sensory nervous system."
  },
  {
    id: "turkish-hammam-steam",
    name: "Turkish Hydrothermal Hammam",
    category: "Hydrothermal",
    duration: "75 / 90 min",
    price: "₹2,199",
    image: "/assets/therapy-suite-shower.jpg",
    tag: "Purifying Eucalyptus Steam",
    desc: "Mediterranean body scrub with organic eucalyptus steam mist and clarifying olive oil foam bath that deeply opens dermal pores and detoxifies the entire body."
  },
  {
    id: "traditional-thai-bodywork",
    name: "Traditional Thai Tatami Therapy",
    category: "Holistic",
    duration: "60 / 90 min",
    price: "₹1,799",
    image: "/assets/tatami-thai-suite.jpg",
    tag: "Acupressure & Assisted Yoga",
    desc: "Performed on comfortable traditional floor tatami mats without oil. Integrates passive yoga stretches, rhythmic palming, and meridian line stimulation."
  },
  {
    id: "couples-sanctuary-ritual",
    name: "Couples VIP Sanctuary Ritual",
    category: "Signature VIP",
    duration: "90 / 120 min",
    price: "₹3,499",
    image: "/assets/reception-lounge.jpg",
    tag: "Dual Table VIP Suite",
    desc: "Side-by-side synchronized treatment in our largest executive suite. Includes dual botanical massages, private steam bath, and warm herbal tea service."
  },
  {
    id: "balinese-island-therapy",
    name: "Balinese Island Herbal Therapy",
    category: "Relaxation",
    duration: "60 / 90 min",
    price: "₹1,799",
    image: "/assets/reception-desk.jpg",
    tag: "Deep Herbal Rolling",
    desc: "An exotic harmony of gentle stretches, skin rolling, and targeted acupressure with warm frangipani and sandalwood essential oils to awaken natural prana."
  }
];

export const BLOG_POSTS = [
  {
    id: "daryapur-spa-booking-guide",
    slug: "daryapur-spa-booking-guide",
    area: "Daryapur",
    category: "Booking Checklist",
    title: "Spa Booking Guide for Daryapur Residents",
    subtitle: "Booking with Confidence",
    readTime: "3 min read",
    image: "/assets/blog-daryapur.jpg",
    summary: "A practical guide for Daryapur residents to check treatment menus, verify duration vs. hands-on massage time, and confirm entrance details before booking.",
    paragraphs: [
      "A good spa appointment starts with clear information. If you are comparing options from Daryapur, begin by checking the treatment menu, the total price and the exact appointment duration.",
      "Ask whether the quoted time refers to the massage itself or the complete visit, including consultation and changing. Also confirm which facilities are included and which cost extra. Two packages with similar names may offer different experiences.",
      "Before travelling, request the verified location pin and a photograph of the building entrance. Confirm the floor, entry point and whether any accessibility arrangements are available. Glow Spa is located on the 1st floor above Onyx Italian Marble on Ram Mandir Service Road.",
      "Your preferences matter throughout the appointment. Explain your preferred pressure and any areas you do not want included before the session begins."
    ],
    bookingMessage: "Hello GLOW FAMILY SPA. I am enquiring from Daryapur. Please share your current menu, total prices, available appointments and verified location pin.",
    tags: ["Daryapur", "Booking Checklist", "Massage Menu", "Gulbarga Spa"]
  },
  {
    id: "ram-mandir-circle-spa-appointment",
    slug: "ram-mandir-circle-spa-appointment",
    area: "Ram Mandir Circle",
    category: "Timing & Schedule",
    title: "Planning a Spa Appointment from Ram Mandir Circle",
    subtitle: "Timing Matters",
    readTime: "3 min read",
    image: "/assets/blog-ram-mandir.jpg",
    summary: "Plan your complete visit time, consultation, and check-in without rushing, with verified map pin guidance near Ram Mandir Circle.",
    paragraphs: [
      "When arranging a spa appointment from Ram Mandir Circle, plan the complete visit rather than just the treatment time. Ask about check-in, consultation, changing and any separately booked facilities.",
      "A confirmed appointment is more useful than a vague promise that a therapist will be available. Request the service name, start time and expected finishing time in writing.",
      "Check the cancellation and rescheduling conditions before paying a deposit. If your plans change, knowing the notice period helps avoid unnecessary confusion.",
      "Use the spa’s verified map pin for navigation. Do not assume that a nearby landmark, a directory listing or an old social media post identifies the correct entrance."
    ],
    bookingMessage: "Please confirm an appointment, the expected total visit time, the exact entrance and your rescheduling policy.",
    tags: ["Ram Mandir Circle", "Visit Planning", "Appointment Timing"]
  },
  {
    id: "kotnoor-d-first-spa-visit",
    slug: "kotnoor-d-first-spa-visit",
    area: "Kotnoor D",
    category: "First-Time Visit",
    title: "First-Time Spa Booking Questions for Kotnoor D Residents",
    subtitle: "First-Visit Questions",
    readTime: "4 min read",
    image: "/assets/blog-kotnoor.jpg",
    summary: "Straightforward answers on consultation, changing arrangements, pressure preferences, and privacy for first-time visitors from Kotnoor D.",
    paragraphs: [
      "A first massage appointment should not require guessing what happens next. Before booking from Kotnoor D, ask the spa to explain the consultation, changing arrangements and session process in straightforward language.",
      "Explain whether you prefer lighter or firmer pressure. You can also ask which areas the selected treatment normally includes and identify any areas you want excluded.",
      "Ask about draping, privacy and whether therapist preferences can be accommodated. Availability should be confirmed rather than assumed from photographs or advertising.",
      "During the session, you should feel comfortable asking for a change or requesting that it stop. A clearly explained service is more valuable than a package description filled with unfamiliar terms."
    ],
    bookingMessage: "This is my first spa visit. Please explain the process, privacy arrangements, available therapist options and total price.",
    tags: ["Kotnoor D", "First-Time Spa", "Privacy & Draping"]
  },
  {
    id: "gda-layout-spa-package-guide",
    slug: "gda-layout-spa-package-guide",
    area: "GDA Layout",
    category: "Package Value",
    title: "Comparing Spa Packages from GDA Layout",
    subtitle: "Compare Package Value",
    readTime: "3 min read",
    image: "/assets/blog-gda-layout.jpg",
    summary: "How to evaluate hands-on massage time, included facilities (steam/shower), and transparent quotes without missing extra charges.",
    paragraphs: [
      "The lowest advertised spa price is not always the easiest offer to compare. When enquiring from GDA Layout, request a written breakdown of the treatment, duration and facilities included.",
      "Check whether steam, a shower or another facility is part of the package or a separate purchase. Ask whether taxes and other applicable charges are included in the final quote.",
      "Compare packages using the same criteria: treatment type, hands-on time, total visit time and confirmed inclusions. A longer package is not automatically the better choice if it includes services you do not want.",
      "Avoid paying for a membership before understanding its validity, booking restrictions, cancellation terms and refund conditions."
    ],
    bookingMessage: "Please send the complete package inclusions, massage duration, final payable amount and any membership conditions.",
    tags: ["GDA Layout", "Package Comparison", "Transparent Billing"]
  },
  {
    id: "old-jewargi-road-massage-prices",
    slug: "old-jewargi-road-massage-prices",
    area: "Old Jewargi Road",
    category: "Transparent Pricing",
    title: "Understanding Massage Prices from Old Jewargi Road",
    subtitle: "Clear Pricing",
    readTime: "3 min read",
    image: "/assets/blog-old-jewargi.jpg",
    summary: "Demystifying 'starting from' quotes, session durations, optional extras, and transparent billing for Old Jewargi Road clients.",
    paragraphs: [
      "An advertised “starting from” price does not tell you the final cost of a specific appointment. When comparing spa options from Old Jewargi Road, ask for a quote for the exact service and duration you want.",
      "Check what changes the price. This may include a different session length, an optional facility or a package upgrade. Do not assume that every photographed facility is included.",
      "Ask when payment is due and whether a receipt will be provided. If there is an offer, request its expiry date, eligibility conditions and exclusions.",
      "You do not need to accept an upgrade simply because it is suggested. Choose a service you understand and a price you have agreed to beforehand."
    ],
    bookingMessage: "Please quote the final amount for the selected treatment, including applicable charges, and explain any optional extras.",
    tags: ["Old Jewargi Road", "Pricing Transparency", "No Hidden Costs"]
  },
  {
    id: "station-road-travel-spa-planning",
    slug: "station-road-travel-spa-planning",
    area: "Station Road",
    category: "Travel Recovery",
    title: "Planning a Spa Appointment Before or After Travel",
    subtitle: "Travel-Friendly Planning",
    readTime: "4 min read",
    image: "/assets/blog-station-road.jpg",
    summary: "Organise your recovery session around train schedules, check visit duration, luggage storage, and avoid travel delays from Station Road.",
    paragraphs: [
      "If your day includes Station Road and a train journey, organise the spa appointment around your confirmed travel schedule—not the other way around.",
      "Allow time for the journey to the spa, check-in and any unexpected delay. Ask for the appointment’s expected finishing time before committing to a booking close to departure.",
      "If travelling with luggage, check storage arrangements beforehand. Do not assume the spa can accommodate bags or provide a waiting area. Glow Spa offers secure luggage lockers for transit guests.",
      "Choose the appointment based on your comfort and available time rather than a promise of an instant transformation. If you are unwell or have concerns about whether massage is appropriate, seek suitable medical advice instead of treating a spa visit as medical care."
    ],
    bookingMessage: "I have a travel schedule to keep. Please confirm the complete visit duration and whether luggage storage is available.",
    tags: ["Station Road", "Travel Spa", "Kalaburagi Railway Station"]
  },
  {
    id: "sedam-road-massage-selection",
    slug: "sedam-road-massage-selection",
    area: "Sedam Road",
    category: "Therapy Selection",
    title: "Choosing a Massage Appointment from Sedam Road",
    subtitle: "Choose by Preference",
    readTime: "3 min read",
    image: "/assets/blog-sedam-road.jpg",
    summary: "Communicate pressure preferences, botanical oil options, and understand specific Swedish, Deep Tissue, or Thai techniques before booking.",
    paragraphs: [
      "A treatment name is only the beginning of a useful conversation. When booking from Sedam Road, explain what you are comfortable with and ask the spa to describe the actual session.",
      "Questions about pressure, oil use, clothing arrangements and movement are often more helpful than simply asking for the “best massage.” Confirm how the service is performed at that particular business.",
      "Check product information if you have a known sensitivity. Do not assume that a product described as herbal or natural is suitable for everyone. At Glow Spa, 100% cold-pressed botanical oils are customized per guest.",
      "Ask for the service details before paying, and avoid choosing a session based on promises to cure pain or other health conditions."
    ],
    bookingMessage: "Please explain the available massage options, pressure levels, products used and preparation requirements.",
    tags: ["Sedam Road", "Pressure Preferences", "Botanical Oils"]
  },
  {
    id: "biddapur-colony-spa-visit",
    slug: "biddapur-colony-spa-visit",
    area: "Biddapur Colony",
    category: "Location & Access",
    title: "Preparing for a Spa Visit from Biddapur Colony",
    subtitle: "Verify the Location",
    readTime: "3 min read",
    image: "/assets/blog-biddapur.jpg",
    summary: "Verify map pin, floor access above Onyx Italian Marble Store, entrance photos, and parking details before traveling from Biddapur Colony.",
    paragraphs: [
      "Before leaving Biddapur Colony for a spa appointment, verify that your booking information is complete. Save the correct map pin, contact number, service name and appointment time.",
      "Request a recent entrance photograph if the building is unfamiliar. Confirm the floor and ask about stairs, lift access or other access requirements relevant to you. Glow Spa is on the 1st Floor, Office No. 2, Above Onyx Marble, Ram Mandir Service Road.",
      "Parking should be checked directly. Dedicated ground-level vehicle and two-wheeler parking is available on-site.",
      "Keep the agreed price and package details in your confirmation message. This makes it easier to clarify anything that differs at reception."
    ],
    bookingMessage: "Please send your current entrance photo, floor details, access information and confirmed appointment summary.",
    tags: ["Biddapur Colony", "Directions & Access", "Parking"]
  },
  {
    id: "mecca-colony-spa-privacy-guide",
    slug: "mecca-colony-spa-privacy-guide",
    area: "Mecca Colony",
    category: "Privacy & Dignity",
    title: "A Privacy-Focused Spa Booking Guide for Mecca Colony",
    subtitle: "Privacy First",
    readTime: "4 min read",
    image: "/assets/blog-mecca-colony.jpg",
    summary: "Professional draping protocols, private en-suite shower suites, verified therapist credentials, and confidential appointment standards.",
    paragraphs: [
      "Privacy is worth discussing before you book, not only after you arrive. For an appointment planned from Mecca Colony, ask how consultation, changing and treatment-room access are managed.",
      "Confirm the draping arrangements and explain any preferences or boundaries. If you have a therapist preference, ask whether it can be accommodated for your specific appointment.",
      "Photographs used in marketing should not be treated as proof of the therapist assigned to a booking. Request clear confirmation instead.",
      "Ask how your contact details will be used and whether marketing messages are optional. You should also be able to decline photography or promotional participation without uncertainty about your service."
    ],
    bookingMessage: "Please explain your privacy arrangements and confirm any therapist preference before accepting my appointment.",
    tags: ["Mecca Colony", "Privacy & Boundaries", "Dignified Wellness"]
  },
  {
    id: "godutai-nagar-spa-scheduling",
    slug: "godutai-nagar-spa-scheduling",
    area: "Godutai Nagar",
    category: "Schedule & Repeat Visits",
    title: "Planning a Spa Appointment from Godutai Nagar",
    subtitle: "Build a Realistic Schedule",
    readTime: "3 min read",
    image: "/assets/blog-godutai-nagar.jpg",
    summary: "Fit your wellness session into a realistic schedule, understand repeat-visit package validity, and confirm slot availability.",
    paragraphs: [
      "A spa appointment is easier to enjoy when it fits comfortably into your day. Before booking from Godutai Nagar, decide how much time you can realistically set aside for the complete visit.",
      "Ask about actual appointment availability rather than assuming that listed opening hours guarantee an immediate session. Confirm whether your chosen treatment requires advance booking.",
      "If you are considering repeat visits, begin with a single appointment before committing to a package. Review the booking process, communication and overall experience first.",
      "For a recurring package, ask how unused sessions, expiry dates and rescheduling are handled. A clear arrangement is more useful than a discount with conditions you have not read."
    ],
    bookingMessage: "Please share appointment availability, the complete visit duration and the terms for any repeat-visit package.",
    tags: ["Godutai Nagar", "Realistic Scheduling", "Advance Booking"]
  }
];

export const LOCALITY_TARGETS_50 = [
  { area: "Daryapur", title: "Spa Booking Guide for Daryapur Residents", category: "Immediate Vicinity" },
  { area: "Ram Mandir Service Road", title: "Finding the Correct Spa Entrance: A Ram Mandir Service Road Booking Checklist", category: "On-Site Corridor" },
  { area: "Ram Mandir Circle", title: "Planning a Spa Appointment Around Ram Mandir Circle", category: "Immediate Vicinity" },
  { area: "Kotnoor D", title: "First-Time Spa Booking Questions for Kotnoor D Residents", category: "South Kalaburagi" },
  { area: "GDA Layout", title: "Comparing Spa Packages: A Guide for GDA Layout Residents", category: "Residential Hub" },
  { area: "Swastik Nagar", title: "Choosing a Comfortable Massage Appointment from Swastik Nagar", category: "Residential Hub" },
  { area: "Naganahalli", title: "Planning a Relaxed Spa Visit from Naganahalli", category: "North-West Zone" },
  { area: "Naganahalli Road", title: "Massage or Spa Package? A Naganahalli Road Booking Guide", category: "North-West Zone" },
  { area: "High Court Road", title: "Fitting a Spa Appointment into Your Day: High Court Road Guide", category: "Judicial Corridor" },
  { area: "New Jewargi Cross", title: "How to Compare Massage Session Inclusions from New Jewargi Cross", category: "Commercial Arteries" },
  { area: "Old Jewargi Road", title: "Understanding Massage Prices: An Old Jewargi Road Guide", category: "Commercial Arteries" },
  { area: "Station Road", title: "Planning a Spa Appointment Before or After Travel", category: "Transit Hub" },
  { area: "Station Bazar", title: "Walk-In or Advance Booking? A Station Bazar Spa Guide", category: "Transit Hub" },
  { area: "Khuba Plot", title: "Choosing a Spa Appointment: A Khuba Plot Visitor Checklist", category: "Central Kalaburagi" },
  { area: "MSK Mill Road", title: "How to Check Massage Duration and Inclusions Before Booking", category: "Industrial Corridor" },
  { area: "CIB Colony", title: "Planning Your First Spa Visit from CIB Colony", category: "Residential Enclave" },
  { area: "Rajapur", title: "Comparing Massage Options: A Rajapur Resident’s Guide", category: "Eastern Hub" },
  { area: "Rajapur Road", title: "How to Read a Spa Menu Before Making a Booking", category: "Eastern Hub" },
  { area: "Shahbad Road", title: "Massage Pressure Preferences: A Shahbad Road Booking Guide", category: "South-East Connector" },
  { area: "Sedam Road", title: "How to Plan a Spa Visit Without Rushing", category: "Medical Corridor" },
  { area: "Aiwan-e-Shahi", title: "Privacy and Comfort Questions to Ask Before a Spa Visit", category: "Historic Heritage" },
  { area: "SB Temple Road", title: "How to Choose Between a Massage Session and a Spa Package", category: "Central Temple Zone" },
  { area: "PDA College Road", title: "A Practical First-Appointment Spa Checklist", category: "Educational Zone" },
  { area: "SB College Road", title: "Understanding Spa Booking and Cancellation Terms", category: "Educational Zone" },
  { area: "Jagat Circle", title: "Planning a Spa Visit Around Other City Appointments", category: "City Centre" },
  { area: "Market Road", title: "Comparing Spa Quotes Without Missing Extra Charges", category: "Commercial District" },
  { area: "Gazipura Road", title: "How to Check Spa Photos and Booking Information", category: "Old Quarter" },
  { area: "Super Market area", title: "Making an Informed Spa Booking: A Local Visitor Guide", category: "Shopping District" },
  { area: "Aland Road", title: "Planning Travel and Appointment Timing for a Spa Visit", category: "Northern Arterial" },
  { area: "Biddapur Colony", title: "Preparing for a Spa Appointment from Biddapur Colony", category: "Residential Enclave" },
  { area: "Sharan Nagar", title: "What to Confirm Before Your First Massage Appointment", category: "Residential Enclave" },
  { area: "CJ Colony", title: "Booking a Massage: Questions About Duration, Price and Comfort", category: "Residential Enclave" },
  { area: "PWD Quarters area", title: "How to Verify a Spa Location Before Travelling", category: "Civic District" },
  { area: "Brahmapur / Brahmapura", title: "Choosing a Spa Through Clear Information, Not Superlatives", category: "Historic Kalaburagi" },
  { area: "Mecca Colony", title: "A Privacy-Focused Spa Booking Guide", category: "Residential Enclave" },
  { area: "Godutai Nagar", title: "Planning a Spa Appointment That Fits Your Schedule", category: "Residential Hub" },
  { area: "Gandhi Nagar", title: "Comparing Massage Menus and Package Inclusions", category: "Residential Hub" },
  { area: "Vidya Nagar", title: "A Beginner’s Guide to Booking a Professional Spa Session", category: "Educational Hub" },
  { area: "Akkamahadevi Colony", title: "Checking Access, Entrance and Appointment Details", category: "Residential Enclave" },
  { area: "Shakti Nagar", title: "How to Compare Spa Options Beyond the Advertised Price", category: "Residential Enclave" },
  { area: "Pragati Colony", title: "Choosing a Massage Appointment Without Feeling Overwhelmed", category: "Residential Hub" },
  { area: "Kuvempu Nagar", title: "A Clear Guide to Massage Preferences and Booking Questions", category: "Residential Hub" },
  { area: "Badepur", title: "What Makes a Spa Package Easy to Understand?", category: "Eastern Outskirts" },
  { area: "Adarsh Nagar", title: "How to Check Spa Hygiene and Professional Boundaries", category: "Residential Enclave" },
  { area: "Basaveshwar Nagar", title: "Questions to Ask Before Booking a Spa Session", category: "Residential Enclave" },
  { area: "Santosh Colony", title: "Planning a Spa Visit with Clear Prices and Timing", category: "Residential Enclave" },
  { area: "Yadulla Colony", title: "How to Evaluate Spa Photos, Reviews and Service Details", category: "Residential Enclave" },
  { area: "Gubbi Colony", title: "Booking Your First Massage: A Practical Local Guide", category: "Residential Enclave" },
  { area: "Mominpura", title: "Understanding Privacy and Consent Before a Massage", category: "Historic Kalaburagi" },
  { area: "Khaja Colony", title: "How to Request Clear Spa Information Before Booking", category: "Residential Enclave" }
];


