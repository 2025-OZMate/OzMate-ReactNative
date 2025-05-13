import React from 'react';
import { Button } from 'react-native-web';

interface PrevBtnProps {
    onPress: () => void;
}

export default function TestPrevBtn({ onPress }: PrevBtnProps) {
    return <Button title="이전" onPress={onPress} />;
}
