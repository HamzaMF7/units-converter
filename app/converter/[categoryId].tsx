import { CATEGORIES, UNITS } from '@/data/units';
import { useConvert } from '@/hooks/useConvert';
import { useAppStore } from '@/store';
import { ConversionResult } from '@/types';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowUpDown, Share2, Star } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function ConverterScreen(){
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const router = useRouter();
  const { convertToAll } = useConvert();
  const { addToHistory, addFavorite, removeFavorite, favorites } = useAppStore();
  
  const category = CATEGORIES[categoryId!];
  const categoryUnits = category?.units.map(id => UNITS[id]) || [];
  
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState(categoryUnits[0]);
  const [toUnit, setToUnit] = useState(categoryUnits[1] || categoryUnits[0]);
  const [results, setResults] = useState<ConversionResult[]>([]);

  const pairId = `${fromUnit?.id}_${toUnit?.id}`;
  const isFavorite = favorites.some(f => f.id === pairId);

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
  }, [inputValue, fromUnit, toUnit, categoryId]);

  const handleSwapUnits = () => {
    if (fromUnit && toUnit) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setFromUnit(toUnit);
      setToUnit(fromUnit);
    }
  };

  const handleFavorite = () => {
    if (!fromUnit || !toUnit) return;
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
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
      Alert.alert('Error', 'Failed to copy result');
    }
  };

  const renderUnitPicker = (unit: typeof fromUnit, onSelect: (unit: any) => void, title: string) => (
    <TouchableOpacity
      style={styles.unitPicker}
      onPress={() => {
        // In a real app, this would open a modal with all units
        Alert.alert(title, 'Unit picker would open here');
      }}
      activeOpacity={0.7}
    >
      <Text style={styles.unitPickerLabel}>{title}</Text>
      <Text style={styles.unitPickerValue}>
        {unit?.name || 'Select unit'} ({unit?.symbol || '?'})
      </Text>
    </TouchableOpacity>
  );

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
        {renderUnitPicker(fromUnit, setFromUnit, 'From')}
        
        <TouchableOpacity
          style={styles.swapButton}
          onPress={handleSwapUnits}
          activeOpacity={0.7}
        >
          <ArrowUpDown size={24} color="#3B82F6" />
        </TouchableOpacity>
        
        {renderUnitPicker(toUnit, setToUnit, 'To')}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
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
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  mainInput: {
    fontSize: 32,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  unitsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  unitPicker: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  unitPickerLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  unitPickerValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  swapButton: {
    marginHorizontal: 16,
    padding: 12,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
  },
  resultsSection: {
    flex: 1,
    marginTop: 8,
    backgroundColor: '#FFFFFF',
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
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
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 8,
  },
  resultItemHighlighted: {
    backgroundColor: '#EFF6FF',
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  resultLeft: {
    flex: 1,
  },
  resultSymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  resultName: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  resultValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  resultValueHighlighted: {
    color: '#3B82F6',
  },
  errorText: {
    fontSize: 18,
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 50,
  },
});