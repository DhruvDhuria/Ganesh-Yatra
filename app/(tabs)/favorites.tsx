import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Heart, MapPin, Navigation, Trash2 } from 'lucide-react-native';
import { mandalData } from '@/data/mandalData';
import { openGoogleMaps, getDirections } from '@/utils/mapUtils';
import { useFavourites,  } from '@/context/favouriteContext';


export default function FavoritesScreen() {
  const router = useRouter();
  const {favourites, toggleFavourite} = useFavourites();
  const [favouriteMandals, setFavouriteMandals] = useState<any[]>([]);

  console.log("favouriteMandals", favouriteMandals)
  console.log("favoritecontext", favourites)
  useEffect(() => {
    setFavouriteMandals(favourites);
  }, [favourites]);

  const favoriteMandals = mandalData.filter(mandal => 
    favourites.includes(mandal.id)
  );

  const removeFavorite = (mandalId: any) => {
    Alert.alert(
      'Remove Favorite',
      'Are you sure you want to remove this mandal from favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
           toggleFavourite(mandalId);
          }
        },
      ]
    );
  };

  const handleMandalPress = (mandal: any) => {
    router.push({
      pathname: '/mandal-details',
      params: { mandalId: mandal.id }
    });
  };

  const handleGetDirections = (mandal: any) => {
    getDirections(mandal.address, mandal.name);
  };

  const renderFavoriteCard = ({ item }: { item: any }) => (
    <View style={styles.favoriteCard}>
      <TouchableOpacity 
        style={styles.cardContent}
        onPress={() => handleMandalPress(item)}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.mandalName}>{item.name}</Text>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeFavorite(item.id)}
          >
            <Trash2 size={18} color="#DC2626" />
          </TouchableOpacity>
        </View>

        <View style={styles.mandalInfo}>
          <TouchableOpacity 
            style={styles.infoRow}
            onPress={() => openGoogleMaps(item.address, item.name)}
          >
            <MapPin size={14} color="#6B7280" />
            <Text style={[styles.infoText, styles.addressText]}>
              {item.area} • {item.distance}
            </Text>
          </TouchableOpacity>
          <Text style={styles.establishedText}>Established {item.establishedYear}</Text>
        </View>

        {item.specialFeatures.length > 0 && (
          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>Special Features:</Text>
            {item.specialFeatures.slice(0, 2).map((feature: any, index:any) => (
              <View key={index} style={styles.featureTag}>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.directionsButton}
        onPress={() => handleGetDirections(item)}
      >
        <Navigation size={20} color="#FFFFFF" />
        <Text style={styles.directionsText}>Get Directions</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Heart size={64} color="#E5E7EB" />
      <Text style={styles.emptyTitle}>No Favorites Yet</Text>
      <Text style={styles.emptySubtitle}>
        Start adding mandals to your favorites to see them here
      </Text>
      <TouchableOpacity 
        style={styles.exploreButton}
        onPress={() => router.push('/areas')}
      >
        <Text style={styles.exploreButtonText}>Explore Mandals</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>❤️ My Favorites</Text>
        <Text style={styles.headerSubtitle}>
          {favoriteMandals.length} saved mandals
        </Text>
      </View>

      {favoriteMandals.length === 0 ? (
        renderEmptyState()
      ) : (
        <>
          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{favoriteMandals.length}</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {new Set(favoriteMandals.map(m => m.area)).size}
              </Text>
              <Text style={styles.statLabel}>Areas</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {Math.round(favoriteMandals.reduce((acc, m) => 
                  acc + parseFloat(m.distance.replace('km', '')), 0
                ) / favoriteMandals.length * 10) / 10}km
              </Text>
              <Text style={styles.statLabel}>Avg Distance</Text>
            </View>
          </View>

          {/* Favorites List */}
          <FlatList
            data={favoriteMandals}
            renderItem={renderFavoriteCard}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.favoritesList}
          />
        </>
      )}
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#FFD700',
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
  favoritesList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  favoriteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#FF8C42',
    overflow: 'hidden',
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
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
  removeButton: {
    padding: 5,
  },
  mandalInfo: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  addressText: {
    color: '#DC2626',
    textDecorationLine: 'underline',
  },
  establishedText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  featuresContainer: {
    marginTop: 8,
  },
  featuresTitle: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '600',
    marginBottom: 6,
  },
  featureTag: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  featureText: {
    fontSize: 11,
    color: '#92400E',
    fontWeight: '500',
  },
  directionsButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  directionsText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 20,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 24,
  },
  exploreButton: {
    backgroundColor: '#FF8C42',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 30,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});