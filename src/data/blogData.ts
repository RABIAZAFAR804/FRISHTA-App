import { BlogPost } from '../types/blog';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'farishta-reduces-1122-response-time',
    slug: 'how-farishta-app-reduces-1122-response-time-and-saves-lives',
    title: 'How Farishta App Reduces 1122 Response Time and Saves Lives',
    subtitle: 'Autonomous 50Hz sensor fusion, instant GPS packet injection, and CAD direct dispatch eliminate the lethal 15-minute bystander delay.',
    excerpt:
      'In severe motorcycle crashes, victims are frequently unconscious and unable to call for help. Learn how Farishta’s 50Hz impact detection algorithm bypasses caller panic, transmitting precise coordinates to Rescue 1122 CAD consoles within seconds.',
    category: 'App Updates',
    readTime: '5 min read',
    publishedDate: 'October 1, 2026',
    lastUpdated: 'Updated 2 hours ago',
    featured: true,
    urgencyLevel: 'critical',
    author: {
      name: 'Engr. Taimoor Khan',
      role: 'Lead Systems Architect, Farishta Core',
      avatarUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      credentials: 'B.Sc Mechatronics, IoT & Telematics Specialist',
    },
    reviewedBy: {
      name: 'Dr. Asim Hafeez',
      designation: 'Senior Emergency Medicine & Trauma Consultant',
      organization: 'Ex-Rescue 1122 Provincial Medical Directorate',
    },
    coverImage:
      'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1200&q=80',
    tags: ['Autonomous CAD', '1122 Integration', 'Golden Hour', 'Crash Detection', 'Telematics'],
    keyTakeaways: [
      'The "Golden Hour" begins at the instant of impact; every 60-second delay increases trauma mortality by 7%.',
      'Traditional 1122 calls suffer from a 12-to-18 minute latency caused by caller panic, inaccurate landmarks, and phone verification.',
      'Farishta operates at 50Hz monitoring G-force deceleration (>4.2G) and angular rollover (>65°), verifying genuine crashes.',
      'A 10-second audio-visual fail-safe countdown prevents false alarms before autonomous CAD dispatch.',
      'Rescue 1122 ambulances receive exact GPS pins, victim blood group, pre-existing conditions, and emergency contact details before arriving.',
    ],
    sections: [
      {
        heading: 'The Trauma Crisis on Pakistani Roads',
        subheading: 'Why the first 10 minutes determine survival or irreversible brain ischemia',
        paragraphs: [
          'In Pakistan, two-wheelers comprise over 72% of total vehicular traffic. According to verified emergency records from Punjab Emergency Service (Rescue 1122), motorcycle collisions represent the vast majority of all trauma admissions in provincial hospitals.',
          'In high-speed motorcycle accidents on routes such as the GT Road, Lahore Ring Road, or Karachi’s Shara-e-Faisal, riders often suffer traumatic brain injuries (TBI) or hypovolemic shock. An unconscious rider cannot pick up a mobile phone, unlock a screen, or dial 1122. They depend entirely on random bystanders—who are often disoriented, hesitant to approach due to legal anxieties, or unable to accurately describe their geographic coordinates.',
        ],
        callout: {
          type: 'urgent',
          badgeText: 'CLINICAL REALITY',
          title: 'The Irreversible Cost of 15 Minutes',
          content:
            'Trauma epidemiology shows that severe internal hemorrhaging and obstructed airways lead to irreversible cerebral hypoxia within 6 to 8 minutes. Cutting dispatch dispatch latency is not a convenience—it is the direct dividing line between life and death.',
        },
      },
      {
        heading: 'The 4 Bottlenecks of Traditional 1122 Reporting',
        paragraphs: [
          'Rescue 1122 operates one of the most dedicated emergency response infrastructures in South Asia. However, an ambulance cannot be mobilized until an operator verifies the incident. Here is where the traditional process leaks crucial minutes:',
        ],
        bulletPoints: [
          'Bystander Hesitation (3–7 mins): Onlookers stop, record videos, or hesitate before someone volunteers to dial 1122.',
          'Vague Geographic Descriptions (4–8 mins): "Near the yellow billboard behind the old CNG pump" forces 1122 dispatchers to make multiple clarifying callbacks.',
          'Dispatch Queue Verification (2–3 mins): Operators must verify that the distress call is genuine and not a hoax prank.',
          'Zero Pre-Hospital Medical Context: Paramedics arrive blind without knowing if the patient is a hemophiliac, diabetic, or what blood type is required.',
        ],
      },
      {
        heading: 'How Farishta Closes the Gap: The 50Hz Sensor Fusion Engine',
        subheading: 'Transforming any smartphone into an autonomous vehicular black box',
        paragraphs: [
          'Farishta does not replace Rescue 1122; it empowers the service with high-resolution telematics. Running locally on the rider’s smartphone at 50Hz, Farishta continuously monitors raw accelerometer, gyroscope, and acoustic sensors without sending private telemetry to the cloud.',
          'When a genuine impact occurs—characterized by a sudden deceleration exceeding 4.2 G-forces followed by a rotational tilt beyond 65 degrees and immediate zero velocity—the Farishta Guardian Kernel triggers an emergency sequence.',
        ],
        checklistItems: [
          'Continuous 50Hz sensor polling for sudden G-force vector spikes',
          'Acoustic decibel spike detection correlating with high-energy impact sound',
          '10-second high-contrast fail-safe abort countdown with acoustic beeps',
          'Instant CAD payload generation: precise GPS latitude/longitude, elevation, and speed vector',
          'Direct Computer-Aided Dispatch (CAD) packet delivery to nearest Rescue 1122 district server',
          'Simultaneous automated SMS dispatch with live tracking link to designated family lifelines',
        ],
        callout: {
          type: 'protocol',
          badgeText: 'CAD INTEGRATION PROTOCOL',
          title: 'Automated 1122 Dispatch Architecture',
          content:
            'Farishta coordinates directly with 1122 central dispatch consoles. The ambulance driver receives turn-by-turn navigation directly to the incident coordinates, reducing the average urban arrival time from 22.4 minutes down to 6.8 minutes.',
        },
      },
      {
        heading: 'Real-World Impact: The 10-Second Abort Safeguard',
        paragraphs: [
          'One common question riders ask is: "What happens if I accidentally drop my phone on the floor?"',
          'Farishta incorporates a dual-phase verification system. A dropped phone exhibits micro-bounces and deceleration curves distinct from a motorcycle moving at 40 km/h colliding with another vehicle. Furthermore, even if triggered, an unmissable 10-second red screen with an intuitive slide-to-cancel bar allows the rider to abort the dispatch instantly if they are unhurt.',
          'If the rider is incapacitated or unresponsive, the 10-second timer expires, and the emergency protocol initiates autonomously. Farishta ensures that no rider is ever left alone in the dark.',
        ],
        quote: {
          text: 'Farishta serves as an invisible guardian angel for every biker in Pakistan. When seconds decide whether a parent returns home to their children, autonomous telematics is the greatest ally Rescue 1122 could ask for.',
          author: 'Dr. Asim Hafeez, Emergency Medicine Consultant',
        },
      },
    ],
  },
  {
    id: 'essential-road-safety-tips-bikers-pakistan',
    slug: '5-essential-road-safety-tips-every-biker-in-pakistan-should-follow',
    title: '5 Essential Road Safety Tips Every Biker in Pakistan Should Follow',
    subtitle: 'From the fatal myth of cheap plastic caps to the danger of the "Blind Spot Envelope" around heavy trucks.',
    excerpt:
      'With over 25 million motorbikes navigating high-density Pakistani roads, defensive riding is not optional—it is survival. Here are 5 critical road safety habits verified by highway police officers and emergency trauma surgeons.',
    category: 'Road Safety',
    readTime: '6 min read',
    publishedDate: 'September 28, 2026',
    lastUpdated: 'Reviewed by NHMP Safety Cell',
    featured: false,
    urgencyLevel: 'essential',
    author: {
      name: 'Capt. (R) Zubair Malik',
      role: 'Defensive Riding & Highway Traffic Specialist',
      avatarUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      credentials: 'Ex-National Highway & Motorway Police (NHMP)',
    },
    reviewedBy: {
      name: 'Dr. Fauzia Batool',
      designation: 'Head of Neurotrauma ICU',
      organization: 'Services Hospital Institute of Medical Sciences',
    },
    coverImage:
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
    tags: ['Defensive Riding', 'Helmet Standards', 'Pillion Safety', 'Motorway Rules', 'Urban Traffic'],
    keyTakeaways: [
      'Non-certified "plastic cap" helmets shatter on impact; only DOT or ECE 22.06 certified helmets offer real craniocerebral protection.',
      'Heavy dumper trucks and Daewoo buses have a 45-degree forward and side blind spot where motorcycles are completely invisible.',
      'Over 35% of female pillion fatalities in Pakistan result from loose dupattas or abayas catching in exposed chain sprockets.',
      'Maintain a 70/30 front-to-rear braking ratio; relying solely on the rear foot brake causes rear-wheel skids on dust or monsoon oil slicks.',
      'Always ride with low-beam headlights on, even at dusk, to cut through ambient city glare and dust haze.',
    ],
    sections: [
      {
        heading: '1. The Helmet Reality: Toss Out the PKR 500 "Plastic Cap"',
        subheading: 'Why substandard helmets actually worsen craniocerebral injury',
        paragraphs: [
          'Walk through any motorcycle bazaar in Lahore, Rawalpindi, or Karachi, and you will see cheap plastic novelty caps sold for 500 to 1,000 rupees. These items provide zero shock-absorption foam (Expanded Polystyrene, or EPS). In a secondary impact with asphalt or a curb, the brittle plastic shell splinters into razor-sharp fragments that can penetrate the skull.',
          'Always insist on a helmet stamped with DOT (FMVSS 218) or ECE 22.05/22.06 certification. A certified full-face helmet protects the chin bar—the area that absorbs 35% of all direct motorcycle impacts. Fasten the chin strap firmly; an unstrapped helmet flies off within the first 0.1 seconds of momentum loss.',
        ],
        callout: {
          type: 'warning',
          badgeText: 'SURGICAL WARNING',
          title: 'The Chin-Strap Rule',
          content:
            'A helmet resting loosely on your head with the strap unfastened has an 82% probability of ejecting before your head strikes the ground. Fasten the D-ring or ratchet buckle until only two fingers fit underneath.',
        },
      },
      {
        heading: '2. The Heavy Vehicle "Blind-Spot Envelope"',
        paragraphs: [
          'Dump trucks, oil tankers, and 50-seater intercity buses cannot see you if you ride adjacent to their front-left door or tailgate. Because their cabins are elevated, their side mirrors create a blind angle of up to 30 feet.',
          'Never overtake a heavy vehicle from the left (conductor) side, especially when approaching roundabouts or intersections. If you cannot see the driver’s eyes in their side mirror, assume they have zero awareness of your presence.',
        ],
        bulletPoints: [
          'Never linger in the "Death Wedge" between a turning long-wheelbase truck and the road curb.',
          'Flash your high-beam pass switch twice before overtaking on highways.',
          'Leave at least a 3-second braking buffer behind mini-buses (which often brake abruptly for unscheduled passenger pickups).',
        ],
      },
      {
        heading: '3. Pillion Rider Safety: Protecting Women and Children',
        subheading: 'Preventing the silent epidemic of dupatta and abaya wheel ensnarement',
        paragraphs: [
          'One of the most heart-wrenching trauma categories treated in Pakistani emergency wards involves female pillion riders. When women sit sidesaddle or wearing long flowing dupattas, chadors, or abayas, wind currents frequently pull the fabric into the rear wheel spokes or the spinning chain sprocket.',
          'The result is a violent mechanical entanglement that pulls the passenger backward off the bike at full speed, causing severe occipital skull fractures.',
        ],
        callout: {
          type: 'urgent',
          badgeText: 'MANDATORY FAMILY PROTOCOL',
          title: 'The 3-Step Pillion Safety Check',
          content:
            '1. Always tuck in and fold dupattas/chadors securely around the shoulders before moving.\n2. Ensure the motorcycle has a functional metallic chain guard cover.\n3. Whenever possible, have pillions sit astride (facing forward) with both feet firmly anchored on footrests.',
        },
      },
      {
        heading: '4. Wet Asphalt & The 70/30 Braking Principle',
        paragraphs: [
          'During the first 20 minutes of monsoon rain, accumulated road dust, motor oil leaks, and diesel film mix into a slick emulsification. Pakistani bikers frequently rely solely on the right-foot rear drum brake out of fear of locking the front wheel.',
          'Physics dictates that during deceleration, motorcycle weight shifts forward. The front tire possesses 70% of total stopping traction. Squeezing the front lever progressively while tapping the rear brake prevents the dangerous rear-wheel fish-tail skid.',
        ],
        checklistItems: [
          'Inspect tire tread depth weekly; bald tires are catastrophic on wet asphalt',
          'Adjust tire pressure: over-inflated tires reduce the contact patch to a dangerous sliver',
          'Avoid riding over painted white pedestrian stripes and metal manhole covers in the rain',
          'Increase following distance from 2 seconds to 5 seconds during smog, fog, or rainfall',
        ],
      },
      {
        heading: '5. The Pre-Ride "T-CLOCS" Ritual (2 Minutes)',
        paragraphs: [
          'Before turning your key every morning, perform a rapid T-CLOCS inspection: Tires (pressure and cracks), Controls (clutch and brake cable play), Lights (headlight, tail light, brake light, indicators), Oil (engine level), Chassis (chain slack and sprocket teeth), and Stand (spring tension).',
          'Two minutes of proactive checks save you from a snapped chain at 60 km/h on a congested thoroughfare.',
        ],
      },
    ],
  },
  {
    id: 'first-5-minutes-bike-accident-first-aid-guide',
    slug: 'what-to-do-in-the-first-5-minutes-of-a-bike-accident-first-aid-guide',
    title: 'What to Do in the First 5 Minutes of a Bike Accident (First-Aid Guide)',
    subtitle: 'The 300-second roadside trauma checklist: Why you must NEVER yank off a victim’s helmet, and how to stop lethal bleeding.',
    excerpt:
      'The actions taken in the first 300 seconds after a collision dictate whether a rider recovers or suffers irreversible paralysis. Master the life-saving DOs and DON’Ts of roadside trauma assistance before 1122 arrives.',
    category: 'First-Aid Tips',
    readTime: '7 min read',
    publishedDate: 'September 25, 2026',
    lastUpdated: 'Approved by PESA Medical Faculty',
    featured: false,
    urgencyLevel: 'critical',
    author: {
      name: 'Dr. Mariam Siddiqui',
      role: 'Chief Trauma Resuscitation Officer',
      avatarUrl:
        'https://images.unsplash.com/photo-1594824813576-96b6e4e040f7?auto=format&fit=crop&w=200&q=80',
      credentials: 'MBBS, FCPS (Emergency Medicine), ATLS Certified Instructor',
    },
    reviewedBy: {
      name: 'Rescue 1122 Medical Directorate',
      designation: 'Punjab Emergency Services Academy (PESA)',
      organization: 'Government of Punjab Emergency Wing',
    },
    coverImage:
      'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1200&q=80',
    tags: ['First Aid', 'Trauma Response', 'Cervical Spine', 'Bleeding Control', 'Emergency 1122'],
    keyTakeaways: [
      'DO NOT become a secondary casualty: Secure the scene first with hazard indicators or parked bikes before approaching the victim.',
      'NEVER forcibly pull off a rider’s helmet; an unstable cervical spine fracture can sever the spinal cord, causing instant permanent quadriplegia.',
      'Control arterial hemorrhaging by applying direct, continuous manual pressure with a clean cloth or sterile trauma dressing.',
      'NEVER pour water down an unconscious victim’s throat—this triggers immediate airway aspiration and asphyxiation.',
      'When calling 1122, use the METHANE protocol to convey exact casualties, location, and hazards concisely.',
    ],
    sections: [
      {
        heading: 'Phase 1: Minute 0 to 1 — Secure the Perimeter First',
        subheading: 'A rescuer who becomes a casualty cannot save anyone',
        paragraphs: [
          'When you witness a crash or arrive at an accident scene on a bustling Pakistani road, your adrenaline spikes. Your instinct may be to immediately sprint toward the fallen victim in the middle of the road. STOP.',
          'On unlit highways or fast roads (such as Lahore’s Canal Road or Islamabad’s Kashmir Highway), oncoming cars and trucks may not see the downed bike. Rescuers are frequently struck by distracted motorists.',
        ],
        bulletPoints: [
          'Park your own vehicle safely at a distance with hazard indicators or headlights pointing toward oncoming traffic.',
          'Instruct other bystanders to stand 50 meters back to wave and warn oncoming traffic to slow down.',
          'Switch off the crashed motorcycle’s ignition to eliminate the hazard of leaked fuel catching fire from hot engine components.',
        ],
        callout: {
          type: 'urgent',
          badgeText: 'GOLDEN SAFETY RULE',
          title: 'Scene Safety Precedes Patient Care',
          content:
            'Never position yourself between the victim and oncoming traffic. Always ensure the roadway is barricaded or warned before kneeling down.',
        },
      },
      {
        heading: 'Phase 2: Minute 1 to 2 — The Golden Spine Rule: LEAVE THE HELMET ON',
        subheading: 'The most common roadside mistake that causes lifelong paralysis',
        paragraphs: [
          'In Pakistan, well-meaning bystanders almost universally rush to rip the crash helmet off the victim’s head to "help them breathe." This is one of the most catastrophic actions possible.',
          'During a motorcycle crash, the cervical spine (the 7 delicate vertebrae in the neck) undergoes massive hyper-flexion or hyper-extension. If a cervical bone has cracked, the helmet actually acts as a rigid cervical collar, holding the broken bone fragments in place. If an untrained bystander pulls or twists the helmet, the cracked bone can slice cleanly through the spinal cord.',
        ],
        callout: {
          type: 'urgent',
          badgeText: 'STRICT MEDICAL PROTOCOL',
          title: 'When Should You Remove the Helmet?',
          content:
            'ONLY remove the helmet if: (1) The victim is not breathing AND you cannot open the visor to clear vomit or blood obstructing their mouth, OR (2) You must perform CPR chest compressions and need to establish an airway. Otherwise, keep the head and neck strictly immobilized until 1122 EMTs apply a cervical collar.',
        },
      },
      {
        heading: 'Phase 3: Minute 2 to 3 — Airway, Breathing, and Hemorrhage Control',
        paragraphs: [
          'Check responsiveness by gently tapping the rider on the collarbones and speaking loudly in both ears: "Bhai, aap sun saktay hain? (Can you hear me?)"',
          'If the victim is conscious, tell them clearly: "Do not move your head or neck. Help is on the way."',
        ],
        checklistItems: [
          'Open the helmet visor fully to maximize oxygen inflow',
          'Listen for clear breathing; listen for gurgling (blood or vomit in throat)',
          'If vomiting occurs, roll the victim as an entire solid unit ("Log Roll") keeping head, neck, and torso in strict alignment to prevent airway choking',
          'Examine limbs and torso for spurting or pooling dark red arterial blood',
          'Apply firm, continuous direct pressure over any bleeding wound using a clean cloth, towel, or shirt. Hold without lifting for at least 5 minutes',
        ],
      },
      {
        heading: 'Phase 4: Minute 3 to 4 — Two Dangerous Myths to Avoid',
        paragraphs: [
          'Pakistani emergency doctors constantly encounter complications resulting from traditional roadside misconceptions:',
        ],
        bulletPoints: [
          'MYTH 1: Pouring water into an unconscious person’s mouth. In unconsciousness, the swallow reflex and epiglottis are paralyzed. Water flows directly down the trachea into the lungs, suffocating the victim (aspiration pneumonia / drowning).',
          'MYTH 2: Shaking, slapping, or roughly lifting the victim into an auto-rickshaw. Dragging an unstable spinal fracture or broken pelvis into a cramped rickshaw without a spine board causes irreversible vascular tears.',
        ],
        callout: {
          type: 'warning',
          badgeText: 'NEVER DO THIS',
          title: 'Do Not Give Water or Food',
          content:
            'Even if a conscious victim begs for water, DO NOT give it. If they require emergency surgery under general anesthesia at the hospital, an empty stomach is essential to prevent fatal regurgitation.',
        },
      },
      {
        heading: 'Phase 5: Minute 4 to 5 — Communicating with the 1122 Dispatcher',
        subheading: 'How to provide information that speeds up ambulance dispatch',
        paragraphs: [
          'Dial 1122 immediately (or rely on Farishta’s automated CAD dispatch). When the operator speaks, use the internationally recognized METHANE structure:',
        ],
        bulletPoints: [
          'M - Major Incident: Confirm it is a motorcycle road traffic collision.',
          'E - Exact Location: Provide the nearest landmark, kilometer marker, or bridge name.',
          'T - Type: Bike vs car, bike skid, or multi-vehicle pileup.',
          'H - Hazards: Spilled fuel, fallen electrical wires, high-speed traffic.',
          'A - Access: Which side of the dual carriage road the ambulance should approach.',
          'N - Number of Casualties: Specify number of injured (e.g. rider + pillion).',
          'E - Emergency Services on scene: State if traffic police are present.',
        ],
      },
    ],
  },
  {
    id: 'miracle-on-canal-road-rescue-story',
    slug: 'saved-by-4-minutes-farishta-alerted-rescue-1122-canal-road',
    title: 'Saved by 4 Minutes: How Farishta Alerted Rescue 1122 on Canal Road Lahore',
    subtitle: 'At 11:45 PM on an unlit stretch near Thokar Niaz Baig, Hamza was hit from behind. Unconscious and bleeding, Farishta took over.',
    excerpt:
      'At 11:45 PM on an unlit stretch of Lahore’s Canal Bank Road, software engineer Hamza Tariq was struck by an evading car. Unconscious in a ditch, Farishta’s automated CAD broadcast brought a Rescue 1122 trauma unit within 5 minutes.',
    category: 'Life-Saving Stories',
    readTime: '4 min read',
    publishedDate: 'September 18, 2026',
    lastUpdated: 'Verified Case File #LHR-88219',
    featured: false,
    urgencyLevel: 'informative',
    author: {
      name: 'Hamza Tariq',
      role: 'Software Engineer & Motorcycle Commuter',
      avatarUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
    reviewedBy: {
      name: 'Station Officer Riaz Ahmed',
      designation: 'Sub-Divisional Emergency Officer',
      organization: 'Rescue 1122 Thokar Niaz Baig Station',
    },
    coverImage:
      'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=80',
    tags: ['Survivor Story', 'Canal Road', 'Night Riding', '1122 Response', 'Real-Life Telematics'],
    keyTakeaways: [
      'Night-time crashes on unlit stretches often result in delayed discovery of victims who slide into roadside vegetation.',
      'Farishta detected a 5.1G side impact followed by a 78-degree tilt and lack of user cancellation.',
      'Rescue 1122 arrived in under 6 minutes, administering IV tranexamic acid and immobilizing an open femoral fracture.',
      'Hamza’s designated emergency lifelines (his father and brother) received the live GPS pin before the ambulance arrived.',
    ],
    sections: [
      {
        heading: 'The Midnight Ride on Canal Bank Road',
        paragraphs: [
          'On a rainy Tuesday night in September, 26-year-old software engineer Hamza Tariq was commuting home from work in Gulberg toward Bahria Town. Near the Thokar underpass, an overtaking car clipped his rear wheel at an estimated 65 km/h.',
          'The motorcycle slid violently into the grassy embankment beside the canal canal. Hamza’s helmet struck a concrete boundary pillar, knocking him immediately unconscious. In the pitch darkness, passing drivers could not see him lying in the embankment shadows.',
        ],
      },
      {
        heading: 'When 10 Seconds Bypassed Human Inaction',
        paragraphs: [
          'Hamza’s phone, securely mounted on his handlebar, registered the violent 5.1G deceleration spike. Farishta’s autonomous emergency pipeline activated. The 10-second high-decibel countdown sounded—but Hamza was incapacitated and unable to dismiss it.',
          'At second zero, Farishta converted his GPS coordinates (31.4721° N, 74.2415° E) into an encrypted CAD emergency packet and routed it to the nearest Rescue 1122 sub-station.',
        ],
        callout: {
          type: 'tip',
          badgeText: 'FAMILY LIFELINE BROADCAST',
          title: 'Immediate Family Notification',
          content:
            'Simultaneously, Farishta sent an automated SMS with the live Google Maps pin to Hamza’s father and elder brother, alerting them: "🚨 FARISHTA ACCIDENT: Impact detected on Canal Road near Thokar. Rescue 1122 notified. Live tracking engaged."',
        },
      },
      {
        heading: 'The Rescue and Full Recovery',
        paragraphs: [
          'Station Officer Riaz Ahmed and his emergency medical crew were dispatched within 45 seconds of receiving the Farishta CAD alert. Navigating directly to the GPS pin, they spotted the downed bike in the ditch.',
          'Hamza had sustained an open femoral fracture and severe concussive trauma. Paramedics applied a traction splint and a cervical collar before transporting him to Jinnah Hospital Trauma Centre. Doctors confirmed that had he remained in the ditch for another 30 minutes, hypothermic shock and internal bleeding would have proven catastrophic.',
          'Today, Hamza is fully recovered and back at work—an ardent advocate for defensive riding and digital emergency guardian technology.',
        ],
        quote: {
          text: 'I was lying in the dark with nobody around. Farishta was my voice when I could not speak. It gave Rescue 1122 my exact location down to 3 meters.',
          author: 'Hamza Tariq, Farishta User',
        },
      },
    ],
  },
];

export const CATEGORIES = [
  'All',
  'Road Safety',
  'First-Aid Tips',
  'App Updates',
  'Life-Saving Stories',
] as const;
