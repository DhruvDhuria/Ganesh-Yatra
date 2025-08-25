import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Phone, 
  Heart, 
  Navigation, 
  Share2,
  Calendar,
  Users,
  Star
} from 'lucide-react-native';
import { mandalData } from '@/data/mandalData';
import { openGoogleMaps, getDirections } from '@/utils/mapUtils';

const { width } = Dimensions.get('window');

export default function MandalDetailsScreen() {
  const router = useRouter();
  const { mandalId } = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const mandal = mandalData.find(m => m.id === mandalId);

  if (!mandal) {
    return (
      <>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Mandal not found</Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  const handleGetDirections = () => {
    getDirections(mandal.address, mandal.name);
  };

  const handleShare = () => {
    Alert.alert(
      'Share Mandal',
      `Share ${mandal.name} with your friends and family!`
    );
  };

  const handleCall = () => {
    if (mandal.contactInfo.phone) {
      Alert.alert('Call', `Would you like to call ${mandal.contactInfo.phone}?`);
    } else {
      Alert.alert('No Contact', 'Contact information not available for this mandal.');
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    Alert.alert(
      'Favorites',
      isFavorite 
        ? `${mandal.name} removed from favorites` 
        : `${mandal.name} added to favorites`
    );
  };

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {mandal.name}
        </Text>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={toggleFavorite}
        >
          <Heart 
            size={24} 
            color={isFavorite ? '#FF8C42' : '#FFFFFF'} 
            fill={isFavorite ? '#FF8C42' : 'none'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image Placeholder */}
        <View style={styles.heroImage}>
          <View style={styles.heroContent}>
            <Text style={styles.heroEmoji}>🕉️</Text>
            <Text style={styles.heroText}>Sacred Ganesh Darshan</Text>
          </View>
          <View style={styles.crowdBadge}>
            <Users size={16} color="#FFFFFF" />
            <Text style={styles.crowdText}>{mandal.crowdLevel} Crowd</Text>
          </View>
        </View>

        {/* Main Info */}
        <View style={styles.mainInfo}>
          <Text style={styles.mandalName}>{mandal.name}</Text>
          <View style={styles.locationRow}>
            <MapPin size={16} color="#6B7280" />
            <Text style={styles.locationText}>{mandal.area} • {mandal.distance}</Text>
          </View>
          <View style={styles.establishedRow}>
            <Calendar size={16} color="#6B7280" />
            <Text style={styles.establishedText}>Established in {mandal.establishedYear}</Text>
          </View>
        </View>

        {/* Special Features */}
        {mandal.specialFeatures.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>✨ Special Features</Text>
            <View style={styles.featuresContainer}>
              {mandal.specialFeatures.map((feature, index) => (
                <View key={index} style={styles.featureTag}>
                  <Star size={12} color="#92400E" />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Timing & Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🕐 Visiting Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Clock size={20} color="#FF8C42" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Visiting Hours</Text>
                <Text style={styles.infoValue}>{mandal.visitingHours}</Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <TouchableOpacity 
              style={styles.infoRow}
              onPress={() => openGoogleMaps(mandal.address, mandal.name)}
            >
              <MapPin size={20} color="#FF8C42" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Address</Text>
                <Text style={[styles.infoValue, styles.addressValue]}>
                  {mandal.address}
                </Text>
              </View>
            </TouchableOpacity>

            {mandal.contactInfo.phone && (
              <>
                <View style={styles.divider} />
                <TouchableOpacity style={styles.infoRow} onPress={handleCall}>
                  <Phone size={20} color="#FF8C42" />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Contact</Text>
                    <Text style={[styles.infoValue, styles.phoneText]}>
                      {mandal.contactInfo.phone}
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📖 About This Mandal</Text>
          <Text style={styles.description}>
            {mandal.name} is a revered Ganpati mandal established in {mandal.establishedYear} 
            in the vibrant locality of {mandal.area}. This sacred place has been serving 
            devotees for over {new Date().getFullYear() - mandal.establishedYear} years, 
            making it an integral part of Mumbai's rich cultural heritage during Ganesh Chaturthi.
            
            {mandal.specialFeatures.length > 0 && (
              ` Known for its ${mandal.specialFeatures.join(', ').toLowerCase()}, this mandal 
              continues to attract thousands of devotees every year.`
            )}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleGetDirections}
          >
            <Navigation size={20} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Get Directions</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={handleShare}
          >
            <Share2 size={20} color="#DC2626" />
            <Text style={styles.secondaryButtonText}>Share</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F3',
  },
  header: {
    backgroundColor: '#DC2626',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  heroImage: {
    height: 200,
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  heroContent: {
    alignItems: 'center',
  },
  heroEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  heroText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  crowdBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(220, 38, 38, 0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  crowdText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  mainInfo: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop: -20,
    marginHorizontal: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  mandalName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  establishedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  establishedText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
    fontStyle: 'italic',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureTag: {
    backgroundColor: '#FEF3C7',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#92400E',
    fontWeight: '600',
    marginLeft: 4,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
    marginLeft: 15,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  phoneText: {
    color: '#DC2626',
    textDecorationLine: 'underline',
  },
  addressValue: {
    color: '#DC2626',
    textDecorationLine: 'underline',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 15,
  },
  description: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 24,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 15,
  },
  primaryButton: {
    backgroundColor: '#DC2626',
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 25,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#DC2626',
  },
  secondaryButtonText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  bottomPadding: {
    height: 30,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});