/**
 * Utility to map Sudanese SMILE Syllabus Grade 1 (Book 1) units and lessons 
 * to high-quality, cartoon, watercolor, or flat illustration educational images.
 * Tailored beautifully to represent Sudanese culture, geography, and real-life learning context.
 */

const LESSON_IMAGE_MAP: Record<string, string> = {
  // UNIT 1: English is Everywhere
  "1-1": "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80", // Holiday Fun (Children playing volleyball/holiday)
  "1-2": "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80", // The Princess and the Ring (Magic princess watercolor)
  "1-3": "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80", // Working the Land (Grandfather agricultural field)
  "1-4": "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80", // World of Animals (Savanna lions)
  "1-5": "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80", // Osman Digna (Suakin/historic city souq)
  "1-6": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", // Travel and Celebrations (Port Sudan sea / beach)
  "1-7": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80", // Future Ambitions (Students learning inside class)
  "1-8": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80", // Revision: Learning English (Reading notebooks / study)

  // UNIT 2: Relationships
  "2-1": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80", // Preparing for Heavy Rain (Nafeer repairing mud walls)
  "2-2": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80", // Hassan and Hussain (Twins playing football / reading)
  "2-3": "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?auto=format&fit=crop&w=800&q=80", // Amur and Timur (Tiger and brave goat in zoo)
  "2-4": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80", // My Best Friend Jane (Studying day and night / exams)
  "2-5": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80", // Plans with Friends (Eid dinner party)
  "2-6": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80", // Winning the Match (Football coach with team)
  "2-7": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80", // Friends for Life (Wedding / friends getting married)
  "2-8": "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80", // Childhood Friends (Adam and Ali reunion)

  // UNIT 3: Going Places
  "3-1": "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80", // Where is Sudan? (Northeast Africa map/Nile river)
  "3-2": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80", // Climbing Mount Everest (Everest climb illustration)
  "3-3": "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80", // Journeys of Ibn Battuta (Ancient ship compass)
  "3-4": "https://images.unsplash.com/photo-1586724237569-f38039663a06?auto=format&fit=crop&w=800&q=80", // Shanghai! (Maglev train futuristic track)
  "3-5": "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80", // Early Sudanese Traders (Caravans of camels on desert)
  "3-6": "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=80", // Nuba Mountains! (Wrestling / scenic villages)
  "3-7": "https://images.unsplash.com/photo-1501535033-a59396afb33d?auto=format&fit=crop&w=800&q=80", // Trip to Kenya! (Maasai Mara wildlife)
  "3-8": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80", // Revision: Travelling to Sudan (Richard and Kate teaching)

  // UNIT 4: Arts and Literature
  "4-1": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80", // Juha's Nail (Juha knocking on house wall)
  "4-2": "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80", // Dukan Wad Al-Baseer (Good handwriting/wise proverbs)
  "4-3": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80", // Advice from my Heart (Grandfather tree / sun fireball)
  "4-4": "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?auto=format&fit=crop&w=800&q=80", // Cartoons! (Salim sleeping and running late)
  "4-5": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80", // Who am I? (Famous Sudanese poet game)
  "4-6": "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80", // Oliver Twist Wants More! (Oliver holding soup bowl)
  "4-7": "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80", // Oliver Twist Meets Fagin (Dodger and cold cell)
  "4-8": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", // Revision: Traditional Stories (Juha and ten camels)

  // UNIT 5: Science
  "5-1": "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80", // Solar Power (Solar panels electricity Sudan)
  "5-2": "https://images.unsplash.com/photo-1511381939415-e44015463834?auto=format&fit=crop&w=800&q=80", // Chocolate Factory (Cocoa beans drying and roasting)
  "5-3": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80", // Population Statistics (Census graphs and surveys)
  "5-4": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80", // Day in the Life of a Bee (Bee pollinating flower eggs)
  "5-5": "https://images.unsplash.com/photo-1583795484071-3c453e3a7c71?auto=format&fit=crop&w=800&q=80", // Bites and Stings (Washing bee sting with soap)
  "5-6": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80", // Cars (Uncle Ibrahim filling radiator)
  "5-7": "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&w=800&q=80", // Floating Egg Experiment (Dissolving salt in glass)
  "5-8": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80", // Revision: All about Science (Modern lab and review)

  // UNIT 6: Hobbies and Pastimes
  "6-1": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80", // Unexpected Victory (El Obeid Hilal team triumph)
  "6-2": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80", // Sudanese Handicrafts (Leather sandals and beads)
  "6-3": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80", // Photography (Cows and white birds scenery)
  "6-4": "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80", // Unusual Hobbies (Stamps, painted eggshells, insects)
  "6-5": "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80", // Hobbies: Then and Now (Grandfather playing drum)
  "6-6": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80", // Enjoying Reading (Little Women sisters sharing dreams)
  "6-7": "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80", // Scouts and Guides (Volunteers helping elderly Khadijah)
  "6-8": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80", // Revision: My Hobbies (Guitar, photography, and books)

  // UNIT 7: Money and Trade
  "7-1": "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80", // Currencies (Euro coins, UK pound bills, Japanese Yen)
  "7-2": "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80", // Where Was It Made? (Global goods label inspection)
  "7-3": "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80", // Sudanese Exports (Container ship carrying sweet mangoes)
  "7-4": "https://images.unsplash.com/photo-1521791136364-7286472b5399?auto=format&fit=crop&w=800&q=80", // Trading Partners (China, India, Brazil agricultural equipment)
  "7-5": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80", // Read the Label Carefully! (Food nutritional information labels)
  "7-6": "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80", // From Farm to Home (Wholesaler, retailer, and consumer)
  "7-7": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", // Camel Market (Darfur camels exported to Egypt)
  "7-8": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80", // Revision: Not Only Money (Viewpoints on natural resources)

  // UNIT 8: Our Bodies
  "8-1": "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=800&q=80", // Looking after Your Body (Doctor Ayman advising on dehydration)
  "8-2": "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&w=800&q=80", // Broken Bones (Munira wrist X-ray check)
  "8-3": "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&w=800&q=80", // The Heart (Left and right chambers pumping oxygen)
  "8-4": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80", // A Dehydrated Child (Stopping the bus near El-Gadarif hospital)
  "8-5": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80", // Amazing Abilities (Strongest man Dennis and math genius)
  "8-6": "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80", // The Brain (Anatomy of the water-rich brain cells)
  "8-7": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80", // Memory Games (Matching card pairs in classroom)
  "8-8": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80", // Revision: Our Amazing Bodies (Protecting lungs with ribs)

  // UNIT 9: Wonderful Sudan
  "9-1": "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80", // Sudanese Place Names (Kosti, Fashir, Tuti meaning)
  "9-2": "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80", // Sudanese Languages (Nubian, Beja greeting Dabaywa)
  "9-3": "https://images.unsplash.com/photo-1583795484071-3c453e3a7c71?auto=format&fit=crop&w=800&q=80", // King Piankhi (Ancient Kingdom of Kush and pyramids)
  "9-4": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80", // Al Neelain Mosque (Omdurman shell-shaped dome mosque)
  "9-5": "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80", // Kenana (Sugarcane fields and green agricultural plant)
  "9-6": "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80", // Ottoman Rule (Pasha invading Sudan in 1820)
  "9-7": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80", // Future Sudan (Tablets replacing books and robots)
  "9-8": "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80", // Revision: My Sudan (East and west geographic landmarks)

  // UNIT 10: Health and Environment
  "10-1": "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=800&q=80", // The Ecosystem (Pond ecology, plants, and frogs)
  "10-2": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80", // Water Pollution (Clean drinking water sanitation)
  "10-3": "https://images.unsplash.com/photo-1584035133571-c88b3d8d94e1?auto=format&fit=crop&w=800&q=80", // Epidemics (WHO vaccine campaign and handwashing)
  "10-4": "https://images.unsplash.com/photo-1583795484071-3c453e3a7c71?auto=format&fit=crop&w=800&q=80", // Colds and Flu (Consulting doctor Israa on sudden fever)
  "10-5": "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80", // Don't Smoke! (Breathing troubles and healthy heart)
  "10-6": "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=800&q=80", // Herbal Medicine in Sudan (Moringa, Garad, Hibiscus)
  "10-7": "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80", // Healthy Living (Walking instead of fuel-polluted driving)
  "10-8": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80", // Revision: A Healthy World (Safer houses, concrete roads, Oxfam)

  // UNIT 11: Amazing People, Animals and Places
  "11-1": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80", // The Maasai (Maasai pastoralist culture)
  "11-2": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80", // Amazing World Records (Makkah Clock and Somalia giant)
  "11-3": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80", // Alexandria Lighthouse (Wonders of ancient history)
  "11-4": "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80", // Talking Parrots (Mimicking human speech)
  "11-5": "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80", // An Amazing Child (Awad helping tea ladies in market)
  "11-6": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", // Finland's 24-hour Sun (Midnight sun on lakes)
  "11-7": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80", // Two Famous English Novelists (Bronte Jane Eyre and Charles Dickens)
  "11-8": "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80", // Revision: Amazing Wonders (Stonehenge and Great Wall of China)

  // UNIT 12: Finishing Up
  "12-1": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80", // Relationships: Twin Passions (Lina and Doha 15)
  "12-2": "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80", // The Arts: Wise Old Man (Burying money by the Nile garden)
  "12-3": "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&w=800&q=80", // Amazing Organs (Heart/lungs producing oxygen energy)
  "12-4": "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80", // A Sudanese Adventure (Alex exploring wildlife at Dinder)
  "12-5": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80", // River Crossing Logic Puzzle (Farmer crossing with fox/goat/straw)
  "12-6": "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80", // Trade (Sudanese exports agricultural percentages)
  "12-7": "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80", // Solar Panels & Electric Cars (Green transport future)
  "12-8": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80", // Revision: The End! (Finishing Grade 1 secondary SMILE)
};

