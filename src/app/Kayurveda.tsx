import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  Calendar,
  MessageCircle,
  TrendingUp,
  User,
  Sun,
  Moon,
  Check,
  Clock,
  Send,
  Droplet,
  ChevronRight,
  Camera,
  Download,
  Share2,
  Heart,
  BookOpen,
  Utensils,
  Bell,
  Settings,
  LogOut,
  Smile,
  Sparkles,
  Activity,
  Leaf,
} from "lucide-react";
import KayaSigil from "./components/KayaSigil";
import { Button } from "./components/ui/button";
import { Progress } from "./components/ui/progress";
import { Input } from "./components/ui/input";
import { InstallPrompt } from "./components/InstallPrompt";

// ============================================
// KAYA LOGO COMPONENT
// ============================================
interface KayaLogoProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

function KayaLogo({ size = "md", animated = true }: KayaLogoProps) {
  const sizes = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
  };

  const glowAnimation = {
    initial: { opacity: 0.6 },
    animate: {
      opacity: [0.6, 1, 0.6],
      textShadow: [
        "0 0 10px rgba(255,255,255,0.5)",
        "0 0 20px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.6)",
        "0 0 10px rgba(255,255,255,0.5)",
      ],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  if (animated) {
    return (
      <motion.div
        className={`font-bold ${sizes[size]} tracking-wider`}
        initial="initial"
        animate="animate"
        variants={glowAnimation}
      >
        KAYA
      </motion.div>
    );
  }

  return <div className={`font-bold ${sizes[size]} tracking-wider`}>KAYA</div>;
}

// ============================================
// DATA & CONSTANTS
// ============================================
const doshaQuestions = [
  {
    id: 1,
    question: "How would you describe your skin?",
    options: [
      { text: "Dry, rough, or thin", dosha: "vata" },
      { text: "Warm, oily, or prone to redness", dosha: "pitta" },
      { text: "Thick, cool, or oily", dosha: "kapha" },
    ],
  },
  {
    id: 2,
    question: "How's your digestion typically?",
    options: [
      { text: "Irregular, sometimes bloated or gassy", dosha: "vata" },
      { text: "Strong, I get hungry quickly", dosha: "pitta" },
      { text: "Slow and steady", dosha: "kapha" },
    ],
  },
  {
    id: 3,
    question: "What's your sleep pattern like?",
    options: [
      { text: "Light sleeper, easily disturbed", dosha: "vata" },
      { text: "Moderate, but I wake up feeling warm", dosha: "pitta" },
      { text: "Deep and heavy sleeper", dosha: "kapha" },
    ],
  },
  {
    id: 4,
    question: "How do you handle stress?",
    options: [
      { text: "I get anxious and worried", dosha: "vata" },
      { text: "I get irritable or angry", dosha: "pitta" },
      { text: "I withdraw and feel heavy", dosha: "kapha" },
    ],
  },
  {
    id: 5,
    question: "What's your hair texture?",
    options: [
      { text: "Dry, thin, or frizzy", dosha: "vata" },
      { text: "Fine, straight, prone to early graying", dosha: "pitta" },
      { text: "Thick, lustrous, oily", dosha: "kapha" },
    ],
  },
  {
    id: 6,
    question: "How are your energy levels throughout the day?",
    options: [
      { text: "Variable - bursts of energy then crashes", dosha: "vata" },
      { text: "Steady and strong", dosha: "pitta" },
      { text: "Slow to start, steady throughout", dosha: "kapha" },
    ],
  },
  {
    id: 7,
    question: "How sensitive are you to climate?",
    options: [
      { text: "I dislike cold and wind", dosha: "vata" },
      { text: "I dislike heat and humidity", dosha: "pitta" },
      { text: "I dislike cold and damp weather", dosha: "kapha" },
    ],
  },
  {
    id: 8,
    question: "When you look at your tongue, what do you notice?",
    options: [
      { text: "Dry, thin coating", dosha: "vata" },
      { text: "Red or yellowish coating", dosha: "pitta" },
      { text: "Thick, white coating", dosha: "kapha" },
    ],
  },
];

const doshaInfo = {
  vata: {
    name: "Vata",
    element: "Air + Space",
    emoji: "🌪️",
    description:
      "You're creative, energetic, and quick-thinking. Your body tends toward dryness and needs grounding and warmth.",
    characteristics: [
      "Creative and enthusiastic",
      "Quick to learn and adapt",
      "Prone to dry skin and hair",
      "Benefits from warm, nourishing routines",
    ],
    color: "from-blue-500 to-purple-500",
  },
  pitta: {
    name: "Pitta",
    element: "Fire + Water",
    emoji: "🔥",
    description:
      "You're focused, passionate, and have strong digestion. Your body tends toward heat and needs cooling and calming.",
    characteristics: [
      "Sharp intellect and focus",
      "Strong metabolism",
      "Prone to inflammation and heat",
      "Benefits from cooling, soothing routines",
    ],
    color: "from-red-500 to-orange-500",
  },
  kapha: {
    name: "Kapha",
    element: "Earth + Water",
    emoji: "🌍",
    description:
      "You're calm, steady, and nurturing. Your body tends toward heaviness and needs stimulation and lightness.",
    characteristics: [
      "Calm and grounded nature",
      "Strong endurance",
      "Prone to excess moisture",
      "Benefits from energizing, invigorating routines",
    ],
    color: "from-green-500 to-teal-500",
  },
};

const bodyZones = [
  {
    id: "face",
    name: "Face",
    icon: Smile,
    concerns: [
      "Acne & Breakouts",
      "Dark Spots",
      "Dullness",
      "Fine Lines",
      "Dryness",
      "Oiliness",
    ],
  },
  {
    id: "hair",
    name: "Hair",
    icon: Sparkles,
    concerns: [
      "Hair Fall",
      "Dandruff",
      "Dry Hair",
      "Oily Scalp",
      "Split Ends",
      "Lack of Volume",
    ],
  },
  {
    id: "oral",
    name: "Oral",
    icon: Activity,
    concerns: ["Yellow Teeth", "Bad Breath", "Gum Issues", "Sensitivity", "Plaque"],
  },
  {
    id: "body",
    name: "Body",
    icon: Leaf,
    concerns: [
      "Dry Skin",
      "Uneven Tone",
      "Body Acne",
      "Stretch Marks",
      "Rough Patches",
    ],
  },
];

const routineData = {
  morning: [
    {
      zone: "Oral Care",
      emoji: "😁",
      steps: [
        {
          name: "Oil Pulling",
          duration: "10 min",
          ingredients: "Coconut oil",
          done: true,
        },
        {
          name: "Turmeric Tooth Powder",
          duration: "2 min",
          ingredients: "Turmeric, salt",
          done: true,
        },
      ],
    },
    {
      zone: "Face Care",
      emoji: "✨",
      steps: [
        {
          name: "Rose Water Cleanse",
          duration: "5 min",
          ingredients: "Rose water",
          done: true,
        },
        {
          name: "Turmeric Face Mask",
          duration: "15 min",
          ingredients: "Turmeric, yogurt, honey",
          done: false,
        },
      ],
    },
    {
      zone: "Hair Care",
      emoji: "💆",
      steps: [
        {
          name: "Scalp Massage",
          duration: "5 min",
          ingredients: "Coconut oil",
          done: false,
        },
      ],
    },
  ],
  night: [
    {
      zone: "Face Care",
      emoji: "✨",
      steps: [
        {
          name: "Double Cleanse",
          duration: "5 min",
          ingredients: "Chickpea flour, milk",
          done: false,
        },
        {
          name: "Aloe Vera Moisturizer",
          duration: "2 min",
          ingredients: "Fresh aloe",
          done: false,
        },
      ],
    },
    {
      zone: "Body Care",
      emoji: "🌿",
      steps: [
        {
          name: "Dry Brushing",
          duration: "5 min",
          ingredients: "Body brush",
          done: false,
        },
        {
          name: "Neem Oil Application",
          duration: "3 min",
          ingredients: "Neem oil",
          done: false,
        },
      ],
    },
  ],
};

const kayaResponses: Record<string, string> = {
  default:
    "Great question! Based on your Dosha profile, I recommend focusing on balancing your specific constitution. Let me help you with that.",
  acne: "Acne is often linked to excess Pitta (heat) in the body. Try a cooling face mask with neem and sandalwood. Also, avoid spicy foods and stay hydrated with coconut water. 🌿",
  hair: "For healthy hair growth, massage your scalp with warm coconut oil mixed with a few drops of rosemary oil 2-3 times a week. Also ensure you're getting enough protein and iron in your diet. 💆",
  "dark circles":
    "Dark circles can be caused by Vata imbalance, lack of sleep, or dehydration. Try placing cool cucumber slices or rose water-soaked cotton pads on your eyes for 10 minutes daily. Get 7-8 hours of sleep. ✨",
  "oily skin":
    "For oily skin (Kapha imbalance), cleanse with chickpea flour mixed with turmeric. Use rose water as a toner. Avoid heavy creams - opt for aloe vera gel instead. 🌸",
};

const suggestedQuestions = [
  "How do I reduce acne naturally?",
  "Best ingredients for hair growth?",
  "What causes dark circles?",
  "Morning routine for oily skin?",
];

const weeklyData = [
  { day: "Mon", completed: 5 },
  { day: "Tue", completed: 6 },
  { day: "Wed", completed: 4 },
  { day: "Thu", completed: 7 },
  { day: "Fri", completed: 6 },
  { day: "Sat", completed: 5 },
  { day: "Sun", completed: 8 },
];

const progressCards = [
  {
    title: "7-Day Streak 🔥",
    subtitle: "Your longest yet!",
    gradient: "from-orange-500/20 to-red-500/20",
    borderGlow: "border-orange-500/30",
  },
  {
    title: "89% Completion",
    subtitle: "This week",
    gradient: "from-green-500/20 to-teal-500/20",
    borderGlow: "border-green-500/30",
  },
  {
    title: "12 Remedies Tried",
    subtitle: "Keep exploring",
    gradient: "from-purple-500/20 to-pink-500/20",
    borderGlow: "border-purple-500/30",
  },
];

const beforeAfterImages = [
  {
    id: 1,
    date: "Week 1",
    concern: "Acne & Redness",
    improvement: "+45%",
  },
  {
    id: 2,
    date: "Week 2",
    concern: "Skin Texture",
    improvement: "+32%",
  },
];

// ============================================
// MAIN KAYURVEDA COMPONENT
// ============================================
export default function Kayurveda() {
  // Screen state management
  const [currentScreen, setCurrentScreen] = useState<
    | "welcome"
    | "dosha-quiz"
    | "dosha-reveal"
    | "concerns"
    | "unlock"
    | "dashboard"
  >("welcome");
  const [dashboardTab, setDashboardTab] = useState<
    "home" | "routine" | "kaya" | "progress" | "profile"
  >("home");

  // Dosha Quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [doshaAnswers, setDoshaAnswers] = useState<string[]>([]);
  const [userDosha, setUserDosha] = useState<"vata" | "pitta" | "kapha">("vata");
  const [doshaScores, setDoshaScores] = useState<Record<string, number>>({});

  // Concerns state
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);

  // Unlock animation state
  const [unlockStage, setUnlockStage] = useState(0);

  // Routine state
  const [activeRoutine, setActiveRoutine] = useState<"morning" | "night">("morning");
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  // Chat state
  interface Message {
    id: number;
    text: string;
    sender: "user" | "kaya";
    timestamp: Date;
  }
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm KAYA, your Ayurvedic wellness guide. I've analyzed your profile and I'm here to help you with any questions about your personalized routine. What would you like to know? 🌿",
      sender: "kaya",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load saved state from localStorage
  useEffect(() => {
    const savedDosha = localStorage.getItem("userDosha");
    const savedScores = localStorage.getItem("doshaScores");
    const savedConcerns = localStorage.getItem("userConcerns");
    const savedScreen = localStorage.getItem("currentScreen");

    if (savedDosha) setUserDosha(savedDosha as "vata" | "pitta" | "kapha");
    if (savedScores) setDoshaScores(JSON.parse(savedScores));
    if (savedConcerns) setSelectedConcerns(JSON.parse(savedConcerns));
    if (savedScreen && savedScreen === "dashboard") setCurrentScreen("dashboard");
  }, []);

  // Unlock animation effect
  useEffect(() => {
    if (currentScreen === "unlock") {
      const stages = [
        "Analyzing your dosha profile...",
        "Mapping your concerns to root causes...",
        "Generating personalized remedies...",
        "Building your custom routine...",
        "Your wellness journey is ready! ✨",
      ];

      const timers: NodeJS.Timeout[] = [];

      stages.forEach((_, index) => {
        const timer = setTimeout(() => {
          setUnlockStage(index);
        }, index * 1500);
        timers.push(timer);
      });

      const finalTimer = setTimeout(() => {
        setCurrentScreen("dashboard");
        localStorage.setItem("currentScreen", "dashboard");
      }, stages.length * 1500 + 500);
      timers.push(finalTimer);

      return () => timers.forEach((timer) => clearTimeout(timer));
    }
  }, [currentScreen]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (dashboardTab === "kaya") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, dashboardTab]);

  // ============================================
  // HELPER FUNCTIONS
  // ============================================
  const handleDoshaAnswer = (dosha: string) => {
    const newAnswers = [...doshaAnswers, dosha];
    setDoshaAnswers(newAnswers);

    if (currentQuestion < doshaQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const doshaCount = newAnswers.reduce((acc, d) => {
        acc[d] = (acc[d] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const dominantDosha = Object.keys(doshaCount).reduce((a, b) =>
        doshaCount[a] > doshaCount[b] ? a : b
      ) as "vata" | "pitta" | "kapha";

      setUserDosha(dominantDosha);
      setDoshaScores(doshaCount);
      localStorage.setItem("userDosha", dominantDosha);
      localStorage.setItem("doshaScores", JSON.stringify(doshaCount));
      setCurrentScreen("dosha-reveal");
    }
  };

  const handleQuizBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setDoshaAnswers(doshaAnswers.slice(0, -1));
    }
  };

  const toggleConcern = (concern: string) => {
    setSelectedConcerns((prev) =>
      prev.includes(concern)
        ? prev.filter((c) => c !== concern)
        : [...prev, concern]
    );
  };

  const handleConcernsContinue = () => {
    localStorage.setItem("userConcerns", JSON.stringify(selectedConcerns));
    setCurrentScreen("unlock");
  };

  const toggleRoutineStep = (stepName: string) => {
    setCompletedSteps((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(stepName)) {
        newSet.delete(stepName);
      } else {
        newSet.add(stepName);
      }
      return newSet;
    });
  };

  const getKayaResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes("acne") || lowerMessage.includes("pimple"))
      return kayaResponses.acne;
    if (lowerMessage.includes("hair")) return kayaResponses.hair;
    if (lowerMessage.includes("dark circle") || lowerMessage.includes("eyes"))
      return kayaResponses["dark circles"];
    if (lowerMessage.includes("oily") || lowerMessage.includes("skin"))
      return kayaResponses["oily skin"];
    return kayaResponses.default;
  };

  const handleSendMessage = (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    if (!textToSend) return;

    const userMessage: Message = {
      id: Date.now(),
      text: textToSend,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const kayaMessage: Message = {
        id: Date.now() + 1,
        text: getKayaResponse(textToSend),
        sender: "kaya",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, kayaMessage]);
    }, 1500);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const todayRituals = [
    {
      id: 1,
      name: "Morning Face Cleanse",
      time: "7:00 AM",
      done: true,
      icon: null,
      useSigil: true,
    },
    {
      id: 2,
      name: "Turmeric Face Mask",
      time: "8:00 AM",
      done: true,
      icon: null,
      useSigil: true,
    },
    {
      id: 3,
      name: "Coconut Oil Hair Treatment",
      time: "2:00 PM",
      done: false,
      icon: Droplet,
    },
    {
      id: 4,
      name: "Night Skincare Routine",
      time: "10:00 PM",
      done: false,
      icon: Moon,
    },
  ];

  const stats = [
    { label: "Streak", value: "7 days", emoji: "🔥" },
    { label: "Completed", value: "24/32", emoji: "✅" },
    { label: "Next Up", value: "2:00 PM", emoji: "⏰" },
  ];

  const kayaNudges = [
    "Your Pitta balance is improving! Keep using cooling ingredients.",
    "Try oil pulling tomorrow morning for better oral health.",
    "Remember: consistency over perfection. You're doing great! 🌿",
  ];
  const currentNudge = kayaNudges[Math.floor(Math.random() * kayaNudges.length)];

  const doshaEmojis = {
    vata: "🌪️",
    pitta: "🔥",
    kapha: "🌍",
  };

  const menuSections = [
    {
      title: "My Wellness",
      items: [
        {
          icon: Heart,
          label: "Ingredient Pantry",
          description: "12 ingredients added",
        },
        {
          icon: BookOpen,
          label: "Ayurvedic Encyclopedia",
          description: "Learn about ingredients",
        },
        {
          icon: Utensils,
          label: "Food Lens",
          description: "Scan & analyze foods",
        },
        {
          icon: Moon,
          label: "Lunar Routine Sync",
          description: "Align with moon phases",
        },
      ],
    },
    {
      title: "Settings",
      items: [
        { icon: Bell, label: "Notifications", description: "Daily reminders on" },
        {
          icon: Settings,
          label: "Preferences",
          description: "Customize your experience",
        },
        { icon: User, label: "Account", description: "Manage your profile" },
      ],
    },
  ];

  // ============================================
  // SCREEN RENDERERS
  // ============================================

  // Welcome Screen
  const renderWelcome = () => (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-between p-8 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 400),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
              opacity: Math.random() * 0.5,
            }}
            animate={{
              y: [
                null,
                Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
              ],
              opacity: [null, 0, Math.random() * 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <KayaLogo size="lg" animated />
        </motion.div>

        <motion.div
          className="text-center space-y-6 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-4xl font-light tracking-wide">
            Your AI-Powered
            <br />
            <span className="glow-text">Ayurvedic Guide</span>
          </h1>
          <p className="text-base md:text-lg text-gray-400 font-light">
            Personalized wellness routines rooted in ancient wisdom,
            <br />
            powered by modern AI
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 gap-8 mt-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="text-center">
            <div className="text-2xl mb-2">🌿</div>
            <p className="text-xs text-gray-500">Natural</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">✨</div>
            <p className="text-xs text-gray-500">Personalized</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🎯</div>
            <p className="text-xs text-gray-500">Effective</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="w-full max-w-md z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <Button
          className="w-full h-14 bg-white text-black hover:bg-gray-200 rounded-full text-base font-medium"
          onClick={() => setCurrentScreen("dosha-quiz")}
        >
          Begin Your Journey
        </Button>
        <p className="text-xs text-gray-600 text-center mt-4">
          Takes less than 2 minutes
        </p>
      </motion.div>

      <style>{`
        .glow-text {
          text-shadow: 0 0 20px rgba(255,255,255,0.5);
        }
      `}</style>
    </div>
  );

  // Dosha Quiz Screen
  const renderDoshaQuiz = () => {
    const progress = ((currentQuestion + 1) / doshaQuestions.length) * 100;
    const question = doshaQuestions[currentQuestion];

    return (
      <div className="quiz-screen">
        <div className="quiz-header">
          <div className="flex items-center justify-between mb-2">
            <span className="font-syne font-bold text-xl tracking-widest text-white">KAYA</span>
            <span className="text-sm text-gray-500">
              {currentQuestion + 1} of {doshaQuestions.length}
            </span>
          </div>
          <div className="quiz-progress-bar">
            <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {currentQuestion === 0 && (
          <div className="quiz-kaya-message">
            <p className="text-[15px] text-gray-400 leading-relaxed m-0">
              Before I help you glow, I need to understand your body. 🌿
            </p>
          </div>
        )}

        {/* ← THIS DIV KILLS THE GAP — it absorbs empty space */}
        <div className="quiz-spacer" />

        {/* Question + options — naturally at the bottom third */}
        <div className="quiz-question-block">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              style={{ width: '100%', maxWidth: 480, margin: '0 auto' }}
            >
              <h2 className="quiz-question">{question.question}</h2>
              <div className="quiz-options">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className="quiz-option"
                    onClick={() => handleDoshaAnswer(option.dosha)}
                  >
                    {option.text}
                  </div>
                ))}
              </div>

              {currentQuestion > 0 && (
                <div style={{ marginTop: 20, textAlign: 'center' }}>
                  <Button
                    variant="ghost"
                    onClick={handleQuizBack}
                    className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500 hover:text-white"
                  >
                    ← Back
                  </Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  };

  // Dosha Reveal Screen
  const renderDoshaReveal = () => {
    const info = doshaInfo[userDosha];
    const totalAnswers = Object.values(doshaScores).reduce((a, b) => a + b, 0);

    return (
      <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className={`absolute inset-0 bg-gradient-to-br ${info.color} blur-3xl`} />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <div className="p-6">
            <KayaLogo size="sm" animated={false} />
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <motion.div
              className="max-w-md w-full space-y-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-8xl text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                {info.emoji}
              </motion.div>

              <motion.div
                className="text-center space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h1 className="text-4xl font-light">Your Dosha is</h1>
                <h2 className="text-6xl font-medium glow-text">{info.name}</h2>
                <p className="text-gray-500">{info.element}</p>
              </motion.div>

              <motion.div
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-gray-300 leading-relaxed">{info.description}</p>
              </motion.div>

              <motion.div
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {info.characteristics.map((char, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 text-sm text-gray-400"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <span className="text-white mt-1">•</span>
                    <span>{char}</span>
                  </motion.div>
                ))}
              </motion.div>

              {totalAnswers > 0 && (
                <motion.div
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    Your Balance
                  </p>
                  {Object.entries(doshaScores).map(([d, count]) => {
                    const percentage = (count / totalAnswers) * 100;
                    return (
                      <div key={d} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{d}</span>
                          <span className="text-gray-500">
                            {Math.round(percentage)}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-white"
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </motion.div>
          </div>

          <motion.div
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <Button
              className="w-full h-14 bg-white text-black hover:bg-gray-200 rounded-full"
              onClick={() => setCurrentScreen("concerns")}
            >
              Continue
            </Button>
          </motion.div>
        </div>

        <style>{`
          .glow-text {
            text-shadow: 0 0 30px rgba(255,255,255,0.5);
          }
        `}</style>
      </div>
    );
  };

  // Concerns Screen
  const renderConcerns = () => (
    <div className="min-h-screen bg-black text-white flex flex-col pt-[max(20px,env(safe-area-inset-top))]">
      <div className="p-6 border-b border-gray-900">
        <KayaLogo size="sm" animated={false} />
      </div>

      <div className="flex-1 overflow-auto p-6">
        <motion.div
          className="max-w-4xl mx-auto space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-light">
              What would you like to work on?
            </h1>
            <p className="text-gray-400">
              Select all concerns that apply. I'll create a holistic routine that
              addresses them together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bodyZones.map((zone, zoneIndex) => {
              const Icon = zone.icon;
              return (
                <motion.div
                  key={zone.id}
                  className="bg-gray-900 border border-gray-800 rounded-2xl py-6 space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: zoneIndex * 0.1 }}
                >
                  <div className="flex items-center gap-3 border-b border-gray-800 pb-3 px-6">
                    <Icon className="w-8 h-8 text-[#7FB69A]" strokeWidth={1.5} />
                    <h3 className="text-xl" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>{zone.name}</h3>
                  </div>

                  <div className="space-y-2 px-6">
                    {zone.concerns.map((concern) => {
                      const isSelected = selectedConcerns.includes(concern);
                      return (
                        <motion.button
                          key={concern}
                          className={`w-full p-3 rounded-xl text-left text-sm flex items-center justify-between transition-all ${isSelected
                            ? "bg-white text-black"
                            : "bg-gray-800 hover:bg-gray-700 text-white"
                            }`}
                          onClick={() => toggleConcern(concern)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="px-5">{concern}</span>
                          {isSelected && <Check className="w-4 h-4 mr-2" />}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {selectedConcerns.length > 0 && (
            <motion.div
              className="text-center space-y-2 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-white font-medium text-lg">
                {selectedConcerns.length} concern
                {selectedConcerns.length !== 1 ? "s" : ""} selected
              </div>

              <AnimatePresence>
                {selectedConcerns.length >= 7 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-[#E7A677] text-sm max-w-sm mx-auto bg-[#E7A677]/10 p-3 rounded-lg border border-[#E7A677]/20"
                  >
                    That's plenty to start! We recommend focusing on 5 or fewer concerns for your initial routine to not overwhelm your skin.
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </motion.div>
      </div>

      <div className="p-6 border-t border-gray-900">
        <Button
          className="w-full h-14 bg-white text-black hover:bg-gray-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleConcernsContinue}
          disabled={selectedConcerns.length === 0}
        >
          Continue{" "}
          {selectedConcerns.length > 0 && `(${selectedConcerns.length})`}
        </Button>
      </div>
    </div>
  );

  // Unlock Screen
  const renderUnlock = () => {
    const msgs = [
      "Reading your constitution...",
      "Mapping your concerns to root causes...",
      "Preparing your Pitta routine...",
      "Consulting the ancient texts...",
    ];

    const stages = [
      "Analyzing your dosha profile...",
      "Mapping your concerns to root causes...",
      "Generating personalized remedies...",
      "Building your custom routine...",
      "Your wellness journey is ready!",
    ];

    return (
      <div className="kaya-loader-wrap">
        {/* Spinning rings + sigil */}
        <motion.div
          className="kaya-loader"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="ring ring-1" />
          <div className="ring ring-2" />
          <div className="ring ring-3" />
          <div className="ring-center">
            <KayaSigil variant="mark" className="w-9 h-9" />
          </div>
        </motion.div>

        {/* KAYA wordmark */}
        <motion.div
          className="loader-name"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          KAYA
        </motion.div>

        {/* Rotating message */}
        <div className="min-h-[32px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={unlockStage}
              className="loader-msg"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {msgs[unlockStage % msgs.length]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="loader-bar-wrap">
          <motion.div
            className="loader-bar"
            initial={{ width: "0%" }}
            animate={{ width: `${((unlockStage + 1) / stages.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    );
  };

  // Dashboard - Home Tab
  const renderHomeTab = () => {
    const currentTime = new Date();
    const greeting = getGreeting();

    return (
      <div className="home-screen text-white text-left">
        <div className="home-content">
          <div className="home-greeting">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-light m-0">{greeting}</h2>
                <p className="text-gray-400 text-sm mt-1 m-0">
                  Your {userDosha.charAt(0).toUpperCase() + userDosha.slice(1)}{" "}
                  routine awaits
                </p>
              </div>
              <div className="text-3xl">
                {currentTime.getHours() < 12
                  ? "🌅"
                  : currentTime.getHours() < 17
                    ? "☀️"
                    : "🌙"}
              </div>
            </div>
            <div className="pt-2 mt-2 border-t border-gray-800">
              <p className="text-xs text-gray-500 m-0">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="home-ritual-list">
            <h3 className="text-lg font-light mb-3 m-0">Today's Rituals</h3>
            <div className="space-y-2">
              {todayRituals.map((ritual, index) => {
                const Icon = ritual.icon;
                return (
                  <motion.div
                    key={ritual.id}
                    className={`bg-[#0f0f0f] border ${ritual.done ? "border-white/10" : "border-white/5"
                      } rounded-2xl p-4 flex items-center gap-4`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {ritual.useSigil ? (
                      <KayaSigil variant="avatar" className="w-10 h-10" />
                    ) : (
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${ritual.done ? "bg-white/10" : "bg-white"
                          }`}
                      >
                        {Icon && (
                          <Icon
                            className={`w-5 h-5 ${ritual.done ? "text-gray-500" : "text-black"
                              }`}
                          />
                        )}
                      </div>
                    )}
                    <div className="flex-1">
                      <p
                        className={`text-sm m-0 ${ritual.done ? "text-gray-500 line-through" : "text-white"
                          }`}
                      >
                        {ritual.name}
                      </p>
                      <p className="text-xs text-gray-600 m-0 mt-0.5">{ritual.time}</p>
                    </div>
                    {!ritual.done && (
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="home-stats">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="text-2xl mb-1">{stat.emoji}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="home-kaya-tip"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-start gap-3">
              <KayaSigil variant="avatar" />
              <div className="flex-1 mt-1">
                <p className="text-[11px] font-bold tracking-widest text-[#7FB69A] uppercase mb-1 m-0">
                  KAYA SAYS
                </p>
                <p className="text-[13px] leading-relaxed m-0 text-gray-300">
                  {currentNudge}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="home-shortcuts">
            <motion.button
              className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-4 text-left hover:border-white/20 transition-colors"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setDashboardTab("progress")}
            >
              <div className="text-2xl mb-2">📊</div>
              <p className="text-sm font-light m-0">View Progress</p>
              <p className="text-[11px] text-gray-500 mt-1 m-0 leading-tight">Track your journey</p>
            </motion.button>

            <motion.button
              className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-4 text-left hover:border-white/20 transition-colors"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setDashboardTab("kaya")}
            >
              <div className="text-2xl mb-2">💬</div>
              <p className="text-sm font-light m-0">Ask KAYA</p>
              <p className="text-[11px] text-gray-500 mt-1 m-0 leading-tight">Get personalized tips</p>
            </motion.button>
          </div>
        </div>
      </div>
    );
  };

  // Dashboard - Routine Tab
  const renderRoutineTab = () => {
    const routine = routineData[activeRoutine];
    const totalSteps = routine.reduce((acc, zone) => acc + zone.steps.length, 0);
    const completedCount = Array.from(completedSteps).length;
    const progress = totalSteps > 0 ? (completedCount / totalSteps) * 100 : 0;

    return (
      <div className="routine-screen text-white">
        <div className="routine-header">
          <h1 className="text-2xl font-light">Your Routine</h1>
        </div>

        <div className="routine-toggle">
          <button
            className={`flex items-center justify-center gap-2 py-3 transition-all ${activeRoutine === "morning"
              ? "bg-white text-black"
              : "text-gray-500 hover:bg-white/5"
              }`}
            onClick={() => setActiveRoutine("morning")}
          >
            <Sun className="w-4 h-4" />
            <span className="text-sm">Morning</span>
          </button>
          <button
            className={`flex items-center justify-center gap-2 py-3 transition-all ${activeRoutine === "night"
              ? "bg-white text-black"
              : "text-gray-500 hover:bg-white/5"
              }`}
            onClick={() => setActiveRoutine("night")}
          >
            <Moon className="w-4 h-4" />
            <span className="text-sm">Night</span>
          </button>
        </div>

        <div className="flex justify-between text-sm px-4 mb-1">
          <span className="text-gray-400">Progress</span>
          <span className="text-white">
            {completedCount}/{totalSteps}
          </span>
        </div>
        <div className="routine-progress">
          <div
            className="routine-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="routine-list">
          {routine.map((zone, zoneIndex) => (
            <motion.div
              key={zone.zone}
              className="space-y-3 px-4 py-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: zoneIndex * 0.1 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{zone.emoji}</span>
                <h3 className="text-lg font-light">{zone.zone}</h3>
              </div>

              <div className="space-y-2">
                {zone.steps.map((step, stepIndex) => {
                  const isCompleted = completedSteps.has(step.name);
                  return (
                    <motion.div
                      key={step.name}
                      className={`bg-[#0f0f0f] border ${isCompleted ? "border-white/10" : "border-white/5"} rounded-2xl p-4`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: zoneIndex * 0.1 + stepIndex * 0.05 }}
                    >
                      <div className="flex items-start gap-4">
                        <button
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${isCompleted
                            ? "bg-[#7FB69A] border-[#7FB69A]"
                            : "border-gray-600 hover:border-white"
                            }`}
                          onClick={() => toggleRoutineStep(step.name)}
                        >
                          {isCompleted && <Check className="w-4 h-4 text-black" />}
                        </button>

                        <div className="flex-1">
                          <p
                            className={`text-sm mb-1 ${isCompleted ? "text-gray-500 line-through" : "text-white"
                              }`}
                          >
                            {step.name}
                          </p>
                          <div className="flex flex-wrap gap-2 text-xs">
                            <span className="flex items-center gap-1 text-gray-500">
                              <Clock className="w-3 h-3" />
                              {step.duration}
                            </span>
                            <span className="text-gray-600">•</span>
                            <span className="text-gray-500">{step.ingredients}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}

          <div className="add-ritual-cta">
            <span>+ Add custom ritual</span>
          </div>
        </div>

        {completedCount === totalSteps && totalSteps > 0 && (
          <motion.div
            className="bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-2xl p-6 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-4xl mb-2">✨</div>
            <p className="text-lg font-light mb-1">Routine Complete!</p>
            <p className="text-sm text-gray-400">
              You're one step closer to your wellness goals
            </p>
          </motion.div>
        )}
      </div>
    );
  };

  // Dashboard - KAYA Chat Tab
  const renderKayaTab = () => (
    <div className="kaya-screen text-white text-left">
      <div className="kaya-header">
        <motion.div
          animate={{
            boxShadow: [
              "0 0 20px rgba(127,182,154,0.2)",
              "0 0 30px rgba(127,182,154,0.4)",
              "0 0 20px rgba(127,182,154,0.2)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="rounded-full flex-shrink-0"
        >
          <KayaSigil variant="avatar" />
        </motion.div>
        <div>
          <h2 className="text-lg font-light leading-tight m-0">KAYA</h2>
          <p className="text-xs text-gray-400 m-0">Your AI Wellness Guide</p>
        </div>
      </div>

      <div className="kaya-messages screen-content">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${message.sender === "user"
                  ? "bg-white text-black"
                  : "bg-gray-900 text-white border border-gray-800"
                  }`}
              >
                <p className="text-sm leading-relaxed m-0">{message.text}</p>
                <p
                  className={`text-xs mt-2 m-0 ${message.sender === "user" ? "text-gray-600" : "text-gray-500"
                    }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-gray-600 rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {messages.length === 1 && (
          <div className="mt-auto pt-6">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 px-1">
              Suggested Questions
            </p>
            <div className="kaya-suggested">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  className="kaya-suggested-q text-left"
                  onClick={() => handleSendMessage(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="kaya-input-bar">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Ask KAYA anything..."
          className="kaya-input"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputValue.trim()}
          className="kaya-send disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5 text-black" />
        </button>
      </div>
    </div>
  );

  // Dashboard - Progress Tab
  const renderProgressTab = () => {
    const maxCompleted = Math.max(...weeklyData.map((d) => d.completed));

    return (
      <div className="text-white py-6 space-y-6 screen-content">
        <div className="space-y-2">
          <h1 className="text-2xl font-light">Your Progress</h1>
          <p className="text-sm text-gray-400">
            Track your wellness journey and celebrate wins
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {progressCards.map((card, index) => (
            <motion.div
              key={card.title}
              className={`bg-gradient-to-br ${card.gradient} border ${card.borderGlow} rounded-2xl p-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-xl font-light mb-1">{card.title}</h3>
              <p className="text-sm text-gray-400">{card.subtitle}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-light">Weekly Activity</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>

          <div className="flex items-end justify-between gap-2 h-40">
            {weeklyData.map((data, index) => {
              const height = (data.completed / maxCompleted) * 100;
              return (
                <div
                  key={data.day}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <motion.div
                    className="w-full bg-white rounded-t-lg relative"
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-gray-400">
                      {data.completed}
                    </div>
                  </motion.div>
                  <span className="text-xs text-gray-500">{data.day}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-light">Photo Progress</h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-900"
            >
              <Camera className="w-4 h-4 mr-2" />
              Add Photo
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {beforeAfterImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className="grid grid-cols-2 gap-px bg-gray-800">
                  <div className="aspect-square bg-gray-700 flex items-center justify-center text-gray-500 text-sm">
                    Before
                  </div>
                  <div className="aspect-square bg-gray-700 flex items-center justify-center text-gray-500 text-sm">
                    After
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">{image.concern}</p>
                      <p className="text-xs text-gray-500">{image.date}</p>
                    </div>
                    <div className="text-green-500 text-sm font-medium">
                      {image.improvement}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h3 className="text-lg font-light">Share Your Journey</h3>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-8 text-center space-y-4">
            <div className="text-6xl">✨</div>
            <div className="space-y-2">
              <p className="text-2xl font-light">7-Day Glow Streak</p>
              <p className="text-sm text-gray-400">
                Powered by Kayurveda • Ayurvedic Wellness
              </p>
            </div>

            <div className="flex gap-2 justify-center pt-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
              >
                <Download className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-2xl p-6 space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <h3 className="text-sm font-light text-gray-400">KAYA's Insight</h3>
          <p className="text-base leading-relaxed">
            You're maintaining great consistency! Your Pitta balance is improving,
            and it shows in your skin's reduced inflammation. Keep up the cooling
            routines. 🌿
          </p>
        </motion.div>
      </div>
    );
  };

  // Dashboard - Profile Tab
  const renderProfileTab = () => (
    <div className="text-white py-6 space-y-6 screen-content">
      <motion.div
        className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-3xl p-6 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-4xl">
            {doshaEmojis[userDosha]}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-light">Wellness Enthusiast</h2>
            <p className="text-sm text-gray-400 capitalize">
              {userDosha} Dosha Dominant
            </p>
          </div>
        </div>

        <div className="stats-row pt-4 border-t border-gray-700">
          <div className="stat-card">
            <div className="stat-value">7</div>
            <div className="stat-label">Day Streak</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">24</div>
            <div className="stat-label">Remedies</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{selectedConcerns.length}</div>
            <div className="stat-label">Concerns</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-light">My Dosha Profile</h3>
          <button
            className="text-sm text-gray-400 hover:text-white"
            onClick={() => {
              setCurrentScreen("dosha-quiz");
              setCurrentQuestion(0);
              setDoshaAnswers([]);
            }}
          >
            Retake Quiz
          </button>
        </div>
        <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-xl">
          <span className="text-3xl">{doshaEmojis[userDosha]}</span>
          <div className="flex-1">
            <p className="text-sm capitalize">{userDosha} Dominant</p>
            <p className="text-xs text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </motion.div>

      {menuSections.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + sectionIndex * 0.1 }}
        >
          <h3 className="text-sm font-light text-gray-500 uppercase tracking-wider px-2">
            {section.title}
          </h3>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            {section.items.map((item, itemIndex) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-4 p-4 hover:bg-gray-800 transition-colors ${itemIndex !== section.items.length - 1
                    ? "border-b border-gray-800"
                    : ""
                    }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              );
            })}
          </div>
        </motion.div>
      ))}

      {selectedConcerns.length > 0 && (
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-sm font-light text-gray-500 uppercase tracking-wider px-2">
            Active Concerns
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedConcerns.slice(0, 5).map((concern, index) => (
              <motion.div
                key={concern}
                className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-full text-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                {concern}
              </motion.div>
            ))}
            {selectedConcerns.length > 5 && (
              <div className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-full text-sm text-gray-500">
                +{selectedConcerns.length - 5} more
              </div>
            )}
          </div>
        </motion.div>
      )}

      <motion.div
        className="bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-2xl p-5 space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-sm font-light">About Kayurveda</h3>
        <p className="text-xs text-gray-400 leading-relaxed">
          Kayurveda combines ancient Ayurvedic wisdom with modern AI to create
          personalized wellness routines. Version 1.0.0
        </p>
      </motion.div>

      <motion.button
        className="w-full flex items-center justify-center gap-2 p-4 bg-gray-900 border border-gray-800 rounded-2xl text-red-400 hover:bg-gray-800 transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <LogOut className="w-5 h-5" />
        <span className="text-sm">Sign Out</span>
      </motion.button>

      <div className="h-4" />
    </div>
  );

  // Dashboard with Bottom Navigation
  const renderDashboard = () => {
    const tabs = [
      { id: "home", label: "Home", icon: Home },
      { id: "routine", label: "Routine", icon: Calendar },
      { id: "kaya", label: "KAYA", icon: MessageCircle, useSigil: true },
      { id: "progress", label: "Progress", icon: TrendingUp },
      { id: "profile", label: "Profile", icon: User },
    ];

    return (
      <div className="app-shell text-white">
        <div className="tab-content">
          {dashboardTab === "home" && renderHomeTab()}
          {dashboardTab === "routine" && renderRoutineTab()}
          {dashboardTab === "kaya" && renderKayaTab()}
          {dashboardTab === "progress" && renderProgressTab()}
          {dashboardTab === "profile" && renderProfileTab()}
        </div>

        <nav className="tab-bar">
          <div className="flex items-center justify-around px-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = dashboardTab === tab.id;
              const isKaya = tab.id === "kaya";

              return (
                <button
                  key={tab.id}
                  onClick={() => setDashboardTab(tab.id as any)}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${isKaya ? "relative" : isActive ? "text-white" : "text-gray-600"
                    }`}
                >
                  {isKaya ? (
                    <motion.div
                      className="relative"
                      animate={
                        isActive
                          ? {
                            scale: [1, 1.1, 1],
                            opacity: [0.8, 1, 0.8],
                          }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div
                        className={`p-3 rounded-full ${isActive ? "bg-[#111111] border border-[#7FB69A]/40" : "bg-gray-800"
                          }`}
                      >
                        <KayaSigil variant="tab" />
                      </div>
                      {isActive && (
                        <div className="absolute inset-0 rounded-full opacity-30 blur-md" style={{ background: 'rgba(127,182,154,0.35)' }} />
                      )}
                    </motion.div>
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                  <span
                    className={`text-xs ${isActive ? "font-medium" : "font-normal"
                      }`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    );
  };

  // ============================================
  // MAIN RENDER
  // ============================================
  return (
    <div className="dark min-h-screen bg-black text-white">
      {currentScreen === "welcome" && renderWelcome()}
      {currentScreen === "dosha-quiz" && renderDoshaQuiz()}
      {currentScreen === "dosha-reveal" && renderDoshaReveal()}
      {currentScreen === "concerns" && renderConcerns()}
      {currentScreen === "unlock" && renderUnlock()}
      {currentScreen === "dashboard" && renderDashboard()}

      {/* PWA Install Prompt */}
      <InstallPrompt />
    </div>
  );
}
