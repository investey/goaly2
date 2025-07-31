import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, ChevronUp, ChevronDown, Bookmark, Link, BookmarkCheck, ArrowLeft, X, Search, Banknote, Star, User, Plus } from 'lucide-react';
import { DollarBillIcon } from './components/DollarBillIcon';
import { HealthIcon } from './components/HealthIcon';
import { sanitizeInput, secureStorage, rateLimiter } from './utils/security';

const loveAffirmations = [
  { text: "I am worthy of deep love", spanish: "Soy digno de amor profundo" },
  { text: "Love flows to me effortlessly", spanish: "El amor fluye hacia mí sin esfuerzo" },
  { text: "I attract love with ease", spanish: "Atraigo el amor con facilidad" },
  { text: "My heart is open to love", spanish: "Mi corazón está abierto al amor" },
  { text: "I radiate love and receive love", spanish: "Irradio amor y recibo amor" },
  { text: "Love surrounds me always", spanish: "El amor me rodea siempre" },
  { text: "I deserve unconditional love", spanish: "Merezco amor incondicional" },
  { text: "Love is my natural state", spanish: "El amor es mi estado natural" },
  { text: "I am a magnet for love", spanish: "Soy un imán para el amor" },
  { text: "Love fills every cell of my being", spanish: "El amor llena cada célula de mi ser" },
  { text: "I give and receive love freely", spanish: "Doy y recibo amor libremente" },
  { text: "My heart overflows with love", spanish: "Mi corazón desborda de amor" },
  { text: "Love is always available to me", spanish: "El amor siempre está disponible para mí" },
  { text: "I am love in human form", spanish: "Soy amor en forma humana" },
  { text: "Love guides all my actions", spanish: "El amor guía todas mis acciones" },
  { text: "I trust in love's perfect timing", spanish: "Confío en el momento perfecto del amor" },
  { text: "Love heals and transforms me", spanish: "El amor me sana y me transforma" },
  { text: "I am surrounded by loving energy", spanish: "Estoy rodeado de energía amorosa" },
  { text: "Love is my greatest strength", spanish: "El amor es mi mayor fortaleza" },
  { text: "I choose love in every moment", spanish: "Elijo el amor en cada momento" },
  { text: "Love connects me to all beings", spanish: "El amor me conecta con todos los seres" },
  { text: "I am deeply loved and cherished", spanish: "Soy profundamente amado y valorado" },
  { text: "My capacity for love is infinite", spanish: "Mi capacidad de amar es infinita" },
  { text: "I attract my perfect soulmate", spanish: "Atraigo a mi alma gemela perfecta" },
  { text: "Love multiplies when I share it", spanish: "El amor se multiplica cuando lo comparto" },
  { text: "I am worthy of passionate love", spanish: "Soy digno de amor apasionado" },
  { text: "My heart chakra is wide open", spanish: "Mi chakra del corazón está completamente abierto" },
  { text: "I forgive myself with love", spanish: "Me perdono a mí mismo con amor" },
  { text: "Love is the answer to everything", spanish: "El amor es la respuesta a todo" },
  { text: "I am a beacon of pure love", spanish: "Soy un faro de amor puro" },
  { text: "My relationships are filled with love", spanish: "Mis relaciones están llenas de amor" },
  { text: "I speak words of love and kindness", spanish: "Hablo palabras de amor y bondad" },
  { text: "Love flows through me to others", spanish: "El amor fluye a través de mí hacia otros" },
  { text: "I am grateful for all the love in my life", spanish: "Estoy agradecido por todo el amor en mi vida" },
  { text: "My soul recognizes its perfect match", spanish: "Mi alma reconoce su pareja perfecta" },
  { text: "I trust the universe to bring me love", spanish: "Confío en que el universo me traiga amor" },
  { text: "Love is my default emotion", spanish: "El amor es mi emoción predeterminada" },
  { text: "I am loveable exactly as I am", spanish: "Soy adorable exactamente como soy" },
  { text: "My heart is a fountain of love", spanish: "Mi corazón es una fuente de amor" },
  { text: "I attract love in all its forms", spanish: "Atraigo el amor en todas sus formas" },
  { text: "Love is my superpower", spanish: "El amor es mi superpoder" },
  { text: "I am surrounded by loving souls", spanish: "Estoy rodeado de almas amorosas" },
  { text: "My love story is beautiful and unique", spanish: "Mi historia de amor es hermosa y única" },
  { text: "I deserve a love that celebrates me", spanish: "Merezco un amor que me celebre" },
  { text: "Love comes to me at the perfect time", spanish: "El amor llega a mí en el momento perfecto" },
  { text: "I am open to receiving deep love", spanish: "Estoy abierto a recibir amor profundo" },
  { text: "My heart beats with pure love", spanish: "Mi corazón late con amor puro" },
  { text: "I create loving relationships effortlessly", spanish: "Creo relaciones amorosas sin esfuerzo" },
  { text: "Love is my birthright", spanish: "El amor es mi derecho de nacimiento" },
  { text: "I am worthy of epic love", spanish: "Soy digno de un amor épico" },
  { text: "My love attracts my ideal partner", spanish: "Mi amor atrae a mi pareja ideal" },
  { text: "I radiate love wherever I go", spanish: "Irradio amor dondequiera que vaya" },
  { text: "Love finds me wherever I am", spanish: "El amor me encuentra dondequiera que esté" },
  { text: "I am a master of self-love", spanish: "Soy un maestro del amor propio" },
  { text: "My heart is healed and whole", spanish: "Mi corazón está sanado y completo" },
  { text: "Love transforms everything it touches", spanish: "El amor transforma todo lo que toca" },
  { text: "I am divinely guided to love", spanish: "Soy guiado divinamente hacia el amor" },
  { text: "My love is a gift to the world", spanish: "Mi amor es un regalo para el mundo" },
  { text: "I choose love over fear always", spanish: "Siempre elijo el amor sobre el miedo" },
  { text: "Love is my natural frequency", spanish: "El amor es mi frecuencia natural" },
  { text: "I am worthy of unconditional acceptance", spanish: "Soy digno de aceptación incondicional" },
  { text: "My heart is a magnet for true love", spanish: "Mi corazón es un imán para el amor verdadero" },
  { text: "Love flows to me like a river", spanish: "El amor fluye hacia mí como un río" },
  { text: "I am love walking in human form", spanish: "Soy amor caminando en forma humana" },
  { text: "My soul mate is seeking me too", spanish: "Mi alma gemela también me está buscando" },
  { text: "Love is my greatest adventure", spanish: "El amor es mi mayor aventura" },
  { text: "I trust in love's divine timing", spanish: "Confío en el momento divino del amor" },
  { text: "My heart is open to miracles", spanish: "Mi corazón está abierto a los milagros" },
  { text: "Love is the essence of who I am", spanish: "El amor es la esencia de quien soy" },
  { text: "I am worthy of a fairy tale love", spanish: "Soy digno de un amor de cuento de hadas" },
  { text: "My love creates positive change", spanish: "Mi amor crea cambios positivos" },
  { text: "I attract love that honors my worth", spanish: "Atraigo amor que honra mi valor" }
];

