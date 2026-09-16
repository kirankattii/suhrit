const fs = require('fs');

let content = fs.readFileSync('src/app/home.tsx', 'utf8');

// 1. Imports
content = content.replace(
  'HeartPulse,\n} from "lucide-react-native";',
  'HeartPulse,\n  Menu,\n  Bell,\n} from "lucide-react-native";'
);

// 2. Root Background
content = content.replace(
  '<View className="flex-1 bg-suhrhit-background">',
  '<View className="flex-1 bg-suhrhit-surface">'
);

// 3. Leaf Colors
content = content.replace(
  /<Leaf color="#255547" size={140} strokeWidth={1} \/>/g,
  '<Leaf color="#FFFFFF" size={140} strokeWidth={1} />'
);
content = content.replace(
  /<Leaf color="#255547" size={100} strokeWidth={1} \/>/g,
  '<Leaf color="#FFFFFF" size={100} strokeWidth={1} />'
);

// 4. Top Navigation
content = content.replace(
  '<View className="flex-row items-center justify-end z-10">\n            <View className="flex-row items-center gap-4">',
  `<View className="flex-row items-center justify-between z-10 mb-2">
            <TouchableOpacity accessibilityRole="button" className="p-2 -ml-2">
              <Menu color="white" size={24} strokeWidth={2} />
            </TouchableOpacity>

            <View className="flex-row items-center gap-3">
              <TouchableOpacity accessibilityRole="button" className="p-2 relative">
                <Bell color="white" size={22} strokeWidth={2} />
                <View className="absolute top-2 right-2.5 w-2 h-2 bg-white rounded-full" />
              </TouchableOpacity>`
);

// 5. Grid Cards Background
content = content.replace(/className="w-\[48%\] bg-white /g, 'className="w-[48%] bg-suhrhit-background ');

// 6. Check-in Button
content = content.replace(
  '<TouchableOpacity onPress={() => router.push("/check-in")} className="bg-suhrhit-primary rounded-[20px] py-2.5 px-4 flex-row items-center justify-center w-36">',
  '<TouchableOpacity onPress={() => router.push("/check-in")} className="bg-suhrhit-primary rounded-[20px] py-2.5 px-4 flex-row items-center justify-center self-start">'
);

fs.writeFileSync('src/app/home.tsx', content, 'utf8');
console.log('Home page updated');
