import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowRight, ChevronLeft, Pause, Leaf, Sparkles, Check } from "lucide-react-native";
import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Animated, Easing, Dimensions, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { generateInsight } from "../../../ai/client";

type GameState = 'intro' | 'rules' | 'playing' | 'reframing' | 'results' | 'outro';
type BubbleType = 'positive' | 'negative';

interface ThoughtData {
  id: string;
  text: string;
  type: BubbleType;
  popped?: boolean;
}

interface ReframeOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface LevelData {
  title: string;
  subtitle: string;
  type: 'bubbles' | 'situations';
  situationText?: string;
  thoughts: ThoughtData[];
}

const GAME_LEVELS: LevelData[] = [
  {
    title: 'Level 1/3',
    subtitle: 'Spot It',
    type: 'bubbles',
    thoughts: [
      { id: '1_1', text: 'I can do this.', type: 'positive' },
      { id: '1_2', text: 'I always mess everything up.', type: 'negative' },
      { id: '1_3', text: 'Things may not be perfect, but I can try.', type: 'positive' },
      { id: '1_4', text: 'Nobody understands me.', type: 'negative' },
      { id: '1_5', text: 'I feel nervous, but I can handle this.', type: 'positive' },
      { id: '1_6', text: 'This will never get better.', type: 'negative' },
      { id: '1_7', text: 'I am enough.', type: 'positive' },
    ]
  },
  {
    title: 'Level 2/3',
    subtitle: 'Think Twice',
    type: 'bubbles',
    thoughts: [
      { id: '2_1', text: 'I\'m not good enough.', type: 'negative' },
      { id: '2_2', text: 'I can grow from this.', type: 'positive' },
      { id: '2_3', text: 'Everything is going to go wrong.', type: 'negative' },
      { id: '2_4', text: 'I have support.', type: 'positive' },
      { id: '2_5', text: 'It\'s okay to struggle sometimes.', type: 'positive' },
      { id: '2_6', text: 'I\'ll never be good enough.', type: 'negative' },
      { id: '2_7', text: 'I can take it one step at a time.', type: 'positive' },
      { id: '2_8', text: 'People will judge me.', type: 'negative' },
    ]
  },
  {
    title: 'Level 3/3',
    subtitle: 'Real Life Situations',
    type: 'situations',
    situationText: "You didn't get the result you expected in an exam.\nTap the unhelpful thoughts.",
    thoughts: [
      { id: '3_1', text: 'I\'m a failure.', type: 'negative' },
      { id: '3_2', text: 'I can understand where I went wrong.', type: 'positive' },
      { id: '3_3', text: 'Everyone is disappointed in me.', type: 'negative' },
      { id: '3_4', text: 'One result doesn\'t define my abilities.', type: 'positive' },
    ]
  }
];