const wealthAffirmations = [
  { text: "I am a money magnet", spanish: "Soy un imán para el dinero" },
  { text: "Wealth flows to me easily", spanish: "La riqueza fluye hacia mí fácilmente" },
  { text: "I attract abundance effortlessly", spanish: "Atraigo abundancia sin esfuerzo" },
  { text: "Money comes to me from multiple sources", spanish: "El dinero llega a mí de múltiples fuentes" },
  { text: "I am worthy of financial success", spanish: "Soy digno del éxito financiero" },
  { text: "Prosperity is my natural state", spanish: "La prosperidad es mi estado natural" },
  { text: "I create wealth through value", spanish: "Creo riqueza a través del valor" },
  { text: "My income increases daily", spanish: "Mis ingresos aumentan diariamente" },
  { text: "I am financially free", spanish: "Soy financieramente libre" },
  { text: "Money works for me", spanish: "El dinero trabaja para mí" },
  { text: "I attract lucrative opportunities", spanish: "Atraigo oportunidades lucrativas" },
  { text: "Wealth is drawn to me", spanish: "La riqueza se siente atraída hacia mí" },
  { text: "I am a successful entrepreneur", spanish: "Soy un empresario exitoso" },
  { text: "My business thrives and grows", spanish: "Mi negocio prospera y crece" },
  { text: "I make smart financial decisions", spanish: "Tomo decisiones financieras inteligentes" },
  { text: "Abundance surrounds me always", spanish: "La abundancia me rodea siempre" },
  { text: "I deserve unlimited prosperity", spanish: "Merezco prosperidad ilimitada" },
  { text: "Money flows like water to me", spanish: "El dinero fluye como agua hacia mí" },
  { text: "I am rich in all areas", spanish: "Soy rico en todas las áreas" },
  { text: "Financial success is inevitable", spanish: "El éxito financiero es inevitable" },
  { text: "I attract profitable ventures", spanish: "Atraigo empresas rentables" },
  { text: "My wealth multiplies exponentially", spanish: "Mi riqueza se multiplica exponencialmente" },
  { text: "I am open to receiving money", spanish: "Estoy abierto a recibir dinero" },
  { text: "Success follows me everywhere", spanish: "El éxito me sigue a todas partes" },
  { text: "I create multiple income streams", spanish: "Creo múltiples fuentes de ingresos" },
  { text: "My business generates massive profits", spanish: "Mi negocio genera ganancias masivas" },
  { text: "I am a wealth creator", spanish: "Soy un creador de riqueza" },
  { text: "Money loves me and I love money", spanish: "El dinero me ama y yo amo el dinero" },
  { text: "I attract high-paying clients", spanish: "Atraigo clientes que pagan bien" },
  { text: "My net worth increases constantly", spanish: "Mi patrimonio neto aumenta constantemente" },
  { text: "I am financially abundant", spanish: "Soy financieramente abundante" },
  { text: "Prosperity flows through me", spanish: "La prosperidad fluye a través de mí" },
  { text: "I manifest money with ease", spanish: "Manifiesto dinero con facilidad" },
  { text: "My business scales effortlessly", spanish: "Mi negocio escala sin esfuerzo" },
  { text: "I attract investment opportunities", spanish: "Atraigo oportunidades de inversión" },
  { text: "Wealth is my birthright", spanish: "La riqueza es mi derecho de nacimiento" },
  { text: "I am a money-making machine", spanish: "Soy una máquina de hacer dinero" },
  { text: "Financial freedom is mine", spanish: "La libertad financiera es mía" },
  { text: "I attract passive income streams", spanish: "Atraigo fuentes de ingresos pasivos" },
  { text: "My business empire grows daily", spanish: "Mi imperio empresarial crece diariamente" },
  { text: "I am worthy of massive wealth", spanish: "Soy digno de riqueza masiva" },
  { text: "Money comes to me in unexpected ways", spanish: "El dinero llega a mí de formas inesperadas" },
  { text: "I create value and receive abundance", spanish: "Creo valor y recibo abundancia" },
  { text: "My financial goals manifest quickly", spanish: "Mis metas financieras se manifiestan rápidamente" },
  { text: "I am a master of money", spanish: "Soy un maestro del dinero" },
  { text: "Wealth creation is my superpower", spanish: "La creación de riqueza es mi superpoder" },
  { text: "I attract millionaire opportunities", spanish: "Atraigo oportunidades millonarias" },
  { text: "My business dominates the market", spanish: "Mi negocio domina el mercado" },
  { text: "I am financially unstoppable", spanish: "Soy financieramente imparable" },
  { text: "Money flows to me like a river", spanish: "El dinero fluye hacia mí como un río" },
  { text: "I am a magnet for financial miracles", spanish: "Soy un imán para milagros financieros" },
  { text: "Wealth consciousness is my default state", spanish: "La conciencia de riqueza es mi estado predeterminado" },
  { text: "I attract money while I sleep", spanish: "Atraigo dinero mientras duermo" },
  { text: "My bank account grows exponentially", spanish: "Mi cuenta bancaria crece exponencialmente" },
  { text: "I am worthy of unlimited abundance", spanish: "Soy digno de abundancia ilimitada" },
  { text: "Money comes to me from everywhere", spanish: "El dinero llega a mí de todas partes" },
  { text: "I create wealth with my thoughts", spanish: "Creo riqueza con mis pensamientos" },
  { text: "My business is a cash cow", spanish: "Mi negocio es una mina de oro" },
  { text: "I attract wealthy mentors and partners", spanish: "Atraigo mentores y socios adinerados" },
  { text: "Financial abundance is my reality", spanish: "La abundancia financiera es mi realidad" },
  { text: "I am a master wealth builder", spanish: "Soy un maestro constructor de riqueza" },
  { text: "Money flows to me effortlessly", spanish: "El dinero fluye hacia mí sin esfuerzo" },
  { text: "I deserve to be financially free", spanish: "Merezco ser financieramente libre" },
  { text: "My income exceeds my expenses", spanish: "Mis ingresos superan mis gastos" },
  { text: "I attract profitable investments", spanish: "Atraigo inversiones rentables" },
  { text: "Wealth is attracted to my energy", spanish: "La riqueza se siente atraída por mi energía" },
  { text: "I am financially independent", spanish: "Soy financieramente independiente" },
  { text: "Money multiplies in my hands", spanish: "El dinero se multiplica en mis manos" },
  { text: "I create value that generates wealth", spanish: "Creo valor que genera riqueza" },
  { text: "My business attracts ideal customers", spanish: "Mi negocio atrae clientes ideales" },
  { text: "I am a successful money manager", spanish: "Soy un administrador exitoso del dinero" },
  { text: "Abundance is my natural state", spanish: "La abundancia es mi estado natural" },
  { text: "I attract money-making opportunities", spanish: "Atraigo oportunidades para hacer dinero" },
  { text: "My wealth serves the highest good", spanish: "Mi riqueza sirve al bien supremo" },
  { text: "I am worthy of financial security", spanish: "Soy digno de seguridad financiera" },
  { text: "Money comes to me in perfect timing", spanish: "El dinero llega a mí en el momento perfecto" },
  { text: "I create multiple revenue streams", spanish: "Creo múltiples flujos de ingresos" },
  { text: "My business generates passive income", spanish: "Mi negocio genera ingresos pasivos" },
  { text: "I attract financial windfalls", spanish: "Atraigo ganancias inesperadas" },
  { text: "Wealth flows to me consistently", spanish: "La riqueza fluye hacia mí consistentemente" },
  { text: "I am a money manifestation master", spanish: "Soy un maestro de la manifestación de dinero" },
  { text: "My financial future is bright", spanish: "Mi futuro financiero es brillante" },
  { text: "I attract abundance in all forms", spanish: "Atraigo abundancia en todas sus formas" },
  { text: "Money is my faithful servant", spanish: "El dinero es mi fiel servidor" },
  { text: "I create wealth through innovation", spanish: "Creo riqueza a través de la innovación" },
  { text: "My business scales automatically", spanish: "Mi negocio escala automáticamente" },
  { text: "I attract high-value opportunities", spanish: "Atraigo oportunidades de alto valor" },
  { text: "Financial success is my destiny", spanish: "El éxito financiero es mi destino" },
  { text: "I am worthy of extreme wealth", spanish: "Soy digno de riqueza extrema" },
  { text: "Money loves to work for me", spanish: "Al dinero le encanta trabajar para mí" },
  { text: "I attract profitable partnerships", spanish: "Atraigo asociaciones rentables" },
  { text: "My wealth creates positive impact", spanish: "Mi riqueza crea un impacto positivo" },
  { text: "I am financially bulletproof", spanish: "Soy financieramente a prueba de balas" },
  { text: "Money flows to me like magic", spanish: "El dinero fluye hacia mí como magia" },
  { text: "I create wealth through service", spanish: "Creo riqueza a través del servicio" },
  { text: "My business is incredibly profitable", spanish: "Mi negocio es increíblemente rentable" },
  { text: "I attract money with gratitude", spanish: "Atraigo dinero con gratitud" },
  { text: "Wealth is my divine inheritance", spanish: "La riqueza es mi herencia divina" },
  { text: "I am a millionaire in the making", spanish: "Soy un millonario en proceso" },
  { text: "Money comes to me in avalanches", spanish: "El dinero llega a mí en avalanchas" }
];

