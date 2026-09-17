const fs = require('fs');
const path = require('path');

const dir = 'src/app/explore/postpartum';
const files = fs.readdirSync(dir).map(f => path.join(dir, f)).filter(f => f.endsWith('.tsx'));
files.push('src/components/ExploreLayout.tsx');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Extract the title part to keep it intact
  const titleMatch = content.match(/<Text className="text-suhrhit-primary text-\[20px\] font-medium text-center absolute w-full -z-10" style={{ fontFamily: 'Georgia' }}>\s*([\s\S]*?)\s*<\/Text>/);
  
  if (!titleMatch) {
    console.log(`Skipping ${file} - no title match`);
    continue;
  }
  const title = titleMatch[1].trim();

  // For most screens
  if (content.includes('<ScrollView className="flex-1" bounces={false} showsVerticalScrollIndicator={false}>')) {
    const searchString = `<ScrollView className="flex-1" bounces={false} showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: Math.max(insets.top, 20) + 16 }} className="px-6 pb-6">
          {/* Header */}
          <View className="flex-row items-center justify-between z-10 mb-6">
            <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-start justify-center">
              <ChevronLeft color="#183059" size={28} strokeWidth={2.5} />
            </TouchableOpacity>
            <Text className="text-suhrhit-primary text-[20px] font-medium text-center absolute w-full -z-10" style={{ fontFamily: 'Georgia' }}>
              ${title}
            </Text>
            <View className="w-10 h-10" />
          </View>`;
          
    const replaceString = `{/* Sticky Header */}
      <View style={{ paddingTop: Math.max(insets.top, 10) + 8 }} className="px-6 pb-4 bg-suhrhit-background z-50">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-start justify-center">
            <ChevronLeft color="#183059" size={28} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text className="text-suhrhit-primary text-[20px] font-medium text-center absolute w-full -z-10" style={{ fontFamily: 'Georgia' }}>
            ${title}
          </Text>
          <View className="w-10 h-10" />
        </View>
      </View>

      <ScrollView className="flex-1" bounces={false} showsVerticalScrollIndicator={false}>
        <View className="px-6 pb-6 pt-4">`;
        
    if (content.includes(searchString)) {
        content = content.replace(searchString, replaceString);
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    } else {
        console.log(`Search string not found exactly in ${file}, maybe formatting differs?`);
    }
  } 
  // For check.tsx
  else if (content.includes('<ScrollView className="flex-1 px-6" bounces={false} showsVerticalScrollIndicator={false}>')) {
    const searchStringCheck = `<ScrollView className="flex-1 px-6" bounces={false} showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: Math.max(insets.top, 20) + 16 }} className="pb-6">
          {/* Header */}
          <View className="flex-row items-center justify-between z-10 mb-6">
            <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-start justify-center">
              <ChevronLeft color="#183059" size={28} strokeWidth={2.5} />
            </TouchableOpacity>
            <Text className="text-suhrhit-primary text-[20px] font-medium text-center absolute w-full -z-10" style={{ fontFamily: 'Georgia' }}>
              ${title}
            </Text>
            <View className="w-10 h-10" />
          </View>`;
          
    const replaceStringCheck = `{/* Sticky Header */}
      <View style={{ paddingTop: Math.max(insets.top, 10) + 8 }} className="px-6 pb-4 bg-suhrhit-background z-50">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-start justify-center">
            <ChevronLeft color="#183059" size={28} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text className="text-suhrhit-primary text-[20px] font-medium text-center absolute w-full -z-10" style={{ fontFamily: 'Georgia' }}>
            ${title}
          </Text>
          <View className="w-10 h-10" />
        </View>
      </View>

      <ScrollView className="flex-1 px-6" bounces={false} showsVerticalScrollIndicator={false}>
        <View className="pb-6 pt-4">`;
        
    if (content.includes(searchStringCheck)) {
        content = content.replace(searchStringCheck, replaceStringCheck);
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    } else {
        console.log(`Search string not found exactly in ${file}, maybe formatting differs?`);
    }
  }
}
