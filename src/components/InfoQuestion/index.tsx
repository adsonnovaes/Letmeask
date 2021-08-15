import './styles.scss';

type InfoQuestionProps = {
  answeredCount: number;
  pendingCount: number;
  total: number;
}

export function InfoQuestion({ answeredCount, pendingCount, total } : InfoQuestionProps) {
  return (
    <aside>
      <div>
        <h3>Respondida(s)</h3>
        <span>{answeredCount}</span>
      </div>
      <div>
        <h3>Pendente(s)</h3>
        <span>{pendingCount}</span>
      </div>
      <div>
        <h3>Total</h3>
        <span>{total}</span>
      </div>
    </aside>
  )
}