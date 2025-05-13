import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import ProgressBar from "../../components/Practice/ProgressBar";
import Result from "../../components/Practice/Result";
import PrevBtn from "../../components/common/PrevBtn";
import quizData from "../../assets/data/translation.json";

interface Quiz {
    id: number;
    question: string;
    block: string[];
    correct: string[];
}

export default function QuizScreen() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [showResult, setShowResult] = useState(false);

    const current: Quiz = quizData[currentQuestionIndex];

    const handleNext = () => {
        if (!isAnswered) {
            const trimmed = userAnswer.trim();
            const match = current.correct.some(answer => answer === trimmed);
            setIsCorrect(match);
            setIsAnswered(true);
        } else {
            if (currentQuestionIndex === quizData.length - 1) {
                setShowResult(true);
            } else {
                setCurrentQuestionIndex(prev => prev + 1);
                setUserAnswer('');
                setIsCorrect(null);
                setIsAnswered(false);
            }
        }
    };

    const handleRetry = () => {
        setUserAnswer('');
        setIsAnswered(false);
        setIsCorrect(null);
    };

    if (showResult) return <Result />;

    return (
        <View style={styles.container}>
            <PrevBtn address="Home" />
            <ProgressBar currentQuestion={currentQuestionIndex} questionsLength={quizData.length} />

            <Text style={styles.indexText}>{currentQuestionIndex + 1}/{quizData.length}</Text>
            <Text style={styles.questionText}>{current.question}</Text>

            <View style={styles.blockContainer}>
                {!isAnswered && current.block.map((word, i) => (
                    <Text key={i} style={styles.block}>{word}</Text>
                ))}
            </View>

            <TextInput
                value={userAnswer}
                onChangeText={setUserAnswer}
                placeholder="정답을 입력하세요"
                editable={!isAnswered}
                style={[styles.input,
                isAnswered && isCorrect === true && { borderColor: "green" },
                isAnswered && isCorrect === false && { borderColor: "red" }
                ]}
            />

            {isAnswered && (
                <Image
                    source={isCorrect ? require('../../assets/images/correct.png') : require('../../assets/images/notCorrect.png')}
                    style={styles.resultImage}
                />
            )}

            {isAnswered && !isCorrect && (
                <TouchableOpacity onPress={handleRetry} style={styles.retryBtn}>
                    <Text>Retry</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity onPress={handleNext} style={styles.nextBtn}>
                <Text>Next</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    indexText: { fontSize: 18, marginTop: 10 },
    questionText: { fontSize: 22, marginVertical: 15 },
    blockContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 10 },
    block: { marginRight: 6, fontSize: 16, backgroundColor: "#eee", padding: 6, borderRadius: 4 },
    input: { borderWidth: 2, padding: 10, fontSize: 18, marginBottom: 10, borderColor: "#999" },
    resultImage: { width: 50, height: 50, alignSelf: 'center', marginVertical: 10 },
    retryBtn: { backgroundColor: "orange", padding: 10, borderRadius: 5, marginTop: 5 },
    nextBtn: { backgroundColor: "skyblue", padding: 10, borderRadius: 5, marginTop: 10 }
});
