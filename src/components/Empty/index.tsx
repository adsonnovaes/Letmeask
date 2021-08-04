import { ReactNode } from 'react';
import emptyImg from '../../assets/images/empty-questions.svg';

import './styles.scss';

type EmptyParams = {
  children?: ReactNode,
}

export function Empty ({ children }: EmptyParams) {
  return(
    <div className="empty-container" >
      <img src={emptyImg} alt="Ilustração de balões de pergunta" />
      <h2>Nenhuma pergunta por aqui...</h2>
      <p>{children}</p>
    </div>
  );
}