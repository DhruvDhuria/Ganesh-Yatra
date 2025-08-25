import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Users, Clock } from 'lucide-react-native';
import { mandalData, areaData } from '@/data/mandalData';
import { openGoogleMaps } from '@/utils/mapUtils';

export default function AreasScreen() {
  const router = useRouter();
  const [selectedArea, setSelectedArea] = useState<string>('All');

  const filteredMandals = selectedArea === 'All' 
    ? mandalData 
    : mandalData.filter(mandal => mandal.area === selectedArea);

  const handleMandalPress = (mandal: any) => {
    router.push({
      pathname: '/mandal-details',
      params: { mandalId: mandal.id }
    });
  };

  const renderMandalCard = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.mandalCard}
      onPress={() => handleMandalPress(item)}
    >
      <View style={styles.mandalCardHeader}>
        <Text style={styles.mandalName}>{item.name}</Text>
        <View style={styles.crowdIndicator}>
          <Users size={16} color="#DC2626" />
          <Text style={styles.crowdText}>{item.crowdLevel}</Text>
        </View>
      </View>
      
      <View style={styles.mandalDetails}>
        <View style={styles.detailRow}>
          <TouchableOpacity 
            style={styles.addressRow}
            onPress={() => openGoogleMaps(item.address, item.name)}
          >
            <MapPin size={14} color="#DC2626" />
            <Text style={[styles.detailText, styles.addressText]}>
              {item.area} • {item.distance}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailRow}>
          <Clock size={14} color="#6B7280" />
          <Text style={styles.detailText}>{item.visitingHours}</Text>
        </View>
      </View>

      {item.specialFeatures.length > 0 && (
        <View style={styles.featuresContainer}>
          {item.specialFeatures.slice(0, 2).map((feature: any, index: number) => (
            <View key={index} style={styles.featureTag}>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      )}

      <Text style={styles.establishedYear}>Est. {item.establishedYear}</Text>
    </TouchableOpacity>
  );

  const renderAreaCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.areaCard,
        selectedArea === item.name && styles.selectedAreaCard
      ]}
      onPress={() => setSelectedArea(item.name)}
    >
      <Text style={[
        styles.areaName,
        selectedArea === item.name && styles.selectedAreaName
      ]}>
        {item.name}
      </Text>
      <Text style={styles.areaCount}>{item.count} mandals</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📍 Areas & Mandals</Text>
        <Text style={styles.headerSubtitle}>
          {filteredMandals.length} mandals {selectedArea !== 'All' ? `in ${selectedArea}` : 'total'}
        </Text>
      </View>

      {/* Area Filter */}
      <View style={styles.filterSection}>
        <FlatList
          horizontal
          data={[{ name: 'All', count: mandalData.length }, ...areaData]}
          renderItem={renderAreaCard}
          keyExtractor={(item) => item.name}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.areaList}
        />
      </View>

      {/* Mandals List */}
      <FlatList
        data={filteredMandals}
        renderItem={renderMandalCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.mandalsList}
      />
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
  headerSubtitle: {
    fontSize: 14,
    color: '#FEE2E2',
    marginTop: 5,
  },
  filterSection: {
    paddingVertical: 15,
  },
  areaList: {
    paddingHorizontal: 20,
  },
  areaCard: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  selectedAreaCard: {
    backgroundColor: '#FF8C42',
    borderColor: '#FF8C42',
  },
  areaName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  selectedAreaName: {
    color: '#FFFFFF',
  },
  areaCount: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  mandalsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  mandalCard: {
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
    borderRadius: 15,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  mandalCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  mandalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
    marginRight: 10,
  },
  crowdIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  crowdText: {
    fontSize: 12,
    color: '#DC2626',
    marginLeft: 4,
    fontWeight: '600',
  },
  mandalDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    color: '#DC2626',
    textDecorationLine: 'underline',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  featureTag: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 11,
    color: '#92400E',
    fontWeight: '500',
  },
  establishedYear: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
});