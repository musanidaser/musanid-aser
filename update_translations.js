const fs = require('fs');
const path = require('path');

const arPath = path.join(__dirname, 'src/assets/ar.json');
const arI18nPath = path.join(__dirname, 'src/assets/i18n/ar.json');
const enPath = path.join(__dirname, 'src/assets/en.json');
const enI18nPath = path.join(__dirname, 'src/assets/i18n/en.json');

// Process Arabic
const arData = JSON.parse(fs.readFileSync(arPath, 'utf8'));

arData.meta.email = 'info@musanidaser.com';
arData.meta.domain = 'musanidaser.com';

arData.about.vision = {
  label: 'الرؤية الاستراتيجية',
  title: 'رؤيتنا',
  statement: 'أن نكون الشريك الموثوق لمنشآت الأعمال بالمملكة في إدارة سلاسل الإمداد والوساطة التجارية، عبر ترسيخ معايير النزاهة والانضباط التعاقدي.',
  note: 'طموح مهني يواكب حراك قطاع الأعمال السعودي، ويهدف لجعل مساند آسر الخيار الأول للمنشآت الباحثة عن الموثوقية ووضوح التعامل.'
};

arData.about.mission = {
  label: 'الرسالة والمسؤولية التنفيذية',
  title: 'رسالتنا',
  statement: 'ربط المنشآت بموردين مؤهلين وفق متطلبات الطلب وتأمين عروض أسعار متوازنة ومطابقة للمواصفات الفنية المطلوبة.',
  description: 'نلتزم بإدارة مسارات التوريد بمنهجية تشغيلية دقيقة تبدأ من تدقيق الاحتياج، مروراً بالمفاضلة الموضوعية بين الموردين، وحتى التحقق من سلامة وجودة الاستلام النهائي.'
};

arData.about.purpose = {
  numeral: '03',
  label: 'الهدف والقيمة المضافة',
  title: 'هدفنا',
  statement: 'تحقيق الكفاءة التشغيلية والمالية لعملائنا عبر تقليص تكاليف الشراء، اختصار الوقت والجهد، ودعم استمرارية التوريد دون انقطاع.'
};

if (arData.quotePage && arData.quotePage.contactInfo) {
  arData.quotePage.contactInfo.email = 'info@musanidaser.com';
}

const arJsonStr = JSON.stringify(arData, null, 2);
fs.writeFileSync(arPath, arJsonStr, 'utf8');
fs.writeFileSync(arI18nPath, arJsonStr, 'utf8');
console.log('Arabic JSON updated successfully');

// Process English
let enStr = fs.readFileSync(enPath, 'utf8');
// Replace all occurrences of Musaanid with Musanid, and old emails
enStr = enStr.replace(/musaanidaser\.com/g, 'musanidaser.com');
enStr = enStr.replace(/MUSAANID/g, 'MUSANID');
enStr = enStr.replace(/Musaanid/g, 'Musanid');
enStr = enStr.replace(/musaanid/g, 'musanid');

const enData = JSON.parse(enStr);

enData.meta.email = 'info@musanidaser.com';
enData.meta.domain = 'musanidaser.com';

enData.about.vision = {
  label: 'OUR STRATEGIC VISION',
  title: 'Our Vision',
  statement: 'To be the benchmark procurement and commercial brokerage partner in Saudi Arabia, founded on transparent governance and reliable execution.',
  note: 'Establishing Musanid Aser as the premier choice for enterprises demanding purchasing efficiency and commercial transparency across the Saudi market.'
};

enData.about.mission = {
  label: 'OUR MISSION & COMMITMENT',
  title: 'Our Mission',
  statement: 'Connecting commercial enterprises with verified suppliers and delivering competitive, specification-compliant quotation portfolios.',
  description: 'We execute structured procurement workflows starting from precise requirement scoping and objective market comparison through to accountable delivery coordination.'
};

enData.about.purpose = {
  numeral: '03',
  label: 'OUR STRATEGIC PURPOSE',
  title: 'Our Purpose',
  statement: 'Maximizing operational and financial efficiency for our clients by lowering acquisition costs, saving procurement time, and securing delivery continuity.'
};

if (enData.quotePage && enData.quotePage.contactInfo) {
  enData.quotePage.contactInfo.email = 'info@musanidaser.com';
}

if (enData.footer) {
  enData.footer.mission = 'Dedicated corporate procurement and commercial brokerage partner for enterprises across Saudi Arabia, ensuring rigorous quality and cost optimization.';
}

const enJsonStr = JSON.stringify(enData, null, 2);
fs.writeFileSync(enPath, enJsonStr, 'utf8');
fs.writeFileSync(enI18nPath, enJsonStr, 'utf8');
console.log('English JSON updated successfully');
