import { FC } from 'react';

export interface verseProps {
  title: string;
  body: string;
}

const Verse: FC<verseProps> = ({ title, body }) => {
  return (
    <div className="verse">
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
};

export default Verse;
