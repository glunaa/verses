import { FC } from 'react';

export interface verseProps {
  title: string;
  body: string;
  latinBody?: string;
  latinTitle?: string; // optional Latin title
  showLatin?: boolean; // toggle between English and Latin
}

const Verse: FC<verseProps> = ({ title, latinTitle, body, latinBody, showLatin = false }) => {
  return (
    <div className="verse">
      <h2>{showLatin && latinTitle ? latinTitle : title}</h2>
      <p>{showLatin && latinBody ? latinBody : body}</p>
    </div>
  );
};

export default Verse;
