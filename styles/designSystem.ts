// designSystem.ts
import { StyleSheet, Platform } from 'react-native';

export const shadows = StyleSheet.create({
    shadow1: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
        }),
    },
});
