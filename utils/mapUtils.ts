import { Linking, Alert } from 'react-native';

export const openGoogleMaps = (address: string, mandalName: string) => {
  const encodedAddress = encodeURIComponent(address);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  
  Linking.canOpenURL(googleMapsUrl)
    .then((supported) => {
      if (supported) {
        Linking.openURL(googleMapsUrl);
      } else {
        Alert.alert(
          'Maps Not Available',
          'Google Maps is not available on this device'
        );
      }
    })
    .catch((err) => {
      console.error('Error opening maps:', err);
      Alert.alert(
        'Error',
        'Unable to open maps. Please try again.'
      );
    });
};

export const getDirections = (address: string, mandalName: string) => {
  const encodedAddress = encodeURIComponent(address);
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  
  Linking.canOpenURL(directionsUrl)
    .then((supported) => {
      if (supported) {
        Linking.openURL(directionsUrl);
      } else {
        Alert.alert(
          'Navigation Not Available',
          'Google Maps navigation is not available on this device'
        );
      }
    })
    .catch((err) => {
      console.error('Error opening directions:', err);
      Alert.alert(
        'Error',
        'Unable to open navigation. Please try again.'
      );
    });
};