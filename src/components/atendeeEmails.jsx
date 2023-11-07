import { nanoid } from 'nanoid';

export const AtendeeEmails = ({ deleteAtendeeEmail, email }) => (
  <div key={nanoid()} id={nanoid()} className="atendee-emails-list">
    <span key={nanoid()} className="atendee-email">
      {email}{' '}
      <button
        className="atendee-delete"
        type="button"
        onClick={e => {
          deleteAtendeeEmail(e);
        }}
      >
        X
      </button>
    </span>
  </div>
);