const REFRAME_DATA: Record<string, ReframeOption[]> = {
  // Level 1 Reframes
  '1_2': [
    { id: 'a', text: 'I fail at everything.', isCorrect: false },
    { id: 'b', text: "One setback doesn't mean I'll always fail.", isCorrect: true },
    { id: 'c', text: "There's no point trying.", isCorrect: false },
  ],
  '1_4': [
    { id: 'a', text: 'Everyone hates me.', isCorrect: false },
    { id: 'b', text: "Sometimes people don't understand, and that's okay.", isCorrect: true },
    { id: 'c', text: 'I shouldn\'t talk to anyone.', isCorrect: false },
  ],
  '1_6': [
    { id: 'a', text: 'It\'s ruined forever.', isCorrect: false },
    { id: 'b', text: 'Things are hard now, but they can improve.', isCorrect: true },
    { id: 'c', text: 'I should just give up.', isCorrect: false },
  ],
  // Level 2 Reframes
  '2_1': [
    { id: 'a', text: 'I am terrible.', isCorrect: false },
    { id: 'b', text: 'I am still learning and growing.', isCorrect: true },
    { id: 'c', text: 'I will never be good enough.', isCorrect: false },
  ],
  '2_3': [
    { id: 'a', text: 'It will all be a disaster.', isCorrect: false },
    { id: 'b', text: 'I can\'t predict the future, I\'ll take it one step at a time.', isCorrect: true },
    { id: 'c', text: 'I should stop now.', isCorrect: false },
  ],
  '2_6': [
    { id: 'a', text: 'I should stop trying.', isCorrect: false },
    { id: 'b', text: 'I can improve with practice.', isCorrect: true },
    { id: 'c', text: 'People are better than me.', isCorrect: false },
  ],
  '2_8': [
    { id: 'a', text: 'Everyone is laughing at me.', isCorrect: false },
    { id: 'b', text: 'People\'s opinions don\'t define my worth.', isCorrect: true },
    { id: 'c', text: 'I shouldn\'t do anything.', isCorrect: false },
  ],
  // Level 3 Reframes
  '3_1': [
    { id: 'a', text: 'I will always fail exams.', isCorrect: false },
    { id: 'b', text: 'A single grade doesn\'t determine my value.', isCorrect: true },
    { id: 'c', text: 'I am not smart enough.', isCorrect: false },
  ],
  '3_3': [
    { id: 'a', text: 'I let everyone down permanently.', isCorrect: false },
    { id: 'b', text: 'I am learning, and people who care will support me.', isCorrect: true },
    { id: 'c', text: 'No one will ever trust me again.', isCorrect: false },
  ]
};

// Animated Bubble Component
const FloatingBubble = ({ 
  bubble, 
  onPop 
}: { 
  bubble: ThoughtData, 
  onPop: (b: ThoughtData) => void 
}) => {
  const [floatAnim] = useState(new Animated.Value(0));
  
  useEffect(() => {
    const duration = 2000 + Math.random() * 2000;
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);

  if (bubble.popped) return null;

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15]
  });

  const isPositive = bubble.type === 'positive';
  const bgColor = isPositive ? '#E8F7F4' : '#FFF0F5';
  const borderColor = isPositive ? '#B2DFDB' : '#FFD6E0';

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPop(bubble)}>
      <Animated.View 
        className="rounded-full p-5 items-center justify-center m-2 aspect-square min-w-[130px] max-w-[160px]"
        style={[{
          backgroundColor: bgColor,
          borderColor: borderColor,
          borderWidth: 1,
          shadowColor: isPositive ? "#00897B" : "#D81B60",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
          transform: [{ translateY }]
        }]}
      >
        <Text className="text-center font-medium text-suhrhit-primary/80 text-[14px] leading-[20px]">
          {bubble.text}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

