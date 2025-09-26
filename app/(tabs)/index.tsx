import { CATEGORIES } from '@/data/units';
import { useTheme } from '@/store';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 50,
      paddingBottom: 16,
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
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
      marginBottom: 20,
      backgroundColor: colors.surface,
      borderRadius: 12,
      paddingHorizontal: 16,
      elevation: 2,
      shadowColor: '#000', // keep as constant (system shadow)
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    searchIcon: {
      marginRight: 12,
    },
    searchInput: {
      flex: 1,
      paddingVertical: 14,
      fontSize: 16,
      color: colors.text,
    },
    quickAccess: {
      flexDirection: 'row',
      marginHorizontal: 20,
      marginBottom: 20,
      gap: 12,
    },
    quickAccessSection: {
      flex: 1,
      backgroundColor: colors.surface,
      padding: 16,
      borderRadius: 12,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginLeft: 8,
    },
    sectionSubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    categoriesTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text,
      marginHorizontal: 20,
      marginBottom: 16,
    },
    categoriesContainer: {
      paddingHorizontal: 14,
      paddingBottom: 90,
    },
    row: {
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    categoryCard: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      marginHorizontal: 6,
      borderLeftWidth: 4,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    categoryContent: {
      alignItems: 'center',
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
    },
    iconPlaceholder: {
      fontSize: 16,
      fontWeight: '600',
    },
    categoryTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
      textAlign: 'center',
    },
    categorySubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });

  const categories = Object.values(CATEGORIES).filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCategory = ({ item } : {item : any}) => (
    <TouchableOpacity
      style={[styles.categoryCard, { borderLeftColor: item.color }]}
      onPress={() => router.push(`/converter/${item.id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.categoryContent}>
        <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
          <Text style={[styles.iconPlaceholder, { color: item.color }]}>
            {item.icon.slice(0, 2).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.categoryTitle}>{item.name}</Text>
        <Text style={styles.categorySubtitle}>
          {item.units.length} units
        </Text>
      </View>
    </TouchableOpacity>
  );



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Units Converter</Text>
        <Text style={styles.subtitle}>Convert between different units</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color={colors.textMuted} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search categories..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.textMuted}
        />
      </View>

      <Text style={styles.categoriesTitle}>Categories</Text>
      
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      />
    </SafeAreaView>
  );
};
