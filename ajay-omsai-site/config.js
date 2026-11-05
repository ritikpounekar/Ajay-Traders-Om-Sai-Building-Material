/* =====================================================================
   config.js  —  YAHI FILE BADALNI HAI (zyada-tar kaam yahin hota hai)
   ---------------------------------------------------------------------
   Is file mein: phone numbers, kaun customer se baat karega, malik ki
   photo/naam, top ki photo-slideshow, aur "दुकान की झलक" ki photos.

   Har text ke do roop hain:  hi = हिंदी,  en = English
   Hindi pehle dikhti hai. English tab dikhti hai jab customer "EN" dabaye.

   Dhyaan rakhein:
   - Har line ke end mein comma (,) rehna chahiye.
   - Text ' ' (single quote) ke andar likhein. Agar text ke andar ' aaye
     to us se pehle \ laga dein, jaise:  'Ajay\'s shop'
   - Kuch bigad jaye to is file ki purani copy se wapas kar lein.
   ===================================================================== */

window.SITE = {

  /* ---------- 1. DUKAAN KA NAAM ----------
     Dono naam ek hi dukan ke naam ki tarah dikhte hain. */
  shopName: {
    hi: 'अजय ट्रेडर्स और ओम साई बिल्डिंग मटेरियल',
    en: 'Ajay Traders & Om Sai Building Material'
  },

  /* ---------- 2. MUKHYA NUMBER ----------
     Ye number yahan-yahan use hota hai:
       mainPhone -> upar ka "कॉल करें" button, neeche ki bar ka "कॉल", hero ka call button
       whatsapp  -> "रेट WhatsApp पर पाइए" form ka message yahin jaata hai,
                    aur neeche ki bar ka "WhatsApp" button
     DHYAAN: Agar malik direct customer se baat nahi karte aur worker
     baat karte hain, to yahan worker ka number daal dein.
     Number aise likh sakte hain: '91710 17533' (space ho to koi dikkat nahi) */
  mainPhone: '91710 17533',
  whatsapp:  '91710 17533',

  /* ---------- 3. GOOGLE MAPS LINK ---------- */
  mapsLink: 'https://maps.app.goo.gl/WWzAj8h4imSZsudu9?g_st=aw',

  /* ---------- 4. CUSTOMER KISSE BAAT KARE? (संपर्क list) ----------
     Ye list "दुकान" section mein dikhti hai.

     contactMode ek line se tay karta hai ki kaun dikhe:
        'all'    -> neeche likhe sabhi log dikhein (abhi yahi laga hai)
        'staff'  -> sirf wo jinka role: 'staff' hai (jab worker hi baat karte hon)
        'owners' -> sirf wo jinka role: 'owner' hai (jab malik khud baat karte hon)
     Bas ye ek shabd badlo, baaki apne aap ho jayega. */
  contactMode: 'all',

  /* Har vyakti ke liye:
       name  = naam (hi/en)
       role  = 'owner' (malik) ya 'staff' (worker)
       phone = number
       note  = (zaroori nahi) naam ke neeche chhoti line, jaise "सेनेटरी के लिए".
               Nahi chahiye to note wali line hata do ya khali rakho.
       show  = false kar do to ye vyakti kisi bhi mode mein nahi dikhega
     Naya worker jodna ho: kisi ek { ... }, block ko copy karke neeche paste karo aur badal do. */
  contacts: [
    {
      name:  { hi: 'अजय शर्मा', en: 'Ajay Sharma' },
      role:  'owner',
      phone: '91710 17533',
      note:  null,
      show:  true
    },
    {
      name:  { hi: 'कार्तिक शर्मा', en: 'Kartik Sharma' },
      role:  'staff',          // <- agar ye worker nahi hain to 'owner' kar do
      phone: '75662 11333',
      note:  null,
      show:  true
    },
    {
      name:  { hi: 'हेमन्त शर्मा', en: 'Hemant Sharma' },
      role:  'owner',
      phone: '94254 02005',
      note:  null,
      show:  true
    },
    {
      name:  { hi: 'अजय शर्मा', en: 'Ajay Sharma' },
      role:  'owner',
      phone: '94250 03083',    // <- Ajay ji ka doosra number. Pakka karke role/show badal lein.
      note:  null,
      show:  true
    }
  ],

  /* ---------- 5. MALIK (दुकान के मालिक) ----------
     Dono ke liye barabar card banta hai. Order badalna ho to block upar-neeche karo.
     photo = photo ka rasta (images/ folder ke andar).
       - Ajay ji ki photo lagi hai.
       - Hemant ji ki photo abhi nahi hai. Unki photo ko  images/hemant-sharma.jpg
         naam se images/ folder mein daal do, apne aap dikhne lagegi.
         (jab tak photo nahi hai, naam ka pehla akshar dikhega.)
       - Photo square (barabar chauda-lambai) ho to sabse achhi dikhti hai.
     role  = naam ke neeche likha text
     about = (zaroori nahi) 1-2 line parichay. Khali ('') chhodo to kuch nahi dikhega. */
  owners: [
    {
      name:  { hi: 'अजय शर्मा', en: 'Ajay Sharma' },
      role:  { hi: 'मालिक', en: 'Owner' },
      about: { hi: '', en: '' },
      photo: 'images/ajay-sharma.jpg',
      pos:   '50% 35%',        // photo ka kaunsa hissa dikhe (left% top%)
      alt:   { hi: 'अजय शर्मा दुकान के काउंटर पर', en: 'Ajay Sharma at the shop counter' }
    },
    {
      name:  { hi: 'हेमन्त शर्मा', en: 'Hemant Sharma' },
      role:  { hi: 'मालिक', en: 'Owner' },
      about: { hi: '', en: '' },
      photo: 'images/hemant-sharma.jpg',      // <- yahi naam se photo daalni hai
      pos:   '50% 35%',
      alt:   { hi: 'हेमन्त शर्मा', en: 'Hemant Sharma' }
    }
  ],

  /* ---------- 6. TOP KI PHOTO SLIDESHOW ----------
     Page ke sabse upar ye photos apne aap ek ke baad ek badalti rehti hain (loop mein).
     slideSeconds = ek photo kitni der (second) rukegi.
     Photo jodna: koi bhi { ... }, block copy karke paste karo, photo ka naam badlo.
     Photo hatana: us poore { ... }, block ko delete kar do.
     Order = jis order mein likha hai, usi order mein chalegi.
     pos = photo kahan se kate (left% top%). Lambi (portrait) photo mein neeche wala
           number badal kar dekho: 0% = upar ka hissa, 100% = neeche ka hissa.
     Landscape (chauri) photo sabse achhi lagti hai. */
  slideSeconds: 4.5,
  slides: [
    { img: 'images/dukaan-samne.jpg',   pos: '50% 40%',
      alt: { hi: 'UltraTech बिल्डिंग सोल्यूशन्स के पीले बोर्ड वाली दुकान', en: 'The shop with the yellow UltraTech Building Solutions board' },
      cap: { hi: 'दुकान का सामने का हिस्सा', en: 'Shop front' } },
    { img: 'images/dono-dukaan.jpg',    pos: '50% 55%',
      alt: { hi: 'रेलवे स्टेशन रोड, मुलताई पर दुकान और Vectus वॉटर टैंक', en: 'Shop on Railway Station Road, Multai, with Vectus water tanks' },
      cap: { hi: 'रेलवे स्टेशन रोड, मुलताई', en: 'Railway Station Road, Multai' } },
    { img: 'images/sanitary-shelves.jpg', pos: '50% 50%',
      alt: { hi: 'सेनेटरी वेयर और वॉश बेसिन से भरी शेल्फ़', en: 'Shelves full of sanitaryware and wash basins' },
      cap: { hi: 'सेनेटरी वेयर', en: 'Sanitaryware' } },
    { img: 'images/building.jpg',       pos: '50% 78%',
      alt: { hi: 'दुकान की बिल्डिंग', en: 'The shop building' },
      cap: { hi: 'दुकान की बिल्डिंग', en: 'Shop building' } },
    { img: 'images/vectus-tank.jpg',    pos: '50% 50%',
      alt: { hi: 'Vectus वॉटर टैंक', en: 'Vectus water tanks' },
      cap: { hi: 'Vectus वॉटर टैंक', en: 'Vectus water tanks' } },
    { img: 'images/ultratech-counter.jpg', pos: '50% 38%',
      alt: { hi: 'UltraTech बिल्डिंग सोल्यूशन्स की पीली दीवार वाला काउंटर', en: 'Counter with the yellow UltraTech Building Solutions wall' },
      cap: { hi: 'UltraTech काउंटर', en: 'UltraTech counter' } },
    { img: 'images/gk-tmt-godown.jpg',  pos: '50% 32%',
      alt: { hi: 'GK TMT सरिया का गोदाम', en: 'GK TMT steel bars godown' },
      cap: { hi: 'GK TMT सरिया', en: 'GK TMT steel bars' } }
  ],

  /* ---------- 7. "दुकान की झलक" PHOTOS ----------
     Ye photos neeche ki patti mein apne aap sarakti rehti hain; customer ungli se bhi
     sarka sakta hai aur kisi photo par dabane se wo badi khulti hai.
     Photo jodna / hatana: upar slideshow jaisa hi (block copy-paste ya delete). */
  gallery: [
    { img: 'images/dono-dukaan.jpg',       pos: '50% 50%',
      alt: { hi: 'रेलवे स्टेशन रोड पर दुकान', en: 'The shop on Railway Station Road' },
      cap: { hi: 'रेलवे स्टेशन रोड पर दुकान', en: 'The shop on Railway Station Road' } },
    { img: 'images/building.jpg',          pos: '50% 50%',
      alt: { hi: 'दुकान की बिल्डिंग', en: 'The shop building' },
      cap: { hi: 'दुकान की बिल्डिंग', en: 'Shop building' } },
    { img: 'images/sanitary-showroom.jpg', pos: '50% 50%',
      alt: { hi: 'सेनेटरी का शोरूम', en: 'Sanitary showroom' },
      cap: { hi: 'सेनेटरी शोरूम', en: 'Sanitary showroom' } },
    { img: 'images/dukaan-entry.jpg',      pos: '50% 50%',
      alt: { hi: 'दुकान का मुख्य दरवाज़ा', en: 'Main entrance of the shop' },
      cap: { hi: 'मुख्य दरवाज़ा', en: 'Main entrance' } },
    { img: 'images/ultratech-counter.jpg', pos: '50% 50%',
      alt: { hi: 'UltraTech बिल्डिंग सोल्यूशन्स वाला काउंटर', en: 'UltraTech Building Solutions counter' },
      cap: { hi: 'UltraTech काउंटर', en: 'UltraTech counter' } },
    { img: 'images/counter-ajay.jpg',      pos: '50% 50%',
      alt: { hi: 'काउंटर पर काम करते हुए अजय शर्मा', en: 'Ajay Sharma working at the counter' },
      cap: { hi: 'काउंटर पर', en: 'At the counter' } },
    { img: 'images/gk-tmt-godown.jpg',     pos: '50% 50%',
      alt: { hi: 'GK TMT सरिया का गोदाम', en: 'GK TMT steel bars godown' },
      cap: { hi: 'GK TMT सरिया का गोदाम', en: 'GK TMT steel bars godown' } },
    { img: 'images/jaquar-fittings.jpg',   pos: '50% 50%',
      alt: { hi: 'Jaquar शावर और नल का डिस्प्ले', en: 'Jaquar shower and tap display' },
      cap: { hi: 'Jaquar फिटिंग', en: 'Jaquar fittings' } }
  ],

  /* ---------- 8. WHATSAPP KE MESSAGE KE SHABD ----------
     Rate form bharne par WhatsApp mein jo message ban kar khulta hai uske shabd.
     {shop} apne aap dukan ke naam se badal jaata hai. */
  messages: {
    hello:    { hi: 'नमस्ते, {shop} से रेट चाहिए।',  en: 'Hello, I would like rates from {shop}.' },
    items:    { hi: 'सामान: ',   en: 'Items: ' },
    detail:   { hi: 'जानकारी: ', en: 'Details: ' },
    site:     { hi: 'साइट: ',    en: 'Site: ' },
    name:     { hi: 'नाम: ',     en: 'Name: ' },
    footer:   { hi: '(वेबसाइट से भेजा गया)', en: '(Sent from the website)' },
    needItem: { hi: 'कम से कम एक सामान चुनिए या लिखकर बताइए।', en: 'Please pick at least one item or write what you need.' }
  }
};
