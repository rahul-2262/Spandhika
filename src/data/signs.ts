export type Sign = {
  slug: string;
  icon: string;
  title: string;
  body: string;
  details: string;
  causes: string[];
  helps: string;
  whatToWatchFor?: string[];
  whenToActFAST?: string;
};

export const signs: Sign[] = [
  {
    slug: "morning-heel-pain",
    icon: "accessible_forward",
    title: "Heel pain after waking up",
    body: "That first painful step in the morning is often plantar fasciitis — and it doesn't fix itself.",
    details:
      "The plantar fascia tightens overnight; the first weight-bearing steps re-stretch inflamed tissue, causing sharp heel pain. Persistent symptoms can lead to heel spurs, gait compensation, and knee or hip strain.",
    causes: ["Poor arch support", "Long standing hours", "Sudden activity spikes", "Worn-out footwear"],
    helps: "Deep heel cup, contoured medial arch, and shock-absorbing forefoot pad to redistribute load.",
    whatToWatchFor: [
      "Sharp, stabbing pain in the first steps after rest",
      "Pain that eases after walking but returns by evening",
      "Tenderness along the inner heel and arch",
    ],
    whenToActFAST: "If heel pain persists beyond 2 weeks or interferes with walking, get a biomechanical assessment.",
  },
  {
    slug: "end-of-day-foot-fatigue",
    icon: "schedule",
    title: "Foot fatigue after long hours",
    body: "Burning, aching, heavy feet after work or a long day on your feet is a signal — not normal.",
    details:
      "Repetitive standing without cushioning overloads the metatarsals and intrinsic foot muscles, reducing circulation and triggering burning, swelling, and end-of-day fatigue.",
    causes: ["Hard floors", "Flat shoe insoles", "Poor pressure distribution", "Weak foot musculature"],
    helps: "Energy-return foam plus a 32-zone pressure map that balances load across the whole footprint.",
    whatToWatchFor: [
      "Burning sensation in the forefoot by mid-afternoon",
      "Swelling around the ankle that resolves overnight",
      "Visible imprint marks lasting after sock removal",
    ],
    whenToActFAST: "Daily fatigue that disrupts sleep, exercise, or mood deserves a proper pressure assessment.",
  },
  {
    slug: "uneven-shoe-wear",
    icon: "swap_horiz",
    title: "Uneven shoe wear",
    body: "If one shoe wears down faster, your weight distribution is off — and your body is compensating.",
    details:
      "Asymmetric wear patterns reveal overpronation, supination, or a leg-length discrepancy. Untreated, the kinetic chain compensates upward — ankles, knees, hips, and lower back follow.",
    causes: ["Overpronation", "Supination", "Leg-length difference", "Muscle imbalance"],
    helps: "Adaptive arch support and a carbon stability plate that re-centers the strike pattern.",
    whatToWatchFor: [
      "Heel worn more on the inner or outer edge",
      "Forefoot worn unevenly between left and right",
      "Recurring ankle rolls on the same side",
    ],
    whenToActFAST: "Asymmetric wear over two consecutive pairs warrants a gait analysis.",
  },
  {
    slug: "knee-or-back-discomfort",
    icon: "airline_seat_legroom_reduced",
    title: "Knee or lower back discomfort",
    body: "Pain that feels unrelated often starts at the ground. Your feet are the foundation of every step.",
    details:
      "Misaligned feet rotate the tibia and femur subtly with every step. Over thousands of steps a day, that small rotation becomes chronic knee, hip, and lumbar strain.",
    causes: ["Collapsed arches", "Heel-strike imbalance", "Poor shock absorption", "Forward pelvic tilt"],
    helps: "Posture-aware support that aligns the foot, shin, and hip through a neutral gait cycle.",
    whatToWatchFor: [
      "Knee pain that intensifies after long walks",
      "Lower-back tightness that worsens in unsupportive shoes",
      "Hip stiffness on one side after standing",
    ],
    whenToActFAST: "If pain travels up the kinetic chain, address the foot — not just the symptom site.",
  },
];

export const getSign = (slug: string) => signs.find((s) => s.slug === slug);
