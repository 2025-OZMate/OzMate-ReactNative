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

//문장 해석
export default function SelectTestScreen() {
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

    if (showResult) {
        return <View style={styles.resultContainer}><Result marginTop={95} /></View>
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <PrevBtn address="TestScreen" />
                <ProgressBar currentQuestion={currentQuestionIndex} questionsLength={quizData.length} />
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.indexText}>{currentQuestionIndex + 1}/{quizData.length}</Text>
                <Text style={styles.questionText}>{current.question}</Text>
            </View>

            <View style={styles.blockContainer}>
                {!isAnswered && current.block.map((word, i) => (
                    <Text key={i} style={styles.block}>{word}</Text>
                ))}
            </View>

            {isAnswered && (
                <View style={{ alignSelf: "center", marginVertical: 23 }}>
                    <Image
                        source={isCorrect ? require('../../assets/images/correct.png') : require('../../assets/images/notCorrect.png')}
                        style={isCorrect ? styles.correctImg : styles.notCorrectImg}
                    />
                </View>
            )}

            <View style={{ paddingHorizontal: 20 }}>
                <TextInput
                    value={userAnswer}
                    onChangeText={setUserAnswer}
                    placeholder="Enter the correct answer"
                    editable={!isAnswered}
                    style={[styles.input,
                    isAnswered && isCorrect === true && { borderColor: "green" },
                    isAnswered && isCorrect === false && { borderColor: "red" }
                    ]}
                />
            </View>


            {isAnswered && !isCorrect && (
                <View style={{ paddingHorizontal: 20, position: "absolute", bottom: 108, width: "100%" }}>
                    <TouchableOpacity onPress={handleRetry} style={styles.retryBtn}>
                        <Text style={styles.retry}>Retry</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={{ paddingHorizontal: 20, position: "absolute", bottom: 40, width: "100%" }}>
                <TouchableOpacity onPress={handleNext} style={styles.nextBtn}>
                    <Text style={styles.text}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#FFF",

    },
    header: {
        display: "flex", flexDirection: "row", alignItems: "center"
    },
    indexText: {
        fontSize: 14, textAlign: "center",
        fontFamily: "Pretendard-bold",
    },
    contentContainer: {
        marginTop: 29,
        width: 335, borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        paddingTop: 30,
        display: "flex",
        justifyContent: "center", alignSelf: "center",
        elevation: 5,
    },
    questionText: {
        textAlign: "center",
        fontSize: 18, fontFamily: "Pretendard-bold",
        marginTop: 28, marginBottom: 66, fontWeight: 500
    },
    blockContainer: {
        flexDirection: "row", flexWrap: "wrap",
        gap: 12, justifyContent: "center"
    },
    block: {
        marginVertical: 63,
        fontSize: 12, backgroundColor: "#FFF59D", borderRadius: 12,
        paddingHorizontal: 16, paddingVertical: 10, fontFamily: "Pretendard-bold",
    },
    input: {
        display: "flex", justifyContent: "center",
        borderRadius: 10, height: 40, borderWidth: 1,
        fontSize: 16, marginBottom: 10, borderColor: "#FFB600",
        paddingLeft: 20, fontFamily: "Pretendard-bold",
    },

    correctImg: {
        width: 92, height: 121,
    },
    notCorrectImg: {
        width: 102, height: 113
    },

    retryBtn: {
        backgroundColor: "#FFF59D", display: "flex", justifyContent: "center",
        width: "100%",
        borderRadius: 16, height: 56, textAlign: "center", color: "#FFB600"
    },
    nextBtn: {
        backgroundColor: "#FFB600", display: "flex", justifyContent: "center",
        borderRadius: 16, height: 56, textAlign: "center",
        width: "100%",
    },
    text: {
        fontSize: 20, color: "#FFF", fontWeight: 600,
        textAlign: "center", fontFamily: "Pretendard-bold",
    },
    retry: {
        fontSize: 20, color: "#FFB600", fontWeight: "bold",
        textAlign: "center", fontFamily: "Pretendard-bold",
    },
    resultContainer: {
        flex: 1, backgroundColor: "#FFF9C4",

    }
});