const healthAffirmations = [
  { text: "I am perfectly healthy and strong", spanish: "Estoy perfectamente sano y fuerte" },
  { text: "My body heals itself naturally", spanish: "Mi cuerpo se sana naturalmente" },
  { text: "I radiate vibrant health", spanish: "Irradio salud vibrante" },
  { text: "Every cell in my body is healthy", spanish: "Cada célula de mi cuerpo está sana" },
  { text: "I am full of energy and vitality", spanish: "Estoy lleno de energía y vitalidad" },
  { text: "My body is my temple", spanish: "Mi cuerpo es mi templo" },
  { text: "I choose healthy foods that nourish me", spanish: "Elijo alimentos saludables que me nutren" },
  { text: "I love exercising and moving my body", spanish: "Amo ejercitarme y mover mi cuerpo" },
  { text: "My immune system is powerful", spanish: "Mi sistema inmunológico es poderoso" },
  { text: "I sleep deeply and wake refreshed", spanish: "Duermo profundamente y despierto renovado" },
  { text: "My body functions perfectly", spanish: "Mi cuerpo funciona perfectamente" },
  { text: "I am strong and resilient", spanish: "Soy fuerte y resistente" },
  { text: "Health flows through every part of me", spanish: "La salud fluye por cada parte de mí" },
  { text: "I am in perfect physical condition", spanish: "Estoy en perfecta condición física" },
  { text: "My body recovers quickly", spanish: "Mi cuerpo se recupera rápidamente" },
  { text: "I have unlimited energy", spanish: "Tengo energía ilimitada" },
  { text: "My mind and body are in harmony", spanish: "Mi mente y cuerpo están en armonía" },
  { text: "I am grateful for my healthy body", spanish: "Estoy agradecido por mi cuerpo sano" },
  { text: "I attract perfect health", spanish: "Atraigo salud perfecta" },
  { text: "My body is a healing machine", spanish: "Mi cuerpo es una máquina de sanación" },
  { text: "I feel amazing in my body", spanish: "Me siento increíble en mi cuerpo" },
  { text: "I am physically fit and strong", spanish: "Estoy físicamente en forma y fuerte" },
  { text: "My body deserves love and care", spanish: "Mi cuerpo merece amor y cuidado" },
  { text: "I make healthy choices effortlessly", spanish: "Tomo decisiones saludables sin esfuerzo" },
  { text: "My metabolism works perfectly", spanish: "Mi metabolismo funciona perfectamente" },
  { text: "I am at my ideal weight", spanish: "Estoy en mi peso ideal" },
  { text: "My body is flexible and strong", spanish: "Mi cuerpo es flexible y fuerte" },
  { text: "I breathe deeply and easily", spanish: "Respiro profunda y fácilmente" },
  { text: "My heart beats with perfect rhythm", spanish: "Mi corazón late con ritmo perfecto" },
  { text: "I am mentally and physically balanced", spanish: "Estoy mental y físicamente equilibrado" },
  { text: "My body regenerates itself daily", spanish: "Mi cuerpo se regenera diariamente" },
  { text: "I am free from pain and illness", spanish: "Estoy libre de dolor y enfermedad" },
  { text: "My body moves with grace and ease", spanish: "Mi cuerpo se mueve con gracia y facilidad" },
  { text: "I have perfect posture and alignment", spanish: "Tengo postura y alineación perfectas" },
  { text: "My digestive system works flawlessly", spanish: "Mi sistema digestivo funciona perfectamente" },
  { text: "I am aging gracefully and healthily", spanish: "Estoy envejeciendo con gracia y salud" },
  { text: "My body is a source of joy", spanish: "Mi cuerpo es una fuente de alegría" },
  { text: "I am committed to my health", spanish: "Estoy comprometido con mi salud" },
  { text: "My body responds to exercise beautifully", spanish: "Mi cuerpo responde al ejercicio hermosamente" },
  { text: "I have incredible stamina and endurance", spanish: "Tengo resistencia y aguante increíbles" },
  { text: "My body is strong and capable", spanish: "Mi cuerpo es fuerte y capaz" },
  { text: "I trust my body's wisdom", spanish: "Confío en la sabiduría de mi cuerpo" },
  { text: "My health improves every day", spanish: "Mi salud mejora cada día" },
  { text: "I am the picture of perfect health", spanish: "Soy la imagen de la salud perfecta" },
  { text: "My body is my greatest asset", spanish: "Mi cuerpo es mi mayor activo" },
  { text: "I feel fantastic in my skin", spanish: "Me siento fantástico en mi piel" },
  { text: "My body is a masterpiece", spanish: "Mi cuerpo es una obra maestra" },
  { text: "I am healthy inside and out", spanish: "Estoy sano por dentro y por fuera" },
  { text: "My body serves me perfectly", spanish: "Mi cuerpo me sirve perfectamente" },
  { text: "I am a beacon of health and vitality", spanish: "Soy un faro de salud y vitalidad" },
  { text: "My body is a temple of wellness", spanish: "Mi cuerpo es un templo de bienestar" },
  { text: "I attract perfect health naturally", spanish: "Atraigo salud perfecta naturalmente" },
  { text: "My cells regenerate with perfection", spanish: "Mis células se regeneran con perfección" },
  { text: "I am vibrant and alive", spanish: "Estoy vibrante y vivo" },
  { text: "My body heals faster than expected", spanish: "Mi cuerpo sana más rápido de lo esperado" },
  { text: "I radiate health and happiness", spanish: "Irradio salud y felicidad" },
  { text: "My immune system is invincible", spanish: "Mi sistema inmunológico es invencible" },
  { text: "I choose foods that energize me", spanish: "Elijo alimentos que me dan energía" },
  { text: "My body loves to move and exercise", spanish: "A mi cuerpo le encanta moverse y ejercitarse" },
  { text: "I sleep like a baby every night", spanish: "Duermo como un bebé cada noche" },
  { text: "My energy levels are consistently high", spanish: "Mis niveles de energía son consistentemente altos" },
  { text: "I am mentally sharp and focused", spanish: "Estoy mentalmente agudo y enfocado" },
  { text: "My body is perfectly balanced", spanish: "Mi cuerpo está perfectamente equilibrado" },
  { text: "I recover quickly from any challenge", spanish: "Me recupero rápidamente de cualquier desafío" },
  { text: "My strength increases daily", spanish: "Mi fuerza aumenta diariamente" },
  { text: "I am in tune with my body's needs", spanish: "Estoy en sintonía con las necesidades de mi cuerpo" },
  { text: "My health is my top priority", spanish: "Mi salud es mi máxima prioridad" },
  { text: "I feel younger every day", spanish: "Me siento más joven cada día" },
  { text: "My body is incredibly resilient", spanish: "Mi cuerpo es increíblemente resistente" },
  { text: "I am free from stress and tension", spanish: "Estoy libre de estrés y tensión" },
  { text: "My organs function optimally", spanish: "Mis órganos funcionan de manera óptima" },
  { text: "I have perfect circulation", spanish: "Tengo circulación perfecta" },
  { text: "My bones are strong and healthy", spanish: "Mis huesos son fuertes y saludables" },
  { text: "I breathe with ease and comfort", spanish: "Respiro con facilidad y comodidad" },
  { text: "My skin glows with health", spanish: "Mi piel brilla con salud" },
  { text: "I am at my perfect weight", spanish: "Estoy en mi peso perfecto" },
  { text: "My body moves like a dancer", spanish: "Mi cuerpo se mueve como un bailarín" },
  { text: "I have excellent coordination", spanish: "Tengo excelente coordinación" },
  { text: "My reflexes are lightning fast", spanish: "Mis reflejos son rápidos como un rayo" },
  { text: "I am physically powerful", spanish: "Soy físicamente poderoso" },
  { text: "My body is a healing miracle", spanish: "Mi cuerpo es un milagro de sanación" },
  { text: "I attract wellness in all forms", spanish: "Atraigo bienestar en todas sus formas" },
  { text: "My health radiates from within", spanish: "Mi salud irradia desde adentro" },
  { text: "I am genetically blessed", spanish: "Estoy genéticamente bendecido" },
  { text: "My body loves healthy habits", spanish: "A mi cuerpo le encantan los hábitos saludables" },
  { text: "I am disease-free and thriving", spanish: "Estoy libre de enfermedades y prosperando" },
  { text: "My energy is magnetic", spanish: "Mi energía es magnética" },
  { text: "I am physically unstoppable", spanish: "Soy físicamente imparable" },
  { text: "My body is perfectly designed", spanish: "Mi cuerpo está perfectamente diseñado" },
  { text: "I heal at the speed of light", spanish: "Sano a la velocidad de la luz" },
  { text: "My health is my superpower", spanish: "Mi salud es mi superpoder" },
  { text: "I am a picture of perfect fitness", spanish: "Soy la imagen de la condición física perfecta" },
  { text: "My body is my best friend", spanish: "Mi cuerpo es mi mejor amigo" },
  { text: "I am healthy in every way", spanish: "Estoy sano en todos los sentidos" },
  { text: "My vitality is contagious", spanish: "Mi vitalidad es contagiosa" },
  { text: "I am built for optimal health", spanish: "Estoy construido para la salud óptima" },
  { text: "My body is a wellness machine", spanish: "Mi cuerpo es una máquina de bienestar" },
  { text: "I am healthy beyond measure", spanish: "Estoy sano más allá de toda medida" },
  { text: "My body thrives on life", spanish: "Mi cuerpo prospera con la vida" }
];

