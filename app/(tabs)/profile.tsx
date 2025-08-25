import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { 
  User, 
  MapPin, 
  Heart, 
  Settings, 
  Info, 
  Share2, 
  Star,
  Bell,
  Globe,
  Shield
} from 'lucide-react-native';

export default function ProfileScreen() {
  const handleMenuPress = (item: string) => {
    Alert.alert('Coming Soon', `${item} feature will be available in the next update!`);
  };

  const handleShare = () => {
    Alert.alert(
      'Share App',
      'Share the Ganpati Mandal Guide app with your friends and family!'
    );
  };

  const handleRate = () => {
    Alert.alert(
      'Rate Us',
      'Thank you for using our app! Please rate us on the Play Store.'
    );
  };

  const menuItems = [
    { icon: Bell, title: 'Notifications', subtitle: 'Manage your notifications' },
    { icon: MapPin, title: 'Location Services', subtitle: 'Location preferences' },
    { icon: Globe, title: 'Language', subtitle: 'Change app language' },
    { icon: Shield, title: 'Privacy', subtitle: 'Privacy settings' },
    { icon: Info, title: 'About', subtitle: 'App information & version' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>👤 Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <User size={48} color="#FF8C42" />
          </View>
          <Text style={styles.profileName}>Festival Devotee</Text>
          <Text style={styles.profileSubtitle}>Mumbai, Maharashtra</Text>
          
          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>Visited</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>2025</Text>
              <Text style={styles.statLabel}>Since</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Share2 size={24} color="#DC2626" />
              <Text style={styles.actionText}>Share App</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleRate}>
              <Star size={24} color="#DC2626" />
              <Text style={styles.actionText}>Rate Us</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Festival Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Festival 2025 Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <MapPin size={24} color="#FF8C42" />
              <Text style={styles.statCardNumber}>15</Text>
              <Text style={styles.statCardLabel}>Mandals Visited</Text>
            </View>
            <View style={styles.statCard}>
              <Heart size={24} color="#DC2626" />
              <Text style={styles.statCardNumber}>4</Text>
              <Text style={styles.statCardLabel}>Favorites Added</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => handleMenuPress(item.title)}
            >
              <View style={styles.menuIcon}>
                <item.icon size={20} color="#6B7280" />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Settings size={16} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Ganpati Mandal Guide v1.0</Text>
          <Text style={styles.appSubtext}>Made with ❤️ for Mumbai Festival</Text>
          <Text style={styles.copyright}>© 2025 Ganesh Festival Guide</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F3',
  },
  header: {
    backgroundColor: '#DC2626',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    paddingVertical: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  profileSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E5E7EB',
  },
  section: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  actionText: {
    fontSize: 14,
    color: '#374151',
    marginTop: 8,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statCardNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 10,
  },
  statCardLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 5,
    textAlign: 'center',
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  appVersion: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  appSubtext: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 5,
  },
  copyright: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 10,
  },
});