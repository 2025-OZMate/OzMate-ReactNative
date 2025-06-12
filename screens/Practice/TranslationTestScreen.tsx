import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import PrevBtn from "../../components/common/PrevBtn";
import { colors } from "../../styles/colors";
import Result from "../../components/Practice/Result";

type Quiz = {
  id: number;
  question: string;
  choice: string[];
  correct: string;
  explanation: string;
};

const quizData: Quiz[] = require("../../assets/data/cultureQuizList.json");
export default function TranslationTestScreen() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [quizDone, setQuizDone] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentQuestion = quizData[currentIdx];

  const handleSelect = (choice: string) => {
    const isAnswerCorrect = choice === currentQuestion.correct;
    setIsCorrect(isAnswerCorrect);
    setShowResult(true);
  };
  const handleNext = () => {
    const nextIdx = currentIdx + 1;
    if (nextIdx >= quizData.length) {
      setQuizDone(true);
    } else {
      setCurrentIdx(nextIdx);
      setShowResult(false);
      setIsCorrect(null);
    }
  };

  function NextButton() {
    return (
      <View style={styles.NextButtonContainer}>
        <View>
          <TouchableOpacity onPress={handleNext}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        position: "relative",
      }}
    >
      <View style={{ zIndex: 100 }}>
        <PrevBtn address="SelectInformation" />
      </View>
      {quizDone ? (
        <View>
          <Result marginTop={32} />
        </View>
      ) : showResult ? (
        /*맞음 틀림*/
        <View style={{ flex: 1, marginHorizontal: 20 }}>
          <Image
            source={
              isCorrect
                ? require("../../assets/images/correct.png")
                : require("../../assets/images/notCorrect.png")
            }
            style={[
              styles.Iconimg,
              isCorrect ? styles.correctImg : styles.notCorrectImg,
            ]}
          />

          <View style={styles.contentContainer}>
            <Text style={styles.correctAnswer}>{currentQuestion.correct}</Text>
            <Text style={styles.explain}>{currentQuestion.explanation}</Text>
          </View>

          <NextButton />
        </View>
      ) : (
        /*퀴즈 화면*/
        <View>
          <View>
            <Image
              source={require("../../assets/images/quiz-banner.png")}
              style={styles.bannerImg}
            />
            <View style={styles.questionContainer}>
              <Text style={styles.index}>Quiz. {currentQuestion.id}</Text>
              <Text style={styles.question}>
                test {currentQuestion.question}
              </Text>
            </View>
          </View>

          {currentQuestion?.choice?.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => handleSelect(item)}
              style={styles.choiceButton}
            >
              <Text style={styles.btnText}>test{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  NextButtonContainer: {
    height: 56,
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#FFB600",
    borderRadius: 16,
    position: "absolute",
    bottom: 50,
  },
  nextText: {
    textAlign: "center",
    fontSize: 20,
    color: "#FFF",
    fontWeight: "600",
  },
  bannerImg: {
    position: "absolute",
    top: -100,
    width: "100%",
    height: 296,
    zIndex: 2,
  },
  ButtonContainer: {
    paddingTop: 250 /*임시*/,
  },
  correctAnswer: {
    textAlign: "center",
    fontFamily: "Pretendard-bold",
    fontWeight: "600",
    fontSize: 24,
  },
  explain: {
    textAlign: "center",
    fontFamily: "Pretendard-bold",
    fontWeight: "500",
    fontSize: 18,
    width: 247,
    alignSelf: "center",
    marginTop: 16,
    lineHeight: 28,
  },
  contentContainer: {
    marginTop: 10,
    paddingVertical: 43,
    backgroundColor: "#FFF",
    borderRadius: 12,
  },
  Iconimg: {
    alignSelf: "center",
    marginBottom: 32,
  },
  correctImg: {
    width: 92,
    height: 121,
    marginTop: 52,
  },
  notCorrectImg: {
    width: 102,
    height: 113,
    marginTop: 60,
  },
  questionContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 12,
    backgroundColor: "#FFF",
    paddingTop: 40,
    paddingRight: 26,
    paddingLeft: 27,
    marginHorizontal: 20,
    marginBottom: 40,
    zIndex: 100,
    marginTop: 90,
  },
  index: {
    textAlign: "center",
    fontFamily: "Pretendard-bold",
    fontSize: 20,
    fontWeight: 600,
    color: "#FF9E00",
    marginBottom: 26,
  },
  question: {
    textAlign: "center",
    alignSelf: "center",
    width: 282,
    height: 84,
    fontFamily: "Pretendard-bold",
    fontSize: 18,
    fontWeight: 500,
    color: "#000",
    lineHeight: 28,
    marginBottom: 15,
  },
  choiceButton: {
    backgroundColor: "#FFF",
    height: 60,
    marginHorizontal: 20,
    borderRadius: 16,
    borderColor: "#FFB600",
    borderWidth: 2,
    marginBottom: 12,
  },
  btnText: {
    fontFamily: "Pretendard-bold",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
    paddingBottom: 17,
    paddingTop: 14.5,
  },
});