// Capsule Component for Level 3
const CapsuleThought = ({ thought, onPop }: { thought: ThoughtData, onPop: (b: ThoughtData) => void }) => {
  if (thought.popped) return null;

  const isPositive = thought.type === 'positive';
  const bgColor = isPositive ? '#E8F7F4' : '#FFF0F5';
  const borderColor = isPositive ? '#B2DFDB' : '#FFD6E0';

  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={() => onPop(thought)}
      className="mb-4 w-full"
    >
      <View 
        className="rounded-full py-4 px-6 flex-row items-center border"
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
          borderWidth: 1,
        }}
      >
        <View className={`w-6 h-6 rounded-full mr-4 ${isPositive ? 'bg-[#B2DFDB]' : 'bg-[#FFD6E0]'}`} />
        <Text className="flex-1 font-medium text-suhrhit-primary/80 text-[15px] leading-[22px]">
          {thought.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function PopThePessimismGame() {
  const insets = useSafeAreaInsets();
  const [gameState, setGameState] = useState<GameState>('intro');
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentThoughts, setCurrentThoughts] = useState<ThoughtData[]>(GAME_LEVELS[0].thoughts);
  const [currentReframe, setCurrentReframe] = useState<ThoughtData | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showReframeSuccess, setShowReframeSuccess] = useState(false);
  const [stats, setStats] = useState({ negativeFound: 0, reframed: 0, positiveFound: 0 });
  const [isGeneratingReframe, setIsGeneratingReframe] = useState(false);
  const [generatedOptions, setGeneratedOptions] = useState<ReframeOption[]>([]);

  useEffect(() => {
    // When level changes, reset thoughts
    setCurrentThoughts(GAME_LEVELS[currentLevelIndex].thoughts);
  }, [currentLevelIndex]);

  const handlePopBubble = async (thought: ThoughtData) => {
    if (thought.type === 'negative') {
      // Mark as popped
      setCurrentThoughts(prev => prev.map(b => b.id === thought.id ? { ...b, popped: true } : b));
      setCurrentReframe(thought);
      setGameState('reframing');
      setStats(s => ({ ...s, negativeFound: s.negativeFound + 1 }));
      setIsGeneratingReframe(true);
      
      try {
        const prompt = `You are a cognitive behavioral therapist helping someone reframe a negative thought.
The thought is: "${thought.text}"
Generate exactly 3 options to respond to this thought. Keep each option SHORT and concise (under 12 words).
1 must be a healthy, balanced, encouraging reframe (isCorrect: true).
2 must be unhelpful, pessimistic, or toxic positivity (isCorrect: false).
Randomize the order of the options.
Return ONLY a raw JSON array of objects containing 'text' and 'isCorrect'. No markdown blocks, no extra text.`;
        
        const response = await generateInsight(prompt);
        if (response) {
          const cleaned = response.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleaned);
          const mappedOptions = parsed.map((o: any, idx: number) => ({
             id: ['a', 'b', 'c'][idx],
             text: o.text,
             isCorrect: o.isCorrect
          }));
          setGeneratedOptions(mappedOptions);
        } else {
          setGeneratedOptions(REFRAME_DATA[thought.id] || REFRAME_DATA['1_2']);
        }
      } catch (err) {
        console.error("Failed to generate options", err);
        setGeneratedOptions(REFRAME_DATA[thought.id] || REFRAME_DATA['1_2']);
      } finally {
        setIsGeneratingReframe(false);
      }
    } else {
      // Positive thoughts don't trigger reframing, maybe just track it
      setStats(s => ({ ...s, positiveFound: s.positiveFound + 1 }));
    }
  };

  const handleSelectReframeOption = (option: ReframeOption) => {
    setSelectedOption(option.id);
    if (option.isCorrect) {
      setShowReframeSuccess(true);
      setStats(s => ({ ...s, reframed: s.reframed + 1 }));
      
      setTimeout(() => {
        setShowReframeSuccess(false);
        setSelectedOption(null);
        setCurrentReframe(null);
        
        // Check if all negatives are popped in the current level
        // (Wait, since we updated currentThoughts before setting state, we need to check the current array)
        // Note: the state update in handlePopBubble might not be flushed if we check `currentThoughts` here,
        // but since we marked it popped, let's just re-evaluate based on the marked list.
        const remainingNegatives = currentThoughts.filter(b => b.type === 'negative' && b.id !== currentReframe?.id && !b.popped);
        
        if (remainingNegatives.length === 0) {
          // Level complete
          if (currentLevelIndex < GAME_LEVELS.length - 1) {
            // Next level
            setCurrentLevelIndex(prev => prev + 1);
            setGameState('playing');
          } else {
            // Game over
            setGameState('results');
          }
        } else {
          // Continue playing current level
          setGameState('playing');
        }
      }, 2000);
    }
  };

  const renderIntro = () => (
    <View className="flex-1 items-center justify-center px-8 relative">
      <View className="absolute top-20 left-10 opacity-20"><Sparkles size={40} color="#7293B3" /></View>
      <View className="absolute bottom-40 right-10 opacity-20"><Leaf size={60} color="#7293B3" /></View>
      
      <Text className="text-suhrhit-primary text-[24px] font-bold mb-2">Suhrit</Text>
      <Text className="text-suhrhit-secondary text-[14px] uppercase tracking-widest mb-12">Mind • Body • Relationships</Text>
      
      <View className="bg-[#FFF0F5] w-full aspect-square max-h-[200px] rounded-full items-center justify-center mb-10 border-4 border-white shadow-sm">
        <Text className="text-suhrhit-primary font-bold text-[32px] text-center" style={{ fontFamily: 'Georgia' }}>
          Pop the{"\n"}Pessimism
        </Text>
      </View>

      <Text className="text-center text-suhrhit-primary/80 text-[16px] leading-[24px] mb-12">
        Some thoughts can make difficult moments feel even heavier.{"\n\n"}
        Tap the bubbles containing pessimistic or unhelpful thoughts.{"\n\n"}
        Leave balanced and encouraging thoughts untouched!
      </Text>

      <TouchableOpacity 
        onPress={() => setGameState('rules')}
        className="bg-[#6B4E71] rounded-full py-4 px-10 w-full flex-row justify-center items-center"
      >
        <Text className="text-white font-bold text-[18px] mr-2">Start Game</Text>
        <ArrowRight color="white" size={20} />
      </TouchableOpacity>
    </View>
  );

  const renderRules = () => (
    <View className="flex-1 px-8 pt-12 relative">
      <TouchableOpacity onPress={() => setGameState('intro')} className="mb-6">
        <ChevronLeft color="#183059" size={28} />
      </TouchableOpacity>
      
      <Text className="text-suhrhit-primary font-bold text-[32px] mb-10" style={{ fontFamily: 'Georgia' }}>How to Play</Text>
      
      <View className="gap-6 mb-12">
        {[
          "Look at the floating thought bubbles on the screen.",
          "Tap the bubbles that contain pessimistic or unhelpful thoughts.",
          "Leave balanced and encouraging thoughts untouched.",
          "You'll get a chance to reframe the unhelpful thoughts after popping them."
        ].map((rule, idx) => (
          <View key={idx} className="flex-row items-start">
            <View className="w-8 h-8 rounded-full bg-[#E6F0FA] items-center justify-center mr-4">
              <Text className="text-suhrhit-primary font-bold">{idx + 1}</Text>
            </View>
            <Text className="flex-1 text-suhrhit-primary/80 text-[16px] leading-[24px] mt-1">{rule}</Text>
          </View>
        ))}
      </View>

      <View className="items-center justify-center mb-12">
        <View className="flex-row items-center justify-center">
          <Leaf color="#7293B3" size={32} className="mr-4" />
          <View>
            <Text className="text-suhrhit-primary font-bold text-[18px] italic">Notice</Text>
            <Text className="text-suhrhit-primary font-bold text-[18px] italic ml-4">→ Choose</Text>
            <Text className="text-suhrhit-primary font-bold text-[18px] italic ml-8">→ Reframe</Text>
          </View>
        </View>
      </View>

      <View className="flex-1 justify-end pb-12">
        <TouchableOpacity 
          onPress={() => setGameState('playing')}
          className="bg-[#6B4E71] rounded-full py-4 px-10 w-full flex-row justify-center items-center"
        >
          <Text className="text-white font-bold text-[18px] mr-2">Let's Go</Text>
          <ArrowRight color="white" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPlaying = () => {
    const level = GAME_LEVELS[currentLevelIndex];
    return (
      <View className="flex-1 relative">
        <View className="flex-row items-center justify-between px-6 mb-4" style={{ marginTop: 20 }}>
          <View>
            <Text className="text-suhrhit-primary font-bold text-[16px]">{level.title}</Text>
            <Text className="text-suhrhit-secondary text-[14px]">{level.subtitle}</Text>
          </View>
          <TouchableOpacity 
            className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm"
            onPress={() => {
              Alert.alert(
                "Game Paused",
                "Would you like to quit this round?",
                [
                  { text: "Resume", style: "cancel" },
                  { text: "Quit", style: "destructive", onPress: () => setGameState('intro') }
                ]
              );
            }}
          >
            <Pause color="#183059" size={20} />
          </TouchableOpacity>
        </View>

        {level.type === 'situations' && (
          <View className="px-6 mb-6">
            <Text className="text-suhrhit-primary font-bold text-[18px] text-center leading-[26px]">
              {level.situationText}
            </Text>
          </View>
        )}

        {level.type === 'bubbles' ? (
          <View className="flex-1 flex-row flex-wrap justify-center items-center p-4 content-center">
            {currentThoughts.map(thought => (
              <FloatingBubble key={thought.id} bubble={thought} onPop={handlePopBubble} />
            ))}
          </View>
        ) : (
          <ScrollView className="flex-1 px-6">
            {currentThoughts.map(thought => (
              <CapsuleThought key={thought.id} thought={thought} onPop={handlePopBubble} />
            ))}
          </ScrollView>
        )}
      </View>
    );
  };

  const renderReframing = () => {
    if (!currentReframe) return null;
    const options = generatedOptions;

    return (
      <ScrollView className="flex-1 px-6 pt-12 relative" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
        <View className="items-center justify-center mb-10">
          <Sparkles color="#FBC02D" size={32} className="mb-2" />
          <Text className="text-suhrhit-primary font-bold text-[28px]" style={{ fontFamily: 'Georgia' }}>Good catch!</Text>
        </View>

        <View className="bg-[#FFF0F5] border border-[#FFD6E0] rounded-[32px] p-6 items-center justify-center mb-10 shadow-sm self-center max-w-[80%] min-w-[250px]">
          <Text className="text-suhrhit-primary font-medium text-[18px] text-center leading-[26px]">
            "{currentReframe.text}"
          </Text>
        </View>

        <Text className="text-suhrhit-primary font-bold text-[18px] text-center mb-6">Can we reframe that?</Text>
        <Text className="text-suhrhit-secondary text-center mb-8">Choose a more balanced thought:</Text>

        {isGeneratingReframe ? (
          <View className="items-center justify-center py-10">
            <ActivityIndicator size="large" color="#00897B" />
            <Text className="text-suhrhit-secondary mt-4">Generating options...</Text>
          </View>
        ) : (
          <View className="gap-4">
            {options.map((option, idx) => {
              const isSelected = selectedOption === option.id;
              let bgColor = 'bg-white';
              let borderColor = 'border-[#E6F0FA]';
              
              if (isSelected && option.isCorrect) {
                bgColor = 'bg-[#E8F7F4]';
                borderColor = 'border-[#00897B]';
              } else if (isSelected && !option.isCorrect) {
                bgColor = 'bg-[#FFF0F5]';
                borderColor = 'border-[#D81B60]';
              }

              return (
                <TouchableOpacity 
                  key={option.id}
                  disabled={showReframeSuccess}
                  onPress={() => handleSelectReframeOption(option)}
                  className={`${bgColor} border ${borderColor} rounded-2xl p-4 flex-row items-center shadow-sm`}
                >
                  <View className={`w-8 h-8 rounded-full border ${isSelected ? 'border-transparent' : 'border-[#E6F0FA]'} ${isSelected && option.isCorrect ? 'bg-[#00897B]' : 'bg-[#F5F9FF]'} items-center justify-center mr-4`}>
                    {isSelected && option.isCorrect ? (
                      <Check color="white" size={16} />
                    ) : (
                      <Text className={`font-bold ${isSelected ? 'text-white' : 'text-suhrhit-secondary'}`}>
                        {['A', 'B', 'C'][idx]}
                      </Text>
                    )}
                  </View>
                  <Text className="flex-1 text-suhrhit-primary text-[15px] leading-[22px]">{option.text}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {showReframeSuccess && (
          <View className="mt-8 items-center justify-center animate-bounce">
            <View className="bg-[#00897B] rounded-full py-2 px-6 mb-2">
              <Text className="text-white font-bold">That's right!</Text>
            </View>
            <Text className="text-[#00897B] font-medium text-[15px]">You're building a kinder inner voice! 🌱</Text>
          </View>
        )}
      </ScrollView>
    );
  };

  const renderResults = () => (
    <View className="flex-1 items-center justify-center px-8">
      <View className="bg-white rounded-[40px] p-8 w-full items-center shadow-sm border border-[#F0F5FA] relative">
        <View className="absolute -top-6">
          <View className="w-12 h-12 bg-[#E8F7F4] rounded-full items-center justify-center border-4 border-[#FAFCFF]">
            <Leaf color="#00897B" size={24} />
          </View>
        </View>

        <Text className="text-suhrhit-primary font-bold text-[28px] mt-4 mb-2" style={{ fontFamily: 'Georgia' }}>You did it!</Text>
        <Text className="text-suhrhit-primary font-semibold text-[18px] mb-6">Thought Detective</Text>
        
        <Text className="text-suhrhit-secondary text-center mb-8 text-[15px] leading-[22px]">
          You made some space for kinder, more balanced thinking.
        </Text>

        <View className="w-full gap-4 mb-10">
          <View className="flex-row justify-between items-center bg-[#FAFCFF] p-4 rounded-2xl">
            <View className="flex-row items-center">
              <View className="w-4 h-4 rounded-full bg-[#FFD6E0] mr-3" />
              <Text className="text-suhrhit-primary/80">Pessimistic thoughts identified</Text>
            </View>
            <Text className="text-suhrhit-primary font-bold">{stats.negativeFound}</Text>
          </View>

          <View className="flex-row justify-between items-center bg-[#FAFCFF] p-4 rounded-2xl">
            <View className="flex-row items-center">
              <View className="w-4 h-4 rounded-full bg-[#B2DFDB] mr-3" />
              <Text className="text-suhrhit-primary/80">Balanced thoughts recognised</Text>
            </View>
            <Text className="text-suhrhit-primary font-bold">{stats.positiveFound}</Text>
          </View>
          
          <View className="flex-row justify-between items-center bg-[#FAFCFF] p-4 rounded-2xl">
            <View className="flex-row items-center">
              <View className="w-4 h-4 rounded-full bg-[#FBC02D] mr-3" />
              <Text className="text-suhrhit-primary/80">Thoughts reframed</Text>
            </View>
            <Text className="text-suhrhit-primary font-bold">{stats.reframed}</Text>
          </View>
        </View>

        <TouchableOpacity 
          onPress={() => setGameState('outro')}
          className="bg-[#6B4E71] rounded-full py-4 px-10 w-full items-center mb-4"
        >
          <Text className="text-white font-bold text-[18px]">Great job!</Text>
        </TouchableOpacity>
        
        <Text className="text-suhrhit-secondary text-center text-[13px] leading-[18px]">
          Would you like to try another round or explore a wellbeing tool?
        </Text>
      </View>
    </View>
  );

  const renderOutro = () => (
    <View className="flex-1 items-center justify-center px-8">
      <Text className="text-suhrhit-primary text-[32px] font-bold mb-12" style={{ fontFamily: 'Georgia' }}>Suhrit</Text>
      
      <Text className="text-suhrhit-primary text-[20px] text-center leading-[32px] mb-10" style={{ fontFamily: 'Georgia' }}>
        Having difficult{"\n"}thoughts is normal.{"\n\n"}
        You don't have to believe{"\n"}every thought that comes{"\n"}into your mind.
      </Text>
      
      <View className="w-10 h-[2px] bg-suhrhit-secondary/30 mb-10" />
      
      <Text className="text-[#00897B] font-medium text-[18px] text-center mb-16">
        You're doing better{"\n"}than you think. 🌱
      </Text>

      <TouchableOpacity 
        onPress={() => router.replace("/games")}
        className="bg-[#6B4E71] rounded-full py-4 px-10 w-full flex-row justify-center items-center"
      >
        <Text className="text-white font-bold text-[18px]">Back to Wellbeing</Text>
      </TouchableOpacity>
    </View>
  );

  const renderContent = () => {
    switch (gameState) {
      case 'intro': return renderIntro();
      case 'rules': return renderRules();
      case 'playing': return renderPlaying();
      case 'reframing': return renderReframing();
      case 'results': return renderResults();
      case 'outro': return renderOutro();
      default: return null;
    }
  };

  return (
    <View className="flex-1 bg-[#FAFCFF]">
      <StatusBar style="dark" />
      <View className="flex-1" style={{ paddingTop: Math.max(insets.top, 20) }}>
        {renderContent()}
      </View>
    </View>
  );
}
