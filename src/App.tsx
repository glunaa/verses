import { FC, useState, useEffect } from 'react';
import Verse from './components/Verse';
import { verseProps } from './components/Verse';
import './App.css';

const App: FC = () => {
  const prayers: verseProps[] = [
    {
      title: 'Our Father',
      body: 'Our Father, Who art in heaven, Hallowed be Thy Name. Thy Kingdom come. Thy Will be done, on earth as it is in Heaven. Give us this day our daily bread. And forgive us our trespasses, as we forgive those who trespass against us. And lead us not into temptation, but deliver us from evil. Amen.',
    },
    {
      title: 'Hail Mary',
      body: 'Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
    },
    {
      title: 'Glory Be',
      body: 'Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.',
    },
    {
      title: 'Fatima Prayer',
      body: 'O my Jesus, forgive us our sins, save us from the fires of Hell, lead all souls to Heaven, especially those in most need of Thy mercy.',
    },
    {
      title: 'An Act of Perfect Contrition',
      body: 'O my God, I am heartily sorry for having offended Thee, and I detest all my sins because I dread the loss of Heaven and the pains of Hell; but most of all because they offend Thee, my God, Who art all good and deserving of all my love. I firmly resolve, with the help of Thy grace, to confess my sins, to do penance, and to amend my life. Amen.',
    },
    {
      title: 'Anima Christi',
      body: 'Soul of Christ, sanctify me. Body of Christ, save me. Blood of Christ, inebriate me. Water from the side of Christ, wash me. Passion of Christ, strengthen me. O Good Jesus, hear me. Within Thy wounds hide me. Let me not be separated from Thee. Defend me from the malignant enemy. At the hour of my death, call me, and bid me come to Thee, that with Thy saints I may praise Thee for all eternity. Amen.',
    },
    {
      title: 'Apostles Creed',
      body: 'I believe in God, the Father Almighty, Creator of Heaven and earth; and in Jesus Christ, His only Son Our Lord, Who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died, and was buried. He descended into Hell; the third day He rose again from the dead; He ascended into Heaven, and sitteth at the right hand of God, the Father almighty; from thence He shall come to judge the living and the dead. I believe in the Holy Spirit, the holy Catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body and life everlasting. Amen.',
    },
    {
      title: 'Guardian Angel Prayer',
      body: 'Angel of God, my guardian dear, to whom God’s love commits me here, ever this day (night) be at my side, to light and guard, to rule and guide. Amen.',
    },
    {
      title: 'Jesus Prayer',
      body: 'Lord Jesus Christ, Son of God, have mercy on me, a sinner.',
    },
    {
      title: 'Morning Offering',
      body: 'O Jesus, through the Immaculate Heart of Mary, I offer You my prayers, works, joys, and sufferings of this day for all the intentions of Your Sacred Heart, in union with the Holy Sacrifice of the Mass throughout the world, in reparation for my sins, for the intentions of all my relatives and friends, and in particular for the intentions of the Holy Father. Amen.',
    },
    {
      title: 'Prayer of St. Francis',
      body: 'Lord, make me an instrument of your peace. Where there is hatred, let me sow love. Where there is injury, pardon. Where there is doubt, faith. Where there is despair, hope. Where there is darkness, light. Where there is sadness, joy. O Divine Master, grant that I may not so much seek to be consoled, as to console; to be understood, as to understand; to be loved, as to love. For it is in giving that we receive. It is in pardoning that we are pardoned, and it is in dying that we are born to Eternal Life. Amen.',
    },
    {
      title: 'St. Michael the Archangel Prayer',
      body: 'St. Michael the Archangel, defend us in battle. Be our protection against the wickedness and snares of the devil. May God rebuke him, we humbly pray; and do Thou, O Prince of the Heavenly Host, by the Divine Power of God, cast into hell Satan and all the evil spirits who roam throughout the world seeking the ruin of souls. Amen.',
    },
    {
      title: 'Prayer to the Sacred Heart of Jesus',
      body: 'My God, my Savior, I adore Your Sacred Heart, for that heart is the seat and source of all Your tenderest human affections for us sinners. It is the instrument and organ of Your love. It did beat for us. It yearned for us. It ached for our salvation. It was on fire through zeal, that the glory of God might be manifested in and by us. It is the channel of all Your graces and all Your virtues. It is the channel through which has come us all Thy overflowing human affection, all Thy Divine Charity towards us. All Thy incomprehensible compassion for us, as God and Man, as our Creator and our Redeemer and Judge, has come to us, and comes, in one inseparably mingled stream, through that Sacred Heart. O most Sacred symbol and Sacrament of Love, divine and human, in its fullness, Thou didst save me by Thy divine strength and Thy human affection, and then at length by that wonder-working blood, wherewith Thou didst overflow.O most Sacred, most loving Heart of Jesus, Thou art concealed in the Holy Eucharist, and Thou beat for us still. Now as then Thou save, Desiderio desideravi- "With desire I have desired." I worship Thee then with all my best love and awe, with my fervent affection, with my most subdued, most resolved will. O God when Thou dost condescend to suffer me to receive Thee, to eat and drink Thee, and Thou for a while take up Thy abode within me, O make my heart beat with Thy Heart. Purify it of all that is earthly, all that is proud and sensual, all that is hard and cruel, of all perversity, of all disorder, of all deadness. So fill it with Thee, that neither the events of the day nor the circumstances of the time may have power to ruffle it, but that in Thy love and Thy fear it may have peace. Amen.',
    },
    {
      title: 'Prayer before the crucifix',
      body: 'Behold O good and sweetest Jesus, I cast myself upon my knees in Thy sight, and with the most fervent desire of my soul I pray and beseech Thee that Thou wouldst impress upon my heart lively sentiments of faith, hope and charity, with true repentance for my sins and a firm purpose of amendment, whilst with deep affection and grief of soul I ponder within myself and mentally contemplate Thy five most precious wounds; having before my eyes that which David spoke in prophecy: “They have pierced my hands and feet, they have numbered all my bones."',
    },
  ];

  const [currentPrayerIndex, setCurrentPrayerIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handlePrev = () => {
    setCurrentPrayerIndex((prevIndex) =>
      prevIndex === 0 ? prayers.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentPrayerIndex((prevIndex) =>
      prevIndex === prayers.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePrev();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="parent">
      <div className="hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      {isMenuOpen && (
        <div className="prayer-menu">
          <ul>
            {prayers.map((prayer, index) => (
              <li
                key={index}
                onClick={() => {
                  setCurrentPrayerIndex(index); // Set the selected prayer
                  setIsMenuOpen(false); // Close the menu
                }}
              >
                {prayer.title}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="container">
        <h4>Verses</h4>
        <div className="verse">
          <Verse
            title={prayers[currentPrayerIndex].title}
            body={prayers[currentPrayerIndex].body}
          />
        </div>
        <div>
          <button onClick={handlePrev}>&#8592; Previous</button>
          <button onClick={handleNext}>Next &#8594;</button>
        </div>
      </div>
    </div>
  );
};

export default App;