const learningAffirmations = [
  { text: "I am a fast and eager learner", spanish: "Soy un aprendiz rápido y entusiasta" },
  { text: "Knowledge comes easily to me", spanish: "El conocimiento llega fácilmente a mí" },
  { text: "I absorb information effortlessly", spanish: "Absorbo información sin esfuerzo" },
  { text: "My mind is sharp and focused", spanish: "Mi mente está aguda y enfocada" },
  { text: "I love learning new things", spanish: "Amo aprender cosas nuevas" },
  { text: "I retain information perfectly", spanish: "Retengo información perfectamente" },
  { text: "My brain is a powerful learning machine", spanish: "Mi cerebro es una poderosa máquina de aprendizaje" },
  { text: "I understand concepts quickly", spanish: "Entiendo conceptos rápidamente" },
  { text: "Learning brings me joy and excitement", spanish: "Aprender me trae alegría y emoción" },
  { text: "I am curious about everything", spanish: "Tengo curiosidad por todo" },
  { text: "My memory is excellent and reliable", spanish: "Mi memoria es excelente y confiable" },
  { text: "I master new skills with ease", spanish: "Domino nuevas habilidades con facilidad" },
  { text: "Knowledge flows to me naturally", spanish: "El conocimiento fluye hacia mí naturalmente" },
  { text: "I am intelligent and capable", spanish: "Soy inteligente y capaz" },
  { text: "My mind expands with every lesson", spanish: "Mi mente se expande con cada lección" },
  { text: "I embrace challenges as learning opportunities", spanish: "Abrazo los desafíos como oportunidades de aprendizaje" },
  { text: "I am a lifelong learner", spanish: "Soy un aprendiz de por vida" },
  { text: "My concentration is laser-focused", spanish: "Mi concentración está enfocada como un láser" },
  { text: "I learn from every experience", spanish: "Aprendo de cada experiencia" },
  { text: "My brain creates new connections daily", spanish: "Mi cerebro crea nuevas conexiones diariamente" },
  { text: "I am open to new ideas and perspectives", spanish: "Estoy abierto a nuevas ideas y perspectivas" },
  { text: "Learning is my superpower", spanish: "Aprender es mi superpoder" },
  { text: "I process information efficiently", spanish: "Proceso información eficientemente" },
  { text: "My mind is like a sponge for knowledge", spanish: "Mi mente es como una esponja para el conocimiento" },
  { text: "I enjoy studying and researching", spanish: "Disfruto estudiar e investigar" },
  { text: "I am a master student", spanish: "Soy un estudiante maestro" },
  { text: "My learning capacity is unlimited", spanish: "Mi capacidad de aprendizaje es ilimitada" },
  { text: "I connect ideas and concepts easily", spanish: "Conecto ideas y conceptos fácilmente" },
  { text: "Knowledge transforms my life", spanish: "El conocimiento transforma mi vida" },
  { text: "I am wise beyond my years", spanish: "Soy sabio más allá de mis años" },
  { text: "My mind is clear and organized", spanish: "Mi mente está clara y organizada" },
  { text: "I learn something valuable every day", spanish: "Aprendo algo valioso cada día" },
  { text: "I am a knowledge seeker", spanish: "Soy un buscador de conocimiento" },
  { text: "My brain power increases constantly", spanish: "El poder de mi cerebro aumenta constantemente" },
  { text: "I understand complex topics easily", spanish: "Entiendo temas complejos fácilmente" },
  { text: "Learning accelerates my growth", spanish: "Aprender acelera mi crecimiento" },
  { text: "I am mentally agile and quick", spanish: "Soy mentalmente ágil y rápido" },
  { text: "My mind is a treasure trove of knowledge", spanish: "Mi mente es un tesoro de conocimiento" },
  { text: "I apply what I learn immediately", spanish: "Aplico lo que aprendo inmediatamente" },
  { text: "I am a brilliant problem solver", spanish: "Soy un solucionador de problemas brillante" },
  { text: "Knowledge is my greatest wealth", spanish: "El conocimiento es mi mayor riqueza" },
  { text: "I learn from the best teachers", spanish: "Aprendo de los mejores maestros" },
  { text: "My mind is always growing", spanish: "Mi mente siempre está creciendo" },
  { text: "I am a student of life", spanish: "Soy un estudiante de la vida" },
  { text: "Learning comes naturally to me", spanish: "Aprender me viene naturalmente" },
  { text: "I have an insatiable thirst for knowledge", spanish: "Tengo una sed insaciable de conocimiento" },
  { text: "My brain is optimized for learning", spanish: "Mi cerebro está optimizado para aprender" },
  { text: "I master any subject I choose", spanish: "Domino cualquier materia que elija" },
  { text: "Knowledge empowers me completely", spanish: "El conocimiento me empodera completamente" },
  { text: "I am a learning machine", spanish: "Soy una máquina de aprendizaje" },
  { text: "My mind is a knowledge magnet", spanish: "Mi mente es un imán de conocimiento" },
  { text: "I absorb wisdom like a sponge", spanish: "Absorbo sabiduría como una esponja" },
  { text: "Learning is my greatest passion", spanish: "Aprender es mi mayor pasión" },
  { text: "My brain processes information perfectly", spanish: "Mi cerebro procesa información perfectamente" },
  { text: "I am intellectually unstoppable", spanish: "Soy intelectualmente imparable" },
  { text: "Knowledge flows through me effortlessly", spanish: "El conocimiento fluye a través de mí sin esfuerzo" },
  { text: "I am a genius in my own right", spanish: "Soy un genio por derecho propio" },
  { text: "My mind is infinitely expandable", spanish: "Mi mente es infinitamente expandible" },
  { text: "I learn faster than ever before", spanish: "Aprendo más rápido que nunca" },
  { text: "Wisdom comes to me naturally", spanish: "La sabiduría llega a mí naturalmente" },
  { text: "I am a master of my mind", spanish: "Soy un maestro de mi mente" },
  { text: "My intelligence grows daily", spanish: "Mi inteligencia crece diariamente" },
  { text: "I understand everything I study", spanish: "Entiendo todo lo que estudio" },
  { text: "Learning is effortless for me", spanish: "Aprender es sin esfuerzo para mí" },
  { text: "My mind is crystal clear", spanish: "Mi mente está cristalina" },
  { text: "I am a brilliant thinker", spanish: "Soy un pensador brillante" },
  { text: "Knowledge is my natural state", spanish: "El conocimiento es mi estado natural" },
  { text: "I learn with incredible speed", spanish: "Aprendo con velocidad increíble" },
  { text: "My brain is a supercomputer", spanish: "Mi cerebro es una supercomputadora" },
  { text: "I am mentally invincible", spanish: "Soy mentalmente invencible" },
  { text: "Learning transforms my reality", spanish: "Aprender transforma mi realidad" },
  { text: "I am a knowledge creator", spanish: "Soy un creador de conocimiento" },
  { text: "My mind is perfectly organized", spanish: "Mi mente está perfectamente organizada" },
  { text: "I learn through all my senses", spanish: "Aprendo a través de todos mis sentidos" },
  { text: "Wisdom flows to me constantly", spanish: "La sabiduría fluye hacia mí constantemente" },
  { text: "I am intellectually gifted", spanish: "Soy intelectualmente dotado" },
  { text: "My learning never stops", spanish: "Mi aprendizaje nunca se detiene" },
  { text: "I am a master of information", spanish: "Soy un maestro de la información" },
  { text: "Knowledge is my greatest tool", spanish: "El conocimiento es mi herramienta más grande" },
  { text: "I learn from every moment", spanish: "Aprendo de cada momento" },
  { text: "My mind is a learning laboratory", spanish: "Mi mente es un laboratorio de aprendizaje" },
  { text: "I am cognitively superior", spanish: "Soy cognitivamente superior" },
  { text: "Learning is my life force", spanish: "Aprender es mi fuerza vital" },
  { text: "I am a wisdom gatherer", spanish: "Soy un recolector de sabiduría" },
  { text: "My brain is incredibly powerful", spanish: "Mi cerebro es increíblemente poderoso" },
  { text: "I learn with perfect recall", spanish: "Aprendo con recuerdo perfecto" },
  { text: "Knowledge is my superpower", spanish: "El conocimiento es mi superpoder" },
  { text: "I am mentally magnificent", spanish: "Soy mentalmente magnífico" },
  { text: "My mind is a learning miracle", spanish: "Mi mente es un milagro de aprendizaje" },
  { text: "I absorb knowledge instantly", spanish: "Absorbo conocimiento instantáneamente" },
  { text: "Learning is my greatest joy", spanish: "Aprender es mi mayor alegría" },
  { text: "I am intellectually brilliant", spanish: "Soy intelectualmente brillante" },
  { text: "My mind is a knowledge vault", spanish: "Mi mente es una bóveda de conocimiento" },
  { text: "I learn with laser precision", spanish: "Aprendo con precisión láser" },
  { text: "Wisdom is my natural gift", spanish: "La sabiduría es mi don natural" },
  { text: "I am a learning phenomenon", spanish: "Soy un fenómeno de aprendizaje" },
  { text: "My brain is optimized for genius", spanish: "Mi cerebro está optimizado para la genialidad" },
  { text: "Knowledge flows through my DNA", spanish: "El conocimiento fluye a través de mi ADN" },
  { text: "I am a master of understanding", spanish: "Soy un maestro del entendimiento" }
];

// Speech & Communication Affirmations
const speechAffirmations = [
  { text: "I speak with confidence and clarity", spanish: "Hablo con confianza y claridad" },
  { text: "My voice is powerful and compelling", spanish: "Mi voz es poderosa y convincente" },
  { text: "I communicate my ideas effectively", spanish: "Comunico mis ideas efectivamente" },
  { text: "I am comfortable speaking in public", spanish: "Me siento cómodo hablando en público" },
  { text: "My words inspire and motivate others", spanish: "Mis palabras inspiran y motivan a otros" },
  { text: "I speak my truth with courage", spanish: "Hablo mi verdad con valentía" },
  { text: "I express myself clearly and confidently", spanish: "Me expreso clara y confiadamente" },
  { text: "My voice matters and people listen", spanish: "Mi voz importa y la gente escucha" },
  { text: "I am a natural and engaging speaker", spanish: "Soy un orador natural y cautivador" },
  { text: "I communicate with passion and purpose", spanish: "Me comunico con pasión y propósito" },
  { text: "My words flow effortlessly and smoothly", spanish: "Mis palabras fluyen sin esfuerzo y suavemente" },
  { text: "I connect with my audience authentically", spanish: "Me conecto con mi audiencia auténticamente" },
  { text: "I speak with authority and conviction", spanish: "Hablo con autoridad y convicción" },
  { text: "My message resonates with others", spanish: "Mi mensaje resuena con otros" },
  { text: "I am confident in every conversation", spanish: "Tengo confianza en cada conversación" },
  { text: "I articulate my thoughts with ease", spanish: "Articulo mis pensamientos con facilidad" },
  { text: "My voice is calm and reassuring", spanish: "Mi voz es calmada y tranquilizadora" },
  { text: "I speak up for myself and others", spanish: "Hablo por mí mismo y por otros" },
  { text: "I am a persuasive and influential speaker", spanish: "Soy un orador persuasivo e influyente" },
  { text: "My words create positive change", spanish: "Mis palabras crean cambios positivos" },
  { text: "I listen actively and respond thoughtfully", spanish: "Escucho activamente y respondo reflexivamente" },
  { text: "I communicate with empathy and understanding", spanish: "Me comunico con empatía y comprensión" },
  { text: "My storytelling captivates and engages", spanish: "Mi narración cautiva y compromete" },
  { text: "I speak from the heart with authenticity", spanish: "Hablo desde el corazón con autenticidad" },
  { text: "I am comfortable with silence and pauses", spanish: "Me siento cómodo con el silencio y las pausas" }
];

