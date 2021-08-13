// import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

// import logoImg from '../assets/images/logo.svg';
import { ReactComponent as Logo } from '../assets/images/logo.svg';

import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import Toggle from '../components/Toggle';
import { Toast, showToast } from '../components/Toast';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';

import '../styles/room.scss';
import { database } from '../services/firebase';
import { Modal } from '../components/Modal';
import { useEffect, useState } from 'react';
import { Empty } from '../components/Empty';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const { user, signOut } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { questions, title } = useRoom(roomId);

  const [questionIdControl, setQuestionIdControl] = useState<string|undefined>();

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleModalQuestion, setIsVisibleModalQuestion] = useState(false);

  useEffect(() => {
    if(user){
      showToast({type: "success", message: `Seja bem vindo ${user?.name}`});
    }
  },[user])

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string|undefined) {
    setIsVisibleModalQuestion(false);
    if (questionId) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }
  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  async function handlerSignOut() {

    if (user) {
      await signOut();
    }

    history.push('/');
  }

  useEffect(() => {
    if(!!questionIdControl){
      console.log(questionIdControl)
      setIsVisibleModalQuestion(true);
    }
  },[questionIdControl]);

  return (
    <div id="page-room">
      <header>
        <div className="content">
          {/* <img src={logoImg} alt="Letmeask" /> */}
          <Logo />
          <div>
            <RoomCode
              code={roomId}
            />
            <Button
              isOutlined
              onClick={() => setIsVisible(true)}
            >
              Encerrar Sala
            </Button>
            <Button onClick={handlerSignOut} >
              <FiLogOut />
            </Button>
            <Toggle />
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>
          }
        </div>

        {questions.length <= 0 ? (
          <Empty>
            Envie o código desta sala para seus amigos e comece a responder perguntas!
          </Empty>
        ) : (
          <div className="question-list">
            {questions.sort(quest => !quest.isAnswered ? -1 : 1).map(question => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  {!question.isAnswered && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleCheckQuestionAsAnswered(question.id)}
                      >
                        <img src={checkImg} alt="Marcar pergunta como respondida" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleHighlightQuestion(question.id)}
                      >
                        <img src={answerImg} alt="Dar destaque à pergunta" />
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => setQuestionIdControl(question.id)}
                  >
                    <img src={deleteImg} alt="Remover pergunta" />
                  </button>
                </Question>
              );
            })}
          </div>
        )}

        <Modal
          isOpen={isVisibleModalQuestion}
          setVisibility={() => {
            setIsVisibleModalQuestion(false)
            setQuestionIdControl(undefined);
          }}
          handleConfirmed={() => handleDeleteQuestion(questionIdControl)}
        >
          Tem certeza que você deseja excluir esta pergunta?
        </Modal>

        <Modal
          isOpen={isVisible}
          setVisibility={() => {
            setIsVisible(false)
          }}
          handleConfirmed={() => handleEndRoom()}
        >
          Tem certeza que você deseja encerrar esta sala?
        </Modal>

        <Toast/>

      </main>
    </div>
  );
}