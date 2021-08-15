import { useState, useEffect } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  },
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  },
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>;
}>

type CountType = {
  answeredCount: number;
  pendingCount: number;
  totalCount: number;
}

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [title, setTitle] = useState('');
  const [countQuestions, setCountQuestions] = useState<CountType>({
    answeredCount: 0,
    pendingCount: 0,
    totalCount: 0
  });

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
      let counter : CountType = {
        answeredCount: 0,
        pendingCount: 0,
        totalCount: 0
      };

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        if(value.isAnswered){
          counter.answeredCount++;
        } else if(!value.isAnswered){
          counter.pendingCount++;
        }

        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
        }
      });

      counter.totalCount += parsedQuestions.length;

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
      setCountQuestions(counter);
    })

    return() => {
      roomRef.off('value');
    }
  }, [roomId, user?.id]);
 
  return { questions, title, countQuestions };
}