// Combine all affirmations with category labels
const allAffirmations = [
  ...loveAffirmations.map(item => ({ text: item.text, spanish: item.spanish, category: 'love' })),
  ...wealthAffirmations.map(item => ({ text: item.text, spanish: item.spanish, category: 'wealth' })),
  ...healthAffirmations.map(item => ({ text: item.text, spanish: item.spanish, category: 'health' })),
  ...learningAffirmations.map(item => ({ text: item.text, spanish: item.spanish, category: 'learning' })),
  ...speechAffirmations.map(item => ({ text: item.text, spanish: item.spanish, category: 'speech' }))
];

const topics = [
  { name: "#love", keywords: ["worthy", "love", "deserve", "radiate", "magnet", "overflows", "heart", "connects"] },
  { name: "#wealth", keywords: ["money", "wealth", "business", "financial", "prosperity", "abundance", "income", "profit"] },
  { name: "#health", keywords: ["healthy", "body", "energy", "strong", "vitality", "exercise", "heal", "immune"] },
  { name: "#learn", keywords: ["learn", "knowledge", "mind", "brain", "study", "understand", "master", "intelligent"] },
  { name: "#speech", keywords: ["speak", "voice", "communicate", "words", "express", "articulate", "confident", "clear"] },
  { name: "#abundance", keywords: ["flows", "effortlessly", "surrounds", "available", "fills"] },
  { name: "#natural", keywords: ["natural", "state", "form", "cell", "being"] }
];

