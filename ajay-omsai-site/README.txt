Ajay Traders aur Om Sai Building Material, Multai - website

KAISE DEKHEIN
  index.html par double click karo. Internet on rakhna (fonts aur Google Map ke liye).

FREE MEIN LIVE KARNA
  1. netlify.com par free account banao
  2. "Add new site" > "Deploy manually"
  3. Poora folder drag and drop karo
  4. Link mil jayega (something.netlify.app)

FILES KA MATLAB
  config.js   -> SABSE ZAROORI. Number, malik, worker, slideshow, photo-patti. Zyada badlav yahin.
  index.html  -> page ke shabd (Hindi + English dono, ek ke baad ek) aur saaman ke card.
  style.css   -> rang aur design (rang sabse upar :root mein).
  script.js   -> chalne wala hissa. Ise chhedne ki zaroorat nahi.
  images/     -> saari photos.

KYA KAHAN BADALNA HAI (sab config.js mein, har cheez ke upar comment likha hai)

  1. Phone number
     - mainPhone : upar ka "कॉल करें" button, neeche ki bar, hero ka button
     - whatsapp  : rate form ka message is number par jaata hai
     - contacts  : "सामान और रेट के लिए बात कीजिए" wali list

  2. MALIK baat karenge ya WORKER?  (config.js mein contactMode)
       'all'    -> list ke sabhi log dikhein (abhi yahi hai)
       'staff'  -> sirf worker (role: 'staff')
       'owners' -> sirf malik (role: 'owner')
     Naya worker jodna: contacts mein ek { ... }, block copy karke naam/number badlo,
     role: 'staff' rakho. Kisi ko chhupana ho to show: false.
     Agar malik direct baat nahi karte, to mainPhone aur whatsapp mein worker ka number daalo.

  3. Malik ke card (dono barabar)
     - Ajay ji ki photo lagi hai.
     - Hemant ji ki photo  images/hemant-sharma.jpg  naam se images/ mein daal do.
       Apne aap dikhne lagegi (square photo sabse achhi). Tab tak naam ka pehla akshar dikhta hai.
     - Parichay likhna ho to config.js mein owners > about mein 1-2 line likho.

  4. Top ki photo slideshow  -> config.js mein slides
     Photo jodna/hatana/order badalna wahin. slideSeconds se speed.

  5. "दुकान की झलक" patti   -> config.js mein gallery
     Photo ek ke baad ek apne aap sarakti hai; customer ungli se bhi sarka sakta hai.

  6. Hindi / English
     Page pehle Hindi mein khulta hai. Upar "हिं | EN" button se English hoti hai.
     index.html mein har text aisa hai:
        <span class="hi">हिंदी</span><span class="en">English</span>
     Dono ko alag-alag badal sakte ho. config.js mein bhi hi: '...' aur en: '...' hain.

  7. Naya saaman jodna: index.html mein "सामान" section ka koi ek
     <article class="good"> ... </article> copy karke paste karo, photo/text badlo.

  8. Photo badalna: images/ mein usi naam ki nayi photo daal do.

DHYAAN
  - config.js mein har line ke end ka comma (,) aur ' ' ke quotes na hatayein.
  - Kuch bigad jaye to us file ki purani copy se wapas kar lein.
