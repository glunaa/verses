import { FC, useState, useEffect, useCallback } from 'react';
import Verse from './components/Verse';
import { verseProps } from './components/Verse';
import './App.css';

const App: FC = () => {
  const prayers: verseProps[] = [
    {
      title: 'Sign of the Cross',
      latinTitle: 'Signum Crucis',
      body: 'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.',
      latinBody: 'In nomine Patris, et Filii, et Spiritus Sancti. Amen.',
    },
    {
      title: 'Apostles Creed',
      latinTitle: 'Symbolum Apostolorum',
      body: 'I believe in God, the Father Almighty, Creator of Heaven and earth; and in Jesus Christ, His only Son Our Lord, Who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died, and was buried; He descended into Hell; on the third day He rose again from the dead; He ascended into Heaven, and sitteth at the right hand of God, the Father almighty; from thence He shall come to judge the living and the dead. I believe in the Holy Spirit, the holy Catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.',
      latinBody:
        'Credo in Deum Patrem omnipotentem, Creatorem caeli et terrae; et in Iesum Christum, Filium eius unicum, Dominum nostrum, qui conceptus est de Spiritu Sancto, natus ex Maria Virgine, passus sub Pontio Pilato, crucifixus, mortuus, et sepultus; descendit ad inferos; tertia die resurrexit a mortuis; ascendit ad caelos, sedet ad dexteram Dei Patris omnipotentis; inde venturus est iudicare vivos et mortuos. Credo in Spiritum Sanctum, sanctam Ecclesiam catholicam, communionem sanctorum, remissionem peccatorum, carnis resurrectionem, vitam aeternam. Amen.',
    },
    {
      title: 'Our Father',
      latinTitle: 'Pater Noster',
      body: 'Our Father, Who art in heaven, Hallowed be Thy Name. Thy Kingdom come. Thy Will be done, on earth as it is in Heaven. Give us this day our daily bread. And forgive us our trespasses, as we forgive those who trespass against us. And lead us not into temptation, but deliver us from evil. Amen.',
      latinBody:
        'Pater Noster, qui es in caelis, sanctificetur Nomen Tuum. Adveniat Regnum Tuum. Fiat voluntas Tua, sicut in caelo, et in terra. Panem nostrum quotidianum da nobis hodie. Et dimitte nobis debita nostra sicut et nos dimittimus debitoribus nostris. Et ne nos inducas in tentationem, sed libera nos a malo. Amen.',
    },
    {
      title: 'Hail Mary',
      latinTitle: 'Ave Maria',
      body: 'Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
      latinBody:
        'Ave Maria, gratia plena, Dominus tecum; benedicta tu in mulieribus, et benedictus fructus ventris tui, Iesus. Sancta Maria, Mater Dei, ora pro nobis peccatoribus, nunc et in hora mortis nostrae. Amen.',
    },
    {
      title: 'Glory Be',
      latinTitle: 'Gloria Patri',
      body: 'Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.',
      latinBody:
        'Gloria Patri, et Filio, et Spiritui Sancto. Sicut erat in principio, et nunc, et semper, et in saecula saeculorum. Amen.',
    },
    {
      title: 'Fatima Prayer',
      latinTitle: 'Oratio Fatimæ',
      body: 'O my Jesus, forgive us our sins, save us from the fires of Hell, lead all souls to Heaven, especially those in most need of Thy mercy.',
      latinBody:
        'O Iesu, dimitte nobis peccata nostra, salva nos ab igne inferni, ducis omnes animas ad caelum, praesertim eas quae misericordia Tua maxime indigent.',
    },
    {
      title: 'Hail Holy Queen',
      latinTitle: 'Salve Regina',
      body: 'Hail, Holy Queen, Mother of Mercy, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve; to thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us; and after this our exile show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary. Pray for us, O Holy Mother of God, that we may be made worthy of the promises of Christ. Amen.',
      latinBody:
        'Salve Regina, Mater misericordiae, vita, dulcedo et spes nostra, salve. Ad te clamamus exsules filii Hevae. Ad te suspiramus gementes et flentes in hac lacrimarum valle. Eia ergo, advocata nostra, illos tuos misericordes oculos ad nos converte. Et Iesum, benedictum fructum ventris tui, nobis post hoc exsilium ostende. O clemens, O pia, O dulcis Virgo Maria. Ora pro nobis, sancta Dei Genitrix, ut digni efficiamur promissionibus Christi. Amen.',
    },
    {
      title: 'Anima Christi',
      latinTitle: 'Anima Christi',
      body: 'Soul of Christ, sanctify me.\nBody of Christ, save me.\nBlood of Christ, inebriate me.\nWater from the side of Christ, wash me.\nPassion of Christ, strengthen me.\nO Good Jesus, hear me.\nWithin Thy wounds hide me.\nLet me not be separated from Thee.\nDefend me from the malignant enemy.\nAt the hour of my death, call me, and bid me come to Thee,\nthat with Thy saints I may praise Thee for all eternity. Amen.',
      latinBody:
        'Anima Christi, sanctifica me.\nCorpus Christi, salva me.\nSanguis Christi, inebria me.\nAqua lateris Christi, lava me.\nPassio Christi, conforta me.\nO bone Iesu, exaudi me.\nIntra vulnera tua absconde me.\nNe quando separeris a me.\nAb hoste maligno protege me.\nIn hora mortis meae voca me,\net iube me venire ad Te, ut cum sanctis tuis laudem Te in saecula. Amen.',
    },
    {
      title: 'St. Michael the Archangel Prayer',
      latinTitle: 'Oratio Sancti Michaëlis',
      body: 'St. Michael the Archangel, defend us in battle. Be our protection against the wickedness and snares of the devil. May God rebuke him, we humbly pray; and do Thou, O Prince of the Heavenly Host, by the Divine Power of God, cast into hell Satan and all the evil spirits who roam throughout the world seeking the ruin of souls. Amen.',
      latinBody:
        'Sancte Michael Archangele, defende nos in proelio. Contra nequitiam et insidias diaboli esto praesidium. Deus, humiliter rogamus, repelle eum; et tu, Princeps Exercitus Caelestis, per Divinam Potentiam Dei, mitte in infernum Satanam et omnes spiritus malignos qui per orbem terrarum animas perditionem quaerunt. Amen.',
    },
    {
      title: 'An Act of Perfect Contrition',
      latinTitle: 'Actus Perfectae Contritionis',
      body: 'O my God, I am heartily sorry for having offended Thee, and I detest all my sins because I dread the loss of Heaven and the pains of Hell; but most of all because they offend Thee, my God, Who art all good and deserving of all my love. I firmly resolve, with the help of Thy grace, to confess my sins, to do penance, and to amend my life. Amen.',
      latinBody:
        'O Deus meus, ex toto corde paenitet me omnium meorum peccatorum, quia peccando Te offendi, qui es omnia bona et dignus omni mea caritate. Firmiter propono, adiuvante gratia Tua, confiteri peccata mea, poenitere, et vitam meam emendare. Amen.',
    },
    {
      title: 'Guardian Angel Prayer',
      latinTitle: 'Angelus Custodis',
      body: 'Angel of God, my guardian dear, to whom God’s love commits me here, ever this day (night) be at my side, to light and guard, to rule and guide. Amen.',
      latinBody:
        'Angelus Domini, custos meus, cui me commissit divina providentia, praesens esto semper ad me, ut me luceas, custodi, rege, et gubernes. Amen.',
    },
    {
      title: 'Jesus Prayer',
      latinTitle: 'Oratio Iesu',
      body: 'Lord Jesus Christ, Son of God, have mercy on me, a sinner.',
      latinBody: 'Domine Iesu Christe, Fili Dei, miserere mei, peccatoris.',
    },
    {
      title: 'Morning Offering',
      latinTitle: 'Oblatio Matutina',
      body: 'O Jesus, through the Immaculate Heart of Mary, I offer You my prayers, works, joys, and sufferings of this day for all the intentions of Your Sacred Heart, in union with the Holy Sacrifice of the Mass throughout the world, in reparation for my sins, for the intentions of all my relatives and friends, and in particular for the intentions of the Holy Father. Amen.',
      latinBody:
        'O Iesu, per Immaculatum Cor Mariae, offero Tibi orationes meas, opera, gaudia, et dolores huius diei pro omnibus intentionibus Cordis Tui Sacratissimi, in unione cum Sacrificio Missae per orbem terrarum, pro reparatione peccatorum meorum, pro intentionibus omnium familiarum et amicorum meorum, et praesertim pro intentionibus Sancti Patris. Amen.',
    },
    {
      title: 'Prayer of St. Francis',
      latinTitle: 'Oratio Sancti Francisci',
      body: 'Lord, make me an instrument of your peace. Where there is hatred, let me sow love. Where there is injury, pardon. Where there is doubt, faith. Where there is despair, hope. Where there is darkness, light. Where there is sadness, joy. O Divine Master, grant that I may not so much seek to be consoled, as to console; to be understood, as to understand; to be loved, as to love. For it is in giving that we receive. It is in pardoning that we are pardoned, and it is in dying that we are born to Eternal Life. Amen.',
      latinBody:
        'Domine, fac me instrumentum pacis tuae. Ubi odium est, ibi dilectionem seminem; ubi iniuria est, ibi veniam; ubi dubitatio est, ibi fidem; ubi desperatio est, ibi spem; ubi tenebrae sunt, ibi lucem; ubi tristitia est, ibi gaudium. O Divine Magister, concede ut non tantum quaeram consolationem, sed consolari; intellegere, sed intelligi; diligere, sed amari. Quia in dando accipimus, in dimittendo dimittimur, et in moriendo nascimur ad vitam aeternam. Amen.',
    },
    {
      title: 'Prayer to the Sacred Heart of Jesus',
      latinTitle: 'Oratio ad Sacratissimum Cor Iesu',
      body: 'My God, my Savior, I adore Your Sacred Heart, for that heart is the seat and source of all Your tenderest human affections for us sinners. It is the instrument and organ of Your love. It did beat for us. It yearned for us. It ached for our salvation. It was on fire through zeal, that the glory of God might be manifested in and by us. It is the channel of all Your graces and all Your virtues. O most Sacred symbol and Sacrament of Love, divine and human, in its fullness, Thou didst save me by Thy divine strength and Thy human affection, and then at length by that wonder-working blood, wherewith Thou didst overflow. O most Sacred, most loving Heart of Jesus, Thou art concealed in the Holy Eucharist, and Thou beat for us still. Now as then Thou save, Desiderio desideravi- "With desire I have desired." I worship Thee then with all my best love and awe, with my fervent affection, with my most subdued, most resolved will. O God when Thou dost condescend to suffer me to receive Thee, to eat and drink Thee, and Thou for a while take up Thy abode within me, O make my heart beat with Thy Heart. Purify it of all that is earthly, all that is proud and sensual, all that is hard and cruel, of all perversity, of all disorder, of all deadness. So fill it with Thee, that neither the events of the day nor the circumstances of the time may have power to ruffle it, but that in Thy love and Thy fear it may have peace. Amen.',
      latinBody:
        'Deus meus, Salvator meus, adoro Cor Sacratissimum Tuum, quod est sedes et fons omnium humanarum affectionum Tuarum pro nobis peccatoribus. Est instrumentum et organum amoris Tui. Pulsavit pro nobis. Desideravit nos. Doluit pro salute nostra. Ardebat zelo, ut gloria Dei manifestaretur in nobis et per nos. Est canalum omnium gratiae Tuæ et omnium virtutum. O Sacratissimum et humanum symbolum amoris, plenitudine Tua, salvasti me per divinam virtutem tuam et humanam affectionem tuam, et postremo per sanguinem mirabilem. O Sacratissimum, carissimum Cor Iesu, latet in Sancta Eucharistia, et adhuc pulsas pro nobis. Nunc, sicut tunc, salva me. Desiderio desideravi. Te adoro cum omni amore meo, cum timore et reverentia, cum ferventi affectu, cum voluntate mea humillima et firma. O Deus, cum me permittere digneris Te recipere, ad me interiora Tuum sumere, fac ut cor meum cum Tuo corde pulset. Purifica a terrenis, superbia, sensualitate, duritia, crudelitatis, perversitatis, disorder, mortis inertiae. Comple cor meum Te, ut nec res diei nec circumstantiae temporis eam perturbare possint, sed in amore et timore Tuo pacem habeat.',
    },
    {
      title: 'Prayer before the crucifix',
      latinTitle: 'Oratio ante Crucifixum',
      body: 'Behold O good and sweetest Jesus, I cast myself upon my knees in Thy sight, and with the most fervent desire of my soul I pray and beseech Thee that Thou wouldst impress upon my heart lively sentiments of faith, hope and charity, with true repentance for my sins and a firm purpose of amendment, whilst with deep affection and grief of soul I ponder within myself and mentally contemplate Thy five most precious wounds; having before my eyes that which David spoke in prophecy: “They have pierced my hands and feet, they have numbered all my bones."',
      latinBody:
        'Ecce O Iesu dulcissime et bone, in conspectu tuo genua flecto et cum maxima animae meae devotione oro et deprecor, ut impressiones in corde meo relinqueres de fide, spe et caritate, cum vera paenitentia pro peccatis meis et firma intentione emendationis; dum cum profunda affectu et dolore animae meae meditor intra me et mentaliter contemplor quinque vulnera tua pretiosa; ante oculos habeo quae David in prophetia dixit: “Transfixerunt manus meas et pedes meos, et numeraverunt omnia ossa mea.”',
    },
    {
      title: 'Prayer for the Holy Souls in Purgatory',
      latinTitle: 'Oratio pro Animabus in Purgatorio',
      body: 'Eternal Father, I offer Thee the most precious blood of Thy Divine Son, Jesus, in union with the Masses said throughout the world today, for all the Holy Souls in Purgatory, for sinners everywhere, for sinners in the universal Church, those in my own home and within my family. Amen.',
      latinBody:
        'Pater aeternus, offero Tibi pretiosissimum sanguinem Filii Tui Divini Iesu, in unione cum Missis celebratis hodie per orbem terrarum, pro omnibus animabus sanctis in Purgatorio, pro peccatoribus ubique, pro peccatoribus in Ecclesia universali, pro illis in domo mea et in familia mea. Amen.',
    },
    {
      title: 'St Gemma Galgani Prayer',
      latinTitle: 'Oratio Sanctae Gemmae Galgani',
      body: 'O my crucified God, behold me at Your feet; do not cast me out, now that I appear before You as a sinner. I have offended You exceedingly in the past, my Jesus, but it shall be so no longer. Before You, O Lord, I place all my sins; I have now considered Your own sufferings and see how great is the worth of that Precious Blood that flows from Your veins.O my God, at this hour close Your eyes to my want of merit, and since You have been pleased to die for my sins, grant me forgiveness for them all, that I may no longer feel the burden of my sins, for this burden, Dear Jesus, oppresses me beyond measure.Assist me, my Jesus, for I desire to become good whatsoever it may cost; take away, destroy, utterly root out all that You find in me contrary to Your holy will. At the same time, I pray You, Lord Jesus, to enlighten me that I may be able to walk in Your holy light. Amen.',
      latinBody:
        'O Iesu, amor meus, desiderium meum unicum, dulcis delectatio mea, totus tibi me do. Accipe me, posside me, et fac mecum quod vis. Totus tuus esse volo et omnia facere propter amorem Tuum. Sufferre et mori volo propter amorem Tuum. Fac me esse victima amoris Tui. Amen.',
    },
    {
      title: 'St Joseph Terror of Demons Prayer',
      latinTitle: 'Oratio Sancti Ioseph Terrorem Daemonum',
      body: 'Saint Joseph, Terror of Demons, cast your solemn gaze upon the devil and all his minions, and protect us with your mighty staff. You fled through the night to avoid the devil’s wicked designs; now with the power of God, smite the demons as they flee from you! Grant special protection, we pray, for children, fathers, families, and the dying. By God’s grace, no demon dares approach while you are near; so we beg of you, always be near us! Amen.',
    },
    {
      title: 'Novena to Sacred Heart of Jesus',
      body: 'I. O my Jesus, you have said: "Truly I say to you, ask and you will receive, seek and you will find, knock and it will be opened to you." Behold I knock, I seek, I ask for the grace of... (here mention your request).\nOur Father... Hail Mary... Glory be... Sacred Heart of Jesus, I place all my trust in you.\n\nII. O my Jesus, you have said: "Truly I say to you,whatever you ask of the Father in my name, He will give it to you." Behold, in your name I ask the Father for the grace of... (here mention your request).\nOur Father... Hail Mary... Glory be... Sacred Heart of Jesus, I place all my trust in you.\n\nIII. O my Jesus, you have said: "Truly I say to you, heaven and earth will pass away but my words will not pass away." Encouraged by your infallible words I now ask you for the grace of...(here mention your request).\nOur Father... Hail Mary... Glory be... Sacred Heart of Jesus, I place all my trust in You.\n\nO Sacred Heart of Jesus, for whom it is impossible not to have compassion on the afflicted, have pity on us miserable sinners and grant us the grace which we ask of you, through the Sorrowful and Immaculate Heart of Mary, your tender Mother and ours.\n\nSay the Hail,Holy Queen, and add: St.Joseph, foster father of Jesus, pray for us.',
    },
    {
      title: 'Most Precious Blood of Jesus Prayer',
      latinTitle: 'Oratio ad Pretiosissimum Sanguinem Iesu',
      body: 'O Most Precious Blood of Jesus Christ, save us and the whole world. Amen.',
      latinBody:
        'O Pretiosissimum Sanguinem Iesu Christi, Salva nos et universum mundum. Amen.',
    },

    {
      title: 'Litany of the Most Precious Blood of Jesus',
      latinTitle: 'Litania Pretiosissimi Sanguinis Iesu',
      body: 'Lord, have mercy.\nLord, have mercy.\nChrist, have mercy.\nChrist, have mercy.\nLord, have mercy.\nLord, have mercy.\nChrist, hear us.\nChrist, hear us.\nChrist, graciously hear us.\nChrist, graciously hear us.\nGod the Father of Heaven, have mercy on us.\nGod the Son, Redeemer of the world,have mercy on us.\nGod, the Holy Spirit,have mercy on us.\nHoly Trinity, One God,have mercy on us.\n\nBlood of Christ, only-begotten Son of the eternal Father,save us.\nBlood of Christ, Incarnate Word or God,save us.\nBlood of Christ, of the New and Eternal Testament,save us.\nBlood of Christ, falling upon the earth in Agony,save us.\nBlood of Christ, shed profusely in the Scourging,save us.\nBlood of Christ, flowing forth in the Crowning with Thorns,save us.\nBlood of Christ, poured out on the Cross,save us.\nBlood of Christ, price of our salvation,save us.\nBlood of Christ, without which there is no forgiveness,save us.\nBlood of Christ, Eucharistic drink and refreshment of souls,save us.\nBlood of Christ, stream of mercy,save us.\nBlood of Christ, victor over demons,save us.\nBlood of Christ, courage of Martyrs,save us.\nBlood of Christ, strength of Confessors, save us.\nBlood of Christ, bringing forth Virgins,save us.\nBlood of Christ, help of those in peril,save us.\nBlood of Christ, relief of the burdened, save us.\nBlood of Christ, solace in sorrow,save us.\nBlood of Christ, hope of the penitent, save us.\nBlood of Christ, consolation of the dying,save us.\nBlood of Christ, peace and tenderness of hearts, save us.\nBlood of Christ, pledge of eternal life,save us.\nBlood of Christ, freeing souls from purgatory,save us.\nBlood of Christ, most worthy of all glory and honor,save us.\n\nLamb of God, who taketh away the sins of the world spare us, O Lord.\nLamb of God, who taketh away the sins of the world, graciously hear us, O Lord.\nLamb of God, who taketh away the sins of the world, have mercy on us, O Lord.\n\nV. Thou hast redeemed us, O Lord, in Thy Blood.\nR. And made us, for our God, a kingdom.\n\nAlmighty and eternal God, Thou hast appointed Thine only-begotten Son the Redeemer of the world and willed to be appeased by his blood. Grant, we beg of Thee, that we may worthily adore this price of our salvation and through its power be safeguarded from the evils of the present life so that we may rejoice in its fruits forever in heaven. Through the same Christ our Lord. Amen.',
      latinBody:
        'Kyrie, eleison.\nKyrie, eleisson.\nChriste, eleison.\nChriste, eleison.\nChriste, audi nos.\nChriste, exaudi nos.\nPater de caelis, Deus, Miserere nobis.\nFili, Redemptor mundi, Deus, Miserere nobis.\nSpiritus Sancte, Deus, Miserere nobis.\nSancta Trinitas, unus Deus, Miserere nobis.\n\nSanguis Christi, Unigeniti Patris aeterni, Salva nos.\nSanguis Christi, Verbi Dei incarnati, Salva nos.\nSanguis Christi, Novi et Aeterni Testamenti, Salva nos.\nSanguis Christi, in agonia decurrens in terram, Salva nos.\nSanguis Christi, in flagellatione profluens, Salva nos.\nSanguis Christi, in coronatione spinarum emanans, Salva nos.\nSanguis Christi, in Cruce effusus, Salva nos.\nSanguis Christi, pretium nostrae salutis, Salva nos.\nSanguis Christi, sine quo non fit remissio, Salva nos.\nSanguis Christi, in Eucharistia potus et lavacrum animarum, Salva nos.\nSanguis Christi, flumen misericordiae, Salva nos.\nSanguis Christi, victor daemonum, Salva nos.\nSanguis Christi, fortitudo martyrum, Salva nos.\nSanguis Christi, virtus confessorum, Salva nos.\nSanguis Christi, germinans virgines, Salva nos.\nSanguis Christi, robur periclitantium, Salva nos.\nSanguis Christi, levamen laborantium, Salva nos.\nSanguis Christi, in fletu solatium, Salva nos.\nSanguis Christi, spes paenitentium, Salva nos.\nSanguis Christi, solamen morientium, Salva nos.\nSanguis Christi, pax et dulcedo cordium, Salva nos.\nSanguis Christi, pignus vitae aeternae, Salva nos.\nSanguis Christi, animas liberans de lacu Purgatorii, Salva nos.\nSanguis Christi, omni gloria et honore dignissimus, Salva nos.\n\nAgnus Dei, qui tollis peccata mundi, Parce nobis, Domine.\nAgnus Dei, qui tollis peccata mundi, Exaudi nos, Domine.\nAgnus Dei, qui tollis peccata mundi, Miserere nobis, Domine.\n\nRedemisti nos, Domine, in sanguine tuo. Et fecisti nos Deo nostro regnum.\n\nOremus:\nOmnipotens sempiterne Deus, qui unigenitum Filium tuum mundi Redemptorem constituisti, ac eius sanguine placari voluisti: concede, quaesumus, salutis nostrae pretium ita venerari, atque a praesentis vitae malis eius virtute defendi in terris, ut fructu perpetuo laetemur in caelis. Per eundem Christum Dominum nostrum. Amen.',
    },
  ];

  const [currentPrayerIndex, setCurrentPrayerIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLatin, setShowLatin] = useState(false);
  const [search, setSearch] = useState('');

  const filteredPrayers = prayers.filter((prayer) =>
    prayer.title.toLowerCase().includes(search.toLowerCase())
  );

  const handlePrev = useCallback(() => {
    setCurrentPrayerIndex((prevIndex) =>
      prevIndex === 0 ? prayers.length - 1 : prevIndex - 1
    );
  }, [prayers.length]);

  const handleNext = useCallback(() => {
    setCurrentPrayerIndex((prevIndex) =>
      prevIndex === prayers.length - 1 ? 0 : prevIndex + 1
    );
  }, [prayers.length]);

  /*  **Saved for potential future use**
  const handleRandom = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * prayers.length);
    setCurrentPrayerIndex(randomIndex);
  }, [prayers.length]);
   */
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') handlePrev();
      else if (event.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handlePrev, handleNext]);

  return (
    <div className="parent">
      <div className="hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {isMenuOpen && (
        <div className="prayer-menu">
          <input
            type="text"
            placeholder="Search prayers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <ul>
            {filteredPrayers.map((prayer, index) => (
              <li
                key={index}
                onClick={() => {
                  setCurrentPrayerIndex(prayers.indexOf(prayer));
                  setIsMenuOpen(false);
                }}
              >
                {prayer.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="container">
        <h4>Prayers</h4>
        <div className="verse">
          <Verse
            title={prayers[currentPrayerIndex].title}
            latinTitle={prayers[currentPrayerIndex].latinTitle} // optional
            body={prayers[currentPrayerIndex].body}
            latinBody={prayers[currentPrayerIndex].latinBody} // optional
            showLatin={showLatin}
          />
        </div>

        <div className="buttons">
          <button onClick={handlePrev}>&#8592; Previous</button>
          <button onClick={handleNext}>Next &#8594;</button>
          {prayers[currentPrayerIndex].latinBody && (
            <button onClick={() => setShowLatin(!showLatin)}>
              {showLatin ? 'Show English' : 'Show Latin'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
