import { CATEGORIES, UNITS } from '@/data/units';
import { useAppStore, useTheme } from '@/store';
import { ConversionPair } from '@/types';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { ArrowRight, Heart, Star } from 'lucide-react-native';
import React from 'react';
import {
  Alert,
  Animated,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, removeFavorite } = useAppStore();
  const {colors} = useTheme() ; 

  console.log("favorites"  ,favorites)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 16,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    listContainer: {
      padding: 16,
    },
    favoriteItem: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      elevation: 2,
      shadowColor: '#000', // system constant (not themed)
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    favoriteContent: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },
    favoriteLeft: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    categoryIndicator: {
      width: 4,
      height: 48,
      borderRadius: 2,
      marginRight: 16,
      // 🔑 You can dynamically set this in your component using colors.primary / success / warning
    },
    favoriteInfo: {
      flex: 1,
    },
    conversionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    unitSymbol: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
    },
    arrowIcon: {
      marginHorizontal: 8,
    },
    unitNames: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 2,
    },
    categoryName: {
      fontSize: 12,
      color: colors.textMuted,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      fontWeight: '500',
    },
    removeButton: {
      padding: 12,
      borderRadius: 12,
      backgroundColor: colors.warning, // was #FEF3C7
    },
    separator: {
      height: 12,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    emptyIconContainer: {
      marginBottom: 24,
    },
    emptyTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    emptySubtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: 32,
    },
    emptyButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 12,
    },
    emptyButtonText: {
      color: colors.onPrimary,
      fontSize: 16,
      fontWeight: '600',
    },
  });

  const handleRemoveFavorite = (favoriteId: string, fromUnit: string, toUnit: string) => {
    console.log("favorite id " , favoriteId , fromUnit ,toUnit )  ;
    Alert.alert(
      'Remove Favorite',
      `Remove ${fromUnit} → ${toUnit} from favorites?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            removeFavorite(favoriteId);
          }
        }
      ]
    );
  };


  const handleFavoritePress = (categoryId: string) => {
    router.push(`/converter/${categoryId}`);
  };

  const renderFavoriteItem = ({ item, index } : {item : ConversionPair, index : number}) => {
    const fromUnit = UNITS[item.fromUnitId];
    const toUnit = UNITS[item.toUnitId];
    const category = CATEGORIES[item.categoryId];
    
    if (!fromUnit || !toUnit || !category) return null;

    return (
      // <Animated.View style={[styles.favoriteItem, { opacity: 1 }]}>
      //   <TouchableOpacity
      //     style={styles.favoriteContent}
      //     onPress={() => handleFavoritePress(item.categoryId)}
      //     activeOpacity={0.7}
      //   >
      //     <View style={styles.favoriteLeft}>
      //       <View style={[styles.categoryIndicator, { backgroundColor: category.color }]} />
      //       <View style={styles.favoriteInfo}>
      //         <View style={styles.conversionRow}>
      //           <Text style={styles.unitSymbol}>{fromUnit.symbol}</Text>
      //           <ArrowRight size={16} color="#6B7280" style={styles.arrowIcon} />
      //           <Text style={styles.unitSymbol}>{toUnit.symbol}</Text>
      //         </View>
      //         <Text style={styles.unitNames}>
      //           {fromUnit.name} to {toUnit.name}
      //         </Text>
      //         <Text style={styles.categoryName}>{category.name}</Text>
      //       </View>
      //     </View>
          
      //     <TouchableOpacity
      //       style={styles.removeButton}
      //       onPress={() => handleRemoveFavorite(
      //         item.id, 
      //         fromUnit.symbol, 
      //         toUnit.symbol
      //       )}
      //       activeOpacity={0.7}
      //     >
      //       <Star size={20} color="#F59E0B" fill="#F59E0B" />
      //     </TouchableOpacity>
      //   </TouchableOpacity>
      // </Animated.View>
       <Animated.View style={[styles.favoriteItem, { opacity: 1 }]}>
      <View style={styles.favoriteContent}>
        <TouchableOpacity
          style={styles.favoriteLeft}
          onPress={() => handleFavoritePress(item.categoryId)}
          activeOpacity={0.7}
        >
          <View style={[styles.categoryIndicator, { backgroundColor: category.color }]} />
          <View style={styles.favoriteInfo}>
            <View style={styles.conversionRow}>
              <Text style={styles.unitSymbol}>{fromUnit.symbol}</Text>
              <ArrowRight size={16} color="#6B7280" style={styles.arrowIcon} />
              <Text style={styles.unitSymbol}>{toUnit.symbol}</Text>
            </View>
            <Text style={styles.unitNames}>
              {fromUnit.name} to {toUnit.name}
            </Text>
            <Text style={styles.categoryName}>{category.name}</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveFavorite(
              item.id, 
              fromUnit.symbol, 
              toUnit.symbol
            )}
          activeOpacity={0.7}
        >
          <Star size={20} color="#F59E0B" fill="#F59E0B" />
        </TouchableOpacity>
      </View>
    </Animated.View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <Heart size={64} color="#E5E7EB" />
      </View>
      <Text style={styles.emptyTitle}>No favorites yet</Text>
      <Text style={styles.emptySubtitle}>
        Star unit pairs in the converter to save them here for quick access
      </Text>
      <TouchableOpacity 
        style={styles.emptyButton}
        onPress={() => router.push('/')}
        activeOpacity={0.7}
      >
        <Text style={styles.emptyButtonText}>Browse Categories</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.subtitle}>
          {favorites.length} saved conversion{favorites.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {favorites.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FAFAFA',
//   },
//   header: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 16,
//     backgroundColor: '#FFFFFF',
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: '700',
//     color: '#111827',
//     marginBottom: 4,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#6B7280',
//   },
//   listContainer: {
//     padding: 16,
//   },
//   favoriteItem: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   favoriteContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//   },
//   favoriteLeft: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   categoryIndicator: {
//     width: 4,
//     height: 48,
//     borderRadius: 2,
//     marginRight: 16,
//   },
//   favoriteInfo: {
//     flex: 1,
//   },
//   conversionRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   unitSymbol: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#111827',
//   },
//   arrowIcon: {
//     marginHorizontal: 8,
//   },
//   unitNames: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginBottom: 2,
//   },
//   categoryName: {
//     fontSize: 12,
//     color: '#9CA3AF',
//     textTransform: 'uppercase',
//     letterSpacing: 0.5,
//     fontWeight: '500',
//   },
//   removeButton: {
//     padding: 12,
//     borderRadius: 12,
//     backgroundColor: '#FEF3C7',
//   },
//   separator: {
//     height: 12,
//   },
//   emptyState: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 40,
//   },
//   emptyIconContainer: {
//     marginBottom: 24,
//   },
//   emptyTitle: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#111827',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   emptySubtitle: {
//     fontSize: 16,
//     color: '#6B7280',
//     textAlign: 'center',
//     lineHeight: 24,
//     marginBottom: 32,
//   },
//   emptyButton: {
//     backgroundColor: '#3B82F6',
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 12,
//   },
//   emptyButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });