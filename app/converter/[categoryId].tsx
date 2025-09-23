import { CATEGORIES, UNITS } from '@/data/units';
import { useConvert } from '@/hooks/useConvert';
import { useHaptics } from '@/hooks/useHaptics';
import { useAppStore, useTheme } from '@/store';
import { ConversionResult } from '@/types';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams } from 'expo-router';
import { ArrowUpDown, Share2, Star, X } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function ConverterScreen(){
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const { convertToAll } = useConvert();
  const addToHistory = useAppStore(state => state.addToHistory);
  const addFavorite = useAppStore(state => state.addFavorite);
  const removeFavorite = useAppStore(state => state.removeFavorite);
  const favorites = useAppStore(state => state.favorites);
  const { colors } = useTheme(); 
  const { impact } = useHaptics();
  
  const category = CATEGORIES[categoryId!];
  const categoryUnits = category?.units.map(id => UNITS[id]) || [];
  
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState(categoryUnits[0]);
  const [toUnit, setToUnit] = useState(categoryUnits[1] || categoryUnits[0]);
  const [results, setResults] = useState<ConversionResult[]>([]);
  
  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [pickerType, setPickerType] = useState<'from' | 'to'>('from');
  const [searchText, setSearchText] = useState('');

  const pairId = `${fromUnit?.id}_${toUnit?.id}`;
  const isFavorite = favorites.some(f => f.id === pairId);

  // Filter units based on search
  const filteredUnits = categoryUnits.filter(unit =>
    unit.name.toLowerCase().includes(searchText.toLowerCase()) ||
    unit.symbol.toLowerCase().includes(searchText.toLowerCase())
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: colors.surface,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
    },
    headerActions: {
      flexDirection: 'row',
      gap: 12,
    },
    actionButton: {
      padding: 8,
    },
    inputSection: {
      padding: 20,
      backgroundColor: colors.surface,
      marginTop: 8,
    },
    mainInput: {
      fontSize: 32,
      fontWeight: '600',
      color: colors.text,
      textAlign: 'center',
      padding: 16,
      backgroundColor: colors.background,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.border,
    },
    unitsSection: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: colors.surface,
      marginTop: 8,
    },
    unitPicker: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    unitPickerLabel: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 4,
    },
    unitPickerValue: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
    },
    swapButton: {
      marginHorizontal: 16,
      padding: 12,
      backgroundColor: colors.primaryLight,
      borderRadius: 12,
    },
    resultsSection: {
      flex: 1,
      marginTop: 8,
      backgroundColor: colors.surface,
    },
    resultsTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 12,
    },
    resultsList: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    resultItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      backgroundColor: colors.background,
      borderRadius: 12,
      marginBottom: 8,
    },
    resultItemHighlighted: {
      backgroundColor: colors.primaryLight,
      borderWidth: 2,
      borderColor: colors.primary,
    },
    resultLeft: {
      flex: 1,
    },
    resultSymbol: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    resultName: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 2,
    },
    resultValue: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
    },
    resultValueHighlighted: {
      color: colors.primary,
    },
    errorText: {
      fontSize: 18,
      color: colors.error,
      textAlign: 'center',
      marginTop: 50,
    },
    // Modal styles
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 0,
      margin: 20,
      maxHeight: '80%',
      width: '90%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
    },
    closeButton: {
      padding: 4,
    },
    searchContainer: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    searchInput: {
      backgroundColor: colors.background,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.border,
    },
    unitsList: {
      maxHeight: 400,
    },
    unitItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    unitItemSelected: {
      backgroundColor: colors.primaryLight,
    },
    unitInfo: {
      flex: 1,
    },
    unitSymbol: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    unitName: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 2,
    },
    selectedIndicator: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkmark: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
    },
  });

  useEffect(() => {
    if (fromUnit && categoryId) {
      const numValue = parseFloat(inputValue.replace(/,/g, ''));
      if (!isNaN(numValue)) {
        const convertedResults = convertToAll(numValue, fromUnit.id, categoryId);
        setResults(convertedResults);
        
        // Add to history
        const pair = {
          id: pairId,
          categoryId: categoryId!,
          fromUnitId: fromUnit.id,
          toUnitId: toUnit?.id || fromUnit.id,
          timestamp: Date.now()
        };
        addToHistory(pair);
      } else {
        setResults([]);
      }
    }
  }, [inputValue, fromUnit, toUnit, categoryId, convertToAll, addToHistory, pairId]);

  const handleSwapUnits = () => {
    if (fromUnit && toUnit) {
      impact(Haptics.ImpactFeedbackStyle.Medium);
      setFromUnit(toUnit);
      setToUnit(fromUnit);
    }
  };

  const handleFavorite = () => {
    if (!fromUnit || !toUnit) return;
    
    impact(Haptics.ImpactFeedbackStyle.Light);
    
    if (isFavorite) {
      removeFavorite(pairId);
    } else {
      const pair = {
        id: pairId,
        categoryId: categoryId!,
        fromUnitId: fromUnit.id,
        toUnitId: toUnit.id,
        timestamp: Date.now(),
        isFavorite: true
      };
      addFavorite(pair);
    }
  };

  const handleShare = async () => {
    if (!results.length || !fromUnit) return;
    
    const mainResult = results.find(r => r.unit.id === toUnit?.id) || results[0];
    const shareText = `${inputValue} ${fromUnit.symbol} = ${mainResult.formatted} ${mainResult.unit.symbol}`;
    
    try {
      await Clipboard.setStringAsync(shareText);
      Alert.alert('Copied!', 'Result copied to clipboard');
    } catch (error) {
      console.error('Failed to copy conversion result to clipboard', error);
      Alert.alert('Error', 'Failed to copy result');
    }
  };

  const openUnitPicker = (type: 'from' | 'to') => {
    setPickerType(type);
    setSearchText('');
    setModalVisible(true);
    impact(Haptics.ImpactFeedbackStyle.Light);
  };

  const selectUnit = (unit: any) => {
    impact(Haptics.ImpactFeedbackStyle.Medium);
    
    if (pickerType === 'from') {
      setFromUnit(unit);
    } else {
      setToUnit(unit);
    }
    
    setModalVisible(false);
  };

  const renderUnitPicker = (unit: typeof fromUnit, type: 'from' | 'to', title: string) => (
    <TouchableOpacity
      style={styles.unitPicker}
      onPress={() => openUnitPicker(type)}
      activeOpacity={0.7}
    >
      <Text style={styles.unitPickerLabel}>{title}</Text>
      <Text style={styles.unitPickerValue}>
        {unit?.name || 'Select unit'} ({unit?.symbol || '?'})
      </Text>
    </TouchableOpacity>
  );

  const renderUnitItem = ({ item }: { item: any }) => {
    const isSelected = (pickerType === 'from' ? fromUnit?.id : toUnit?.id) === item.id;
    
    return (
      <TouchableOpacity
        style={[styles.unitItem, isSelected && styles.unitItemSelected]}
        onPress={() => selectUnit(item)}
        activeOpacity={0.7}
      >
        <View style={styles.unitInfo}>
          <Text style={styles.unitSymbol}>{item.symbol}</Text>
          <Text style={styles.unitName}>{item.name}</Text>
        </View>
        {isSelected && (
          <View style={styles.selectedIndicator}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderResultItem = ({ item }: { item: ConversionResult }) => (
    <View style={[
      styles.resultItem,
      item.unit.id === toUnit?.id && styles.resultItemHighlighted
    ]}>
      <View style={styles.resultLeft}>
        <Text style={styles.resultSymbol}>{item.unit.symbol}</Text>
        <Text style={styles.resultName}>{item.unit.name}</Text>
      </View>
      <Text style={[
        styles.resultValue,
        item.unit.id === toUnit?.id && styles.resultValueHighlighted
      ]}>
        {item.formatted}
      </Text>
    </View>
  );

  if (!category) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Category not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{category.name}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleFavorite}
            activeOpacity={0.7}
          >
            <Star
              size={24}
              color={isFavorite ? '#F59E0B' : '#6B7280'}
              fill={isFavorite ? '#F59E0B' : 'transparent'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleShare}
            activeOpacity={0.7}
          >
            <Share2 size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputSection}>
        <TextInput
          style={styles.mainInput}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Enter value"
          keyboardType="numeric"
          returnKeyType="done"
          selectTextOnFocus
        />
      </View>

      <View style={styles.unitsSection}>
        {renderUnitPicker(fromUnit, 'from', 'From')}
        
        <TouchableOpacity
          style={styles.swapButton}
          onPress={handleSwapUnits}
          activeOpacity={0.7}
        >
          <ArrowUpDown size={24} color="#3B82F6" />
        </TouchableOpacity>
        
        {renderUnitPicker(toUnit, 'to', 'To')}
      </View>

      <View style={styles.resultsSection}>
        <Text style={styles.resultsTitle}>All Conversions</Text>
        <FlatList
          data={results}
          renderItem={renderResultItem}
          keyExtractor={(item) => item.unit.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.resultsList}
        />
      </View>

      {/* Unit Picker Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Select {pickerType === 'from' ? 'From' : 'To'} Unit
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search units..."
                placeholderTextColor={colors.textSecondary}
                value={searchText}
                onChangeText={setSearchText}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <FlatList
              style={styles.unitsList}
              data={filteredUnits}
              renderItem={renderUnitItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
