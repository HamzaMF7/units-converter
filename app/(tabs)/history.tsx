import { CATEGORIES, UNITS } from '@/data/units';
import { useAppStore, useTheme } from '@/store';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { ArrowRight, Clock, RotateCcw, Trash2 } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function HistoryScreen() {
  const router = useRouter();
  const { history, clearHistory } = useAppStore();
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const {colors } = useTheme() ; 

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
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
    clearButton: {
      padding: 12,
      backgroundColor: colors.errorLight,
      borderRadius: 12,
    },
    listContainer: {
      padding: 16,
    },
    sectionHeader: {
      marginBottom: 12,
      marginTop: 8,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginLeft: 4,
    },
    historyItem: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      marginBottom: 8,
      elevation: 1,
      shadowColor: '#000', // keep system shadow
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    historyContent: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },
    categoryDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: 12,
    },
    historyInfo: {
      flex: 1,
    },
    conversionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    unitSymbol: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    arrowIcon: {
      marginHorizontal: 6,
    },
    categoryName: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    historyMeta: {
      alignItems: 'flex-end',
    },
    timeAgo: {
      fontSize: 12,
      color: colors.textMuted,
      marginBottom: 4,
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
    // If you later add an `onPrimary` color to your palette, swap it in here.
    emptyButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return new Date(timestamp).toLocaleDateString();
  };

  const groupHistoryByDate = () => {
    const groups: { [key: string]: typeof history } = {};
    
    history.forEach(item => {
      const date = new Date(item.timestamp);
      const today = new Date();
      const yesterday = new Date(today.getTime() - 86400000);
      
      let key;
      if (date.toDateString() === today.toDateString()) {
        key = 'Today';
      } else if (date.toDateString() === yesterday.toDateString()) {
        key = 'Yesterday';
      } else {
        key = date.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'short', 
          day: 'numeric' 
        });
      }
      
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });
    
    return groups;
  };

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'This will permanently delete all conversion history. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            clearHistory();
          }
        }
      ]
    );
  };

  const handleHistoryItemPress = (item: any) => {
    router.push(`/converter/${item.categoryId}`);
  };

  const renderHistoryItem = ({ item }) => {
    const fromUnit = UNITS[item.fromUnitId];
    const toUnit = UNITS[item.toUnitId];
    const category = CATEGORIES[item.categoryId];
    
    if (!fromUnit || !toUnit || !category) return null;

    return (
      <TouchableOpacity
        style={styles.historyItem}
        onPress={() => handleHistoryItemPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.historyContent}>
          <View style={[styles.categoryDot, { backgroundColor: category.color }]} />
          <View style={styles.historyInfo}>
            <View style={styles.conversionRow}>
              <Text style={styles.unitSymbol}>{fromUnit.symbol}</Text>
              <ArrowRight size={14} color="#9CA3AF" style={styles.arrowIcon} />
              <Text style={styles.unitSymbol}>{toUnit.symbol}</Text>
            </View>
            <Text style={styles.categoryName}>{category.name}</Text>
          </View>
          <View style={styles.historyMeta}>
            <Text style={styles.timeAgo}>{formatTimeAgo(item.timestamp)}</Text>
            <RotateCcw size={12} color="#D1D5DB" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = (title: string) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <Clock size={64} color="#E5E7EB" />
      </View>
      <Text style={styles.emptyTitle}>No history yet</Text>
      <Text style={styles.emptySubtitle}>
        Your recent conversions will appear here automatically
      </Text>
      <TouchableOpacity 
        style={styles.emptyButton}
        onPress={() => router.push('/')}
        activeOpacity={0.7}
      >
        <Text style={styles.emptyButtonText}>Start Converting</Text>
      </TouchableOpacity>
    </View>
  );

  const historyGroups = groupHistoryByDate();
  const hasHistory = history.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>History</Text>
          <Text style={styles.subtitle}>
            {history.length} recent conversion{history.length !== 1 ? 's' : ''}
          </Text>
        </View>
        {hasHistory && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearHistory}
            activeOpacity={0.7}
          >
            <Trash2 size={20} color="#EF4444" />
          </TouchableOpacity>
        )}
      </View>

      {!hasHistory ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={Object.entries(historyGroups)}
          renderItem={({ item: [date, items] }) => (
            <View>
              {renderSectionHeader(date)}
              {items.map((historyItem, index) => (
                <View key={`${historyItem.id}-${index}`}>
                  {renderHistoryItem({ item: historyItem })}
                </View>
              ))}
            </View>
          )}
          keyExtractor={([date]) => date}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
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
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
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
//   clearButton: {
//     padding: 12,
//     backgroundColor: '#FEF2F2',
//     borderRadius: 12,
//   },
//   listContainer: {
//     padding: 16,
//   },
//   sectionHeader: {
//     marginBottom: 12,
//     marginTop: 8,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#111827',
//     marginLeft: 4,
//   },
//   historyItem: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     marginBottom: 8,
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   historyContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//   },
//   categoryDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     marginRight: 12,
//   },
//   historyInfo: {
//     flex: 1,
//   },
//   conversionRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   unitSymbol: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#111827',
//   },
//   arrowIcon: {
//     marginHorizontal: 6,
//   },
//   categoryName: {
//     fontSize: 14,
//     color: '#6B7280',
//   },
//   historyMeta: {
//     alignItems: 'flex-end',
//   },
//   timeAgo: {
//     fontSize: 12,
//     color: '#9CA3AF',
//     marginBottom: 4,
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