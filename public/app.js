(function () {
  'use strict';
  /* Set by site.js: sign-in, saving, uploads and links for the website */
  var SITE = window.SITE || null;
  var REDUCE = false;
  try { REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  /* ───────── Occasion themes ───────── */
  var THEMES = {
    wedding: {
      label: 'Wedding', blurb: 'Ivory cotton paper, watercolour blue blooms with gold leaves, a gold wax seal and a gold-edged envelope that opens.',
      dot: '#6f7b4f', opener: 'envelope', particles: 'petals', closingEnvelope: true,
      art: { corner: 'wc-cluster', top: 'wc-garland', side: 'wc-sprig', hang: 'wc-strand', emblem: 'seal' },
      vars: { ground: '#ebe7df', script: '"Allura", cursive', display: '"Marcellus", Georgia, serif', ink: '#3d3b35', inkSoft: '#77736a' },
      words: {
        open: 'View the invitation', letter: 'You are invited', toLine: 'To the wedding of', save: ['Save', 'The', 'Date'],
        story: ['Our story', 'How it all began'], details: ['The details', "Here's what to expect"], when: ['Ceremony', 'Reception'],
        rsvp: 'Kindly reply by', countdown: ['The big day', 'Countdown'], closing: 'With love', emblemLabel: 'Song', emblemSmall: 'our'
      },
      nameLabel: "Couple's names",
      defaults: {
        headline: 'Emma & Oliver', nameA: 'Emma', nameB: 'Oliver', eyebrow: 'Save our date', heroLine: 'You are invited',
        inviteLine: 'request the pleasure of your company as they celebrate their marriage',
        time: '16:00', venue: 'Villa di Belvedere', address: 'Via di Belvedere, 1', city: 'Florence, Italy',
        story: 'We met in the most unexpected way and instantly knew there was something special. Through every season, our adventure together just keeps getting better.',
        schedule: [['16:00', 'Ceremony', 'rings'], ['17:00', 'Cocktail hour', 'glasses'], ['17:30', 'Dinner', 'dinner'], ['18:00', 'Speeches', 'mic'], ['20:00', 'First dance', 'music'], ['22:00', 'Dancing', 'sparkle']],
        dress: 'Semi formal', dressNote: "We'd love to see you in soft garden tones.", colors: ['#f5f2ea', '#e2dccd', '#a9b086', '#6f7b4f', '#4b5532'],
        travel: 'The nearest airport is Florence (FLR). Transportation will be provided to and from the venue.',
        gifts: 'Your presence at our celebration is the greatest gift of all. If you would like to give us something, we have a small registry for our home.',
        question: 'Please select your meal preference', options: 'Chicken, Beef, Vegetarian', maxGuests: 4,
        thanks: 'Thank you for celebrating with us.\nYour presence makes this day even more special.'
      }
    },
    birthday: {
      label: 'Birthday', blurb: 'Blush and champagne, latex balloons, fabric bunting and a gift box that pops open.',
      dot: '#c98e8c', opener: 'gift', particles: 'confetti', floaters: ['bd-b-blush', 'bd-b-gold', 'bd-b-ivory'],
      art: { corner: 'bd-bunch', top: 'bd-bunting', side: 'bd-b-gold', hang: 'bd-curl', emblem: 'bd-rosette', box: 'bd-box' },
      vars: { ground: '#f1e1dc', script: '"Parisienne", cursive', display: '"Fraunces", Georgia, serif', ink: '#4a3236', inkSoft: '#8a6f70' },
      words: {
        open: 'Open your invitation', letter: '', toLine: 'Join us to celebrate', save: ['Save', 'The', 'Date'],
        story: ['About the guest of honor', 'A few words'], details: ['The plan', "Here's how the night goes"], when: ['The party', 'After party'],
        rsvp: 'Please reply by', countdown: ['Party time', 'Countdown'], closing: 'See you there', emblemLabel: '', emblemSmall: ''
      },
      nameLabel: 'Birthday person',
      defaults: {
        headline: 'Sofia', nameA: 'Sofia', nameB: '', age: '30', eyebrow: "You're invited", heroLine: "Let's celebrate",
        inviteLine: 'Drinks, dinner and dancing for a milestone birthday',
        time: '19:00', venue: 'The Garden Room', address: '24 Rose Lane', city: 'Austin, Texas',
        story: 'Thirty years of big laughs, bigger dreams and the best people. Come raise a glass with us.',
        schedule: [['19:00', 'Welcome drinks', 'glasses'], ['20:00', 'Dinner', 'dinner'], ['21:30', 'Cake and toasts', 'cake'], ['22:00', 'Dancing', 'music']],
        dress: 'Cocktail chic', dressNote: 'Blush, champagne and anything that sparkles.', colors: ['#f7ede8', '#efc4bd', '#cfae6b', '#c98e8c', '#4a3236'],
        travel: 'Parking is free on Rose Lane after 6 pm. Rideshare drop-off is at the main gate.',
        gifts: 'No gifts needed. If you insist, a card with a favorite memory would mean the world.',
        question: '', options: '', maxGuests: 2,
        thanks: 'Thank you for being part of the celebration.'
      }
    },
    reveal: {
      label: 'Gender reveal', blurb: 'Powder pink and blue, clouds, balloons that float out of the box, and a Boy or Girl guess.',
      dot: '#7fa6cf', opener: 'gift', particles: 'pinkblue', floaters: ['gr-b-pink', 'gr-b-blue', 'gr-b-pink', 'gr-b-blue'],
      art: { corner: 'gr-bunch', top: 'gr-clouds', side: 'gr-b-blue', side2: 'gr-b-pink', hang: 'gr-curl', emblem: 'gr-cloud', box: 'gr-box' },
      vars: { ground: '#eceff4', script: '"Dancing Script", cursive', display: '"Quicksand", Arial, sans-serif', ink: '#3f4a5a', inkSoft: '#77818f' },
      words: {
        open: 'Open the surprise', letter: '', toLine: 'A gender reveal for', save: ['Save', 'The', 'Date'],
        story: ['Our little one', 'The story so far'], details: ['The plan', 'What to expect'], when: ['The reveal', 'Celebration'],
        rsvp: 'Please reply by', countdown: ['The big reveal', 'Countdown'], closing: 'With love', emblemLabel: '', emblemSmall: ''
      },
      nameLabel: 'Baby or parents-to-be',
      defaults: {
        headline: 'Baby Moreno', nameA: 'Ana & Leo', nameB: '', eyebrow: 'Boy or girl?', heroLine: 'Join us for the big reveal',
        inviteLine: 'Ana & Leo are finding out together with family and friends',
        time: '15:00', venue: 'Our backyard', address: '8 Willow Court', city: 'Denver, Colorado',
        story: 'Our family is growing this spring. We have kept the secret long enough, and we want to find out with you.',
        schedule: [['15:00', 'Snacks and games', 'gift'], ['16:00', 'Cast your vote', 'heart'], ['16:30', 'The big reveal', 'balloon'], ['17:00', 'Cake', 'cake']],
        dress: 'Team pink or team blue', dressNote: 'Wear the color of your guess.', colors: ['#f1bfcd', '#e39ab0', '#ffffff', '#b3cfe8', '#7fa6cf'],
        travel: 'Street parking on Willow Court. Come around the side gate to the garden.',
        gifts: 'Your company is all we need. Diapers in any size are always welcome.',
        question: 'Your guess', options: 'Boy, Girl', maxGuests: 4, questionAlways: true,
        thanks: 'Thank you for celebrating our little one with us.'
      }
    },
    christmas: {
      label: 'Christmas party', blurb: 'Pine and holly, glass baubles, falling snow and a red present that bursts open.',
      dot: '#a8242c', opener: 'gift', particles: 'xmas', rain: 'snow', floaters: ['xm-star', 'xm-orn-red', 'xm-orn-green'],
      art: { corner: 'xm-corner', top: 'xm-top', side: 'xm-side', hang: 'xm-hang', emblem: 'xm-wreath', box: 'xm-box' },
      vars: { ground: '#dfe6df', script: '"Great Vibes", cursive', display: '"Playfair Display", Georgia, serif', ink: '#2f3b33', inkSoft: '#6a7a6e' },
      words: {
        open: 'Unwrap your invitation', tag: 'Open me', toLine: 'Join us for', save: ['Save', 'The', 'Date'],
        story: ['A little note', 'From our home to yours'], details: ['The evening', "Here's what's planned"], when: ['The party', 'After party'],
        rsvp: 'Please reply by', countdown: ['Christmas party', 'Countdown'], closing: 'Merry Christmas', emblemLabel: '', emblemSmall: ''
      },
      nameLabel: 'Event name',
      defaults: {
        headline: 'Christmas Party', nameA: 'The Harper family', nameB: '', eyebrow: "You're invited", heroLine: 'Merry and bright',
        inviteLine: 'Mulled wine, carols by the fire and a festive dinner with friends',
        time: '19:00', venue: 'The Harper home', address: '12 Holly Lane', city: 'Boston, Massachusetts',
        story: 'The tree is up, the lights are twinkling and the kitchen smells of cinnamon. Come celebrate the season with us.',
        schedule: [['19:00', 'Mulled wine', 'glasses'], ['20:00', 'Dinner', 'dinner'], ['21:30', 'Secret Santa', 'gift'], ['22:00', 'Carols', 'music']],
        dress: 'Festive sparkle', dressNote: 'Velvet, tartan or your best holiday sweater.', colors: ['#f4efe6', '#c9a253', '#a8242c', '#2f5a3b', '#1f2a24'],
        travel: 'Street parking on Holly Lane. Ring the bell by the wreath.',
        gifts: 'Bring a wrapped gift under $25 for Secret Santa.',
        question: 'Dinner preference', options: 'Turkey, Glazed ham, Vegetarian', maxGuests: 4,
        thanks: 'Thank you for celebrating the season with us.'
      }
    },
    newyear: {
      label: "New Year's party", blurb: 'Black and gold, foil balloons, hanging stars, a clock at midnight and gold confetti.',
      dot: '#cfae6b', opener: 'gift', particles: 'goldsilver', rain: 'goldsilver', floaters: ['ny-b-gold', 'ny-b-silver', 'ny-b-black'],
      art: { corner: 'ny-corner', top: 'ny-top', side: 'ny-side', hang: 'ny-hang', emblem: 'ny-clock', box: 'ny-box' },
      vars: { ground: '#1d1d21', script: '"Pinyon Script", cursive', display: '"Cinzel", Georgia, serif', ink: '#ead9a6', inkSoft: '#b9a678' },
      words: {
        open: 'Pop the invitation', tag: 'Open at midnight', toLine: 'Ring in the new year with', save: ['Save', 'The', 'Night'],
        story: ['A toast', 'To the year ahead'], details: ['The night', 'Countdown to midnight'], when: ['The party', 'After party'],
        rsvp: 'Please reply by', countdown: ['Midnight', 'Countdown'], closing: 'Cheers', emblemLabel: '', emblemSmall: ''
      },
      nameLabel: 'Event name',
      defaults: {
        headline: 'New Year 2028', nameA: 'Maya & Sam', nameB: '', eyebrow: "You're invited", heroLine: 'Here’s to new beginnings',
        inviteLine: 'Champagne, dancing and a midnight toast',
        time: '21:00', venue: 'The Rooftop', address: '88 Harbour Street', city: 'Sydney, Australia',
        story: 'One more year of good friends and big plans. Dress up, bring your best resolution and dance until sunrise.',
        schedule: [['21:00', 'Cocktails', 'glasses'], ['22:00', 'DJ and dancing', 'music'], ['23:55', 'Countdown', 'clock'], ['00:00', 'Midnight toast', 'sparkle']],
        dress: 'Black tie optional', dressNote: 'Sequins, velvet and anything that catches the light.', colors: ['#1d1d21', '#3a3a40', '#cfae6b', '#e9d394', '#c9ccd1'],
        travel: 'Take the lift to level 12. Taxis are easiest after midnight.',
        gifts: '', question: '', options: '', maxGuests: 2,
        thanks: 'Thank you for welcoming the new year with us.'
      }
    },
    bbq: {
      label: 'Barbecue dinner', blurb: 'Red gingham, café string lights, lemons and rosemary, sealed with a fiery badge.',
      dot: '#c8373a', opener: 'envelope', particles: 'bbq', openParticles: 'bbq', rain: 'bbq',
      art: { corner: 'bq-corner', top: 'bq-top', side: 'bq-side', hang: 'bq-hang', emblem: 'bq-badge', seal: 'bq-badge' },
      vars: { ground: '#efe6d8', script: '"Pacifico", cursive', display: '"Zilla Slab", Georgia, serif', ink: '#3a2a22', inkSoft: '#7a6455' },
      words: {
        open: 'Open the invitation', letter: 'Come hungry', toLine: 'Join us for a barbecue with', save: ['Save', 'The', 'Date'],
        story: ['Fire up the grill', 'Good food, good friends'], details: ['The evening', 'How it goes'], when: ['The cookout', 'Late night'],
        rsvp: 'Let us know by', countdown: ['Grill time', 'Countdown'], closing: 'See you there', emblemLabel: '', emblemSmall: ''
      },
      nameLabel: 'Event name',
      defaults: {
        headline: 'Summer BBQ', nameA: 'Jess & Marco', nameB: '', eyebrow: "You're invited", heroLine: 'Grill and chill',
        inviteLine: 'Smoky ribs, grilled corn and cold drinks under the lights',
        time: '17:00', venue: 'Our backyard', address: '41 Maple Drive', city: 'Nashville, Tennessee',
        story: 'Long evenings, a hot grill and our favorite people around one big table. Bring your appetite.',
        schedule: [['17:00', 'Cold drinks', 'glasses'], ['18:00', 'Off the grill', 'dinner'], ['19:30', 'Lawn games', 'heart'], ['21:00', 'Fire pit and s’mores', 'sparkle']],
        dress: 'Casual', dressNote: 'Comfy clothes and shoes for the grass.', colors: ['#c8373a', '#fbf7f0', '#f2c94c', '#6b8f4e', '#3a2a22'],
        travel: 'Park on Maple Drive and walk around to the back gate.',
        gifts: 'Feel free to bring a side dish or your favorite drink.',
        question: 'What would you like from the grill?', options: 'Burger, Ribs, Chicken, Veggie skewers', maxGuests: 6,
        thanks: 'Thank you! We’ll save you a seat at the table.'
      }
    },
    camping: {
      label: 'Camping trip', blurb: 'Kraft paper, pine forest, a glowing lantern and a stitched trail badge.',
      dot: '#4f6b4e', opener: 'envelope', particles: 'camp', openParticles: 'camp', rain: 'camp',
      art: { corner: 'cp-corner', top: 'cp-top', side: 'cp-side', hang: 'cp-hang', emblem: 'cp-badge', seal: 'cp-badge' },
      vars: { ground: '#e3e0d2', script: '"Caveat", cursive', display: '"Bitter", Georgia, serif', ink: '#2f3a2e', inkSoft: '#6c7362' },
      words: {
        open: 'Open the map', letter: 'Into the woods', toLine: 'A weekend outdoors with', save: ['Save', 'The', 'Weekend'],
        story: ['The plan', 'Why we’re heading out'], details: ['The itinerary', 'Trail notes'], when: ['Campsite', 'Meeting point'],
        rsvp: 'Tell us by', countdown: ['Trip starts in', 'Countdown'], closing: 'Happy trails', emblemLabel: '', emblemSmall: ''
      },
      nameLabel: 'Trip name',
      defaults: {
        headline: 'Camping Weekend', nameA: 'The trail crew', nameB: '', eyebrow: "You're invited", heroLine: 'Let’s go camping',
        inviteLine: 'Two nights under the stars by the lake',
        time: '10:00', venue: 'Pine Lake Campground', address: 'Site 14, Lakeshore Loop', city: 'Lake Tahoe, California',
        story: 'No signal, a crackling fire and the clearest stars you’ve ever seen. Pack a sleeping bag and leave the rest to us.',
        schedule: [['10:00', 'Meet at the trailhead', 'clock'], ['12:00', 'Set up camp', 'heart'], ['15:00', 'Hike to the lake', 'sparkle'], ['19:00', 'Campfire dinner', 'dinner']],
        dress: 'Outdoor ready', dressNote: 'Layers, boots, a warm hat and a rain jacket.', colors: ['#4f6b4e', '#9b3b2f', '#e2c48a', '#7a5634', '#2f3a2e'],
        travel: 'Campground parking is at the ranger station. Tell us if you need a ride.',
        gifts: 'Bring a sleeping bag, headlamp and refillable water bottle. We’ll cover tents and food.',
        question: 'Do you need gear?', options: 'I have my own tent, I need a tent, I need a sleeping bag too', maxGuests: 4,
        thanks: 'Thank you! We’ll send the packing list soon.'
      }
    },
    diwali: {
      label: 'Diwali and Hindu festivals', blurb: 'Marigold garlands, glowing diyas, a rangoli seal and golden sparks. Works for Diwali, Navratri, Holi or a puja.',
      dot: '#d6336c', opener: 'envelope', particles: 'diwali', openParticles: 'diwali', rain: 'diwali',
      art: { corner: 'dw-corner', top: 'dw-top', side: 'dw-side', hang: 'dw-hang', emblem: 'dw-rangoli', seal: 'dw-rangoli' },
      vars: { ground: '#f6e3cf', script: '"Great Vibes", cursive', display: '"Playfair Display", Georgia, serif', ink: '#5a1f2e', inkSoft: '#8f5a4a' },
      words: {
        open: 'Open the invitation', letter: 'Shubh Deepavali', toLine: 'Celebrate the festival of lights with', save: ['Save', 'The', 'Date'],
        story: ['Festival of lights', 'May light fill your home'], details: ['The celebration', 'How the evening unfolds'], when: ['Celebration', 'Puja'],
        rsvp: 'Kindly reply by', countdown: ['Diwali', 'Countdown'], closing: 'With warm wishes', emblemLabel: '', emblemSmall: ''
      },
      nameLabel: 'Hosts or event name',
      defaults: {
        headline: 'Diwali Celebration', nameA: 'The Sharma family', nameB: '', eyebrow: "You're invited", heroLine: 'Happy Diwali',
        inviteLine: 'Lakshmi puja, diyas, sweets, dinner and sparklers with family and friends',
        time: '18:30', venue: 'The Sharma home', address: 'Villa 7, Palm Street', city: 'Dubai, UAE',
        story: 'As the diyas are lit and rangoli brightens our door, we would love to celebrate the triumph of light with you.',
        schedule: [['18:30', 'Welcome and rangoli', 'heart'], ['19:00', 'Lakshmi puja', 'sparkle'], ['20:00', 'Dinner and sweets', 'dinner'], ['21:30', 'Sparklers', 'sparkle']],
        dress: 'Festive traditional', dressNote: 'Traditional or festive wear is warmly welcome, or whatever you feel comfortable in.', colors: ['#f7c531', '#f39c12', '#d6336c', '#7b2cbf', '#1aa39a'],
        travel: 'Visitor parking is by the community gate.',
        gifts: 'Your presence is our blessing. No gifts needed.',
        question: 'Dinner preference', options: 'Vegetarian, Jain, Non vegetarian', maxGuests: 6,
        thanks: 'Thank you! Wishing you and your family a bright and happy Diwali.'
      }
    },
    eid: {
      label: 'Eid celebration', blurb: 'Emerald and gold, glowing lanterns, a crescent seal and gold confetti. For Eid al-Fitr or Eid al-Adha.',
      dot: '#1f5c4a', opener: 'envelope', particles: 'eid', openParticles: 'eid', rain: 'eid',
      art: { corner: 'ed-corner', top: 'ed-top', side: 'ed-side', hang: 'ed-hang', emblem: 'ed-crescent', seal: 'ed-crescent' },
      vars: { ground: '#e3ece6', script: '"Great Vibes", cursive', display: '"Cinzel", Georgia, serif', ink: '#1f3d33', inkSoft: '#5e7a6e' },
      words: {
        open: 'Open the invitation', letter: 'Eid Mubarak', toLine: 'Celebrate Eid with', save: ['Save', 'The', 'Date'],
        story: ['Eid Mubarak', 'A joyful gathering'], details: ['The day', 'What to expect'], when: ['Gathering', 'Prayer'],
        rsvp: 'Kindly reply by', countdown: ['Eid', 'Countdown'], closing: 'Eid Mubarak', emblemLabel: '', emblemSmall: ''
      },
      nameLabel: 'Hosts or event name',
      defaults: {
        headline: 'Eid Celebration', nameA: 'The Rahman family', nameB: '', eyebrow: "You're invited", heroLine: 'Eid Mubarak',
        inviteLine: 'Join us for an Eid lunch with family and friends',
        time: '13:00', venue: 'The Rahman home', address: 'Villa 21, Al Wasl Road', city: 'Dubai, UAE',
        story: 'After a blessed month, we would love to share the joy of Eid with you over a table full of food and good company.',
        schedule: [['13:00', 'Welcome and Arabic coffee', 'glasses'], ['14:00', 'Eid lunch', 'dinner'], ['15:30', 'Eidiya for the children', 'gift'], ['16:30', 'Sweets and tea', 'cake']],
        dress: 'Eid best', dressNote: 'Traditional or festive wear is welcome, or whatever you feel comfortable in.', colors: ['#f4efe3', '#d9b45a', '#1f5c4a', '#2f7a63', '#13241e'],
        travel: 'Parking is available on the side street.',
        gifts: 'Your company is the best gift.',
        question: '', options: '', maxGuests: 6,
        thanks: 'Thank you! Eid Mubarak to you and your family.'
      }
    },
    ramadan: {
      label: 'Ramadan iftar', blurb: 'Midnight blue, copper lanterns, a crescent moon and soft glowing lights.',
      dot: '#2a2f6b', opener: 'envelope', particles: 'ramadan', openParticles: 'ramadan', rain: 'ramadan',
      art: { corner: 'rm-corner', top: 'rm-top', side: 'rm-side', hang: 'rm-hang', emblem: 'rm-moon', seal: 'rm-moon' },
      vars: { ground: '#e4e3ee', script: '"Great Vibes", cursive', display: '"Cinzel", Georgia, serif', ink: '#1d2550', inkSoft: '#5d6282' },
      words: {
        open: 'Open the invitation', letter: 'Ramadan Kareem', toLine: 'Break the fast with', save: ['Save', 'The', 'Date'],
        story: ['Ramadan Kareem', 'A blessed month'], details: ['The evening', 'Iftar and after'], when: ['Iftar', 'Suhoor'],
        rsvp: 'Kindly reply by', countdown: ['Iftar', 'Countdown'], closing: 'Ramadan Kareem', emblemLabel: '', emblemSmall: ''
      },
      nameLabel: 'Hosts or event name',
      defaults: {
        headline: 'Iftar Gathering', nameA: 'Layla & Omar', nameB: '', eyebrow: "You're invited", heroLine: 'Ramadan Kareem',
        inviteLine: 'Join us to break the fast together',
        time: '18:15', venue: 'Our home', address: 'Apartment 1402, Marina Heights', city: 'Dubai, UAE',
        story: 'This blessed month is best shared. Join us at sunset for dates, soup and a long table of family and friends.',
        schedule: [['18:15', 'Dates and water at sunset', 'heart'], ['18:30', 'Maghrib prayer', 'sparkle'], ['18:45', 'Iftar dinner', 'dinner'], ['20:00', 'Tea and sweets', 'cake']],
        dress: 'Modest', dressNote: 'Modest dress, or whatever you feel comfortable in.', colors: ['#f3dfa6', '#e3c178', '#b07a46', '#2a2f6b', '#1d2550'],
        travel: 'Guest parking on level B1. Please arrive a little before sunset.',
        gifts: '', question: '', options: '', maxGuests: 6,
        thanks: 'Thank you! We look forward to breaking the fast with you.'
      }
    },
    uae: {
      label: 'UAE National Day', blurb: 'Red, green, white and black ribbons, palm fronds, flag bunting and a gold rosette.',
      dot: '#00843d', opener: 'envelope', particles: 'uae', openParticles: 'uae', rain: 'uae',
      art: { corner: 'ae-corner', top: 'ae-top', side: 'ae-side', hang: 'ae-hang', emblem: 'ae-rosette', seal: 'ae-rosette' },
      vars: { ground: '#efe9de', script: '"Great Vibes", cursive', display: '"Cinzel", Georgia, serif', ink: '#1a1a1a', inkSoft: '#5f5a52' },
      words: {
        open: 'Open the invitation', letter: 'Eid Al Etihad', toLine: 'Celebrate National Day with', save: ['Save', 'The', 'Date'],
        story: ['National Day', 'Celebrating together'], details: ['The celebration', 'The day’s plan'], when: ['Celebration', 'Fireworks'],
        rsvp: 'Kindly reply by', countdown: ['National Day', 'Countdown'], closing: 'Happy National Day', emblemLabel: '', emblemSmall: ''
      },
      nameLabel: 'Hosts or event name',
      defaults: {
        headline: 'National Day', nameA: 'Our team', nameB: '', eyebrow: "You're invited", heroLine: 'Happy National Day',
        inviteLine: 'A celebration of the UAE with food, music and fireworks',
        time: '17:00', venue: 'The Courtyard', address: 'Building 3, Al Khail Road', city: 'Dubai, UAE',
        story: 'Join us as we celebrate the spirit of the union with Emirati food, music and the fireworks after dark.',
        schedule: [['17:00', 'Welcome and gahwa', 'glasses'], ['18:00', 'Ayyala performance', 'music'], ['19:00', 'Emirati dinner', 'dinner'], ['21:00', 'Fireworks', 'sparkle']],
        dress: 'Flag colours', dressNote: 'Wear red, green, white or black, or whatever you feel comfortable in.', colors: ['#c8102e', '#00843d', '#f7f7f2', '#1a1a1a', '#c9a253'],
        travel: 'Parking is behind Building 3. The courtyard is on the ground floor.',
        gifts: '', question: '', options: '', maxGuests: 4,
        thanks: 'Thank you! See you at the celebration.'
      }
    },
    meeting: {
      label: 'Meeting', blurb: 'Quiet slate and eucalyptus, a calendar seal and clean type. For meetings, workshops or reunions.',
      dot: '#3d4a52', opener: 'envelope', particles: 'meeting', openParticles: 'meeting', rain: '',
      art: { corner: 'mt-corner', top: 'mt-top', side: 'mt-side', hang: 'mt-hang', emblem: 'mt-badge', seal: 'mt-badge' },
      vars: { ground: '#e7e9e6', script: '"Caveat", cursive', display: '"Jost", Arial, sans-serif', ink: '#2b3036', inkSoft: '#646d72' },
      words: {
        open: 'Open the invitation', letter: 'You are invited', toLine: 'A meeting with', save: ['Save', 'The', 'Date'],
        story: ['About the meeting', 'What we’ll cover'], details: ['Agenda', 'Running order'], when: ['Location', 'Online'],
        rsvp: 'Please reply by', countdown: ['Meeting starts in', 'Countdown'], closing: 'See you there', emblemLabel: '', emblemSmall: ''
      },
      nameLabel: 'Meeting title',
      defaults: {
        headline: 'Quarterly Planning', nameA: 'Product team', nameB: '', eyebrow: 'Meeting invitation', heroLine: 'Let’s meet',
        inviteLine: 'Review the quarter and agree on priorities for the next one',
        time: '10:00', venue: 'Meeting room 4B', address: 'Level 4, Tower 2', city: 'Dubai, UAE',
        story: 'We will review what went well, look at the numbers together and agree on three priorities for next quarter.',
        schedule: [['10:00', 'Welcome and coffee', 'glasses'], ['10:15', 'Quarter review', 'clock'], ['11:00', 'Priorities discussion', 'mic'], ['12:00', 'Wrap up', 'heart']],
        dress: '', dressNote: '', colors: ['#f4f1ea', '#d9d4ca', '#8aa39a', '#3d4a52', '#2b3036'],
        travel: 'Visitor badges are at reception on the ground floor.',
        gifts: '', question: 'How will you join?', options: 'In person, Online', maxGuests: 1,
        thanks: 'Thank you! A calendar invite will follow.'
      }
    }
  };
  THEMES.reveal.questionAlways = true;
  var ORDER = ['wedding', 'birthday', 'reveal', 'christmas', 'newyear', 'bbq', 'camping', 'diwali', 'eid', 'ramadan', 'uae', 'meeting'];

  var ICONS = {
    rings: '<circle cx="12" cy="20" r="7"/><circle cx="20" cy="20" r="7"/><path d="M14 9 l2 -3 l2 3 l-2 2z"/>',
    glasses: '<path d="M7 4h6l-.6 9a2.4 2.4 0 0 1-4.8 0z M10 15.5V27 M7 27h6"/><path d="M19 4h6l-.6 9a2.4 2.4 0 0 1-4.8 0z M22 15.5V27 M19 27h6"/>',
    dinner: '<path d="M5 22a11 11 0 0 1 22 0z M3 25h26"/><circle cx="16" cy="9.5" r="1.5"/>',
    mic: '<rect x="12" y="3" width="8" height="14" rx="4"/><path d="M8.5 13a7.5 7.5 0 0 0 15 0 M16 20.5V28 M12 28h8"/>',
    music: '<path d="M12 24V8l13-3v16"/><circle cx="9" cy="24" r="3"/><circle cx="22" cy="21" r="3"/><path d="M12 12l13-3"/>',
    sparkle: '<path d="M14 6q1 7 8 8q-7 1-8 8q-1-7-8-8q7-1 8-8z"/><path d="M24 19q.5 3 3.5 3.5q-3 .5-3.5 3.5q-.5-3-3.5-3.5q3-.5 3.5-3.5z"/>',
    cake: '<path d="M6 27h20V17H6z M6 21c3 2 5 2 7 0s4-2 6 0 4 2 7 0 M16 17v-5"/><path d="M16 12c-1.5-1.5-1.5-3 0-5 1.5 2 1.5 3.5 0 5z"/>',
    gift: '<rect x="5" y="13" width="22" height="14" rx="1"/><path d="M4 9h24v4H4z M16 9v18 M16 9c-3-6-9-5-7-1 1 1 4 1 7 1zm0 0c3-6 9-5 7-1-1 1-4 1-7 1z"/>',
    balloon: '<path d="M16 4c5 0 8 4 8 8.5 0 5-4 9-8 9.5-4-.5-8-4.5-8-9.5C8 8 11 4 16 4z M15 22l1 1.5 1-1.5 M16 23.5c-1 2 1 3 0 5"/>',
    camera: '<path d="M5 10h5l2-3h8l2 3h5v15H5z"/><circle cx="16" cy="17" r="4.5"/>',
    heart: '<path d="M16 26s-10-6-10-13a5 5 0 0 1 10-2 5 5 0 0 1 10 2c0 7-10 13-10 13z"/>',
    clock: '<circle cx="16" cy="16" r="11"/><path d="M16 9v7l5 3"/>'
  };
  var ICON_NAMES = { rings: 'Rings', glasses: 'Glasses', dinner: 'Dinner', mic: 'Speech', music: 'Music', sparkle: 'Sparkle', cake: 'Cake', gift: 'Gift', balloon: 'Balloon', camera: 'Camera', heart: 'Heart', clock: 'Clock' };
  function icon(name) { return '<svg class="icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || ICONS.clock) + '</svg>'; }

  /* ───────── Helpers ───────── */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function newId() { return 'v' + Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4); }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function debounce(fn, ms) { var t; return function () { var a = arguments; clearTimeout(t); t = setTimeout(function () { fn.apply(null, a); }, ms); }; }
  function parseDate(inv) {
    if (!inv.date) return null;
    var p = inv.date.split('-').map(Number), t = (inv.time || '12:00').split(':').map(Number);
    var d = new Date(p[0], p[1] - 1, p[2], t[0] || 0, t[1] || 0);
    return isNaN(d) ? null : d;
  }
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function pad(n, w) { n = String(n); while (n.length < (w || 2)) n = '0' + n; return n; }
  function fmtTime(hm) {
    if (!hm) return '';
    var t = hm.split(':').map(Number); var h = t[0], m = t[1] || 0;
    return ((h % 12) || 12) + ':' + pad(m) + ' ' + (h < 12 ? 'AM' : 'PM');
  }
  function fmtDots(d) { return d ? pad(d.getDate()) + '.' + pad(d.getMonth() + 1) + '.' + d.getFullYear() : 'Date to come'; }
  function fmtLong(d) { return d ? DAYS[d.getDay()] + ' · ' + MONTHS[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() : 'Date to come'; }
  function fmtShortDay(s) {
    if (!s) return '';
    var p = s.split('-').map(Number); var d = new Date(p[0], p[1] - 1, p[2]);
    return isNaN(d) ? '' : d.getDate() + ' ' + MONTHS[d.getMonth()];
  }
  function blobUrl(id) { if (SITE) return SITE.photoUrl(id); return id ? '/_blob/' + encodeURIComponent(id) : ''; }
  function options(inv) { return String(inv.options || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean); }
  function mapSearchUrl(inv) { return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent([inv.venue, inv.address, inv.city].filter(Boolean).join(', ')); }
  /* The host's own Google Maps link wins; otherwise a Google Maps search for the venue and address */
  function mapUrl(inv) { var l = String(inv.mapLink || '').trim(); return /^https?:\/\//i.test(l) ? l : mapSearchUrl(inv); }
  /* Other sites can't be embedded in the page, so the venue card carries a map-style tile that opens Google Maps.
     It shows the host's own map picture when they add one, otherwise a drawn street map in the theme's colours. */
  var MAP_ART = '<svg class="map-art" viewBox="0 0 320 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
    '<rect class="m-land" width="320" height="150"/>' +
    '<path class="m-water" d="M-10 118 C40 100 70 128 120 116 S200 96 240 120 S300 132 330 112 V160 H-10Z"/>' +
    '<path class="m-park" d="M196 14 h70 a8 8 0 0 1 8 8 v34 a8 8 0 0 1 -8 8 h-70 a8 8 0 0 1 -8 -8 v-34 a8 8 0 0 1 8 -8Z"/><path class="m-park" d="M18 20 l52 -8 l10 40 l-56 12Z"/>' +
    '<g class="m-road w"><path d="M-10 78 C60 70 110 92 170 80 S270 60 330 72"/><path d="M150 -10 C144 40 168 70 160 160"/></g>' +
    '<g class="m-road"><path d="M-10 36 L330 20"/><path d="M60 -10 L92 160"/><path d="M236 -10 L214 160"/><path d="M92 104 L330 96"/><path d="M-10 58 L150 50"/><path d="M286 -10 L300 160"/><path d="M20 160 L40 78"/><path d="M160 44 L330 46"/></g></svg>';
  /* On the standalone website the venue card carries a live Google map guests can drag and zoom */
  function mapFrame(inv) {
    var q = [inv.venue, inv.address, inv.city].filter(Boolean).join(', ');
    return '<div class="map-frame"><iframe title="Map of ' + esc(inv.venue || inv.address || 'the venue') + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen src="' + esc(SITE.mapEmbedUrl(q)) + '"></iframe></div>';
  }
  function mapTile(inv) {
    var own = inv.photos && inv.photos.map;
    return '<a class="map-tile' + (own ? ' own' : '') + '" href="' + esc(mapUrl(inv)) + '" target="_blank" rel="noopener" aria-label="Open the location in Google Maps">' +
      (own ? '<span class="map-img" style="background-image:url(\'' + blobUrl(own) + '\')"></span>' : MAP_ART) +
      '<span class="map-pin">' + PIN + '</span><span class="map-cap">' + esc(inv.venue || inv.address || 'The venue') + '<small>Tap to open in Google Maps</small></span></a>';
  }
  var PIN = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>';
  function inviteUrl(id) { return SITE ? SITE.inviteUrl(id) : location.origin + location.pathname + '#i-' + id; }

  function makeInvite(occasion) {
    var th = THEMES[occasion], d = clone(th.defaults);
    var when = new Date(); when.setMonth(when.getMonth() + 6);
    var rsvp = new Date(when); rsvp.setDate(rsvp.getDate() - 45);
    var iso = function (x) { return x.getFullYear() + '-' + pad(x.getMonth() + 1) + '-' + pad(x.getDate()); };
    return {
      occasion: occasion, headline: d.headline, nameA: d.nameA, nameB: d.nameB, age: d.age || '',
      eyebrow: d.eyebrow, heroLine: d.heroLine, inviteLine: d.inviteLine,
      date: iso(when), time: d.time, venue: d.venue, address: d.address, city: d.city, rsvpBy: iso(rsvp),
      story: d.story, schedule: d.schedule.map(function (s) { return { time: s[0], label: s[1], icon: s[2] }; }),
      dress: d.dress, dressNote: d.dressNote, colors: d.colors.slice(), travel: d.travel, gifts: d.gifts, giftsUrl: '',
      question: d.question, options: d.options, maxGuests: d.maxGuests, thanks: d.thanks, contact: '',
      photos: { cover: (themePhotos(occasion)[0] || [''])[0], story: (themePhotos(occasion)[1] || [''])[0] }, createdAt: Date.now(), updatedAt: Date.now()
    };
  }


  /* Palette → invitation colours: when the host picks colours that differ from the theme's own,
     the lightest becomes the paper, the darkest the ink and the most vivid the accent and foil. */
  function hexRgb(h) { h = String(h || '').replace('#', ''); if (h.length === 3) h = h.replace(/./g, '$&$&'); var n = parseInt(h, 16); return isNaN(n) || h.length !== 6 ? null : [n >> 16 & 255, n >> 8 & 255, n & 255]; }
  function lum(c) { return (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) / 255; }
  function sat(c) { var mx = Math.max.apply(null, c), mn = Math.min.apply(null, c); return mx === 0 ? 0 : (mx - mn) / mx * (1 - Math.abs(lum(c) - .5)); }
  function paletteAttrs(inv) {
    var th = THEMES[inv.occasion] || THEMES.wedding, cols = (inv.colors || []).filter(hexRgb);
    if (cols.length < 2 || cols.join().toLowerCase() === th.defaults.colors.join().toLowerCase()) return '';
    var byL = cols.slice().sort(function (a, b) { return lum(hexRgb(b)) - lum(hexRgb(a)); });
    var light = byL[0], dark = byL[byL.length - 1];
    var mids = cols.filter(function (c) { return c !== light && c !== dark; });
    var accent = (mids.length ? mids : cols).slice().sort(function (a, b) { return sat(hexRgb(b)) - sat(hexRgb(a)); })[0];
    var rest = mids.filter(function (c) { return c !== accent; });
    var second = rest[0] || accent, third = rest[1] || second;
    var darkInk = lum(hexRgb(dark)) < .3 ? dark : 'color-mix(in srgb, ' + dark + ' 55%, #000)';
    return ' data-custom style="--pl:' + light + ';--pd:' + dark + ';--pa:' + accent + ';--p2:' + second + ';--p3:' + third + ';--pink:' + darkInk + '"';
  }

  /* ───────── Song: a Spotify link the host pastes; the record on the wedding collage plays it ───────── */
  function spotifyRef(link) {
    var m = /^\s*(?:https?:\/\/open\.spotify\.com\/(?:intl-[a-z-]+\/)?(?:embed\/)?|spotify:)(track|album|playlist|episode)[\/:]([A-Za-z0-9]{10,40})/i.exec(String(link || ''));
    return m ? { kind: m[1].toLowerCase(), id: m[2], uri: 'spotify:' + m[1].toLowerCase() + ':' + m[2], url: 'https://open.spotify.com/' + m[1].toLowerCase() + '/' + m[2] } : null;
  }
  var spotifyApi = null, spotifyWait = null;
  function loadSpotify(ok, fail) {
    if (spotifyApi) { ok(spotifyApi); return; }
    if (spotifyWait) { spotifyWait.push([ok, fail]); return; }
    spotifyWait = [[ok, fail]];
    function settle(api) { var w = spotifyWait || []; spotifyWait = null; spotifyApi = api; w.forEach(function (p) { try { (api ? p[0] : p[1])(api); } catch (e) {} }); }
    var timer = setTimeout(function () { if (spotifyWait) settle(null); }, 12000);
    window.onSpotifyIframeApiReady = function (api) { clearTimeout(timer); if (spotifyWait) settle(api); else spotifyApi = api; };
    var sc = document.createElement('script'); sc.src = 'https://open.spotify.com/embed/iframe-api/v1'; sc.async = true;
    sc.onerror = function () { clearTimeout(timer); sc.remove(); if (spotifyWait) settle(null); };
    document.head.appendChild(sc);
  }

  /* ───────── Invitation markup ───────── */
  function flora(cls, art, extra) { return '<div class="flora ' + cls + '"' + (extra || '') + '><i class="art art-' + art + '"></i></div>'; }
  function clipSvg(right) {
    return '<svg class="clip" viewBox="0 0 20 44" aria-hidden="true"' + (right ? ' style="left:auto;right:22px"' : '') + '><path d="M6 40 V8 a4 4 0 0 1 8 0 v28 a6 6 0 0 1 -12 0 V12" fill="none" stroke="url(#metal)" stroke-width="1.9" stroke-linecap="round"/></svg>';
  }
  function photoBox(id, alt) {
    return id ? '<div class="img" role="img" aria-label="' + esc(alt) + '" style="background-image:url(\'' + blobUrl(id) + '\')"></div>'
      : '<div class="img ph"><span>Your photo</span></div>';
  }
  function emblemCollage(inv, th) {
    if (inv.occasion === 'wedding') return '<button class="emblem record" type="button" data-act="emblem" aria-label="' + (spotifyRef(inv.song) ? 'Play our song' : 'Spin our song') + '" aria-pressed="false"></button><span class="emblem-label"><small style="font-family:var(--display);font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;margin-right:4px">our</small>Song</span>';
    if (inv.occasion === 'birthday') return '<button class="emblem" type="button" data-act="emblem" aria-label="Celebrate"><span class="rosette"><i class="art art-bd-rosette"></i><span>' + esc(inv.age || '★') + '</span></span></button>';
    if (inv.occasion === 'reveal') return '<button class="emblem" type="button" data-act="emblem" aria-label="Boy or girl?"><span class="cloudq"><i class="art art-gr-cloud"></i><span>?</span></span></button>';
    return '<button class="emblem" type="button" data-act="emblem" aria-label="Celebrate"><span class="medal"><i class="art art-' + th.art.emblem + '"></i></span></button>';
  }
  function storyEmblem(inv) {
    if (inv.occasion === 'wedding') return '<div class="emb"><i class="art art-seal"></i></div>';
    if (inv.occasion === 'birthday') return '<div class="emb"><span class="rosette"><i class="art art-bd-rosette"></i><span>' + esc(inv.age || '★') + '</span></span></div>';
    if (inv.occasion === 'reveal') return '<div class="emb cloud"><i class="art art-gr-cloud"></i></div>';
    return '<div class="emb"><i class="art art-' + (THEMES[inv.occasion] || THEMES.wedding).art.emblem + '"></i></div>';
  }

  function renderInvite(inv, mode) {
    var th = THEMES[inv.occasion] || THEMES.wedding, w = th.words, a = th.art;
    var d = parseDate(inv);
    var h = [];
    var names = inv.headline || 'Your names';
    var occ = inv.occasion;
    var cardNames;
    if (occ === 'wedding' && inv.nameA && inv.nameB) cardNames = esc(inv.nameA) + '<span class="and">and</span><br>' + esc(inv.nameB);
    else cardNames = esc(names);
    var side2 = a.side2 || a.side;

    h.push('<div class="page">');
    // 1 Cover
    h.push('<section class="block cover" data-sec="cover">',
      '<p class="eyebrow">' + esc(inv.eyebrow) + '</p>',
      '<h1 class="names foil">' + esc(names) + '</h1>',
      '<p class="date">' + (occ === 'wedding' ? fmtDots(d) : esc(fmtLong(d))) + '</p>',
      '<div class="opener" data-opener>');
    if (th.opener === 'envelope') {
      h.push('<div class="envelope"><div class="env-back"></div><div class="letter"><span class="script">' + esc(w.letter) + '</span><small>' + esc(inv.city) + '</small></div>',
        '<div class="env-front"></div><div class="env-bottom-w"><div class="env-bottom"></div></div><div class="flap-w"><div class="flap"></div></div>',
        '<button class="seal" type="button" data-act="open" aria-label="Open the invitation"><i class="art art-' + (a.seal || 'seal') + '"></i></button></div>');
    } else {
      h.push('<button class="gift" type="button" data-act="open" aria-label="' + esc(w.open) + '"><i class="art g-body art-' + a.box + '-body"></i><i class="art g-lid art-' + a.box + '-lid"></i><span class="g-tag">' + esc(w.tag || (occ === 'reveal' ? 'Boy or girl?' : 'Open me')) + '</span></button><div class="floaters"></div>');
    }
    h.push(flora('c-left', a.corner), flora('c-right' + (occ === 'wedding' ? '' : ' float'), a.side), '</div>',
      '<button class="link-btn" type="button" data-act="open">' + esc(w.open) + '</button></section>');

    // 2 Hero
    h.push('<section class="block hero" data-sec="hero">',
      '<p class="hero-line">' + esc(inv.heroLine) + '</p>',
      '<div class="paper namecard"><p class="eyebrow">' + esc(w.toLine) + '</p><h2 class="caps big">' + cardNames + '</h2>' + (inv.inviteLine ? '<p class="sub">' + esc(inv.inviteLine) + '</p>' : '') + '</div>',
      '<div class="collage"><div class="photo">' + photoBox(inv.photos && inv.photos.cover, names) + '</div>',
      '<div class="datecard"><span class="m">' + (d ? MONTHS[d.getMonth()].toUpperCase() : 'SOON') + '</span><span class="d">' + (d ? d.getDate() : '…') + '</span><span class="y">' + (d ? d.getFullYear() : '') + '</span></div>',
      '<div class="env-mini"></div>', emblemCollage(inv, th),
      flora('a', a.corner), flora('b' + (occ === 'wedding' ? '' : ' float'), side2), '</div>',
      (occ === 'wedding' && spotifyRef(inv.song)) ? '<p class="song-hint">Tap the record to play our song</p><div class="song-player" data-song hidden><div></div></div>' : '', '</section>');

    // 3 Countdown
    h.push('<section class="block countdown" data-sec="count"><div class="heading"><h2 class="caps">' + esc(w.countdown[0]) + '</h2><span class="script">' + esc(w.countdown[1]) + '</span></div>',
      '<div class="paper alt count-strip">' + clipSvg() + '<div class="clock" data-clock><div><b data-cd="d">000</b><span>Days</span></div><div><b data-cd="h">00</b><span>Hours</span></div><div><b data-cd="m">00</b><span>Minutes</span></div><div><b data-cd="s">00</b><span>Seconds</span></div></div></div>',
      flora('hang', a.hang), '</section>');

    // 4 Save the date
    h.push('<section class="block" data-sec="std"><div class="paper std">', flora('top', a.top), flora('side hang', a.hang),
      '<p class="caps">' + esc(w.save[0]) + '</p><p class="the">' + esc(w.save[1]) + '</p><p class="caps">' + esc(w.save[2]) + '</p>',
      '<p class="for">' + esc(fmtLong(d)) + (inv.time ? ' · ' + esc(fmtTime(inv.time)) : '') + '</p></div></section>');

    // 4b Moments: fanned prints that flip over to a handwritten note
    var mk = ['m1', 'm2', 'm3'].map(function (k) { return pic(inv, k); }).filter(Boolean);
    if (mk.length) {
      var mw = MOMENTS[occ] || MOMENTS.wedding;
      h.push('<section class="block moments" data-sec="moments"><div class="heading"><h2 class="caps">' + esc(mw[0]) + '</h2><span class="script">' + esc(mw[1]) + '</span></div>',
        '<div class="prints n' + mk.length + '">' + mk.map(function (id, i) {
          return '<button class="print' + (i === (mk.length === 3 ? 1 : 0) ? ' front' : '') + '" type="button" data-act="flip" style="--i:' + i + '" aria-label="' + esc(picLabel(id) || 'Photo') + '. Tap to bring forward, tap again to turn over" aria-pressed="false"><span class="pf"><span class="img" style="background-image:url(\'' + blobUrl(id) + '\')"></span><span class="cap">' + esc(picLabel(id)) + '</span></span>' +
            '<span class="pb"><span class="note">' + esc(mw[2][i % 3]) + '</span><span class="from">' + esc(names) + '</span></span></button>';
        }).join('') + '</div><p class="tap-hint">Tap a photo to bring it forward. Tap again to turn it over.</p></section>');
    }

    // 5 Story
    if (inv.story || (inv.photos && inv.photos.story)) {
      h.push('<section class="block" data-sec="story"><div class="heading"><h2 class="caps">' + esc(w.story[0]) + '</h2><span class="script">' + esc(w.story[1]) + '</span></div>',
        '<div class="paper story"><div class="story-top"><div class="left"><i class="art art-' + a.side + ' side-art" aria-hidden="true"></i>' + storyEmblem(inv) + '</div>',
        '<div class="photo">' + photoBox(inv.photos && inv.photos.story, names) + '</div></div>',
        inv.story ? '<p class="tale">' + esc(inv.story) + '</p>' : '', '</div></section>');
    }

    // 6 Timeline
    var sched = (inv.schedule || []).filter(function (s) { return s.label; });
    if (sched.length) {
      h.push('<section class="block" data-sec="sched"><div class="heading"><h2 class="caps">' + esc(w.details[0]) + '</h2><span class="script">' + esc(w.details[1]) + '</span></div><ol class="timeline">');
      sched.forEach(function (s) { h.push('<li>' + icon(s.icon) + '<span class="dot"></span><span class="what">' + esc(s.label) + '<span>' + esc(fmtTime(s.time)) + '</span></span></li>'); });
      h.push('</ol></section>');
    }

    // 7 Cards
    h.push('<section class="block" data-sec="cards"><div class="cards">');
    var vp = pic(inv, 'venue');
    h.push('<article class="paper info' + (vp ? ' has-photo' : '') + '">' + (vp ? '<div class="card-photo" aria-hidden="true"><span style="background-image:url(\'' + blobUrl(vp) + '\')"></span></div>' : '') + clipSvg(true) + flora('l', a.side) + '<h3 class="caps">' + esc(w.when[0]) + '</h3>',
      '<address>' + esc([inv.venue, inv.address, inv.city].filter(Boolean).join('\n')) + (inv.time ? '\n' + esc(fmtTime(inv.time)) : '') + '</address>',
      (inv.venue || inv.address || inv.mapLink) ? ((SITE && (inv.venue || inv.address) && !(inv.photos && inv.photos.map)) ? mapFrame(inv) : mapTile(inv)) : '',
      (inv.venue || inv.address) ? '<a class="btn" href="' + esc(mapUrl(inv)) + '" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>Open in Maps</a>' : '', '</article>');
    if (inv.dress) {
      h.push('<article class="paper info alt">' + flora('t', a.top) + '<h3 class="caps">Dress code</h3><span class="script">' + esc(inv.dress) + '</span>',
        inv.dressNote ? '<p class="note">' + esc(inv.dressNote) + '</p>' : '',
        (inv.colors && inv.colors.length) ? '<div class="swatches" aria-label="Suggested colors">' + inv.colors.map(function (c, i) { return '<i style="background:' + esc(c) + ';--d:' + (.6 + i * .1).toFixed(1) + 's"></i>'; }).join('') + '</div>' : '', '</article>');
    }
    if (inv.travel) h.push('<article class="paper info">' + flora('l hang', a.hang) + '<h3 class="caps">Travel</h3><span class="script">Getting there</span><p class="note">' + esc(inv.travel) + '</p>' + ((inv.venue || inv.address || inv.mapLink) ? '<a class="btn" href="' + esc(mapUrl(inv)) + '" target="_blank" rel="noopener">' + PIN + 'Find it on Google Maps</a>' : '') + '</article>');
    if (inv.gifts) {
      h.push('<article class="paper info alt"><h3 class="caps">' + (occ === 'wedding' ? 'Registry' : 'Gifts') + '</h3><p class="note">' + esc(inv.gifts) + '</p>',
        inv.giftsUrl ? '<a class="btn" href="' + esc(inv.giftsUrl) + '" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="9" width="18" height="12" rx="1"/><path d="M3 13h18M12 9v12M12 9c-2-4-6-4-6-1s6 1 6 1zm0 0c2-4 6-4 6-1s-6 1-6 1z"/></svg>See the registry</a>' : '', '</article>');
    }
    h.push('</div></section>');

    // 8 RSVP
    var opts = options(inv), max = Math.max(1, Math.min(12, Number(inv.maxGuests) || 1));
    var guestOpts = ''; for (var g = 1; g <= max; g++) guestOpts += '<option>' + g + '</option>';
    var q = '';
    if (inv.question && opts.length) {
      q = '<fieldset data-q' + (th.questionAlways ? ' data-always' : '') + '><legend>' + esc(inv.question) + '</legend><div class="' + (opts.length === 2 ? 'choices-2' : '') + '" style="display:grid;gap:8px">' +
        opts.map(function (o, i) { var cls = occ === 'reveal' ? (/boy/i.test(o) ? ' boy' : /girl/i.test(o) ? ' girl' : '') : ''; return '<label class="choice' + cls + '"><input type="radio" name="answer" value="' + esc(o) + '"><span>' + esc(o) + '</span></label>'; }).join('') + '</div></fieldset>';
    }
    h.push('<section class="block" data-sec="rsvp"><div class="paper rsvp-head">' + flora('l hang', a.hang) + flora('r' + (occ === 'wedding' ? '' : ' float'), a.side),
      '<h2 class="caps">RSVP</h2>' + (inv.rsvpBy ? '<p class="script">' + esc(w.rsvp) + ' ' + esc(fmtShortDay(inv.rsvpBy)) + '</p>' : '') + '</div>',
      '<form data-rsvp novalidate>',
      '<div class="ffield"><label class="lbl" for="g-name">Full name</label><input type="text" id="g-name" name="name" autocomplete="name" maxlength="120"></div>',
      '<fieldset><legend>Will you be joining us?</legend><label class="choice"><input type="radio" name="attending" value="yes"><span>Joyfully accepts</span></label><label class="choice"><input type="radio" name="attending" value="no"><span>Regretfully declines</span></label></fieldset>',
      '<div class="ffield" data-yes><label class="lbl" for="g-guests">Number of guests, including you</label><select id="g-guests" name="guests">' + guestOpts + '</select></div>',
      q,
      '<div class="ffield"><label class="lbl" for="g-msg">A note for the host <span style="color:var(--ink-soft)">(optional)</span></label><textarea id="g-msg" name="message" maxlength="600" placeholder="Allergies, song requests or well wishes"></textarea></div>',
      '<p class="form-error" role="alert" hidden></p>',
      '<div class="form-actions"><button class="btn" type="submit">Send RSVP</button>' + (mode === 'preview' ? '<p class="saved-note">Preview: replies are not sent from here.</p>' : '') + '</div></form>',
      '<div class="thanks" hidden><p class="script" data-t-title>Thank you</p><p data-t-text></p><p class="saved-note" data-t-note></p><button class="text-btn" type="button" data-act="edit-reply">Change your reply</button></div></section>');

    // 9 Closing
    var bp = pic(inv, 'band');
    h.push('<section class="block closing" data-sec="closing">' + (bp ? '<div class="band" aria-hidden="true"><span class="bimg" style="background-image:url(\'' + blobUrl(bp) + '\')"></span><span class="bdate">' + esc(d ? MONTHS[d.getMonth()] + ' ' + d.getDate() + ' · ' + d.getFullYear() : '') + '</span></div>' : '') + '<div class="envelope-still" aria-hidden="true"><div class="env-back"></div>' + flora('', a.top) + '<div class="env-bottom-w"><div class="env-bottom"></div></div>',
      th.opener === 'envelope' ? '<div class="seal"><i class="art art-' + (a.seal || 'seal') + '"></i></div>' : '', '</div>',
      '<p class="thank">' + esc(inv.thanks) + '</p><p class="love">' + esc(w.closing) + '</p><p class="sig foil">' + esc(names) + '</p>',
      '<p class="date">' + (occ === 'wedding' ? fmtDots(d) : esc(fmtLong(d))) + '</p>',
      inv.contact ? '<hr><p class="contact">For any questions, please contact<br><b>' + esc(inv.contact) + '</b></p>' : '', '</section>');
    h.push('</div>');
    return h.join('');
  }

  /* ───────── Particles (petals, confetti) ───────── */
  function FX(host, fixed) {
    var c = document.createElement('canvas'); c.className = 'fx'; c.setAttribute('aria-hidden', 'true');
    host.appendChild(c);
    var ctx = c.getContext('2d'), parts = [], raf = 0, W = 0, H = 0, dpr = Math.min(2, window.devicePixelRatio || 1);
    function size() { var r = c.getBoundingClientRect(); W = r.width; H = r.height; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size(); window.addEventListener('resize', size);
    function loop() {
      ctx.clearRect(0, 0, W, H);
      for (var i = parts.length - 1; i >= 0; i--) {
        var p = parts[i];
        p.vx *= p.drag; p.vy = p.vy * p.drag + p.g; p.x += p.vx + Math.sin(p.t * p.wf) * p.wa; p.y += p.vy; p.t += 1; p.rot += p.vr;
        if (p.y > H + 40 || p.t > p.life) { parts.splice(i, 1); continue; }
        var flip = Math.cos(p.t * p.ff);
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.scale(1, flip);
        ctx.globalAlpha = Math.min(1, (p.life - p.t) / 40);
        if (p.kind === 'petal') {
          var gr = ctx.createRadialGradient(-p.s * .2, -p.s * .3, 1, 0, 0, p.s);
          gr.addColorStop(0, '#ffffff'); gr.addColorStop(.7, '#f6f3ea'); gr.addColorStop(1, '#ddd8c6');
          ctx.fillStyle = gr; ctx.beginPath(); ctx.ellipse(0, 0, p.s * .62, p.s, 0, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = 'rgba(160,150,120,.25)'; ctx.lineWidth = .6; ctx.stroke();
        } else if (p.kind === 'heart') {
          ctx.fillStyle = p.col; ctx.beginPath(); var s = p.s * .5;
          ctx.moveTo(0, s * .6); ctx.bezierCurveTo(-s * 1.6, -s * .6, -s * .6, -s * 1.6, 0, -s * .5); ctx.bezierCurveTo(s * .6, -s * 1.6, s * 1.6, -s * .6, 0, s * .6); ctx.fill();
        } else if (p.kind === 'flake') {
          var fg = ctx.createRadialGradient(0, 0, 0, 0, 0, p.s * .55);
          fg.addColorStop(0, 'rgba(255,255,255,1)'); fg.addColorStop(.6, 'rgba(255,255,255,.75)'); fg.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(0, 0, p.s * .55, 0, Math.PI * 2); ctx.fill();
        } else if (p.kind === 'glow') {
          ctx.shadowColor = p.col; ctx.shadowBlur = 10; ctx.fillStyle = p.col; ctx.beginPath(); ctx.arc(0, 0, p.s * .3, 0, Math.PI * 2); ctx.fill();
        } else if (p.kind === 'dot') {
          ctx.fillStyle = p.col; ctx.beginPath(); ctx.arc(0, 0, p.s * .45, 0, Math.PI * 2); ctx.fill();
        } else {
          ctx.fillStyle = p.col; ctx.fillRect(-p.s * .5, -p.s * .22, p.s, p.s * .44);
          if (p.metal) { ctx.fillStyle = 'rgba(255,255,255,' + (0.45 * Math.max(0, flip)) + ')'; ctx.fillRect(-p.s * .5, -p.s * .22, p.s, p.s * .14); }
        }
        ctx.restore();
      }
      raf = parts.length ? requestAnimationFrame(loop) : 0;
      if (!raf) ctx.clearRect(0, 0, W, H);
    }
    function kick() { if (!raf) raf = requestAnimationFrame(loop); }
    var PAL = {
      confetti: ['#cfae6b', '#e8cf95', '#efc4bd', '#c98e8c', '#f7efe6', '#b38a48'],
      pinkblue: ['#f1bfcd', '#e39ab0', '#b3cfe8', '#7fa6cf', '#ffffff', '#f7d8e2'],
      xmas: ['#a8242c', '#cfae6b', '#2f5a3b', '#ffffff', '#e8cf95', '#b38a48'],
      goldsilver: ['#cfae6b', '#e8cf95', '#b38a48', '#c9ccd1', '#f4f4f2', '#2b2b2e'],
      bbq: ['#c8373a', '#fbf7f0', '#f2c94c', '#e8742c', '#6b8f4e'],
      camp: ['#f6c14b', '#ffe08a', '#e8742c', '#9bbf7a', '#d98b43'],
      diwali: ['#f7c531', '#f39c12', '#d6336c', '#ffd25a', '#ff7a1a', '#cfae6b'],
      eid: ['#cfae6b', '#e8cf95', '#1f5c4a', '#2f7a63', '#ffffff', '#b38a48'],
      ramadan: ['#ffcf6b', '#ffb85c', '#f3dfa6', '#e3c178', '#ffffff'],
      uae: ['#c8102e', '#00843d', '#f7f7f2', '#1a1a1a', '#cfae6b'],
      meeting: ['#8aa39a', '#d9d4ca', '#3d4a52', '#cfae6b']
    };
    function make(kind, x, y, vx, vy, theme) {
      var pal = PAL[theme] || PAL.confetti, col = pal[(Math.random() * pal.length) | 0], soft = kind === 'petal' || kind === 'flake' || kind === 'glow';
      return {
        kind: kind, x: x, y: y, vx: vx, vy: vy, col: col, metal: col === '#cfae6b' || col === '#b38a48' || col === '#c9ccd1',
        s: kind === 'petal' ? 7 + Math.random() * 7 : kind === 'flake' ? 5 + Math.random() * 9 : 6 + Math.random() * 7, rot: Math.random() * 6.3, vr: (Math.random() - .5) * .2,
        g: soft ? (kind === 'glow' ? .01 : .025) : .14, drag: soft ? .985 : .975, wf: .03 + Math.random() * .05, wa: soft ? .9 : .4,
        ff: kind === 'flake' || kind === 'glow' ? 0 : .05 + Math.random() * .12, t: 0, life: kind === 'petal' || kind === 'flake' ? 900 : kind === 'glow' ? 500 : 360
      };
    }
    return {
      burst: function (x, y, theme, n) {
        if (REDUCE) return;
        var r = c.getBoundingClientRect(); x -= r.left; y -= r.top;
        for (var i = 0; i < (n || 90); i++) {
          var a = -Math.PI / 2 + (Math.random() - .5) * 2.2, sp = 5 + Math.random() * 9;
          var k = theme === 'petals' ? 'petal' : theme === 'snow' ? 'flake' : (theme === 'camp' || theme === 'ramadan' || theme === 'diwali') && Math.random() < .5 ? 'glow' : (Math.random() < .14 && theme === 'pinkblue' ? 'heart' : Math.random() < .2 ? 'dot' : 'rect');
          parts.push(make(k, x, y, Math.cos(a) * sp, Math.sin(a) * sp, theme));
        }
        kick();
      },
      rain: function (theme, n) {
        if (REDUCE) return;
        for (var i = 0; i < (n || 40); i++) {
          var p = make(theme === 'petals' ? 'petal' : theme === 'snow' ? 'flake' : theme === 'camp' || theme === 'ramadan' ? 'glow' : 'rect', Math.random() * W, -20 - Math.random() * H * .6, (Math.random() - .5) * .6, .6 + Math.random() * .8, theme);
          parts.push(p);
        }
        kick();
      },
      destroy: function () { cancelAnimationFrame(raf); window.removeEventListener('resize', size); c.remove(); }
    };
  }

  /* ───────── Mount an invitation (animations, countdown, RSVP) ───────── */
  function mountInvite(root, inv, opt) {
    // opt: { scroller: element|null, fxHost: element, animated: bool, mode: 'guest'|'preview' }
    var th = THEMES[inv.occasion] || THEMES.wedding;
    var cleanups = [];
    var scroller = opt.scroller || null;
    var fx = FX(opt.fxHost, !opt.scroller);
    cleanups.push(fx.destroy);
    var animated = opt.animated && !REDUCE && 'IntersectionObserver' in window;
    if (animated) root.classList.add('anim');

    // Countdown
    var target = parseDate(inv);
    var cdEls = {}; $$('[data-cd]', root).forEach(function (b) { cdEls[b.getAttribute('data-cd')] = b; });
    function setNum(k, v) { var el = cdEls[k]; if (!el || el.textContent === v) return; el.textContent = v; if (animated) { el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick'); } }
    function tick() {
      if (!target) { setNum('d', '—'); return; }
      var s = Math.max(0, Math.floor((target - Date.now()) / 1000));
      setNum('d', pad(Math.floor(s / 86400), 3)); setNum('h', pad(Math.floor(s % 86400 / 3600))); setNum('m', pad(Math.floor(s % 3600 / 60))); setNum('s', pad(s % 60));
    }
    tick(); var iv = setInterval(tick, 1000); cleanups.push(function () { clearInterval(iv); });

    // Opening
    var opener = $('[data-opener]', root), cover = $('.cover', root);
    function scrollToHero() {
      var hero = $('.hero', root); if (!hero) return;
      if (scroller) scroller.scrollTo({ top: hero.offsetTop - 20, behavior: REDUCE ? 'auto' : 'smooth' });
      else hero.scrollIntoView({ behavior: REDUCE ? 'auto' : 'smooth' });
    }
    function open(ev) {
      if (opener.classList.contains('open')) { scrollToHero(); return; }
      opener.classList.add('open');
      var r = opener.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height * (th.opener === 'gift' ? .45 : .4);
      if (th.opener === 'gift') {
        setTimeout(function () { fx.burst(cx, cy, th.particles, 130); if (th.rain) fx.rain(th.rain, 50); }, 260);
        var fl = $('.floaters', opener);
        if (fl && !REDUCE) {
          fl.innerHTML = '';
          (th.floaters || []).concat(th.floaters || []).forEach(function (name, i) {
            var b = document.createElement('i'); b.className = 'art art-' + name;
            b.style.left = (18 + Math.random() * 56) + '%'; b.style.setProperty('--dx', ((Math.random() - .5) * 160) + '%'); b.style.setProperty('--rot', ((Math.random() - .5) * 24) + 'deg');
            b.style.animationDelay = (.25 + i * .14) + 's'; b.style.width = (13 + Math.random() * 7) + '%';
            fl.appendChild(b);
          });
        }
      } else {
        setTimeout(function () { fx.burst(cx, cy, th.openParticles || 'petals', th.particles === 'meeting' ? 24 : 46); if (th.rain !== '') fx.rain(th.rain || 'petals', 26); }, 700);
      }
      setTimeout(function () { cover.classList.add('leaving'); }, REDUCE ? 0 : 1300);
      setTimeout(scrollToHero, REDUCE ? 0 : 1750);
    }

    // Song: the record starts the Spotify player and spins only while music is playing
    var song = { ref: inv.occasion === 'wedding' ? spotifyRef(inv.song) : null, ctrl: null, loading: false, failed: false, dead: false };
    cleanups.push(function () { song.dead = true; clearTimeout(song.nudge); if (song.ctrl) { try { song.ctrl.destroy(); } catch (e) {} song.ctrl = null; } });
    function setSpin(btn, on) { btn.classList.toggle('spin', on); btn.setAttribute('aria-pressed', on ? 'true' : 'false'); }
    function record(btn) {
      var holder = $('[data-song]', root);
      if (!song.ref || !holder || song.failed) { setSpin(btn, !btn.classList.contains('spin')); return; }
      if (song.ctrl) { song.ctrl.togglePlay(); if (song.nudgeFn) song.nudgeFn(); return; }
      if (song.loading) return;
      song.loading = true; btn.classList.add('cue'); holder.hidden = false;
      var hint = $('.song-hint', root); if (hint) hint.hidden = true;
      // Some browsers (Safari on iPhone) only start music from a tap inside the player itself: point the guest at it
      function nudge() {
        clearTimeout(song.nudge);
        song.nudge = setTimeout(function () { var h = $('.song-hint', root); if (song.dead || song.playing || song.failed || !h) return; h.textContent = 'Press play on the player below'; h.hidden = false; }, 1800);
      }
      song.nudgeFn = nudge;
      function fallback() {
        if (song.dead) return;
        song.failed = true; song.loading = false; btn.classList.remove('cue');
        holder.innerHTML = '<a class="btn" href="' + esc(song.ref.url) + '" target="_blank" rel="noopener">Listen on Spotify</a>';
      }
      loadSpotify(function (api) {
        if (song.dead) return;
        try {
          api.createController(holder.firstElementChild, { uri: song.ref.uri, width: '100%', height: song.ref.kind === 'track' || song.ref.kind === 'episode' ? 80 : 152 }, function (ctrl) {
            if (song.dead) { try { ctrl.destroy(); } catch (e) {} return; }
            song.ctrl = ctrl; song.loading = false;
            // if the player never comes alive (blocked frame, offline), fall back to a plain link
            var watchdog = setTimeout(function () { if (song.dead) return; try { ctrl.destroy(); } catch (e) {} song.ctrl = null; setSpin(btn, false); fallback(); }, 10000);
            ctrl.addListener('playback_update', function (e) {
              var d = (e && e.data) || {}; clearTimeout(watchdog); btn.classList.remove('cue');
              song.playing = d.isPaused === false; setSpin(btn, song.playing);
              if (song.playing) { clearTimeout(song.nudge); var h = $('.song-hint', root); if (h) h.hidden = true; }
            });
            ctrl.addListener('ready', function () { clearTimeout(watchdog); btn.classList.remove('cue'); try { ctrl.play(); } catch (e) {} nudge(); });
          });
        } catch (e) { fallback(); }
      }, fallback);
    }

    // Emblem taps
    function emblem(btn) {
      btn.classList.remove('pop'); void btn.offsetWidth; btn.classList.add('pop');
      if (btn.classList.contains('record')) { record(btn); return; }
      var r = btn.getBoundingClientRect(); fx.burst(r.left + r.width / 2, r.top + r.height / 3, th.particles === 'petals' ? 'confetti' : th.particles, 50);
    }

    root.addEventListener('click', function (e) {
      var t = e.target.closest('[data-act]'); if (!t || !root.contains(t)) return;
      var act = t.getAttribute('data-act');
      if (act === 'open') open(e);
      else if (act === 'emblem') emblem(t);
      else if (act === 'flip') {
        if (!t.classList.contains('front')) { $$('.print', t.parentElement).forEach(function (x) { x.classList.remove('front', 'flipped'); x.setAttribute('aria-pressed', 'false'); }); t.classList.add('front'); return; }
        var f = t.classList.toggle('flipped'); t.setAttribute('aria-pressed', f ? 'true' : 'false'); if (f && fx) { var rr = t.getBoundingClientRect(); fx.burst(rr.left + rr.width / 2, rr.top + rr.height / 3, th.particles === 'petals' ? 'confetti' : th.particles, 14); }
      }
      else if (act === 'edit-reply') { $('.thanks', root).hidden = true; $('form[data-rsvp]', root).hidden = false; }
    });

    // Reveal-on-scroll with replay
    if (animated) {
      var tag = function (sel, cls) { $$(sel, root).forEach(function (el) { el.classList.add(cls); }); };
      tag('.block:not(.cover) .paper, .heading .caps, .timeline li, .closing > p:not(.sig), .closing hr, .tale, form[data-rsvp] > *', 'rv');
      tag('.heading .script, .hero-line, .std .the, .info .script, .rsvp-head .script, .closing .sig', 'rv-write');
      $$('.timeline', root).forEach(function (tl) { $$('li', tl).forEach(function (li, i) { li.style.setProperty('--d', (i * .14).toFixed(2) + 's'); }); });
      $$('form[data-rsvp] > *', root).forEach(function (el, i) { el.style.setProperty('--d', (i * .07).toFixed(2) + 's'); });
      $$('.cover .flora', root).forEach(function (f, i) { f.style.setProperty('--d', (1.1 + i * .3) + 's'); });
      var proxies = new Map();
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          var on;
          if (!e.isIntersecting) on = false;
          else if (e.intersectionRatio >= .12 || e.intersectionRect.height > 140) on = true;
          else return;
          [e.target].concat(proxies.get(e.target) || []).forEach(function (el) { el.classList.toggle('in', on); });
          if (e.target === cover && !on) { cover.classList.remove('leaving'); opener.classList.remove('open'); var fl = $('.floaters', root); if (fl) fl.innerHTML = ''; }
        });
      }, { root: scroller, rootMargin: '0px 0px -10% 0px', threshold: [0, .12, .3] });
      $$('.cover, .rv, .flora, .collage, .timeline, .envelope-still, .prints, .band', root).forEach(function (t) { io.observe(t); });
      $$('.rv-write', root).forEach(function (t) { var host = t.parentElement; if (!proxies.has(host)) { proxies.set(host, []); io.observe(host); } proxies.get(host).push(t); });
      cleanups.push(function () { io.disconnect(); });

      // Parallax on artwork, gentle tilt on paper
      var par = $$('.flora:not(.c-left):not(.c-right)', root).map(function (el, i) { return { el: el, f: [.06, -.05, .09, -.08][i % 4] }; });
      var ticking = false;
      function onScroll() {
        if (ticking) return; ticking = true;
        requestAnimationFrame(function () {
          ticking = false;
          var vh = scroller ? scroller.clientHeight : window.innerHeight, top0 = scroller ? scroller.getBoundingClientRect().top : 0;
          par.forEach(function (p) {
            var r = p.el.getBoundingClientRect(), off = (r.top - top0 + r.height / 2 - vh / 2);
            if (Math.abs(off) < vh * 1.2) p.el.style.transform = 'translate3d(0,' + (off * p.f).toFixed(1) + 'px,0)';
          });
        });
      }
      var sEl = scroller || window; sEl.addEventListener('scroll', onScroll, { passive: true }); onScroll();
      cleanups.push(function () { sEl.removeEventListener('scroll', onScroll); });
      var hover = false; try { hover = window.matchMedia('(hover: hover) and (pointer: fine)').matches; } catch (e) {}
      if (hover) {
        var onMove = function (e) {
          var p = e.target.closest && e.target.closest('.paper'); if (!p || !root.contains(p)) return;
          var r = p.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
          p.style.setProperty('--ry', (x * 5).toFixed(2) + 'deg'); p.style.setProperty('--rx', (-y * 5).toFixed(2) + 'deg');
        };
        var onLeave = function (e) { var p = e.target; if (p.classList && p.classList.contains('paper')) { p.style.removeProperty('--rx'); p.style.removeProperty('--ry'); } };
        root.addEventListener('pointermove', onMove); root.addEventListener('pointerout', onLeave);
      }
    }

    // RSVP
    var form = $('form[data-rsvp]', root), thanks = $('.thanks', root), err = $('.form-error', root);
    var yes = $('[data-yes]', root), qset = $('[data-q]', root);
    function sync() {
      var a = form.querySelector('input[name="attending"]:checked'); var v = a ? a.value : '';
      yes.hidden = v === 'no';
      if (qset && !qset.hasAttribute('data-always')) qset.hidden = v === 'no';
    }
    form.addEventListener('change', sync);
    function fill(r) {
      form.name.value = r.name || '';
      if (r.attending) { var a = form.querySelector('input[name="attending"][value="' + r.attending + '"]'); if (a) a.checked = true; }
      if (r.guests) form.guests.value = String(r.guests);
      if (r.answer) $$('input[name="answer"]', form).forEach(function (x) { x.checked = x.value === r.answer; });
      form.message.value = r.message || ''; sync();
    }
    function showThanks(r, note) {
      var first = (r.name || '').split(' ')[0];
      $('[data-t-title]', root).textContent = r.attending === 'yes' ? 'See you there' : 'You’ll be missed';
      $('[data-t-text]', root).textContent = r.attending === 'yes'
        ? 'Thank you, ' + first + '. We’ve saved ' + r.guests + (r.guests === 1 ? ' seat' : ' seats') + ' for you.' + (r.answer && inv.occasion === 'reveal' ? ' Your guess: ' + r.answer + '.' : '')
        : 'Thank you for letting us know, ' + first + '.';
      $('[data-t-note]', root).textContent = note;
      form.hidden = true; thanks.hidden = false;
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault(); err.hidden = true;
      var name = form.name.value.trim(), a = form.querySelector('input[name="attending"]:checked'), ans = form.querySelector('input[name="answer"]:checked');
      var qNeeded = qset && !qset.hidden;
      if (!name) { err.textContent = 'Please enter your full name.'; err.hidden = false; form.name.focus(); return; }
      if (!a) { err.textContent = 'Please let the host know if you can come.'; err.hidden = false; return; }
      if (qNeeded && !ans) { err.textContent = 'Please choose: ' + inv.question.toLowerCase() + '.'; err.hidden = false; return; }
      var r = { name: name, attending: a.value, guests: a.value === 'yes' ? Number(form.guests.value) : 0, answer: qNeeded && ans ? ans.value : '', message: form.message.value.trim(), updatedAt: Date.now() };
      var btn = form.querySelector('button[type="submit"]'), br = btn.getBoundingClientRect();
      var celebrate = function () { if (r.attending === 'yes') fx.burst(br.left + br.width / 2, br.top, th.particles === 'petals' ? 'petals' : th.particles, 70); };
      if (opt.mode !== 'guest' || !opt.saveReply) { celebrate(); showThanks(r, 'This is a preview, so the reply was not sent.'); return; }
      btn.disabled = true; btn.textContent = 'Sending…';
      opt.saveReply(r).then(function () { celebrate(); showThanks(r, 'Your reply has been sent.'); })
        .catch(function () { err.textContent = 'Your reply couldn’t be sent from this link. Please contact the host directly.' + (inv.contact ? ' ' + inv.contact : ''); err.hidden = false; })
        .then(function () { btn.disabled = false; btn.textContent = 'Send RSVP'; });
    });
    if (opt.existingReply) { fill(opt.existingReply); showThanks(opt.existingReply, 'We have your reply. You can change it any time.'); }
    sync();

    return function () { cleanups.forEach(function (f) { try { f(); } catch (e) {} }); };
  }

  /* ───────── App state ───────── */
  var S = { db: null, user: null, assets: null, uid: null, canEdit: null, connected: false, invites: {}, invitesLoaded: false, replies: {}, route: { view: 'home' }, unmount: null, draft: null, tab: 'edit', animatePreview: false, confirmDelete: false, saveState: '' };
  var app = document.getElementById('app');

  function parseHash() {
    var h = ''; try { h = (location.hash || '').replace(/^#/, ''); } catch (e) {}
    var m;
    if ((m = /^i-([\w~.-]+)$/.exec(h))) return { view: 'invite', id: m[1] };
    if ((m = /^edit-([\w~.-]+)$/.exec(h))) return { view: 'edit', id: m[1] };
    if ((m = /^replies-([\w~.-]+)$/.exec(h))) return { view: 'replies', id: m[1] };
    if (h === 'new') return { view: 'new' };
    /* a readable guest link such as /emma-oliver-wedding: the name is looked up when the invitation opens */
    if (!h && SITE && SITE.pathName && SITE.pathName()) return { view: 'invite', id: '@' + SITE.pathName() };
    return { view: 'home' };
  }
  function go(token) {
    try { if (('#' + token) !== location.hash) { history.pushState(null, '', token ? '#' + token : (SITE && SITE.basePath ? SITE.basePath() : location.pathname + location.search)); } } catch (e) {}
    S.route = parseHash(); if (!token) S.route = { view: 'home' };
    S.confirmDelete = false;
    if (SITE && (S.route.view === 'home' || S.route.view === 'replies')) SITE.refresh();
    render(); try { window.scrollTo(0, 0); } catch (e) {}
  }
  S.route = parseHash();
  window.addEventListener('hashchange', function () { S.route = parseHash(); render(); });
  window.addEventListener('popstate', function () { S.route = parseHash(); render(); });

  var toastT;
  function toast(msg) {
    var t = $('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('on'); }, 2200);
  }
  function copy(text, okMsg) {
    var done = function () { toast(okMsg || 'Copied'); };
    try {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); });
    } catch (e) { fallbackCopy(text); }
    function fallbackCopy() { var c = $('.link-box code'); if (c) { var r = document.createRange(); r.selectNodeContents(c); var s = getSelection(); s.removeAllRanges(); s.addRange(r); } toast('Select the link and copy it'); }
  }

  function setTheme(el, occ) {
    var v = (THEMES[occ] || THEMES.wedding).vars;
    el.style.setProperty('--t-ground', v.ground); el.style.setProperty('--t-script', v.script); el.style.setProperty('--t-display', v.display);
    el.style.setProperty('--t-ink', v.ink); el.style.setProperty('--t-ink-soft', v.inkSoft);
  }
  function teardown() { if (S.unmount) { S.unmount(); S.unmount = null; } }

  function replyStats(id) {
    var rows = [], yes = 0, no = 0, guests = 0, answers = {};
    Object.keys(S.replies).forEach(function (uid) {
      var doc = S.replies[uid] || {}, r = doc.replies && doc.replies[id];
      if (!r) return;
      rows.push(r);
      if (r.attending === 'yes') { yes++; guests += Number(r.guests) || 0; } else if (r.attending === 'no') no++;
      if (r.answer) answers[r.answer] = (answers[r.answer] || 0) + (r.attending === 'yes' ? (Number(r.guests) || 1) : 1);
    });
    rows.sort(function (a, b) { return (b.updatedAt || 0) - (a.updatedAt || 0); });
    return { rows: rows, yes: yes, no: no, guests: guests, answers: answers };
  }

  /* ───────── Views ───────── */
  function render() {
    teardown();
    var r = S.route;
    document.body.classList.remove('guest', 'studio-on');
    if (r.view === 'invite') return renderGuest(r.id);
    if (S.canEdit === null) { app.innerHTML = '<div class="loading">Opening your invitations…</div>'; return; }
    if (!S.canEdit) {
      if (SITE) { SITE.renderLogin(app); return; }
      app.innerHTML = '<div class="guest-note"><h1>Invitations live here</h1><p>Open the link from your invitation to see it and reply.</p></div>';
      return;
    }
    document.body.classList.add('studio-on');
    if (r.view === 'new') return renderNew();
    if (r.view === 'edit') return renderEditor(r.id);
    if (r.view === 'replies') return renderReplies(r.id);
    return renderHome();
  }

  function topbar(sub, right) {
    var out = SITE ? '<button class="s-btn ghost" type="button" data-signout title="' + esc(SITE.email()) + '">Sign out</button>' : '';
    return '<header class="topbar"><div class="brand"><b>Invitation Studio</b><span>' + esc(sub || '') + '</span></div><div class="top-acts">' + (right || '') + out + '</div></header>';
  }
  function themeArtCard(occ, nm) {
    var th = THEMES[occ];
    return '<button class="tcard" type="button" data-new="' + occ + '"><div class="scene" data-theme-vars="' + occ + '"><i class="art a2 art-' + th.art.top + '"></i><i class="art a1 art-' + th.art.corner + '"></i><span class="nm">' + esc(nm) + '</span></div><div class="txt"><b>' + esc(th.label) + '</b><span>' + esc(th.blurb) + '</span></div></button>';
  }

  function renderHome() {
    var list = Object.keys(S.invites).map(function (id) { return S.invites[id]; }).sort(function (a, b) { return (b.updatedAt || 0) - (a.updatedAt || 0); });
    var h = [topbar('Create, preview and share invitations', '<button class="s-btn primary" type="button" data-go="new">' + plus() + 'New invitation</button>'), '<main class="wrap">'];
    h.push('<div class="s-head"><div><h1 class="s-h1">Your invitations</h1><p class="s-sub">Each invitation gets its own link. Guests reply right on the page, and you see every answer here.</p></div></div>');
    if (!S.invitesLoaded) h.push('<div class="loading" style="min-height:30vh">Loading invitations…</div>');
    else if (!list.length) {
      h.push('<div class="empty"><div><h2 class="s-h1" style="font-size:1.4rem">Start with an occasion</h2><p class="s-sub">Pick a theme. You can change every word, date and photo afterwards.</p></div><div class="themes">' +
        ORDER.map(function (o) { return themeArtCard(o, THEMES[o].defaults.headline); }).join('') + '</div></div>');
    } else {
      h.push('<div class="grid">');
      list.forEach(function (inv) {
        var th = THEMES[inv.occasion] || THEMES.wedding, st = replyStats(inv._id), d = parseDate(inv);
        h.push('<article class="icard"><button class="thumb" type="button" data-theme-vars="' + inv.occasion + '" data-go="edit-' + inv._id + '" aria-label="Edit ' + esc(inv.headline) + '">',
          '<i class="art t-art art-' + th.art.corner + '"></i><i class="art t-art2 art-' + th.art.side + '"></i>',
          '<span><span class="t-name" style="display:block">' + esc(inv.headline || 'Untitled') + '</span><span class="t-date">' + esc(d ? MONTHS[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() : 'No date yet') + '</span></span></button>',
          '<div class="body"><span class="chip" style="--dot:' + th.dot + '"><i></i>' + esc(th.label) + '</span><h3>' + esc(inv.headline || 'Untitled') + '</h3>',
          '<div class="meta"><span><b>' + st.yes + '</b> attending</span><span><b>' + st.guests + '</b> guests</span><span><b>' + st.no + '</b> declined</span></div>',
          '<div class="acts"><button class="s-btn" type="button" data-go="edit-' + inv._id + '">Edit</button><button class="s-btn" type="button" data-go="replies-' + inv._id + '">Replies</button><button class="s-btn" type="button" data-go="i-' + inv._id + '">Open</button><button class="s-btn ghost" type="button" data-copy="' + inv._id + '">Copy link</button></div></div></article>');
      });
      h.push('</div>');
    }
    h.push('</main>');
    app.innerHTML = '<div class="studio">' + h.join('') + '</div>';
    applyThemeVars();
  }
  function plus() { return '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M8 3v10M3 8h10"/></svg>'; }
  function applyThemeVars() { $$('[data-theme-vars]').forEach(function (el) { setTheme(el, el.getAttribute('data-theme-vars')); }); }

  function renderNew() {
    app.innerHTML = '<div class="studio">' + topbar('New invitation', '<button class="s-btn" type="button" data-go="">Back</button>') +
      '<main class="wrap"><div class="s-head"><div><h1 class="s-h1">What are you celebrating?</h1><p class="s-sub">Each theme has its own paper, artwork, opening moment and RSVP question. Everything is editable.</p></div></div><div class="themes">' +
      ORDER.map(function (o) { return themeArtCard(o, THEMES[o].defaults.headline); }).join('') + '</div></main></div>';
    applyThemeVars();
  }

  function createInvite(occ) {
    var id = newId(), inv = makeInvite(occ);
    if (!S.db) { toast('Saving is not available here'); return; }
    S.saveState = 'Saving…';
    S.db.doc('invites/' + id).set(inv).then(function () { S.saveState = 'Saved'; paintSave(); }, function () { S.saveState = 'Couldn’t save'; paintSave(true); });
    inv._id = id; S.invites[id] = inv;
    go('edit-' + id);
  }

  /* Editor */
  /* Link name: a readable guest link. The name is checked against every other invitation, and the host is asked to change it when it is taken. */
  function slugify(t) {
    var s = String(t || '').toLowerCase(); try { s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); } catch (e) {}
    return s.replace(/&/g, ' ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60).replace(/-+$/, '');
  }
  var LINK_HELP = 'Letters, numbers and dashes. The private link above always keeps working.';
  var LINK_CHANGE_WARN = 'If you change or remove this name, the old named link stops working for guests who already have it. The private link above always keeps working.';
  function linkTakenMsg(name) { return '“' + name + '” is already used by another invitation. Change the name a little and try again, for example ' + (name + '-' + new Date().getFullYear()).slice(0, 60) + '.'; }
  function linkNameField(id, d) {
    if (!SITE || !SITE.setLink || !SITE.linksReady()) return '';
    var cur = SITE.linkName(id), th = THEMES[d.occasion] || THEMES.wedding;
    /* a name the host is still typing survives the editor redrawing its form */
    var dr = S.linkDraft && S.linkDraft.id === id ? S.linkDraft : null;
    var val = dr ? dr.value : (cur || slugify((d.headline || '') + ' ' + th.label.split(' ')[0]));
    var msg = dr && dr.msg ? dr.msg : (cur ? 'Your guest link uses this name. ' + LINK_CHANGE_WARN : 'Give your guest link a name guests can read. ' + LINK_HELP);
    return '<div class="link-name"><label class="fld"><span>Link name</span><span class="link-name-row"><span class="link-prefix">' + esc(SITE.linkBase()) + '</span><input type="text" data-link-name="' + id + '" value="' + esc(val) + '" maxlength="60" autocapitalize="off" autocomplete="off" spellcheck="false" placeholder="emma-oliver-wedding"></span></label>' +
      '<div><button class="s-btn" type="button" data-link-save="' + id + '">' + (cur ? 'Change link' : 'Use this link') + '</button></div>' +
      '<p class="hint' + (dr && dr.kind ? ' ' + dr.kind : '') + '" data-link-msg role="status">' + esc(msg) + '</p></div>';
  }
  function linkMsg(text, kind) {
    if (S.linkDraft) { S.linkDraft.msg = text; S.linkDraft.kind = kind || ''; }
    var m = $('[data-link-msg]'); if (m) { m.textContent = text; m.className = 'hint' + (kind ? ' ' + kind : ''); }
  }
  var linkCheckSeq = 0, linkSaving = false;
  var linkCheckSoon = debounce(function () {
    if (linkSaving) return;
    var inp = $('[data-link-name]'); if (!inp || !SITE) return;
    var id = inp.getAttribute('data-link-name'), name = slugify(inp.value), seq = ++linkCheckSeq;
    if (!name) { linkMsg(SITE.linkName(id) ? 'Press the button to remove the name. ' + LINK_CHANGE_WARN : 'Leave this empty to keep the private link, or type a name. ' + LINK_HELP); return; }
    var bad = SITE.linkProblem(name); if (bad) { linkMsg(bad, 'bad'); return; }
    if (name === SITE.linkName(id)) { linkMsg('Your guest link uses this name. ' + LINK_CHANGE_WARN); return; }
    SITE.linkFree(name, id).then(function (free) {
      if (seq !== linkCheckSeq || linkSaving) return;
      if (free) linkMsg('“' + name + '” is available. Press the button to use it.', 'good'); else linkMsg(linkTakenMsg(name), 'bad');
    }, function () {});
  }, 450);
  function saveLinkName(id) {
    var inp = $('[data-link-name]'); if (!inp || !SITE) return;
    var name = slugify(inp.value), bad = name ? SITE.linkProblem(name) : '';
    linkCheckSeq++;
    if (bad) { linkMsg(bad, 'bad'); inp.focus(); return; }
    inp.value = name; if (S.linkDraft) S.linkDraft.value = name; linkSaving = true; linkMsg('Checking…');
    var stop = function () { linkSaving = false; linkCheckSeq++; };
    var done = function () {
      stop(); S.linkDraft = null;
      var code = $('[data-link-url]'); if (code) code.textContent = inviteUrl(id);
      var b = $('[data-link-save]'); if (b) b.textContent = name ? 'Change link' : 'Use this link';
      linkMsg(name ? 'Saved. Your guest link is now ' + inviteUrl(id) : 'Link name removed. Your guest link is the private one above.', 'good'); toast(name ? 'Guest link saved' : 'Link name removed');
    };
    var taken = function () { stop(); linkMsg(linkTakenMsg(name), 'bad'); var i = $('[data-link-name]'); if (i) { i.focus(); i.select(); } };
    var save = function () {
      return SITE.setLink(id, name).then(done, function (e) {
        if (e && e.taken) { taken(); return; }
        stop(); linkMsg(e && e.missing ? 'Couldn’t save the link name because this invitation isn’t saved to your account. Sign in again or reload the page, then try again.' : 'Couldn’t save the link name. Check your connection and try again.', 'bad');
      });
    };
    if (!name) { save(); return; }
    /* check the name first so the host gets a clear answer; the database still refuses a duplicate if two hosts race */
    SITE.linkFree(name, id).then(function (free) { if (free) save(); else taken(); }, save);
  }
  function songHint(link) {
    if (String(link || '').trim() && !spotifyRef(link)) return '<b>That does not look like a Spotify link.</b> In Spotify, open the song, choose Share, then Copy song link, and paste it here.';
    return 'In Spotify, open the song, choose Share, then Copy song link, and paste it here. Guests tap the record (or the play button on the player) to play it, and the record spins while the music plays. Guests who are not signed in to Spotify hear a short preview.';
  }
  function fieldHtml(label, name, val, type, extra) {
    if (type === 'textarea') return '<label class="fld"><span>' + esc(label) + '</span><textarea data-f="' + name + '"' + (extra || '') + '>' + esc(val) + '</textarea></label>';
    return '<label class="fld"><span>' + esc(label) + '</span><input type="' + (type || 'text') + '" data-f="' + name + '" value="' + esc(val) + '"' + (extra || '') + '></label>';
  }
  function renderEditor(id) {
    var inv = S.invites[id];
    if (!inv) {
      app.innerHTML = '<div class="studio">' + topbar('') + '<main class="wrap">' + (S.invitesLoaded ? '<div class="empty"><h1 class="s-h1" style="font-size:1.4rem">This invitation was deleted or never saved</h1><button class="s-btn" type="button" data-go="">Back to invitations</button></div>' : '<div class="loading">Loading…</div>') + '</main></div>';
      return;
    }
    S.draft = clone(inv); S.draft._id = id;
    if (S.linkDraft && S.linkDraft.id !== id) S.linkDraft = null;
    var d = S.draft, th = THEMES[d.occasion] || THEMES.wedding;
    var h = [];
    h.push(topbar(d.headline, '<span class="save-state" data-save>' + esc(S.saveState) + '</span><button class="s-btn" type="button" data-go="">All invitations</button>'));
    h.push('<main class="wrap"><div class="s-head"><div><h1 class="s-h1">' + esc(d.headline || 'Untitled') + '</h1><p class="s-sub">Changes save as you type and show in the preview.</p></div>',
      '<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="s-btn" type="button" data-go="replies-' + id + '">Replies</button><button class="s-btn primary" type="button" data-copy="' + id + '">Copy guest link</button></div></div>');
    h.push('<div class="seg tabs" role="group" aria-label="Editor view"><button type="button" data-tab="edit" aria-pressed="' + (S.tab === 'edit') + '">Edit</button><button type="button" data-tab="preview" aria-pressed="' + (S.tab === 'preview') + '">Preview</button></div>');
    h.push('<div class="editor" data-tab="' + S.tab + '"><div class="form">');
    h.push('<section class="sec"><h2>Occasion</h2><div class="seg" role="group" aria-label="Occasion">' + ORDER.map(function (o) { return '<button type="button" data-occ="' + o + '" aria-pressed="' + (d.occasion === o) + '">' + esc(THEMES[o].label) + '</button>'; }).join('') + '</div><p class="hint">Switching keeps your words and changes the paper, art, fonts and opening.</p></section>');
    h.push('<section class="sec"><h2>Names and words</h2>', fieldHtml(th.nameLabel + ' (as shown on the cover)', 'headline', d.headline));
    if (d.occasion === 'wedding') h.push('<div class="row">' + fieldHtml('First name', 'nameA', d.nameA) + fieldHtml('Second name', 'nameB', d.nameB) + '</div>');
    if (d.occasion === 'birthday') h.push('<div class="row">' + fieldHtml('Age they are turning (optional)', 'age', d.age, 'text', ' maxlength="3" inputmode="numeric"') + '</div>');
    h.push('<div class="row">' + fieldHtml('Small line above the names', 'eyebrow', d.eyebrow) + fieldHtml('Opening line', 'heroLine', d.heroLine) + '</div>',
      fieldHtml('Invitation wording', 'inviteLine', d.inviteLine, 'textarea'), '</section>');
    if (d.occasion === 'wedding') h.push('<section class="sec"><h2>Our song</h2>', fieldHtml('Spotify link to your song (optional)', 'song', d.song || '', 'url', ' placeholder="https://open.spotify.com/track/…"'),
      '<p class="hint" data-song-hint>' + songHint(d.song) + '</p>', '</section>');
    h.push('<section class="sec"><h2>When and where</h2><div class="row">' + fieldHtml('Date', 'date', d.date, 'date') + fieldHtml('Start time', 'time', d.time, 'time') + fieldHtml('Reply by', 'rsvpBy', d.rsvpBy, 'date') + '</div>',
      '<div class="row">' + fieldHtml('Venue', 'venue', d.venue) + fieldHtml('Street address', 'address', d.address) + fieldHtml('City and region', 'city', d.city) + '</div>',
      photoField('map', 'Map of your street', d) + '<p class="hint">To show your real street on the venue card: open your venue in Google Maps, take a screenshot, and upload it here. Guests tap it to open Google Maps. <button class="text-link" type="button" data-map-search>Open your venue in Google Maps</button></p>',
      fieldHtml('Contact for questions (email or phone)', 'contact', d.contact), '</section>');
    h.push('<section class="sec"><h2>Photos</h2>' + photoField('cover', 'Cover photo', d) + photoField('story', 'Story photo', d) + '<h3 class="sub-h">More photos inside the invitation</h3><p class="hint">These start with photos picked for your theme. Change any of them, or remove one to hide it.</p>' + EXTRA_SLOTS.map(function (x) { return photoField(x[0], x[1], d); }).join('') + (S.assets ? '' : '<p class="hint">Photo uploads are available to editors of this page.</p>') + '</section>');
    h.push('<section class="sec"><h2>' + esc(th.words.story[0]) + '</h2>', fieldHtml('A few lines (leave empty to hide this section)', 'story', d.story, 'textarea'), '</section>');
    h.push('<section class="sec"><h2>Schedule</h2><div class="sched" data-sched>' + schedRows(d) + '</div><div><button class="s-btn" type="button" data-sched-add>' + plus() + 'Add a moment</button></div></section>');
    h.push('<section class="sec"><h2>Details</h2><div class="row">' + fieldHtml('Dress code (leave empty to hide)', 'dress', d.dress) + fieldHtml('Dress code note', 'dressNote', d.dressNote) + '</div>' + dressChips(d),
      '<div class="fld"><span>Suggested colors</span><div class="colors">' + (d.colors || []).map(function (c, i) { return '<input type="color" aria-label="Color ' + (i + 1) + '" data-color="' + i + '" value="' + esc(c) + '">'; }).join('') + '</div><span class="hint" style="margin-top:4px">Tap a circle to fine tune, or pick a preset</span>' + palettesHtml(d) + '</div>',
      fieldHtml('Travel and parking (leave empty to hide)', 'travel', d.travel, 'textarea'),
      fieldHtml('Google Maps link (optional)', 'mapLink', d.mapLink || '', 'url', ' placeholder="https://maps.app.goo.gl/…"'),
      '<p class="hint">Guests get a Google Maps button on the venue and travel cards. Leave this empty and the button searches Google Maps for your venue and address. Paste a link to send guests to an exact pin, such as the car park. <button class="text-link" type="button" data-map-search>Search your venue on Google Maps</button></p>',
      fieldHtml('Gifts or registry note (leave empty to hide)', 'gifts', d.gifts, 'textarea'), fieldHtml('Registry link (optional)', 'giftsUrl', d.giftsUrl, 'url', ' placeholder="https://"'), '</section>');
    h.push('<section class="sec"><h2>RSVP</h2><div class="row">' + fieldHtml('Most guests per reply', 'maxGuests', d.maxGuests, 'number', ' min="1" max="12"') + fieldHtml('Extra question (optional)', 'question', d.question) + '</div>',
      fieldHtml('Answer choices, separated by commas', 'options', d.options), fieldHtml('Thank-you note at the end', 'thanks', d.thanks, 'textarea'), '</section>');
    h.push('<section class="sec"><h2>Share</h2><div class="link-box"><code data-link-url>' + esc(inviteUrl(id)) + '</code><button class="s-btn" type="button" data-copy="' + id + '">Copy</button></div>' + linkNameField(id, d) + '<p class="hint">' + (SITE ? 'Send this link to your guests by message or email. They open it and reply right on the page, with no account or app.' : 'To let guests reply, share this page from the Share menu with Contributor access. Viewers can see the invitation but cannot send an RSVP.') + '</p>',
      S.confirmDelete ? '<div class="confirm"><span>Delete this invitation? Guests’ replies stay saved.</span><button class="s-btn danger" type="button" data-del-yes>Delete</button><button class="s-btn" type="button" data-del-no>Keep it</button></div>'
        : '<div><button class="s-btn ghost danger" type="button" data-del>Delete invitation</button></div>', '</section>');
    h.push('</div><aside class="preview-col"><div class="preview-bar"><button class="s-btn" type="button" data-play>' + (S.animatePreview ? 'Stop animations' : 'Play animations') + '</button><button class="s-btn" type="button" data-go="i-' + id + '">Open full view</button></div>',
      '<div class="phone"><div class="screen" data-screen></div></div></aside></div></main>');
    app.innerHTML = '<div class="studio">' + h.join('') + '</div>';
    paintPreview(true);
  }
  /* Real photos (free Unsplash/Pexels licence), bundled with the site. Older illustrated ids stay valid for invites that already use them. */
  var LIBRARY = [
    ['b2c6f55335f8441430ae5f4abdbb9f1a', 'Garden reception', 'wedding'], ['f50e2d293d53ed45a79e9201ab8fb0b3', 'Floral aisle', 'wedding'],
    ['a190f7263aa83b8ad2d0e52a98778e42', 'Rings and peonies', 'wedding'], ['60454309eee3e7d95c9d0aa10578c08b', 'Hand in hand', 'wedding'],
    ['46c5fb78d080269198865f6b2e9511cc', 'Birthday candles', 'birthday'], ['ce35008f36c0a493b7f5e0b3ccc806d5', 'Balloon ceiling', 'birthday'],
    ['c621dbfa9fbc0bbc4a9036fc540fb4b1', 'Confetti', 'birthday'], ['5ad9308afee5263e0492219878c18515', 'Party banner', 'birthday'],
    ['cdca1f58e722f9fec6e40a8a10535f38', 'Pink and blue balloons', 'reveal'], ['c67849e6aeed2933cd42a239b41e2470', 'The big moment', 'reveal'],
    ['fb7160145e176c5273fa0f851cf442f8', 'Smoke reveal outdoors', 'reveal'], ['d5367f933028c082bee2e2692c4687bb', 'Tiny toes', 'reveal'],
    ['a077a11aa7fb11badc601df49eb55ad5', 'Tree and stockings', 'christmas'], ['132047ba1cbf7f69ae5c4dc77b708c41', 'Red ornaments', 'christmas'],
    ['f8bd53039ea1ae772ef30e30ac0c90ba', 'Glowing porch', 'christmas'], ['cc24d35df9ad78e6f04299cb409610da', 'Trimming the tree', 'christmas'],
    ['3b90e0d9ac3f6e4fd6e1635899a1f8bb', 'Sparklers', 'newyear'], ['918d3ed5b9707e31991f9b7029eddb4f', 'City fireworks', 'newyear'],
    ['4dc4403a3e2bb00ce3f094b8f4e3cf63', 'Champagne and streamers', 'newyear'], ['9476f1364574dd3cf188f3c3113ee9b4', 'Confetti cheers', 'newyear'],
    ['99396a7d1f0ff18830601213053e5280', 'Grilled skewers', 'bbq'], ['3ccbe69b11bc2e4abb8d134240b52d4d', 'Smoked ribs', 'bbq'],
    ['441a06bd64c6582f5043ca5600f597c0', 'Sliced steak', 'bbq'], ['172c4c488345db83c742fe05fc8e2613', 'Raise a glass', 'bbq'],
    ['a9872d2f85d75518435e31f860911fb7', 'Campfire circle', 'camping'], ['dbed853ed15b733a3295cfac76edd190', 'Tents in the pines', 'camping'],
    ['bf652be3f32d3caa3fbe175f424b6ce9', 'Under the stars', 'camping'], ['dc6c3bf4707b4d452950a9e79ab84548', 'Sunrise camp', 'camping'],
    ['e690ffe661459d8224ec54d680404a73', 'Diyas and petals', 'diwali'], ['b72a107b36fc320f6db7876a676b4ec2', 'Rangoli with lamps', 'diwali'],
    ['58e4251b71af7ff501b7367522cbb7fc', 'Clay diya', 'diwali'], ['f61415d36a40d3e69c50ec02960ef59a', 'Festival of colours', 'diwali'],
    ['606473d7690968814c9fd085b59a8083', 'Mosque at sunset', 'eid'], ['da85e24ab05e1506356f1c470c75c609', 'Eid sweets', 'eid'],
    ['dd7cb38095d5436d2ce29c37ff7ab3d3', 'Golden tray', 'eid'], ['3cbbdef52c31c631a0c4d49f107145e3', 'White domes', 'eid'],
    ['bcc4985434221122539e7501690be7a0', 'Lantern glow', 'ramadan'], ['eeaffda56adbff7fe800964cb58c17f9', 'Dates and lantern', 'ramadan'],
    ['47447e9f05c2e9ba0256442b9cd9d2f4', 'Iftar table', 'ramadan'], ['79eb78fcd921132720bb382d1a007724', 'Quran and flowers', 'ramadan'],
    ['2ecff04641064302c7e7728a105122cc', 'Flag over the city', 'uae'], ['5b9f56a2d1db1f7fe819952f1daafdb0', 'Flags in the sky', 'uae'],
    ['557a3dfc4fea53fa53290261ae73ab33', 'Dubai skyline', 'uae'], ['827c8fedbded6a742f6d32804a225a71', 'Burj Khalifa', 'uae'],
    ['f99374b1f5ff186ac266750c1af07d18', 'Workshop', 'meeting'], ['b925f49528d785a171573b690b8f1a38', 'Conference room', 'meeting'],
    ['f5a7554efcf2d51d276d42176fed8b49', 'Team talk', 'meeting'], ['b3bf1c08e574b14bd63e4c28319fb96f', 'Around the table', 'meeting'],
    ['849cd18cbcd2faeedfa15050f56614c7', 'Two chairs by the lake', 'wedding'], ['d532787de545dbf07ba71ce1953289d4', 'First walk together', 'wedding'], ['f8f747624d4d4dadc5ef0154d415bee2', 'Golden hour bouquet', 'wedding'],
    ['f98704411e3de3e1e6f84bd124db6c5d', 'Cake with friends', 'birthday'], ['8721a373d418b59a3016415341418595', 'Happy birthday plate', 'birthday'], ['0af0160fc017e6d2bdc7dfcf1c6deb26', 'Raise a toast', 'birthday'],
    ['e3e4a056b148a29f2d73833d938a272b', 'Sweet dreams', 'reveal'], ['a69149d3fc3dd1ad7af1d5d6b9e1ee29', 'Waiting for you', 'reveal'], ['7c69bdc568cdb4f1ed9ebe2df13220ff', 'Little toys', 'reveal'],
    ['388468c97c0de316cc56ec572fd0d88f', 'Winter greens', 'christmas'], ['1f18560c7002d3ed55b23b588e7b463c', 'Festive flat lay', 'christmas'], ['6dc5a2d86e258e992b4f89ad43ed6c6b', 'Pine and lights', 'christmas'],
    ['9324499cdfcc64f611cfacb6c99f3b08', 'Clinking glasses', 'newyear'], ['1264d005bac8d78900ae2690a67d1b18', 'Sparkle and lights', 'newyear'], ['b402a0a8d339dfd18ef0e949208ce192', 'Bar lights', 'newyear'],
    ['78e16ed96be672b32731fa55d8e3691c', 'Dinner is served', 'bbq'], ['97af41f9fc96a405d6e45698b4cef0c7', 'Tacos and lime', 'bbq'], ['ab4159e45935fe10caae38102ea79f36', 'Low and slow', 'bbq'],
    ['727c55119ad2daf54d837f36088b1449', 'Tent with a view', 'camping'], ['98e001efee917edbe1e616d721ed967b', 'Caravan evening', 'camping'], ['f4bf1680c510a1913ce87f51451c2bab', 'Night tent', 'camping'],
    ['30ee29980b92cd9d1ee6e1390867d0d5', 'Lighting the diyas', 'diwali'], ['d9021fb621b01b15da376328bfab6abb', 'Brass diyas and blossoms', 'diwali'], ['5ba515cd79aacd86b0503387249929e9', 'Candlelight', 'diwali'],
    ['a0533afd291112b2bf9d542c20d39225', 'Family feast', 'eid'], ['b3ed189d6d4bbfab17613ad88aa90b2c', 'Arabic coffee', 'eid'], ['dfcb3d92ccb128846b7aedf6d1b88c69', 'Dates and nuts', 'eid'],
    ['e0db455e8c64cc5c79b8236071d99654', 'Iftar spread', 'ramadan'], ['d95e02f20bfc075a215435ba6a24c556', 'Before we eat', 'ramadan'], ['d654133b76fd1c9695cb7ab95e746ead', 'Breaking the fast together', 'ramadan'],
    ['957039461a23693a110a4c6c073e4c0c', 'Burj Al Arab from above', 'uae'], ['ee6deb217b04fd3873eca197d20f8db0', 'Sheikh Zayed Road', 'uae'], ['4dd60cfa02e1366943a2c529e7d67ba2', 'Desert evening', 'uae'],
    ['c2a8397a4736230c4092e541b598681a', 'Team at work', 'meeting'], ['46cd9a7e4cf10524e661828ef8cbf110', 'Ideas session', 'meeting'], ['ca91e984f9cf6055d4954841175f1e18', 'Bright office', 'meeting']
  ];
  function themePhotos(occ) { return LIBRARY.filter(function (x) { return x[2] === occ; }); }
  /* Where each theme photo goes by default: index into the theme's photos. '' in inv.photos hides a slot; undefined uses the default. */
  var ROLES = { cover: 0, story: 1, m1: 2, m2: 4, m3: 5, venue: 6, band: 3 };
  var EXTRA_SLOTS = [['m1', 'Moments, photo 1'], ['m2', 'Moments, photo 2'], ['m3', 'Moments, photo 3'], ['venue', 'Venue card photo'], ['band', 'Closing photo']];
  function pic(inv, key) {
    var v = inv.photos && inv.photos[key];
    if (v === '' || key === 'cover' || key === 'story') return v || '';
    if (v) return v;
    var x = themePhotos(inv.occasion)[ROLES[key]]; return x ? x[0] : '';
  }
  function picLabel(id) { for (var i = 0; i < LIBRARY.length; i++) if (LIBRARY[i][0] === id) return LIBRARY[i][1]; return ''; }
  /* Moments: heading and the handwritten notes on the back of each print */
  var MOMENTS = {
    wedding: ['A glimpse', 'of our day', ['Flowers from the garden, chosen with love.', 'Save us a dance. We mean it.', 'Golden hour, and all of you with us.']],
    birthday: ['A sneak peek', 'of the party', ['There will be cake. A lot of cake.', 'Bring your best birthday wish.', 'One toast, then many more.']],
    reveal: ['Little things', 'we are dreaming of', ['Soon there will be tiny socks everywhere.', 'Pink or blue? Place your guess.', 'We can’t wait to tell you.']],
    christmas: ['By the fire', 'what awaits you', ['Greens, candles and a warm kitchen.', 'Bring your coziest sweater.', 'There’s a stocking with your name on it.']],
    newyear: ['Countdown', 'to midnight', ['Glasses up at twelve.', 'Wear something that sparkles.', 'New year, same favourite people.']],
    bbq: ['Off the grill', 'what’s cooking', ['Low and slow since the morning.', 'Come hungry. Leave happy.', 'Lights on, plates full, good company.']],
    camping: ['Out there', 'under the stars', ['Marshmallows are on us.', 'Pack a warm layer for the night.', 'No signal. Just stories.']],
    diwali: ['Festival of lights', 'a glimpse', ['Every diya lit for you.', 'Sweets, sparklers and family.', 'May the year be bright.']],
    eid: ['Eid at home', 'a glimpse', ['The coffee is on and the door is open.', 'Sweets for every guest.', 'Eid Mubarak. Come as family.']],
    ramadan: ['Iftar together', 'a glimpse', ['Dates and water when the sun sets.', 'A table set for everyone.', 'Ramadan Kareem from our home.']],
    uae: ['Our country', 'in colour', ['Green, white, black and red, all evening.', 'Wear the colours with pride.', 'Celebrating the Union together.']],
    meeting: ['Agenda', 'at a glance', ['Short, focused and useful.', 'Bring one idea to share.', 'Coffee is ready when you arrive.']]
  };
  /* When the occasion changes, a photo still showing the old theme's library photo moves to the new theme's photo in the same place. Own uploads stay. */
  function swapThemePhotos(d, occ) {
    var from = themePhotos(d.occasion).map(function (x) { return x[0]; }), to = themePhotos(occ).map(function (x) { return x[0]; });
    d.photos = d.photos || {};
    ['cover', 'story', 'm1', 'm2', 'm3', 'venue', 'band'].forEach(function (k) { var i = from.indexOf(d.photos[k]); if (i >= 0 && to.length) d.photos[k] = to[i % to.length]; });
  }
  function libraryHtml(key, d) {
    var cur = pic(d, key);
    var item = function (x) {
      return '<button type="button" class="lib-item" data-lib="' + key + ':' + x[0] + '" aria-pressed="' + (cur === x[0]) + '" style="background-image:url(\'' + blobUrl(x[0]) + '\')"><span>' + esc(x[1]) + '</span></button>';
    };
    var name = (THEMES[d.occasion] && THEMES[d.occasion].label) || 'this occasion';
    return '<div class="lib-wrap"><p class="lib-h">Photos for ' + esc(name) + '</p><div class="lib" role="group" aria-label="Photos for this occasion">' + themePhotos(d.occasion).map(item).join('') + '</div>' +
      '<details class="lib-more"><summary>More photos from other occasions</summary><div class="lib" role="group" aria-label="More photos">' + LIBRARY.filter(function (x) { return x[2] !== d.occasion; }).map(item).join('') + '</div></details>' +
      '<p class="lib-credit">Free photos from Unsplash and Pexels.</p></div>';
  }
  var DRESS = [
    ['Wear what feels comfortable', 'Come as you are. Wear whatever you feel comfortable in.'],
    ['Casual', 'Relaxed and easy. Jeans are welcome.'],
    ['Smart casual', 'Neat but relaxed. No tie needed.'],
    ['Business casual', 'Office wear, no suit required.'],
    ['Cocktail', 'Dresses, suits or anything that sparkles.'],
    ['Formal', 'Suits and evening dresses.'],
    ['Traditional attire', 'Traditional or festive wear is warmly welcome.'],
    ['Modest', 'Modest dress, with shoulders and knees covered.']
  ];
  function dressChips(d) {
    return '<div class="dress-chips" role="group" aria-label="Dress code suggestions">' + DRESS.map(function (x, i) {
      return '<button type="button" class="chip" data-dress="' + i + '" aria-pressed="' + (d.dress === x[0]) + '">' + esc(x[0]) + '</button>';
    }).join('') + '</div>';
  }
  function photoField(key, label, d) {
    var id = pic(d, key);
    return '<div class="photo-fld"><div class="ph" style="' + (id ? 'background-image:url(\'' + blobUrl(id) + '\')' : '') + '"></div><div class="fld"><span>' + esc(label) + '</span><div class="btns">' +
      (S.assets ? '<label class="s-btn" style="cursor:pointer">' + (id ? 'Replace' : 'Upload') + '<input type="file" accept="image/*" data-photo="' + key + '"></label>' : '') +
      (key === 'map' ? '' : '<button class="s-btn" type="button" data-lib-open="' + key + '" aria-expanded="' + (S.libOpen === key) + '">' + (S.libOpen === key ? 'Hide library' : 'Choose from library') + '</button>') +
      (id ? '<button class="s-btn ghost" type="button" data-photo-rm="' + key + '">Remove</button>' : '') + '</div></div></div>' +
      (S.libOpen === key ? libraryHtml(key, d) : '');
  }
  function schedRows(d) {
    return (d.schedule || []).map(function (s, i) {
      return '<div class="sched-row"><input type="time" aria-label="Time" data-s="' + i + '" data-k="time" value="' + esc(s.time) + '"><input type="text" aria-label="Moment" data-s="' + i + '" data-k="label" value="' + esc(s.label) + '">' +
        '<select aria-label="Icon" data-s="' + i + '" data-k="icon">' + Object.keys(ICONS).map(function (k) { return '<option value="' + k + '"' + (s.icon === k ? ' selected' : '') + '>' + ICON_NAMES[k] + '</option>'; }).join('') + '</select>' +
        '<button class="icon-btn" type="button" aria-label="Remove ' + esc(s.label || 'moment') + '" data-s-rm="' + i + '"><svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 4l8 8M12 4l-8 8"/></svg></button></div>';
    }).join('');
  }
  var previewScroll = 0;
  function paintPreview(first) {
    var screen = $('[data-screen]'); if (!screen || !S.draft) return;
    if (!first) previewScroll = screen.scrollTop;
    teardown();
    screen.innerHTML = '<div class="inv in-phone" data-occasion="' + esc(S.draft.occasion) + '"' + paletteAttrs(S.draft) + '>' + renderInvite(S.draft, 'preview') + '</div>';
    screen.style.setProperty('--ground', (THEMES[S.draft.occasion] || THEMES.wedding).vars.ground);
    var root = $('.inv', screen);
    S.unmount = mountInvite(root, S.draft, { scroller: screen, fxHost: $('.phone'), animated: S.animatePreview, mode: 'preview' });
    if (!first || previewScroll) screen.scrollTop = previewScroll;
  }
  var repaintSoon = debounce(function () { paintPreview(false); }, 260);
  function paintSave(err) { var el = $('[data-save]'); if (el) { el.textContent = S.saveState; el.classList.toggle('err', !!err); } }
  var saveSoon = debounce(function () { saveDraft(); }, 700);
  function saveDraft() {
    if (!S.db || !S.draft) return;
    var id = S.draft._id, data = clone(S.draft); delete data._id; data.updatedAt = Date.now();
    S.saveState = 'Saving…'; paintSave();
    S.db.doc('invites/' + id).set(data).then(function () { S.saveState = 'Saved'; paintSave(); }, function () { S.saveState = 'Couldn’t save. Check your connection.'; paintSave(true); });
    data._id = id; S.invites[id] = data;
  }
  function changed(rerenderForm) {
    saveSoon(); repaintSoon();
    if (rerenderForm) { var y = window.scrollY; S.invites[S.draft._id] = clone(S.draft); renderEditor(S.draft._id); window.scrollTo(0, y); }
  }


  var PALETTES = {
    wedding: [
      ['Garden sage', ['#f5f2ea', '#e2dccd', '#a9b086', '#6f7b4f', '#4b5532']],
      ['Champagne toast', ['#fbf6ee', '#efe2c8', '#d8bf8f', '#b8955a', '#6e5636']],
      ['Dusty rose', ['#f8efec', '#ead0ca', '#d3a29b', '#a86f6b', '#5e3c3c']],
      ['Tuscan terracotta', ['#f6ede2', '#e8c9a8', '#d08f63', '#a35c3c', '#5a3a2a']],
      ['Something blue', ['#f4f6f8', '#d6e0ea', '#a7bccf', '#6d8aa8', '#2f4660']],
      ['Lavender fields', ['#f6f3f8', '#e2d8ea', '#bfaed2', '#8d79a8', '#4b3f5e']],
      ['Black tie', ['#fbfaf7', '#e7e3da', '#bfb49e', '#55524c', '#1d1c1a']],
      ['Autumn vineyard', ['#f7efe6', '#e4c9a6', '#b5744f', '#7a2e33', '#3f2a22']]
    ],
    birthday: [
      ['Blush and champagne', ['#f7ede8', '#efc4bd', '#cfae6b', '#c98e8c', '#4a3236']],
      ['Rose gold', ['#fbf1ee', '#f2d2c9', '#e0a99a', '#b9776c', '#5b3a36']],
      ['Midnight gold', ['#f3eee3', '#d9bf7f', '#b08d45', '#2b2f45', '#14172a']],
      ['Peach sorbet', ['#fff4ec', '#ffd9c2', '#f7b394', '#e48c74', '#7a4a3c']],
      ['Lilac dream', ['#f7f2fa', '#e6d6f0', '#c8aee0', '#9f84c4', '#4f3f68']],
      ['Tropical', ['#fff7e8', '#ffd27a', '#ff8f6b', '#3fb6a8', '#1f5f63']],
      ['Emerald party', ['#f3f1ea', '#cfdcca', '#7fa88b', '#2f6b55', '#d2b061']],
      ['Rainbow pastel', ['#ffd6d6', '#ffe8b8', '#d6f0c8', '#c8e2f5', '#e2d1f2']]
    ],
    reveal: [
      ['Pink or blue', ['#f1bfcd', '#e39ab0', '#ffffff', '#b3cfe8', '#7fa6cf']],
      ['Soft clouds', ['#fbf8f4', '#f6dbe2', '#e8eef6', '#d2e2f1', '#b9b3c9']],
      ['Bubblegum and sky', ['#ffc2d6', '#ff94b8', '#fff5f8', '#9fd3ff', '#5fa8e8']],
      ['Rose and denim', ['#efd0d3', '#c98f99', '#f5f1ec', '#9fb3c8', '#4f6784']],
      ['Twinkle little star', ['#fdf6e3', '#f3d98b', '#d7b85c', '#9fb4d4', '#3b4d75']],
      ['Sage and sand', ['#f6f2ea', '#e8dcc6', '#cbb894', '#b7c4a8', '#7d8d6c']],
      ['Lemon and mint', ['#fffbe6', '#ffeaa1', '#e8f5e0', '#b8e0c8', '#7fbfa0']],
      ['Bows or bowties', ['#fff0f3', '#f5b8c8', '#2f3e5c', '#c7d6ea', '#f4f1ea']]
    ],
    christmas: [
      ['Classic red and green', ['#f4efe6', '#c9a253', '#a8242c', '#2f5a3b', '#1f2a24']],
      ['Winter white', ['#ffffff', '#eef1f4', '#c9d3dc', '#c9a253', '#5b6b7a']],
      ['Nordic pine', ['#f3efe7', '#d9cbb3', '#7d8f7a', '#2f4a3a', '#8a5a3c']],
      ['Plum and gold', ['#f6efe9', '#e2c98a', '#b08d45', '#6a2c48', '#2c1a26']],
      ['Candy cane', ['#ffffff', '#f6d2d2', '#d83a3a', '#9b1f2a', '#2f5a3b']],
      ['Midnight frost', ['#eef2f7', '#b9c8d8', '#6f8aa8', '#24364f', '#c9ccd1']]
    ],
    newyear: [
      ['Black and gold', ['#1d1d21', '#3a3a40', '#cfae6b', '#e9d394', '#c9ccd1']],
      ['Champagne', ['#fbf6ee', '#efe2c8', '#d8bf8f', '#b8955a', '#2b2b2e']],
      ['Silver night', ['#f4f4f2', '#c9ccd1', '#8c919a', '#3c4250', '#15181f']],
      ['Midnight blue', ['#e9d394', '#cfae6b', '#3b4d75', '#1c2440', '#0d1022']],
      ['Rose gold glam', ['#fbf1ee', '#e0a99a', '#b9776c', '#3a2a2e', '#1d1d21']],
      ['Emerald deco', ['#f3efe3', '#d9bf7f', '#2f6b55', '#1b3d31', '#111a16']]
    ],
    bbq: [
      ['Red gingham', ['#c8373a', '#fbf7f0', '#f2c94c', '#6b8f4e', '#3a2a22']],
      ['Smoky ember', ['#f3e3cc', '#e8742c', '#a8461c', '#4a2c1e', '#1f1611']],
      ['Lemonade', ['#fffbe6', '#f6dd6a', '#f2c94c', '#9bbf7a', '#4f6f4a']],
      ['Picnic blue', ['#fbf7f0', '#b9d1e6', '#4f7fae', '#c8373a', '#2b3a4f']],
      ['Southern sunset', ['#fbe7d0', '#f7b267', '#f4845f', '#c8373a', '#5a2a27']],
      ['Garden herbs', ['#f4f1e6', '#c9d6b3', '#7fa06a', '#4f6f4a', '#2e3a2a']]
    ],
    camping: [
      ['Forest trail', ['#4f6b4e', '#9b3b2f', '#e2c48a', '#7a5634', '#2f3a2e']],
      ['Lakeside', ['#eef2f0', '#a9c4c6', '#4f7f86', '#2f4a50', '#c9a77a']],
      ['Campfire', ['#f6c14b', '#e8742c', '#9b3b2f', '#3a2a22', '#e9dcc0']],
      ['Moss and stone', ['#e9e6dc', '#b8b6a6', '#7d8a6a', '#4b5544', '#2b2f28']],
      ['Desert canyon', ['#f3e3cc', '#e0b084', '#c46a3c', '#7a3e26', '#3b2a22']],
      ['Starry night', ['#e9d394', '#9fb4d4', '#3b4d75', '#1c2440', '#0d1022']]
    ],
    diwali: [
      ['Marigold and magenta', ['#f7c531', '#f39c12', '#d6336c', '#7b2cbf', '#1aa39a']],
      ['Diya glow', ['#fff3d6', '#ffd25a', '#f39c12', '#c8643b', '#5a1f2e']],
      ['Royal peacock', ['#f4efe3', '#1aa39a', '#0f6b73', '#3b2c85', '#cfae6b']],
      ['Rose and gold', ['#fbeff0', '#f2b8c6', '#d6336c', '#cfae6b', '#5a1f2e']],
      ['Holi colours', ['#ff4f8b', '#ffd23f', '#3bceac', '#0ead69', '#7b2cbf']],
      ['Saffron and green', ['#fff7e6', '#ff9933', '#cfae6b', '#138808', '#0b3d1a']]
    ],
    eid: [
      ['Emerald and gold', ['#f4efe3', '#d9b45a', '#1f5c4a', '#2f7a63', '#13241e']],
      ['Pearl and sand', ['#fbf8f2', '#efe6d4', '#d8c3a0', '#b89a6a', '#5c4a32']],
      ['Turquoise mosaic', ['#f2f7f6', '#9fd8d0', '#1aa39a', '#0f5e66', '#d9b45a']],
      ['Blush and gold', ['#fbf1ee', '#efc4bd', '#d9b45a', '#a86f6b', '#3a2a2e']],
      ['Royal purple', ['#f6f2fa', '#c8aee0', '#6a3d9a', '#3b2160', '#d9b45a']],
      ['Desert rose', ['#f8ede6', '#e6b9a6', '#c47b6a', '#7a3e36', '#d9b45a']]
    ],
    ramadan: [
      ['Midnight and copper', ['#f3dfa6', '#e3c178', '#b07a46', '#2a2f6b', '#1d2550']],
      ['Lantern glow', ['#fff6dc', '#ffcf6b', '#ffb85c', '#a3562a', '#2b1a12']],
      ['Night sky', ['#e9d394', '#9fb4d4', '#3b4d75', '#1c2440', '#0d1022']],
      ['Dates and cream', ['#f7f1e6', '#e3cfa8', '#a8794a', '#5e3a22', '#2b1a12']],
      ['Teal and brass', ['#f2f4ef', '#9fc7c0', '#2f6f73', '#173d42', '#c9a253']],
      ['Soft lilac', ['#f7f4fa', '#d9cde8', '#9c86bf', '#4b3f6b', '#e3c178']]
    ],
    uae: [
      ['Flag colours', ['#c8102e', '#00843d', '#f7f7f2', '#1a1a1a', '#c9a253']],
      ['Desert gold', ['#f6ead6', '#e3c79a', '#c9a253', '#8a6a2c', '#3b2a1a']],
      ['Green and white', ['#ffffff', '#e3efe7', '#7fbf96', '#00843d', '#0b3d1f']],
      ['Red and black', ['#f7f7f2', '#e8b4b8', '#c8103e', '#5a0f1c', '#1a1a1a']],
      ['Pearl coast', ['#f7f9f9', '#d5e6ea', '#6fa3b0', '#1f4f5c', '#c9a253']],
      ['Sand and palm', ['#f4ecdc', '#d9c29a', '#8aa05a', '#4f6b2e', '#2b2a1e']]
    ],
    meeting: [
      ['Slate and sage', ['#f4f1ea', '#d9d4ca', '#8aa39a', '#3d4a52', '#2b3036']],
      ['Corporate navy', ['#f5f7fa', '#c9d3e0', '#4f6b8f', '#1f3150', '#0f1a2b']],
      ['Warm neutral', ['#f8f4ee', '#e6dccd', '#b8a48a', '#6d5c48', '#2f2a24']],
      ['Fresh teal', ['#f2f7f6', '#bfe0dc', '#2f9c95', '#1f5c58', '#2b3036']],
      ['Charcoal and amber', ['#f5f3ef', '#d6d3cd', '#e0a03a', '#3a3a3c', '#1c1c1e']],
      ['Monochrome', ['#ffffff', '#e5e5e5', '#9a9a9a', '#4a4a4a', '#1a1a1a']]
    ]
  };
  function paletteRow(pal, cur) {
    var on = cur && pal[1].join() === cur.join();
    return '<button type="button" class="pal" data-pal="' + esc(pal[1].join(',')) + '" aria-pressed="' + on + '"><span class="dots">' + pal[1].map(function (c) { return '<i style="background:' + c + '"></i>'; }).join('') + '</span><span class="pn">' + esc(pal[0]) + '</span></button>';
  }
  function palettesHtml(d) {
    var mine = PALETTES[d.occasion] || [], others = [];
    ORDER.forEach(function (o) { if (o !== d.occasion) others = others.concat(PALETTES[o]); });
    return '<div class="pals" role="group" aria-label="Palette presets">' + mine.map(function (p) { return paletteRow(p, d.colors); }).join('') + '</div>' +
      '<details class="pals-more"><summary>Palettes from other themes</summary><div class="pals">' + others.map(function (p) { return paletteRow(p, d.colors); }).join('') + '</div></details>';
  }

  /* Replies */
  function renderReplies(id) {
    var inv = S.invites[id];
    if (!inv) { app.innerHTML = '<div class="studio">' + topbar('') + '<main class="wrap"><div class="loading">' + (S.invitesLoaded ? 'Invitation not found.' : 'Loading…') + '</div></main></div>'; return; }
    var st = replyStats(id), th = THEMES[inv.occasion] || THEMES.wedding;
    var h = [topbar(inv.headline, '<button class="s-btn" type="button" data-go="edit-' + id + '">Edit</button><button class="s-btn" type="button" data-go="">All invitations</button>'), '<main class="wrap">'];
    h.push('<div class="s-head"><div><h1 class="s-h1">Replies for ' + esc(inv.headline) + '</h1><p class="s-sub">Updates live as guests reply.</p></div><button class="s-btn primary" type="button" data-copy="' + id + '">Copy guest link</button></div>');
    h.push('<div class="tally"><div><b>' + st.yes + '</b><span>Attending</span></div><div><b>' + st.guests + '</b><span>Total guests</span></div><div><b>' + st.no + '</b><span>Declined</span></div><div><b>' + st.rows.length + '</b><span>Replies</span></div></div>');
    var keys = Object.keys(st.answers);
    if (keys.length) {
      var tot = keys.reduce(function (s, k) { return s + st.answers[k]; }, 0) || 1;
      h.push('<div class="bars"><h3>' + esc(inv.question || 'Answers') + '</h3>' + keys.sort(function (a, b) { return st.answers[b] - st.answers[a]; }).map(function (k) {
        var col = /boy/i.test(k) ? '#7fa6cf' : /girl/i.test(k) ? '#e39ab0' : th.dot;
        return '<div class="bar" style="--bar:' + col + '"><span>' + esc(k) + '</span><div class="track"><div class="fill" style="width:' + (st.answers[k] / tot * 100).toFixed(1) + '%"></div></div><b>' + st.answers[k] + '</b></div>';
      }).join('') + '</div>');
    }
    h.push('<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Guest</th><th>Reply</th><th>Party</th><th>' + esc(inv.question ? inv.question : 'Answer') + '</th><th>Updated</th></tr></thead><tbody>');
    if (!st.rows.length) h.push('<tr><td colspan="5" style="color:var(--s-muted)">No replies yet. Share the guest link and replies will appear here.</td></tr>');
    st.rows.forEach(function (r) {
      var dt = r.updatedAt ? new Date(r.updatedAt) : null;
      h.push('<tr><td>' + esc(r.name) + (r.message ? '<span class="msg">“' + esc(r.message) + '”</span>' : '') + '</td><td><span class="pill ' + (r.attending === 'yes' ? 'yes">Attending' : 'no">Declined') + '</span></td><td class="num">' + (r.attending === 'yes' ? esc(r.guests) : '–') + '</td><td>' + esc(r.answer || '–') + '</td><td class="num">' + (dt ? esc(MONTHS[dt.getMonth()].slice(0, 3) + ' ' + dt.getDate()) : '') + '</td></tr>');
    });
    h.push('</tbody></table></div></main>');
    app.innerHTML = '<div class="studio">' + h.join('') + '</div>';
  }

  /* Guest view */
  var guestReq = 0;
  function renderGuestWith(id, reply) { renderGuest(id, { reply: reply || null }); }
  function hostBar(id) { return '<div class="host-bar"><button type="button" data-go="edit-' + id + '">← Edit</button><button type="button" data-go="">All invitations</button></div>'; }
  function renderGuest(id, known) {
    document.body.classList.add('guest');
    var inv = S.invites[id];
    var draw = function (inv, reply) {
      teardown();
      document.body.style.setProperty('--ground', (THEMES[inv.occasion] || THEMES.wedding).vars.ground);
      app.innerHTML = ((S.canEdit && (!SITE || SITE.owns(id))) ? hostBar(id) : '') +
        '<div class="inv" data-occasion="' + esc(inv.occasion) + '"' + paletteAttrs(inv) + '>' + renderInvite(inv, 'guest') + '</div>';
      var root = $('.inv', app);
      S.unmount = mountInvite(root, inv, { scroller: null, fxHost: root, animated: true, mode: 'guest', existingReply: reply, saveReply: (S.db && S.uid) ? function (r) { return saveReply(id, r); } : null });
    };
    if (inv && known) { draw(inv, known.reply); return; }
    if (inv) { draw(inv, null); loadReply(id).then(function (r) { if (r && S.route.view === 'invite' && S.route.id === id) { var f = $('form[data-rsvp]'); if (f && f.name && !f.name.value) draw(inv, r); } }); return; }
    app.innerHTML = '<div class="loading">Opening your invitation…</div>';
    var req = ++guestReq, finding = false;
    var tryLoad = function () {
      if (id.charAt(0) === '@') {
        /* one lookup at a time: startup calls tryLoad again while the first one is still on its way */
        if (!SITE || !SITE.findInvite || finding) return;
        finding = true;
        SITE.findInvite(id.slice(1)).then(function (r) {
          if (req !== guestReq) return;
          if (!r) { finding = false; app.innerHTML = '<div class="guest-note"><h1>Invitation not found</h1><p>The link may be incomplete, or the host changed or removed this invitation.</p></div>'; return; }
          guestReq++;
          var data = clone(r.data); data._id = r.id; S.invites[r.id] = data; S.route = { view: 'invite', id: r.id };
          /* fetch a returning guest's reply first so the invitation is drawn once, as for a private link */
          loadReply(r.id).then(function (rep) { if (S.route.view === 'invite' && S.route.id === r.id) renderGuestWith(r.id, rep); });
        }, function () { finding = false; if (req === guestReq) app.innerHTML = '<div class="guest-note"><h1>Invitation couldn’t load</h1><p>Check your connection and open the link again.</p></div>'; });
        return;
      }
      if (!S.db) { if (S.connected) app.innerHTML = '<div class="guest-note"><h1>This invitation can’t open here</h1><p>' + (SITE ? 'Check your connection and open your invitation link again.' : 'Open your invitation link again.') + '</p></div>'; return; }
      S.db.doc('invites/' + id).get().then(function (snap) {
        if (req !== guestReq) return;
        if (!snap.exists) { app.innerHTML = '<div class="guest-note"><h1>Invitation not found</h1><p>The link may be incomplete, or the host removed this invitation.</p></div>'; return; }
        var data = clone(snap.data()); data._id = id; S.invites[id] = data;
        loadReply(id).then(function (r) { if (req === guestReq) draw(data, r); });
      }, function () { app.innerHTML = '<div class="guest-note"><h1>Invitation couldn’t load</h1><p>Check your connection and open the link again.</p></div>'; });
    };
    tryLoad(); S.retryGuest = tryLoad;
  }
  function loadReply(id) {
    if (!S.db || !S.uid) return Promise.resolve(null);
    if (S.db.getReply) return S.db.getReply(id);
    return S.db.doc('rsvps/' + S.uid).get().then(function (s) { var d = s.exists ? s.data() : null; return d && d.replies && d.replies[id] ? d.replies[id] : null; }, function () { return null; });
  }
  function saveReply(id, r) {
    if (S.db.saveReply) return S.db.saveReply(id, r);
    var ref = S.db.doc('rsvps/' + S.uid);
    return ref.get().then(function (s) {
      var cur = s.exists ? clone(s.data()) : {}; cur.replies = cur.replies || {}; cur.replies[id] = r; cur.updatedAt = Date.now();
      return ref.set(cur);
    });
  }

  /* ───────── Events (studio) ───────── */
  document.addEventListener('click', function (e) {
    var t;
    if ((t = e.target.closest('[data-go]'))) { e.preventDefault(); go(t.getAttribute('data-go')); return; }
    if ((t = e.target.closest('[data-map-search]'))) { if (S.draft) window.open(mapSearchUrl(S.draft), '_blank', 'noopener'); return; }
    if ((t = e.target.closest('[data-new]'))) { createInvite(t.getAttribute('data-new')); return; }
    if ((t = e.target.closest('[data-link-save]'))) { saveLinkName(t.getAttribute('data-link-save')); return; }
    if ((t = e.target.closest('[data-copy]'))) { copy(inviteUrl(t.getAttribute('data-copy')), 'Guest link copied'); return; }
    if (!S.draft || S.route.view !== 'edit') return;
    if ((t = e.target.closest('[data-tab]')) && t.tagName === 'BUTTON') { S.tab = t.getAttribute('data-tab'); var ed = $('.editor'); if (ed) ed.setAttribute('data-tab', S.tab); $$('.tabs button').forEach(function (b) { b.setAttribute('aria-pressed', String(b === t)); }); if (S.tab === 'preview') paintPreview(false); return; }
    if ((t = e.target.closest('[data-pal]'))) { S.draft.colors = t.getAttribute('data-pal').split(','); changed(true); return; }
    if ((t = e.target.closest('[data-occ]'))) { swapThemePhotos(S.draft, t.getAttribute('data-occ')); S.draft.occasion = t.getAttribute('data-occ'); changed(true); return; }
    if ((t = e.target.closest('[data-sched-add]'))) { S.draft.schedule = (S.draft.schedule || []).concat([{ time: '', label: '', icon: 'clock' }]); changed(true); return; }
    if ((t = e.target.closest('[data-s-rm]'))) { S.draft.schedule.splice(Number(t.getAttribute('data-s-rm')), 1); changed(true); return; }
    if ((t = e.target.closest('[data-play]'))) { S.animatePreview = !S.animatePreview; t.textContent = S.animatePreview ? 'Stop animations' : 'Play animations'; var sc = $('[data-screen]'); if (sc) sc.scrollTop = 0; previewScroll = 0; paintPreview(true); return; }
    if ((t = e.target.closest('[data-del]'))) { S.confirmDelete = true; renderEditor(S.draft._id); return; }
    if ((t = e.target.closest('[data-del-no]'))) { S.confirmDelete = false; renderEditor(S.draft._id); return; }
    if ((t = e.target.closest('[data-del-yes]'))) {
      var id = S.draft._id;
      S.db.doc('invites/' + id).delete().then(function () { delete S.invites[id]; S.draft = null; toast('Invitation deleted'); go(''); }, function () { toast('Couldn’t delete. Try again.'); });
      return;
    }
    if ((t = e.target.closest('[data-dress]'))) { var dx = DRESS[Number(t.getAttribute('data-dress'))]; S.draft.dress = dx[0]; S.draft.dressNote = dx[1]; changed(true); return; }
    if ((t = e.target.closest('[data-lib-open]'))) { var lk = t.getAttribute('data-lib-open'); S.libOpen = S.libOpen === lk ? null : lk; changed(true); return; }
    if ((t = e.target.closest('[data-lib]'))) { var lp = t.getAttribute('data-lib').split(':'); S.draft.photos = S.draft.photos || {}; S.draft.photos[lp[0]] = lp[1]; changed(true); toast('Photo added'); return; }
    if ((t = e.target.closest('[data-photo-rm]'))) { S.draft.photos = S.draft.photos || {}; S.draft.photos[t.getAttribute('data-photo-rm')] = ''; changed(true); }
  });
  document.addEventListener('input', function (e) {
    if (!S.draft || S.route.view !== 'edit') return;
    var t = e.target, f = t.getAttribute('data-f');
    if (t.hasAttribute('data-link-name')) { var lid = t.getAttribute('data-link-name'); S.linkDraft = { id: lid, value: t.value, msg: S.linkDraft && S.linkDraft.id === lid ? S.linkDraft.msg : '', kind: S.linkDraft && S.linkDraft.id === lid ? S.linkDraft.kind : '' }; linkCheckSoon(); return; }
    if (f) { S.draft[f] = t.type === 'number' ? Number(t.value) : t.value; if (f === 'headline') { var h1 = $('.s-h1'); if (h1) h1.textContent = t.value || 'Untitled'; } if (f === 'song') { var sh = $('[data-song-hint]'); if (sh) sh.innerHTML = songHint(t.value); } changed(false); return; }
    if (t.hasAttribute('data-s')) { var i = Number(t.getAttribute('data-s')); S.draft.schedule[i][t.getAttribute('data-k')] = t.value; changed(false); return; }
    if (t.hasAttribute('data-color')) { S.draft.colors[Number(t.getAttribute('data-color'))] = t.value; changed(false); }
  });
  document.addEventListener('change', function (e) {
    var t = e.target;
    if (S.draft && t.hasAttribute('data-s') && t.tagName === 'SELECT') { S.draft.schedule[Number(t.getAttribute('data-s'))].icon = t.value; changed(false); return; }
    if (S.draft && t.hasAttribute('data-photo') && t.files && t.files[0]) {
      var key = t.getAttribute('data-photo'), file = t.files[0];
      if (!S.assets) return;
      toast('Uploading photo…');
      S.assets.upload(file).then(function (res) { S.draft.photos = S.draft.photos || {}; S.draft.photos[key] = res.id; changed(true); toast('Photo added'); }, function () { toast('That photo couldn’t upload. Try a JPG or PNG under 20 MB.'); });
    }
  });

  /* ───────── Connect to the page's data ───────── */
  render();
  var connectTimer = setTimeout(function () { if (S.canEdit === null) { S.canEdit = false; S.connected = true; render(); } }, 10500);
  if (window.studioData && window.studioData.use) {
    Promise.all([window.studioData.use('db'), window.studioData.use('user'), window.studioData.use('assets')]).then(function (res) {
      S.db = res[0]; S.user = res[1]; S.assets = res[2]; S.connected = true;
      var idP = S.user ? S.user.id() : Promise.resolve(null);
      var editP = S.user ? S.user.canEdit() : Promise.resolve(false);
      return Promise.all([idP, editP]).then(function (v) {
        clearTimeout(connectTimer);
        S.uid = v[0]; S.canEdit = !!v[1] && !!S.db;
        if (S.db) {
          S.db.collection('invites').onSnapshot(function (snap) {
            snap.docs.forEach(function (d) { var x = clone(d.data()); x._id = d.id; if (!(S.route.view === 'edit' && S.draft && S.draft._id === d.id)) S.invites[d.id] = x; });
            var ids = snap.docs.map(function (d) { return d.id; });
            Object.keys(S.invites).forEach(function (k) { if (ids.indexOf(k) < 0 && !(S.draft && S.draft._id === k)) delete S.invites[k]; });
            var first = !S.invitesLoaded; S.invitesLoaded = true;
            /* a host who opened their own invitation by its link name: add the edit bar once ownership is known, without redrawing */
            if (S.canEdit && S.route.view === 'invite' && $('.inv', app) && !$('.host-bar', app) && (!SITE || SITE.owns(S.route.id))) app.insertAdjacentHTML('afterbegin', hostBar(S.route.id));
            if (S.canEdit && (S.route.view === 'home' || (first && S.route.view !== 'invite' && S.route.view !== 'new'))) render();
          }, function () { S.invitesLoaded = true; if (S.route.view === 'home') render(); });
          if (S.canEdit) {
            S.db.collection('rsvps').onSnapshot(function (snap) {
              S.replies = {}; snap.docs.forEach(function (d) { S.replies[d.id] = d.data(); });
              if (S.route.view === 'home' || S.route.view === 'replies') render();
            }, function () {});
          }
        }
        if (S.route.view === 'invite') { if (!$('.inv', app) && S.retryGuest) S.retryGuest(); }
        else render();
      });
    }).catch(function () { clearTimeout(connectTimer); S.canEdit = false; S.connected = true; render(); });
  } else { clearTimeout(connectTimer); S.canEdit = false; S.connected = true; render(); }
})();