function App() {
  const [currentView, setCurrentView] = useState<'main' | 'bookmarks' | 'search'>('main');
  const [currentAffirmation, setCurrentAffirmation] = useState(() => {
    const randomAffirmation = allAffirmations[Math.floor(Math.random() * allAffirmations.length)];
    return randomAffirmation;
  });
  const [affirmationHistory, setAffirmationHistory] = useState<typeof currentAffirmation[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const [currentAffirmationIndex, setCurrentAffirmationIndex] = useState(0);
  const [bookmarkedPhrases, setBookmarkedPhrases] = useState<string[]>([]);
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [clickedLetters, setClickedLetters] = useState<Set<number>>(new Set());
  const [showHearts, setShowHearts] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [dynamicFontSize, setDynamicFontSize] = useState('text-[16vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] xl:text-[8vw] 2xl:text-[7vw]');
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [pinnedPhrases, setPinnedPhrases] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryAffirmations, setCategoryAffirmations] = useState<typeof allAffirmations>([]);
  const [usedCategoryAffirmations, setUsedCategoryAffirmations] = useState<Set<string>>(new Set());
  const [showPlusPopup, setShowPlusPopup] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isContinuousMode, setIsContinuousMode] = useState(false);
  const [wasHoldActivated, setWasHoldActivated] = useState(false);
  const [recognitionInstance, setRecognitionInstance] = useState<SpeechRecognition | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load bookmarks from localStorage on component mount
  useEffect(() => {
    const savedBookmarks = secureStorage.getItem('affirmation-bookmarks');
    if (savedBookmarks) {
      setBookmarkedPhrases(savedBookmarks);
    }
    const savedPinned = secureStorage.getItem('affirmation-pinned');
    if (savedPinned) {
      setPinnedPhrases(savedPinned);
    }
  }, []);

  // Save bookmarks to localStorage whenever bookmarks change
  useEffect(() => {
    secureStorage.setItem('affirmation-bookmarks', bookmarkedPhrases);
  }, [bookmarkedPhrases]);

  // Save pinned phrases to localStorage whenever they change
  useEffect(() => {
    secureStorage.setItem('affirmation-pinned', pinnedPhrases);
  }, [pinnedPhrases]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Rate limit keyboard actions
      if (!rateLimiter.isAllowed('keyboard', 50, 60000)) {
        return;
      }
      
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        generateNewPhrase();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        goToPreviousAffirmation();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentAffirmationIndex, affirmationHistory]);

  // Fuzzy text matching function
  const isTextMatch = (spoken: string, target: string): boolean => {
    // Remove punctuation and extra spaces
    const cleanSpoken = spoken.replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
    const cleanTarget = target.replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
    
    // Exact match
    if (cleanSpoken === cleanTarget) return true;
    
    // Word-by-word matching (allows for small differences)
    const spokenWords = cleanSpoken.split(' ');
    const targetWords = cleanTarget.split(' ');
    
    if (spokenWords.length !== targetWords.length) return false;
    
    let matchCount = 0;
    for (let i = 0; i < targetWords.length; i++) {
      const spokenWord = spokenWords[i];
      const targetWord = targetWords[i];
      
      // Exact word match
      if (spokenWord === targetWord) {
        matchCount++;
      }
      // Similar word match (handles pronunciation variations)
      else if (isWordSimilar(spokenWord, targetWord)) {
        matchCount++;
      }
    }
    
    // Require at least 80% word match
    return matchCount / targetWords.length >= 0.8;
  };

  // Check if two words are similar (handles common speech recognition errors)
  const isWordSimilar = (word1: string, word2: string): boolean => {
    // Simple similarity check - you could enhance this with more sophisticated algorithms
    if (Math.abs(word1.length - word2.length) > 2) return false;
    
    let differences = 0;
    const maxLength = Math.max(word1.length, word2.length);
    
    for (let i = 0; i < maxLength; i++) {
      if (word1[i] !== word2[i]) {
        differences++;
      }
    }
    
    return differences <= 2; // Allow up to 2 character differences
  };

  const fillAllLettersGradually = () => {
    const letters = currentAffirmation.text.split('');
    const nonSpaceIndices = letters
      .map((char, index) => ({ char, index }))
      .filter(({ char }) => char !== ' ')
      .map(({ index }) => index);
    
    // Fill letters gradually with animation
    nonSpaceIndices.forEach((index, i) => {
      setTimeout(() => {
        setClickedLetters(prev => new Set([...prev, index]));
      }, i * 50); // 50ms delay between each letter
    });
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    // Stop any existing recognition first
    if (recognitionInstance) {
      recognitionInstance.stop();
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    setRecognitionInstance(recognition);
    
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript;
        }
      }
      
      // Stop flashing after processing the sentence
      setIsProcessing(false);
      
      transcript = transcript.toLowerCase().trim();
      if (!transcript) return;
      
      console.log('Speech recognized:', transcript);
      
      // Check if the transcript matches the current affirmation
      if (isTextMatch(transcript, currentAffirmation.text)) {
        console.log('Match found! Filling letters...');
        fillAllLettersGradually();
        
        // In continuous mode, get new affirmation after successful match
        if (isContinuousMode) {
          setTimeout(() => {
            generateNewPhrase();
          }, 2000); // Wait 2 seconds after animation completes
        }
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'no-speech' || event.error === 'audio-capture') {
        // Restart recognition for these recoverable errors in continuous mode
        if (isContinuousMode) {
          setTimeout(() => {
            if (isContinuousMode) {
              recognition.start();
            }
          }, 100);
        } else {
          setIsListening(false);
        }
      } else {
        setIsListening(false);
        setIsContinuousMode(false);
      }
    };

    recognition.onend = () => {
      console.log('Recognition ended, continuous mode:', isContinuousMode);
      if (isContinuousMode) {
        // Restart recognition in continuous mode
        setTimeout(() => {
          if (isContinuousMode) {
            recognition.start();
          }
        }, 100);
      } else {
        setIsListening(false);
      }
    };

    try {
      recognition.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionInstance) {
      recognitionInstance.stop();
      setRecognitionInstance(null);
    }
    setIsListening(false);
    setIsContinuousMode(false);
  };

  const handleMicrophoneMouseDown = () => {
    setWasHoldActivated(false);
    holdTimerRef.current = setTimeout(() => {
      setIsContinuousMode(true);
      setWasHoldActivated(true);
      startListening();
      console.log('Continuous listening mode enabled');
    }, 3000);
  };

  const handleMicrophoneMouseUp = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }

    if (!wasHoldActivated) {
      // Quick tap - start single-use listening
      setIsContinuousMode(false);
      startListening();
    }

    setTimeout(() => {
      setWasHoldActivated(false);
    }, 100);
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      setIsContinuousMode(false);
      startListening();
    }
  };

  const handleMicrophoneClick = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    setIsProcessing(true);

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    let hasProcessed = false;

    recognition.onresult = (event: any) => {
      if (hasProcessed) return;
      hasProcessed = true;

      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      setIsProcessing(false);
      recognition.stop();

      // Check for love-related keywords
      const loveKeywords = ['love', 'heart', 'romance', 'relationship', 'affection', 'beautiful', 'gorgeous', 'attractive'];
      const wealthKeywords = ['money', 'wealth', 'rich', 'success', 'business', 'financial', 'prosperity', 'abundance'];
      const healthKeywords = ['health', 'fitness', 'strong', 'energy', 'body', 'exercise', 'healthy', 'vitality'];
      const learningKeywords = ['learn', 'study', 'knowledge', 'smart', 'intelligent', 'education', 'brain', 'mind'];
      
      let foundMatch = false;
      
      // Check for category keywords and set appropriate affirmation
      if (loveKeywords.some(keyword => transcript.includes(keyword))) {
        const loveAffirmation = loveAffirmations[Math.floor(Math.random() * loveAffirmations.length)];
        setCurrentAffirmation({ text: loveAffirmation.text, spanish: loveAffirmation.spanish, category: 'love' });
        foundMatch = true;
      } else if (wealthKeywords.some(keyword => transcript.includes(keyword))) {
        const wealthAffirmation = wealthAffirmations[Math.floor(Math.random() * wealthAffirmations.length)];
        setCurrentAffirmation({ text: wealthAffirmation.text, spanish: wealthAffirmation.spanish, category: 'wealth' });
        foundMatch = true;
      } else if (healthKeywords.some(keyword => transcript.includes(keyword))) {
        const healthAffirmation = healthAffirmations[Math.floor(Math.random() * healthAffirmations.length)];
        setCurrentAffirmation({ text: healthAffirmation.text, spanish: healthAffirmation.spanish, category: 'health' });
        foundMatch = true;
      } else if (learningKeywords.some(keyword => transcript.includes(keyword))) {
        const learningAffirmation = learningAffirmations[Math.floor(Math.random() * learningAffirmations.length)];
        setCurrentAffirmation({ text: learningAffirmation.text, spanish: learningAffirmation.spanish, category: 'learning' });
        foundMatch = true;
      }
      
      if (foundMatch) {
        triggerBurstAnimation();
      }
    };

    recognition.onerror = () => {
      setIsProcessing(false);
    };

    recognition.onend = () => {
      setIsProcessing(false);
    };

    recognition.start();
  };

  // Search functionality
  const handleSearch = (query: string) => {
    // Rate limit search actions
    if (!rateLimiter.isAllowed('search', 30, 60000)) {
      return;
    }
    
    const sanitizedQuery = sanitizeInput(query);
    setSearchQuery(sanitizedQuery);
    if (sanitizedQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = allAffirmations.filter(affirmation =>
      affirmation.text.toLowerCase().includes(sanitizedQuery.toLowerCase())
    );
    setSearchResults(results.map(a => a.text));
  };

  const handleTopicSearch = (topic: typeof topics[0]) => {
    // Rate limit category filter actions
    if (!rateLimiter.isAllowed('categoryFilter', 20, 60000)) {
      return;
    }
    
    // Filter affirmations by topic keywords
    const categoryAffirmations = allAffirmations.filter(affirmation =>
      topic.keywords.some(keyword =>
        affirmation.text.toLowerCase().includes(keyword.toLowerCase())
      )
    );
    
    // Select a random affirmation from the category
    if (categoryAffirmations.length > 0) {
      // Set up category browsing state
      setSelectedCategory(topic.name);
      setCategoryAffirmations(categoryAffirmations);
      setUsedCategoryAffirmations(new Set());
      
      const randomAffirmation = categoryAffirmations[Math.floor(Math.random() * categoryAffirmations.length)];
      setCurrentAffirmation(randomAffirmation);
      setUsedCategoryAffirmations(new Set([randomAffirmation.text]));
    }
    
    // Return to main feed
    setCurrentView('main');
    setSearchQuery('');
    setSearchResults([]);
    // Reset history and interactions for clean state
    setAffirmationHistory([]);
    setCurrentHistoryIndex(-1);
    setClickedLetters(new Set());
    setShowHearts(false);
    setIsResetting(false);
  };

  const handleSearchResultClick = (phrase: string) => {
    // Rate limit affirmation selection
    if (!rateLimiter.isAllowed('selectAffirmation', 30, 60000)) {
      return;
    }
    
    const affirmationObj = allAffirmations.find(a => a.text === phrase);
    if (affirmationObj) {
      setCurrentAffirmation(affirmationObj);
    }
    setCurrentView('main');
    setSearchQuery('');
    setSearchResults([]);
    // Reset history and interactions for clean state
    setAffirmationHistory([]);
    setCurrentHistoryIndex(-1);
    setClickedLetters(new Set());
    setShowHearts(false);
    setIsResetting(false);
    // Reset category browsing
    setSelectedCategory(null);
    setCategoryAffirmations([]);
    setUsedCategoryAffirmations(new Set());
  };

  const returnToMainFeed = () => {
    // Generate a new random affirmation
    const newAffirmation = allAffirmations[Math.floor(Math.random() * allAffirmations.length)];
    setCurrentAffirmation(newAffirmation);
    setCurrentView('main');
    // Reset all state for fresh start
    setAffirmationHistory([]);
    setCurrentHistoryIndex(-1);
    setClickedLetters(new Set());
    setShowHearts(false);
    setIsResetting(false);
    setSearchQuery('');
    setSearchResults([]);
    // Reset category browsing
    setSelectedCategory(null);
    setCategoryAffirmations([]);
    setUsedCategoryAffirmations(new Set());
  };

  // Split affirmation into individual characters (including spaces)
  const letters = currentAffirmation.text.split('');
  const totalLetters = letters.filter(char => char !== ' ').length;

  // Calculate optimal font size based on content
  const calculateOptimalFontSize = (text: string) => {
    // Use consistent, larger font sizes for all phrases
    return 'text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] xl:text-[6vw] 2xl:text-[5vw]';
  };

  // Update font size when affirmation changes
  useEffect(() => {
    setDynamicFontSize(calculateOptimalFontSize(currentAffirmation.text));
  }, [currentAffirmation]);

  const generateNewPhrase = () => {
    // Rate limit new affirmation requests
    if (!rateLimiter.isAllowed('newAffirmation', 20, 60000)) {
      return;
    }
    
    if (isResetting) return;
    
    // Add current affirmation to history and maintain max 10 items
    setAffirmationHistory(prev => {
      const newHistory = [...prev];
      if (currentHistoryIndex === -1 || newHistory[currentHistoryIndex]?.text !== currentAffirmation.text) {
        newHistory.push(currentAffirmation);
        // Keep only last 10 items
        if (newHistory.length > 10) {
          newHistory.shift();
        }
      }
      return newHistory;
    });
    
    setCurrentHistoryIndex(prev => {
      const newIndex = prev === -1 ? 0 : Math.min(prev + 1, 9);
      return newIndex;
    });
    
    let newAffirmation;
    
    // If we're in category browsing mode
    if (selectedCategory && categoryAffirmations.length > 0) {
      // Get unused affirmations from the current category
      const unusedCategoryAffirmations = categoryAffirmations.filter(
        affirmation => !usedCategoryAffirmations.has(affirmation.text)
      );
      
      if (unusedCategoryAffirmations.length > 0) {
        // Select from unused category affirmations
        newAffirmation = unusedCategoryAffirmations[Math.floor(Math.random() * unusedCategoryAffirmations.length)];
        setUsedCategoryAffirmations(prev => new Set([...prev, newAffirmation.text]));
      } else {
        // All category affirmations used, switch to random mode
        setSelectedCategory(null);
        setCategoryAffirmations([]);
        setUsedCategoryAffirmations(new Set());
        
        // Generate random affirmation from all categories
        do {
          newAffirmation = allAffirmations[Math.floor(Math.random() * allAffirmations.length)];
        } while (newAffirmation.text === currentAffirmation.text);
      }
    } else {
      // Normal random mode
      do {
        newAffirmation = allAffirmations[Math.floor(Math.random() * allAffirmations.length)];
      } while (newAffirmation.text === currentAffirmation.text);
    }
    
    setIsResetting(true);
    setShowHearts(false);
    setClickedLetters(new Set());
    
    setTimeout(() => {
      setCurrentAffirmation(newAffirmation);
      setIsResetting(false);
    }, 300);
  };

  const goToNextPhrase = () => {
    if (isResetting) return;
    
    // If we're not at the end of history, go forward
    if (currentHistoryIndex < affirmationHistory.length - 1) {
      const nextIndex = currentHistoryIndex + 1;
      const nextAffirmation = affirmationHistory[nextIndex];
      
      setIsResetting(true);
      setShowHearts(false);
      setClickedLetters(new Set());
      
      setTimeout(() => {
        setCurrentAffirmation(nextAffirmation);
        setCurrentHistoryIndex(nextIndex);
        setIsResetting(false);
      }, 300);
    } else {
      // Generate new phrase if at the end
      generateNewPhrase();
    }
  };

  const goToPreviousPhrase = () => {
    if (isResetting || currentHistoryIndex <= 0) return;
    
    const previousIndex = currentHistoryIndex - 1;
    const previousAffirmation = affirmationHistory[previousIndex];
    
    setIsResetting(true);
    setShowHearts(false);
    setClickedLetters(new Set());
    
    setTimeout(() => {
      setCurrentAffirmation(previousAffirmation);
      setCurrentHistoryIndex(previousIndex);
      setIsResetting(false);
    }, 300);
  };

  const handleBookmark = () => {
    // Rate limit bookmark actions
    if (!rateLimiter.isAllowed('bookmark', 30, 60000)) {
      return;
    }
    
    if (bookmarkedPhrases.includes(currentAffirmation.text)) {
      // Remove from bookmarks
      setBookmarkedPhrases(prev => prev.filter(phrase => phrase !== currentAffirmation.text));
    } else {
      // Add to bookmarks (newest first)
      setBookmarkedPhrases(prev => [currentAffirmation.text, ...prev]);
    }
  };

  const handleShare = async () => {
    // Rate limit share actions
    if (!rateLimiter.isAllowed('share', 10, 60000)) {
      return;
    }
    
    const url = `${window.location.origin}?phrase=${encodeURIComponent(currentAffirmation.text)}`;
    
    try {
      await navigator.clipboard.writeText(url);
      setShowCopyAlert(true);
      setTimeout(() => setShowCopyAlert(false), 3000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setShowCopyAlert(true);
      setTimeout(() => setShowCopyAlert(false), 3000);
    }
  };

  const handleRemoveBookmark = (phraseToRemove: string) => {
    // Rate limit delete actions
    if (!rateLimiter.isAllowed('delete', 20, 60000)) {
      return;
    }
    
    setBookmarkedPhrases(prev => prev.filter(phrase => phrase !== phraseToRemove));
    setPinnedPhrases(prev => prev.filter(phrase => phrase !== phraseToRemove));
    setDeleteConfirmation(null);
  };

  const handlePinPhrase = (phrase: string, e: React.MouseEvent) => {
    // Rate limit pin actions
    if (!rateLimiter.isAllowed('pin', 20, 60000)) {
      return;
    }
    
    e.stopPropagation(); // Prevent triggering the bookmark click
    
    if (pinnedPhrases.includes(phrase)) {
      // Unpin the phrase
      setPinnedPhrases(prev => prev.filter(p => p !== phrase));
    } else {
      // Pin the phrase to the top
      setPinnedPhrases(prev => [phrase, ...prev]);
    }
  };

  // Organize bookmarks: pinned first, then unpinned
  const organizedBookmarks = [
    ...pinnedPhrases.filter(phrase => bookmarkedPhrases.includes(phrase)),
    ...bookmarkedPhrases.filter(phrase => !pinnedPhrases.includes(phrase))
  ];

  const handleBookmarkClick = (phrase: string) => {
    // Rate limit affirmation selection
    if (!rateLimiter.isAllowed('selectAffirmation', 30, 60000)) {
      return;
    }
    
    // Navigate back to main view with the selected phrase
    const affirmationObj = allAffirmations.find(a => a.text === phrase);
    if (affirmationObj) {
      setCurrentAffirmation(affirmationObj);
    }
    setCurrentView('main');
    // Reset history and interactions for clean state
    setAffirmationHistory([]);
    setCurrentHistoryIndex(-1);
    setClickedLetters(new Set());
    setShowHearts(false);
    setIsResetting(false);
    // Reset category browsing
    setSelectedCategory(null);
    setCategoryAffirmations([]);
    setUsedCategoryAffirmations(new Set());
  };

  const handleDeleteClick = (phrase: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the bookmark click
    setDeleteConfirmation(phrase);
  };

  // Handle URL parameters for shared phrases
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedPhrase = urlParams.get('phrase');
    if (sharedPhrase) {
      const sanitizedAffirmation = sanitizeInput(decodeURIComponent(sharedPhrase));
      const affirmationObj = allAffirmations.find(a => a.text === sanitizedAffirmation);
      if (affirmationObj) {
        setCurrentAffirmation(affirmationObj);
      }
      // Clear the URL parameter
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (currentView !== 'main') return;
      
      e.preventDefault();
      
      if (e.deltaY > 0) {
        // Scrolling down - go to next phrase
        goToNextPhrase();
      } else {
        // Scrolling up - go to previous phrase
        goToPreviousPhrase();
      }
    };

    if (currentView === 'main') {
      window.addEventListener('wheel', handleWheel, { passive: false });
      return () => window.removeEventListener('wheel', handleWheel);
    }
  }, [currentView, currentHistoryIndex, affirmationHistory, currentAffirmation, isResetting]);

  const handleLetterClick = (index: number) => {
    if (letters[index] === ' ' || clickedLetters.has(index) || isResetting) return;
    
    setClickedLetters(prev => new Set([...prev, index]));
  };

  // Touch handlers for swipe detection
  const handleTouchStartSwipe = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const handleTouchMoveSwipe = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const handleTouchEndSwipe = () => {
    if (!touchStart || !touchEnd) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isVerticalSwipe = Math.abs(distanceY) > Math.abs(distanceX);
    const minSwipeDistance = 50;
    
    if (isVerticalSwipe && Math.abs(distanceY) > minSwipeDistance) {
      if (distanceY > 0) {
        // Swipe up - next phrase
        generateNewPhrase();
      } else {
        // Swipe down - previous phrase
        goToPreviousPhrase();
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsTouching(true);
    setIsDragging(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsTouching(false);
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouching) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (element && element.hasAttribute('data-letter-index')) {
      const index = parseInt(element.getAttribute('data-letter-index')!);
      if (letters[index] !== ' ' && !clickedLetters.has(index) && !isResetting) {
        setClickedLetters(prev => new Set([...prev, index]));
      }
    }
  };

  const handleMouseEnter = (index: number) => {
    if ((isDragging || isTouching) && letters[index] !== ' ' && !clickedLetters.has(index) && !isResetting) {
      setClickedLetters(prev => new Set([...prev, index]));
    }
  };

  useEffect(() => {
    if (clickedLetters.size === totalLetters && !showHearts) {
      // Small delay before hearts appear
      setTimeout(() => {
        setShowHearts(true);
      }, 500);
    }
  }, [clickedLetters.size, totalLetters, showHearts]);

  // Get the appropriate color class based on category
  const getLetterColorClass = (category: string) => {
    switch (category) {
      case 'wealth':
        return 'letter-fill-wealth letter-glow-wealth';
      case 'health':
        return 'letter-fill-health letter-glow-health';
      case 'learning':
        return 'letter-fill-learning letter-glow-learning';
      default:
        return 'letter-fill letter-glow'; // Default pink for love
    }
  };

  useEffect(() => {
    if (showHearts) {
      // Hearts animation lasts 3 seconds, then reset
      const timer = setTimeout(() => {
        setIsResetting(true);
        setShowHearts(false);
        setClickedLetters(new Set());
        setIsProcessing(false); // Stop microphone flashing when animation starts
        
        // Brief delay before allowing interactions again
        setTimeout(() => {
          setIsResetting(false);
        }, 300);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showHearts]);

  // Generate burst effects based on category
  const generateBurstEffect = () => {
    const category = currentAffirmation.category;
    const hearts = [];
    
    for (let i = 0; i < 50; i++) {
      const angle = (i * 7.2) + (Math.random() * 7.2); // More evenly distributed angles
      const delay = Math.random() * 1000;
      const duration = 1500 + Math.random() * 1500;
      const size = 240 + Math.random() * 360;
      
      // Calculate end position to reach edges/corners of screen
      const distance = 800 + Math.random() * 600; // Ensure hearts travel far enough off screen
      const endX = Math.cos(angle * Math.PI / 180) * distance;
      const endY = Math.sin(angle * Math.PI / 180) * distance;
      
      let IconComponent;
      let colorClass;
      
      switch (category) {
        case 'wealth':
          IconComponent = DollarBillIcon;
          colorClass = 'text-green-500';
          break;
        case 'health':
          IconComponent = HealthIcon;
          colorClass = 'text-blue-500';
          break;
        case 'learning':
          IconComponent = Star;
          colorClass = 'text-yellow-500';
          break;
        default:
          IconComponent = Heart;
          colorClass = 'text-pink-500';
      }
      
      hearts.push(
        <IconComponent
          key={i}
          className={`absolute ${colorClass} pointer-events-none`}
          style={{
            left: '50%',
            top: '50%',
            width: `${size}px`,
            height: `${size}px`,
            animation: `heartBurst ${duration}ms ease-out ${delay}ms both`,
            '--end-x': `${endX}px`,
            '--end-y': `${endY}px`,
            zIndex: 1000,
          } as React.CSSProperties}
          fill="currentColor"
        />
      );
    }
    return hearts;
  };

  if (currentView === 'search') {
    return (
      <div className="min-h-screen bg-white p-4">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => setCurrentView('main')}
            className="hover:scale-110 transition-all duration-200"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800 ml-1">Search</h1>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for affirmations..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Topics */}
        {searchQuery === '' && (
        <>
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-800">Languages</h3>
          </div>
          <div className="mb-4 flex items-center">
            <span className="text-gray-700 font-medium">Language</span>
            <span className="ml-5 px-3 py-1 border border-black text-black text-sm font-medium">
              English (Only)
            </span>
            <span className="ml-5 px-3 py-1 border border-black text-black text-sm font-medium">
              English/Spanish
            </span>
            <span className="ml-5 px-3 py-1 border border-black text-black text-sm font-medium">
              English/French
            </span>
          </div>

          <div className="mb-6">
  <h2 className="text-lg font-semibold text-gray-800 mb-3">Browse by Topic</h2>
  <div>
    {topics.map((topic, index) => (
      <button
        key={index}
        onClick={() => handleTopicSearch(topic)}
        className="p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-left"
      >
        {topic.name}
      </button>
    ))}
  </div>
</div>
          </>
        )}

        {/* Search Results */}
        <div className="space-y-1">
          {searchResults.length === 0 && searchQuery !== '' ? (
            <p className="text-gray-500 text-center mt-12">No affirmations found for "{searchQuery}"</p>
          ) : (
            searchResults.map((phrase, index) => (
              <div
                key={index}
                onClick={() => handleSearchResultClick(phrase)}
                className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <p className="text-gray-800">{phrase}</p>
                <p className="text-gray-600 text-sm mt-1">{allAffirmations.find(a => a.text === phrase)?.spanish}</p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  if (currentView === 'bookmarks') {
    return (
      <div className="min-h-screen bg-white p-4">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => setCurrentView('main')}
            className="hover:scale-110 transition-all duration-200"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800 ml-1">Bookmarks</h1>
        </div>

        {/* Bookmarks List */}
        <div className="space-y-1">
          {bookmarkedPhrases.length === 0 ? (
            <p className="text-gray-500 text-center mt-12">No bookmarks yet. Bookmark your favorite affirmations!</p>
          ) : (
            organizedBookmarks.map((phrase, index) => {
              const isPinned = pinnedPhrases.includes(phrase);
              const affirmationObj = allAffirmations.find(a => a.text === phrase);
              return (
                <div 
                  key={index} 
                  className={`${isPinned ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'} p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors`}
                  onClick={() => handleBookmarkClick(phrase)}
                >
                  <div className="flex items-center gap-3 flex-1">
                    {/* Pin Icon */}
                    <button
                      onClick={(e) => handlePinPhrase(phrase, e)}
                      className="p-1 hover:scale-110 transition-all duration-200 flex-shrink-0"
                      title={isPinned ? "Unpin" : "Pin to top"}
                    >
                      <img 
                        src="/thumbtack (3).png" 
                        alt="Pin" 
                        className="w-4 h-4"
                        style={{
                          filter: isPinned 
                            ? 'brightness(0) saturate(100%) invert(58%) sepia(96%) saturate(1458%) hue-rotate(201deg) brightness(97%) contrast(96%)'
                            : 'grayscale(100%) brightness(0.7) opacity(0.6)'
                        }}
                      />
                    </button>
                    
                    <div className="flex-1">
                      <p className="text-gray-800">{phrase}</p>
                      <p className="text-gray-600 text-sm mt-1">{affirmationObj?.spanish}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Delete Icon */}
                    <button
                      onClick={(e) => handleDeleteClick(phrase, e)}
                      className="p-2 text-blue-500 hover:scale-110 transition-all duration-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Delete Bookmark</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this bookmark?</p>
              <p className="text-gray-800 font-medium mb-6 p-3 bg-gray-50 rounded italic">"{deleteConfirmation}"</p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteConfirmation(null)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  No
                </button>
                <button
                  onClick={() => handleRemoveBookmark(deleteConfirmation)}
                  className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden"
      onTouchStart={handleTouchStartSwipe}
      onTouchMove={handleTouchMoveSwipe}
      onTouchEnd={handleTouchEndSwipe}
    >
      {/* Top Navigation */}
      <div className="absolute top-4 left-0 right-0 z-50 px-4">
        <div className="flex justify-between items-center">
          {/* Goaly Button */}
          <button
            onClick={returnToMainFeed}
            className="px-3 py-2 hover:scale-110 transition-all duration-200 flex items-center justify-center"
          >
            <span className="text-xl font-black text-gray-700" style={{ fontFamily: '"Fredoka One", sans-serif' }}>
              Goaly
            </span>
          </button>

          {/* Bookmarks Button */}
          <button
            onClick={() => setCurrentView('bookmarks')}
            className="p-3 hover:scale-110 transition-all duration-200"
          >
            <img 
              src="/save (1).png" 
              alt="Bookmarks" 
              className="w-6 h-6"
            />
          </button>

          {/* Plus Icon */}
          <button
            onClick={() => setShowPlusPopup(true)}
            className="p-3 hover:scale-110 transition-all duration-200"
          >
            <img 
              src="/plus.png" 
              alt="Plus" 
              className="w-8 h-8"
            />
          </button>

          {/* Search Icon */}
          <button
            onClick={() => setCurrentView('search')}
            className="p-3 hover:scale-110 transition-all duration-200"
          >
            <Search className="w-6 h-6 text-gray-700" />
          </button>

          {/* 3-Line Menu Icon */}
          <button
            className="p-3 hover:scale-110 transition-all duration-200"
          >
            <div className="flex flex-col gap-1">
              <div className="w-6 h-0.5 bg-gray-700"></div>
              <div className="w-6 h-0.5 bg-gray-700"></div>
              <div className="w-6 h-0.5 bg-gray-700"></div>
            </div>
          </button>
        </div>
      </div>

      {/* Bookmark and Share Icons - Right Side Edge */}
      <div className="absolute right-4 top-1/2 transform translate-y-20 z-50 flex flex-col gap-3">
        {/* Microphone Icon */}
        <button
          onClick={toggleListening}
          onMouseDown={handleMicrophoneMouseDown}
          onMouseUp={handleMicrophoneMouseUp}
          onTouchStart={handleMicrophoneMouseDown}
          onTouchEnd={handleMicrophoneMouseUp}
          className={`p-3 rounded-full hover:scale-110 transition-all duration-200 ${
            isContinuousMode
              ? 'bg-green-500 animate-pulse'
              : isListening 
                ? 'bg-red-500 animate-pulse' 
                : 'bg-white/20 backdrop-blur-sm hover:bg-white/30'
          }`}
        >
          <svg 
            className={`w-6 h-6 ${isListening ? 'text-white animate-pulse' : 'text-gray-700'}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" 
            />
          </svg>
        </button>
        
        {/* Bookmark icon */}
        <button
          onClick={handleBookmark}
          className="p-3 bg-white bg-opacity-20 rounded-full hover:scale-110 transition-all duration-200"
        >
          {bookmarkedPhrases.includes(currentAffirmation.text) ? (
            <BookmarkCheck className="w-6 h-6 text-blue-500" />
          ) : (
            <Bookmark className="w-6 h-6 text-gray-600" />
          )}
        </button>

        {/* Share icon */}
        <button
          onClick={handleShare}
          className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
        >
          <Link className="w-6 h-6 text-gray-600" />
        </button>
      </div>
        
      {/* Copy Alert */}
      {showCopyAlert && (
        <div className="absolute top-20 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
          Link copied to clipboard!
        </div>
      )}

      {/* Plus Icon Popup Modal */}
      {showPlusPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            {/* Close X button */}
            <button
              onClick={() => setShowPlusPopup(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Content */}
            <div className="pr-8">
              <p className="text-gray-800 leading-relaxed">
                Thank you for your interest in submitting a goal or affirmation to share on the app! 
                Since we're still getting set up, please submit it via the help desk{' '}
                <a 
                  href="https://bit.ly/glysupport" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  here
                </a>
                . Thanks!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Text */}
      <div 
        className="text-center select-none flex-1 flex items-center w-full px-2 sm:px-4 md:px-6 lg:px-8 -mt-8 sm:mt-0"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        <div className="flex flex-col justify-center items-center gap-x-1 sm:gap-x-2 md:gap-x-3 lg:gap-x-4 xl:gap-x-6 leading-none w-full">
          <div className="flex flex-wrap justify-center items-center gap-x-1 sm:gap-x-2 md:gap-x-3 lg:gap-x-4 xl:gap-x-6 leading-none w-full">
            {currentAffirmation.text.split(' ').map((word, wordIndex) => (
              <div key={wordIndex} className="flex mr-[2vw] sm:mr-[1.5vw] md:mr-[1.2vw] lg:mr-[1vw] xl:mr-[0.8vw] last:mr-0">
                {word.split('').map((letter, letterIndex) => {
                  const globalIndex = currentAffirmation.text.split('').findIndex((char, i) => {
                    const wordsSoFar = currentAffirmation.text.split(' ').slice(0, wordIndex).join(' ');
                    const lettersSoFar = wordsSoFar.length + (wordsSoFar ? 1 : 0) + letterIndex;
                    return i === lettersSoFar;
                  });
                  
                  return (
                    <span
                      key={letterIndex}
                      data-letter-index={globalIndex}
                      className={`
                        inline-block cursor-pointer
                        ${dynamicFontSize}
                        font-black
                        transition-all duration-500
                        ${clickedLetters.has(globalIndex) 
                          ? `${getLetterColorClass(currentAffirmation.category)} transition-none`
                          : ''
                        }
                      `}
                      style={{
                        fontFamily: '"Fredoka One", "Fredoka", sans-serif',
                        fontWeight: '900',
                        color: clickedLetters.has(globalIndex) ? 'transparent' : '#ffffff',
                        textShadow: !clickedLetters.has(globalIndex) 
                          ? window.innerWidth <= 768 
                            ? '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 2px 2px 4px rgba(0,0,0,0.3)'
                            : '0.15vw 0.15vw 0.3vw rgba(0,0,0,0.4)'
                          : 'none',
                        WebkitTextStroke: window.innerWidth <= 768 ? 'none' : '0.2vw #000000',
                        textStroke: window.innerWidth <= 768 ? 'none' : '0.2vw #000000',
                      }}
                      onClick={() => handleLetterClick(globalIndex)}
                      onTouchStart={() => handleLetterClick(globalIndex)}
                      onMouseEnter={() => handleMouseEnter(globalIndex)}
                    >
                      {letter}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
          <p className="text-xl md:text-2xl font-['Fredoka'] text-black mt-4">
            {currentAffirmation.spanish}
          </p>
        </div>
      </div>

      {/* Navigation Arrows */}

      {/* Hearts burst animation */}
      {showHearts && (
        <div className="absolute inset-0 pointer-events-none">
          {generateBurstEffect()}
        </div>
      )}
      
      {/* Instructions */}
      <div className="absolute bottom-20 sm:bottom-4 md:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 text-xs sm:text-sm md:text-base text-center flex items-center gap-2 px-4 pb-2">
        <Sparkles className="w-4 h-4 text-yellow-500" />
        <p className="whitespace-nowrap">Trace Goal or Scroll Up!</p>
        <Sparkles className="w-4 h-4 text-yellow-500" />
      </div>
    </div>
  );
}

export default App;