import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Navigation, MapPin } from 'lucide-react-native';
import { mandalData } from '@/data/mandalData';
import { getDirections } from '@/utils/mapUtils';
import Map from '@/components/Map';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');


export default function MapScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedMandal, setSelectedMandal] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMandals = mandalData.filter(
    (mandal) =>
      mandal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mandal.area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMandalPress = (mandal: any) => {
    setSelectedMandal(mandal);
  };

  const handleGetDirections = () => {
    if (selectedMandal) {
      getDirections(selectedMandal.address, selectedMandal.name);
    }
  };

  const handleMandalDetails = () => {
    if (selectedMandal) {
      router.push({
        pathname: '/mandal-details',
        params: { mandalId: selectedMandal.id },
      });
    }
  };

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🕉️ Ganpati Mandal Guide</Text>
        <Text style={styles.headerSubtitle}>Mumbai Festival 2025</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          onChangeText={(newText) => setSearchQuery(newText)}
          placeholder="Search mandals..."
          value={searchQuery}
        />
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <MapPin size={48} color="#FF8C42" />
          <Map />
          <Text style={styles.mapText}>Interactive Map View</Text>
          <Text style={styles.mapSubtext}>
            {mandalData.length} Mandals Available
          </Text>
        </View>

        {/* Map Markers Simulation */}
        <View style={styles.markersContainer}>
          {mandalData.slice(0, 6).map((mandal, index) => (
            <TouchableOpacity
              key={mandal.id}
              style={[
                styles.marker,
                {
                  top: 100 + ((index * 30) % 200),
                  left: 50 + ((index * 50) % 250),
                },
              ]}
              onPress={() => handleMandalPress(mandal)}
            >
              <Text style={styles.markerText}>📍</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Selected Mandal Info */}
      {selectedMandal && (
        <View style={styles.selectedMandalContainer}>
          <View style={styles.selectedMandalInfo}>
            <Text style={styles.selectedMandalName}>{selectedMandal.name}</Text>
            <Text style={styles.selectedMandalArea}>{selectedMandal.area}</Text>
            <Text style={styles.selectedMandalDistance}>
              📍 {selectedMandal.distance} • Est. {selectedMandal.visitingHours}
            </Text>
          </View>
          <View style={styles.selectedMandalActions}>
            <TouchableOpacity
              style={styles.directionsButton}
              onPress={handleGetDirections}
            >
              <Navigation size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={handleMandalDetails}
            >
              <Text style={styles.detailsButtonText}>Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Quick Stats */}
      <ScrollView
        horizontal
        style={styles.statsContainer}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>50+</Text>
          <Text style={styles.statLabel}>Mandals</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>16</Text>
          <Text style={styles.statLabel}>Areas</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>2.5km</Text>
          <Text style={styles.statLabel}>Avg Distance</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>Live</Text>
          <Text style={styles.statLabel}>Updates</Text>
        </View>
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
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FEE2E2',
    marginTop: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#666',
    // outline: "none
  },
  mapContainer: {
    flex: 1,
    marginHorizontal: 20,
    backgroundColor: '#F3F4F6',
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
  },
  mapText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 10,
  },
  mapSubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 5,
  },
  markersContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  marker: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  markerText: {
    fontSize: 16,
  },
  selectedMandalContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 15,
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#FF8C42',
  },
  selectedMandalInfo: {
    flex: 1,
  },
  selectedMandalName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  selectedMandalArea: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  selectedMandalDistance: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  selectedMandalActions: {
    flexDirection: 'row',
    gap: 10,
  },
  directionsButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsButton: {
    backgroundColor: '#FF8C42',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  statsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    marginRight: 15,
    alignItems: 'center',
    minWidth: 80,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
});