const LESSON_SUDANESE_CARTOON_DESC: Record<string, string> = {
  // UNIT 1: English is Everywhere
  "1-1": "رسوم توضيحية للألعاب والأنشطة المتنوعة التي مارسها الطلاب خلال العطلة المدرسية.",
  "1-2": "لوحة كرتونية تجسد قصة الأميرة سميرة وخاتمها الذهبي السحري الذي يحقق الأمنيات.",
  "1-3": "تمثيل لعمل الفتاة سلمى مع أجدادها في الأراضي الزراعية تحت شمس السودان الدافئة.",
  "1-4": "رسم توضيحي يعرض الحيوانات النافعة والخطيرة كالمسكيت والغوريلا وضرورة حمايتها.",
  "1-5": "لوحة تاريخية للبطل السوداني عثمان دقنة بلحيته الطويلة وحروبه في شرق السودان.",
  "1-6": "رسم مائي لبورتسودان وموانئها المطلة على البحر الأحمر ومهرجان التسوق والسياحة.",
  "1-7": "توضيح لطموحات الطلاب المستقبلية كالتعليم والبرمجة والبحث العلمي لمساعدة المجتمع.",
  "1-8": "مجموعة من الطلاب يمارسون مهارات اللغة الإنجليزية المختلفة لخدمة مستقبلهم المهني.",

  // UNIT 2: Relationships
  "2-1": "رسم يجسد قيم النفير التطوعي في السودان وإصلاح جدران المنازل الطينية قبل الخريف.",
  "2-2": "توضيح كرتوني للتوأمين المتطابقين حسن وحسين واختلاف هواياتهما ومزاحهما المرح.",
  "2-3": "لوحة كرتونية دافئة تجسد الصداقة غير المألوفة بين النمر آمور والماعز الشجاع تيمور.",
  "2-4": "رسم يعبر عن الضغط الدراسي والتوتر قبل الامتحانات وضرورة أخذ قسط من الراحة.",
  "2-5": "رسالة هاتفية تفاعلية لتنظيم حفل عشاء وتواصل الأصدقاء للاحتفال بثاني أيام العيد.",
  "2-6": "رسم لمدرب كرة القدم يحث فريقه على اللعب بإصرار وعزيمة لتحقيق الفوز الكروي.",
  "2-7": "لوحة تعبر عن الصداقة القوية بين مروة وصديقتها منذ الطفولة والتحضير لمناسبة زواج سعيدة.",
  "2-8": "رسم لأصدقاء الطفولة آدم وعلي في بورم بجنوب دارفور واسترجاع ذكريات اللعب الممتعة.",

  // UNIT 3: Going Places
  "3-1": "خريطة تفاعلية توضح موقع السودان الجغرافي المتميز في شمال شرق أفريقيا وجيرانه السبعة.",
  "3-2": "رسم يعبر عن العزيمة والإصرار عند تسلق قمة جبل إيفرست ومواجهة العواصف الثلجية.",
  "3-3": "لوحة مائية تجسد رحلات المستكشف ابن بطوطة ومغامراته البحرية والعواصف في البحر الأحمر.",
  "3-4": "رسم كرتوني حديث لقطار ماجليف السريع وناطحات السحاب في مدينة شنغهاي المزدحمة.",
  "3-5": "لوحة تجسد قوافل التجارة القديمة ودرب الأربعين بين الفاشر في دارفور وأسيوط بمصر.",
  "3-6": "رسم كرتوني مبهج للجولات السياحية في جبال النوبة ومصارعة النوبة ورقصة الكمبلا الشعبية.",
  "3-7": "رسم يعرض معالم السياحة في كينيا ورؤية الحيوانات الضخمة والمنطاد الهوائي الساخن.",
  "3-8": "أصدقاء يتبادلون المعلومات حول الطقس والتقاليد السودانية ترحيباً بمتطوعي التدريس.",

  // UNIT 4: Arts and Literature
  "4-1": "قصة جحا ومسماره الشهير في جدار منزله وحيله الطريفة لإزعاج المشتري الجديد وتناول الطعام.",
  "4-2": "لوحات إرشادية مكتوبة بخط يد سوداني جميل تحث الشباب على التحلي بالأخلاق والأدب.",
  "4-3": "رسم شاعري يشبه الجد بالشجرة العظيمة المعطاءة والشمس بكرة اللهب المشتعلة في السماء.",
  "4-4": "توضيح كرتوني هزلي لسليم وهو غارق في النوم ويسرع للحاق بـمواعيد المدرسة.",
  "4-5": "طالبان يلعبان لعبة التخمين ومحاولة حزر اسم الشاعر السوداني الراحل الجيلي عبد الرحمن.",
  "4-6": "رسم يجسد المشهد الشهير لأولفر تويست وهو يطلب المزيد من الطعام في ملجأ الأيتام.",
  "4-7": "توضيح للشخصيات الشريرة في قصة أوليفر تويست مثل السيد ساوربيري والشرير فاجن.",
  "4-8": "رسم طريف لجحا وهو يعد جماله العشرة وينسى عد الجمل الذي يركب فوقه.",

  // UNIT 5: Science
  "5-1": "رسم توضيحي لمنزل في السودان مزود بألواح شمسية لتوليد الكهرباء النظيفة والمجانية.",
  "5-2": "رسم لخطوات تصنيع الشوكولاتة اللذيذة بدءاً من جني حبوب الكاكاو وحتى تغليفها.",
  "5-3": "توضيح لكيفية استخدام الإحصاءات والرسوم البيانية لتعداد السكان وتخطيط الخدمات.",
  "5-4": "رسم مجهري يوضح دور النحلة النشيطة في تلقيح الأزهار لإنتاج بذور ونباتات جديدة.",
  "5-5": "تعليمات إسعاف أولية بسيطة للتعامل مع لسعات النحل وغسل مكان اللسعة بالصابون.",
  "5-6": "رسم للعم إبراهيم وهو يفحص محرك سيارته القديمة ويملأ المبرد بالماء قبل السفر للخرطوم.",
  "5-7": "رسم يوضح تجربة البيضة الطافية في الماء المالح وتفسير الكثافة الفيزيائية ببساطة.",
  "5-8": "رسم يجمع موضوعات العلوم المتنوعة كالمحركات والكهرباء الشمسية وتصنيع الشوكولاتة.",

  // UNIT 6: Hobbies and Pastimes
  "6-1": "رسم يمثل الفرحة الغامرة لـلاعبي وجماهير هلال الأبيض بعد فوزهم غير المتوقع على هلال الخرطوم.",
  "6-2": "رسم للحرف اليدوية السودانية الرائعة كالخرز الملون والجلود المصبوغة والمنحوتات الخشبية.",
  "6-3": "رسم لمنظر طبيعي رائع يوضح توزيع الأبقار والطيور البيضاء لتعلم قواعد التصوير الفوتوغرافي.",
  "6-4": "رسم لهوايات جمع الطوابع البريدية والرسم على البيض الفارغ وجمع الحشرات بالشبكة.",
  "6-5": "توضيح للحياة البسيطة في الماضي ولعب كرة القدم والسباحة في النيل والعزف على الطبول.",
  "6-6": "رسم يمثل حوار شقيقات رواية 'نساء صغيرات' وأحلامهن بالثراء والشهرة والموسيقى والكتابة.",
  "6-7": "رسم لفرق الكشافة السودانية وهي تقوم بأعمال تطوعية لمساعدة كبار السن وإعداد الطعام للفقراء.",
  "6-8": "رسم لخطاب متبادل يعرض هوايات العزف على الجيتار والتقاط الصور وممارسة كرة القدم.",

  // UNIT 7: Money and Trade
  "7-1": "رسم يوضح العملات العالمية المختلفة كالجنيه الإسترليني والين الياباني والعملة الموحدة 'اليورو'.",
  "7-2": "رسم يعبر عن واردات السودان كالملابس الهندية والسيارات الكورية والبن الإثيوبي الفاخر.",
  "7-3": "رسم لسفينة حاويات عملاقة في بورتسودان تصدر ملايين المانجو السودانية اللذيذة للأسواق.",
  "7-4": "رسم يوضح الشراكات التجارية الكبرى للسودان مع الصين والهند والمملكة العربية السعودية والبرازيل.",
  "7-5": "توضيح لأهمية قراءة ملصق الأغذية لمعرفة المكونات الغذائية وتاريخ الصلاحية والانتهاء.",
  "7-6": "رسم يوضح دورة المنتج من المزارع (المنتج) لتاجر الجملة ثم التجزئة والزبون النهائي.",
  "7-7": "رسم لسوق الإبل الشهير في السودان وتصدير الجمال لمصر عبر الشاحنات وتناول لحم الإبل الصحي.",
  "7-8": "رسم يجمع آراء الناس حول دور الموارد الطبيعية والعمل الجاد في تحقيق التنمية والرخاء.",

  // UNIT 8: Our Bodies
  "8-1": "طبيب يقدم نصائح صحية هامة حول شرب الماء عند الشعور بالحر وممارسة التمارين.",
  "8-2": "رسم يوضح مريضة تعرضت لكسر في المعصم أثناء لعب كرة الطائرة وتستعد لعمل أشعة سينية.",
  "8-3": "رسم لقلب بشري يوضح حجراته وصماماته وأهمية الرياضة لتقوية عضلاته وضخ الأكسجين.",
  "8-4": "رسم لحافلة ركاب تقف بالقرب من مستشفى القضارف لعلاج طفل مصاب بالجفاف أثناء السفر.",
  "8-5": "رسم يعرض أشخاصاً بقدرات خارقة كصبي المطاط المرن وأقوى رجل وطفلة عبقرية الرياضيات.",
  "8-6": "توضيح للدماغ البشري المكون بنسبة 75% من الماء وضرورة حمايته من الصدمات والضرر.",
  "8-7": "أطفال يلعبون لعبة بطاقات الذاكرة ومطابقة الصور لتنمية خلايا الدماغ والقدرات الإدراكية.",
  "8-8": "رسم تفاعلي للهيكل العظمي والضلوع التي تحمي الرئتين والجمجمة التي تحمي الذاكرة والدماغ.",

  // UNIT 9: Wonderful Sudan
  "9-1": "رسم يوضح معاني أسماء المدن السودانية مثل كوستي والفاشر وجزيرة توتي بلغة النوبة.",
  "9-2": "رسم مبهج للغات السودانية المتنوعة كالنوبية في الشمال والبداويت في الشرق وترحيب 'دبايوا'.",
  "9-3": "لوحة تاريخية للملك الكوشي بعنخي وهو يوحد مملكتي كوش ومصر تحت حكم الفراعنة النوبيين.",
  "9-4": "رسم هندسي رائع لـمسجد النيلين في أم درمان بقبته الفريدة التي تشبه الصدفة عند ملتقى النيلين.",
  "9-5": "رسم لحقول قصب السكر الواسعة ومصنع سكر كنانة الشهير الذي ينتج السكر منذ عقود.",
  "9-6": "لوحة مائية تجسد العهد العثماني في السودان وتأثيراته التجارية والزراعية والتعليمية.",
  "9-7": "رسم مستقبلي تفاعلي يمثل تطلعات الطلاب كاستبدال الكتب بالأجهزة اللوحية واستخدام الروبوتات.",
  "9-8": "رسم لخريطة السودان يعرض أسماء المدن التي تبدأ بـ 'أبو' أو 'أم' والأسماء البجاوية في الشرق.",

  // UNIT 10: Health and Environment
  "10-1": "رسم يمثل التوازن البيئي في بركة مياه وتفاعل النباتات والحشرات والضفادع والطيور.",
  "10-2": "رسم يعرض مشكلة تلوث المياه وأهمية توفير المياه النظيفة للفتيات ليذهبن للمدارس.",
  "10-3": "رسم لجهود منظمة الصحة العالمية في التوعية ضد الأوبئة وأهمية التطعيم واللقاحات.",
  "10-4": "رسم يوضح الفرق بين أعراض الزكام والإنفلونزا وقياس درجات الحرارة والراحة.",
  "10-5": "رسم توعوي يحذر من مخاطر التدخين على صحة المدخن وأطفاله وضرورة الإقلاع عنه.",
  "10-6": "لوحة مائية تعرض الأعشاب الطبية السودانية كالمورينجا وزيت السمسم والكركديه والقرض.",
  "10-7": "رسم كرتوني يحث على المشي لمسافات قصيرة واستخدام سيارات أقل تلوثاً لنقاء الهواء.",
  "10-8": "أطفال يشاركون آرائهم حول ما سيفعلونه لو كانوا رؤساء كبناء مستشفيات وتوفير مياه شرب نظيفة.",

  // UNIT 11: Amazing People, Animals and Places
  "11-1": "رسم كرتوني يعرض نمط حياة قبيلة الماساي الرعوية وطموح الفتى ليشان ليصبح معلماً.",
  "11-2": "رسم لأرقام قياسية عالمية كساعة مكة الشامخة والعملاق الصومالي وأكبر يقطينة.",
  "11-3": "لوحة تاريخية لمنارة الإسكندرية القديمة ومكتبتها التاريخية التي دمرتها الحرائق.",
  "11-4": "رسم طريف لمنصور وببغائه الذكي الذي يقلد أصوات البشر ببراعة ومرح.",
  "11-5": "رسم للصبي الطموح عوض وهو يساعد بائعات الشاي في السوق لإعالة أسرته المريضة.",
  "11-6": "لوحة تجسد شمس منتصف الليل في فنلندا والبحيرات الجميلة ونشاط العائلات تحت الشمس.",
  "11-7": "رسم بورتريه للكاتبة شارلوت برونتي وروايتها جين إير والكاتب العظيم تشارلز ديكنز.",
  "11-8": "رسم للمعالم التاريخية القديمة كأحجار ستونهنج وأهرامات الجيزة وسور الصين العظيم.",

  // UNIT 12: Finishing Up
  "12-1": "رسم يوضح التوأم لينا وضحى وااختلاف اهتماماتهما بين القراءة والزراعة ونصيحة الجدة الحكيمة.",
  "12-2": "لوحة للرجل الحكيم الذي يدفن الأموال في حديقته بالقرية ويعيرها للمحتاجين بشرط إعادتها.",
  "12-3": "رسم توضيحي للقلب والرئتين والدماغ ودورها الحيوي في إنتاج الطاقة باستخدام الأكسجين.",
  "12-4": "رسم للمستكشف أليكس وهو يستمتع بـمحمية الدندر وآثار سواكن وكرم الضيافة السوداني.",
  "12-5": "رسم للغز المزارع الذي يريد عبور النيل مع ثعلب وماعز وقش باستخدام قارب صغير.",
  "12-6": "رسم بياني يوضح نسب الصادرات السودانية حيث تشكل المنتجات الزراعية النسبة الأكبر.",
  "12-7": "رسم كرتوني مبهج للمستقبل واستخدام السيارات الكهربائية النظيفة والألواح الشمسية الرخيصة.",
  "12-8": "أطفال يحتفلون بانتهاء منهج الصف الأول الثانوي وإنجازاتهم الأكاديمية وطموحات العطلة."
};

/**
 * Returns a beautiful, context-relevant educational image URL for the given unit and lesson combination.
 * Defaults to a beautiful science, reading, or world image if not found in mapping.
 */
export function getLessonImageUrl(unitId: number, lessonId: number): string {
  const key = `${unitId}-${lessonId}`;
  return LESSON_IMAGE_MAP[key] || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80";
}

/**
 * Returns a beautiful Arabic description detailing how this cartoon illustration 
 * reflects Sudanese real life, geography, culture, or student environment.
 */
export function getLessonCartoonDesc(unitId: number, lessonId: number): string {
  const key = `${unitId}-${lessonId}`;
  return LESSON_SUDANESE_CARTOON_DESC[key] || "توضيح كرتوني تفاعلي لطلاب السودان بلمسات تعليمية مبهجة.";
}
