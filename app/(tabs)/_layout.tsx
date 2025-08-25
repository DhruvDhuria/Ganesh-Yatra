import { Tabs } from 'expo-router';
import { MapPin, List, Heart, User } from 'lucide-react-native';
import { StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  console.log(insets)
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#DC2626',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Map',
            tabBarIcon: ({ size, color }) => (
              <MapPin size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="areas"
          options={{
            title: 'Areas',
            tabBarIcon: ({ size, color }) => <List size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: 'Favorites',
            tabBarIcon: ({ size, color }) => (
              <Heart size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ size, color }) => <User size={size} color={color} />,
          }}
        />
      </Tabs>
    </>
  );
  
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#FFD700',
    paddingBottom: 5,
    paddingTop: 5,
    height: 65,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});