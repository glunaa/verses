import { FC, useState, useEffect, useCallback, useRef } from 'react';
import Verse from './components/Verse';
import { verseProps } from './components/Verse';
import Rosary from './components/Rosary';
import Stations from './components/Stations';
import Chaplet from './components/Chaplet';
import { getLiturgicalInfo } from './utils/liturgicalSeason';
import './App.css';

const liturgical = getLiturgicalInfo();

type AppMode = 'prayers' | 'rosary' | 'stations' | 'chaplet';

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
      latinBody:'Sáncte Míchael Archángele, defénde nos in proélio, cóntra nequítiam et insídias diáboli ésto præsídium. Ímperet ílli Déus, súpplices deprecámur: tuque, prínceps milítiæ cæléstis, Sátanam aliósque spíritus malígnos, qui ad perditiónem animárum pervagántur in múndo, divína virtúte, in inférnum detrúde. Ámen.'
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
      title:'Most Sacred Heart of Jesus',
      latinTitle:'Cor Jesu Sacratissimum',
      body:'Most Sacred Heart of Jesus, Have Mercy on us',
      latinBody:'Cor Jesu Sacratissimum miserere nobis.'
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

    {
      title: 'Litany of Trust',
      body: 'From the belief that I have to earn Your love, deliver me, Jesus.\nFrom the fear that I am unlovable, deliver me, Jesus.\nFrom the false security that I have what it takes, deliver me, Jesus.\nFrom the fear that trusting You will leave me more destitute, deliver me, Jesus.\nFrom all suspicion of Your words and promises, deliver me, Jesus.\nFrom the rebellion against childlike dependency on You, deliver me, Jesus.\nFrom refusals and reluctances in accepting Your will, deliver me, Jesus.\nFrom anxiety about the future, deliver me, Jesus.\nFrom resentment or excessive preoccupation with the past, deliver me, Jesus.\nFrom restless self-seeking in the present moment, deliver me, Jesus.\nFrom disbelief in Your love and presence, deliver me, Jesus.\nFrom the fear of being asked to give more than I have, deliver me, Jesus.\nFrom the belief that my life has no meaning or worth, deliver me, Jesus.\nFrom the fear of what love demands, deliver me, Jesus.\nFrom discouragement, deliver me, Jesus.\n\nThat You are continually holding me, sustaining me, loving me, Jesus, I trust in You.\nThat Your love goes deeper than my sins and failings and transforms me, Jesus, I trust in You.\nThat not knowing what tomorrow brings is an invitation to lean on You, Jesus, I trust in You.\nThat You are with me in my suffering, Jesus, I trust in You.\nThat my suffering, united to Your own, will bear fruit in this life and the next, Jesus, I trust in You.\nThat You will not leave me orphan, that You are present in Your Church, Jesus, I trust in You.\nThat Your plan is better than anything else, Jesus, I trust in You.\nThat You always hear me and in Your goodness always respond to me, Jesus, I trust in You.\nThat You give me the grace to accept forgiveness and to forgive others, Jesus, I trust in You.\nThat You give me all the strength I need for what is asked, Jesus, I trust in You.\nThat my life is a gift, Jesus, I trust in You.\nThat You will teach me to trust You, Jesus, I trust in You.\nThat You are my Lord and my God, Jesus, I trust in You.\nThat I am Your beloved one, Jesus, I trust in You.',
    },

    {
      title: 'Litany of Loreto',
      latinTitle: 'Litania Lauretana',
      body: 'Lord, have mercy. Lord, have mercy.\nChrist, have mercy. Christ, have mercy.\nLord, have mercy. Lord, have mercy.\n\nChrist, hear us. Christ, hear us.\nChrist, graciously hear us. Christ, graciously hear us.\n\nGod the Father of Heaven, have mercy on us.\nGod the Son, Redeemer of the world, have mercy on us.\nGod the Holy Spirit, have mercy on us.\nHoly Trinity, one God, have mercy on us.\n\nHoly Mary, pray for us.\nHoly Mother of God, pray for us.\nHoly Virgin of virgins, pray for us.\nMother of Christ, pray for us.\nMother of the Church, pray for us.\nMother of Mercy, pray for us.\nMother of divine grace, pray for us.\nMother of Hope, pray for us.\nMother most pure, pray for us.\nMother most chaste, pray for us.\nMother inviolate, pray for us.\nMother undefiled, pray for us.\nMother most amiable, pray for us.\nMother admirable, pray for us.\nMother of good counsel, pray for us.\nMother of our Creator, pray for us.\nMother of our Savior, pray for us.\nVirgin most prudent, pray for us.\nVirgin most venerable, pray for us.\nVirgin most renowned, pray for us.\nVirgin most powerful, pray for us.\nVirgin most merciful, pray for us.\nVirgin most faithful, pray for us.\nMirror of justice, pray for us.\nSeat of wisdom, pray for us.\nCause of our joy, pray for us.\nSpiritual vessel, pray for us.\nVessel of honor, pray for us.\nSingular vessel of devotion, pray for us.\nMystical rose, pray for us.\nTower of David, pray for us.\nTower of ivory, pray for us.\nHouse of gold, pray for us.\nArk of the covenant, pray for us.\nGate of Heaven, pray for us.\nMorning star, pray for us.\nHealth of the sick, pray for us.\nRefuge of sinners, pray for us.\nSolace of migrants, pray for us.\nComforter of the afflicted, pray for us.\nHelp of Christians, pray for us.\nQueen of Angels, pray for us.\nQueen of Patriarchs, pray for us.\nQueen of Prophets, pray for us.\nQueen of Apostles, pray for us.\nQueen of Martyrs, pray for us.\nQueen of Confessors, pray for us.\nQueen of Virgins, pray for us.\nQueen of all Saints, pray for us.\nQueen conceived without original sin, pray for us.\nQueen assumed into Heaven, pray for us.\nQueen of the most holy Rosary, pray for us.\nQueen of families, pray for us.\nQueen of peace, pray for us.\n\nLamb of God, who takest away the sins of the world, spare us, O Lord.\nLamb of God, who takest away the sins of the world, graciously hear us, O Lord.\nLamb of God, who takest away the sins of the world, have mercy on us, O Lord.\n\nV. Pray for us, O Holy Mother of God.\nR. That we may be made worthy of the promises of Christ.\n\nLet us pray:\nGrant, we beseech Thee, O Lord God, unto us Thy servants, that we may rejoice in continual health of mind and body; and, by the glorious intercession of Blessed Mary ever Virgin, may be delivered from present sadness, and enter into the joy of Thine eternal gladness. Through Christ our Lord. Amen.',
      latinBody: 'Kyrie, eleison. Kyrie, eleison.\nChriste, eleison. Christe, eleison.\nKyrie, eleison. Kyrie, eleison.\n\nChriste, audi nos. Christe, audi nos.\nChriste, exaudi nos. Christe, exaudi nos.\n\nPater de caelis, Deus, miserere nobis.\nFili, Redemptor mundi, Deus, miserere nobis.\nSpiritus Sancte, Deus, miserere nobis.\nSancta Trinitas, unus Deus, miserere nobis.\n\nSancta Maria, ora pro nobis.\nSancta Dei Genitrix, ora pro nobis.\nSancta Virgo virginum, ora pro nobis.\nMater Christi, ora pro nobis.\nMater Ecclesiae, ora pro nobis.\nMater misericordiae, ora pro nobis.\nMater divinae gratiae, ora pro nobis.\nMater spei, ora pro nobis.\nMater purissima, ora pro nobis.\nMater castissima, ora pro nobis.\nMater inviolata, ora pro nobis.\nMater intemerata, ora pro nobis.\nMater amabilis, ora pro nobis.\nMater admirabilis, ora pro nobis.\nMater boni consilii, ora pro nobis.\nMater Creatoris, ora pro nobis.\nMater Salvatoris, ora pro nobis.\nVirgo prudentissima, ora pro nobis.\nVirgo veneranda, ora pro nobis.\nVirgo praedicanda, ora pro nobis.\nVirgo potens, ora pro nobis.\nVirgo clemens, ora pro nobis.\nVirgo fidelis, ora pro nobis.\nSpeculum iustitiae, ora pro nobis.\nSedes sapientiae, ora pro nobis.\nCausa nostrae laetitiae, ora pro nobis.\nVas spirituale, ora pro nobis.\nVas honorabile, ora pro nobis.\nVas insigne devotionis, ora pro nobis.\nRosa mystica, ora pro nobis.\nTurris Davidica, ora pro nobis.\nTurris eburnea, ora pro nobis.\nDomus aurea, ora pro nobis.\nFoederis arca, ora pro nobis.\nIanua caeli, ora pro nobis.\nStella matutina, ora pro nobis.\nSalus infirmorum, ora pro nobis.\nRefugium peccatorum, ora pro nobis.\nSolacium migrantium, ora pro nobis.\nConsolatrix afflictorum, ora pro nobis.\nAuxilium Christianorum, ora pro nobis.\nRegina Angelorum, ora pro nobis.\nRegina Patriarcharum, ora pro nobis.\nRegina Prophetarum, ora pro nobis.\nRegina Apostolorum, ora pro nobis.\nRegina Martyrum, ora pro nobis.\nRegina Confessorum, ora pro nobis.\nRegina Virginum, ora pro nobis.\nRegina omnium Sanctorum, ora pro nobis.\nRegina sine labe originali concepta, ora pro nobis.\nRegina in caelum assumpta, ora pro nobis.\nRegina sacratissimi Rosarii, ora pro nobis.\nRegina familiae, ora pro nobis.\nRegina pacis, ora pro nobis.\n\nAgnus Dei, qui tollis peccata mundi, parce nobis, Domine.\nAgnus Dei, qui tollis peccata mundi, exaudi nos, Domine.\nAgnus Dei, qui tollis peccata mundi, miserere nobis, Domine.\n\nV. Ora pro nobis, sancta Dei Genitrix.\nR. Ut digni efficiamur promissionibus Christi.\n\nOremus:\nConcede nos famulos tuos, quaesumus, Domine Deus, perpetua mentis et corporis sanitate gaudere; et gloriosa beatae Mariae semper Virginis intercessione, a praesenti liberari tristitia et aeterna perfrui laetitia. Per Christum Dominum nostrum. Amen.',
    },

    {
      title: 'Litany of the Saints',
      latinTitle: 'Litania Sanctorum',
      body: 'Lord, have mercy. Lord, have mercy.\nChrist, have mercy. Christ, have mercy.\nLord, have mercy. Lord, have mercy.\n\nHoly Mary, Mother of God, pray for us.\nSaint Michael, pray for us.\nHoly Angels of God, pray for us.\n\nSaint John the Baptist, pray for us.\nSaint Joseph, pray for us.\n\nSaint Peter and Saint Paul, pray for us.\nSaint Andrew, pray for us.\nSaint John, pray for us.\nSaint Mary Magdalene, pray for us.\nSaint Stephen, pray for us.\nSaint Ignatius of Antioch, pray for us.\nSaint Lawrence, pray for us.\nSaints Perpetua and Felicity, pray for us.\nSaint Agnes, pray for us.\nSaint Gregory, pray for us.\nSaint Augustine, pray for us.\nSaint Athanasius, pray for us.\nSaint Basil, pray for us.\nSaint Martin, pray for us.\nSaint Benedict, pray for us.\nSaint Francis and Saint Dominic, pray for us.\nSaint Francis Xavier, pray for us.\nSaint John Vianney, pray for us.\nSaint Catherine of Siena, pray for us.\nSaint Teresa of Avila, pray for us.\nSaint Faustina Kowalska, pray for us.\nSaint Maximilian Kolbe, pray for us.\nSaint Padre Pio, pray for us.\nAll holy men and women, Saints of God, pray for us.\n\nLord, be merciful, Lord, save Your people.\nFrom all evil, Lord, save Your people.\nFrom every sin, Lord, save Your people.\nFrom everlasting death, Lord, save Your people.\nBy Your coming among us, Lord, save Your people.\nBy Your death and rising to new life, Lord, save Your people.\nBy Your gift of the Holy Spirit, Lord, save Your people.\n\nBe merciful to us sinners, Lord, hear our prayer.\nGuide and protect Your holy Church, Lord, hear our prayer.\nKeep the Pope and all the clergy in faithful service to Your Church, Lord, hear our prayer.\nBring all peoples together in trust and peace, Lord, hear our prayer.\nStrengthened by this Sacrament of unity, Lord, hear our prayer.\n\nJesus, Son of the living God, Lord, hear our prayer.\n\nChrist, hear us. Christ, hear us.\nLord Jesus, hear our prayer. Lord Jesus, hear our prayer.',
      latinBody: 'Kyrie, eleison. Kyrie, eleison.\nChriste, eleison. Christe, eleison.\nKyrie, eleison. Kyrie, eleison.\n\nSancta Maria, Mater Dei, ora pro nobis.\nSancte Michael, ora pro nobis.\nOmnes sancti Angeli Dei, orate pro nobis.\n\nSancte Ioannes Baptista, ora pro nobis.\nSancte Ioseph, ora pro nobis.\n\nSancte Petre et Paule, orate pro nobis.\nSancte Andrea, ora pro nobis.\nSancte Ioannes, ora pro nobis.\nSancta Maria Magdalena, ora pro nobis.\nSancte Stephane, ora pro nobis.\nSancte Ignati Antiochene, ora pro nobis.\nSancte Laurenti, ora pro nobis.\nSanctae Perpetua et Felicitas, orate pro nobis.\nSancta Agnes, ora pro nobis.\nSancte Gregori, ora pro nobis.\nSancte Augustine, ora pro nobis.\nSancte Athanasi, ora pro nobis.\nSancte Basili, ora pro nobis.\nSancte Martine, ora pro nobis.\nSancte Benedicte, ora pro nobis.\nSancte Francisce et Dominice, orate pro nobis.\nSancte Francisce Xaveri, ora pro nobis.\nSancte Ioannes Vianney, ora pro nobis.\nSancta Catharina Senensis, ora pro nobis.\nSancta Teresa Avilensis, ora pro nobis.\nSancta Faustina Kowalska, ora pro nobis.\nSancte Maximiliane Kolbe, ora pro nobis.\nSancte Pater Pio, ora pro nobis.\nOmnes Sancti et Sanctae Dei, orate pro nobis.\n\nPropitius esto, parce nobis, Domine.\nAb omni malo, libera nos, Domine.\nAb omni peccato, libera nos, Domine.\nA morte perpetua, libera nos, Domine.\nPer adventum Tuum, libera nos, Domine.\nPer mortem et resurrectionem Tuam, libera nos, Domine.\nPer effusionem Spiritus Sancti, libera nos, Domine.\n\nPeccatores, te rogamus, audi nos.\nEcclesiam tuam sanctam regere et conservare digneris, te rogamus, audi nos.\nPapalem dignitatem et omnes ecclesiasticos ordines in sancta religione conservare digneris, te rogamus, audi nos.\nOmnes gentes in pace et concordia conservare digneris, te rogamus, audi nos.\n\nIesu, Fili Dei vivi, te rogamus, audi nos.\n\nChriste, audi nos. Christe, audi nos.\nKyrie, eleison. Kyrie, eleison.',
    },
  ];

  const [currentPrayerIndex, setCurrentPrayerIndex] = useState(() => {
    const saved = localStorage.getItem('lastPrayerIndex');
    const idx = saved ? parseInt(saved, 10) : 0;
    return isNaN(idx) || idx >= prayers.length ? 0 : idx;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLatin, setShowLatin] = useState(false);
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState<AppMode>('prayers');
  const [dimMode, setDimMode] = useState(false);
  const [fontScale, setFontScale] = useState(() => {
    return parseFloat(localStorage.getItem('fontScale') || '1');
  });
  const verseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', String(fontScale));
    localStorage.setItem('fontScale', String(fontScale));
  }, [fontScale]);

  const growFont = () => setFontScale((s) => Math.min(parseFloat((s + 0.15).toFixed(2)), 2));
  const shrinkFont = () => setFontScale((s) => Math.max(parseFloat((s - 0.15).toFixed(2)), 0.7));

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
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Persist last prayer & scroll to top when prayer changes
  useEffect(() => {
    localStorage.setItem('lastPrayerIndex', String(currentPrayerIndex));
    if (verseRef.current) verseRef.current.scrollTop = 0;
  }, [currentPrayerIndex]);

  // Keyboard: arrow keys navigate, Escape closes menu
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') handlePrev();
      else if (event.key === 'ArrowRight') handleNext();
      else if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handlePrev, handleNext]);

  // Swipe gestures (mobile)
  useEffect(() => {
    let startX = 0;
    const onTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onTouchEnd = (e: TouchEvent) => {
      const delta = e.changedTouches[0].clientX - startX;
      if (Math.abs(delta) < 50) return; // ignore small movements
      if (mode === 'prayers') {
        if (delta < 0) handleNext(); else handlePrev();
      }
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [mode, handleNext, handlePrev]);

  return (
    <div className="parent">
      {dimMode && (
        <div className="dim-overlay" onClick={() => setDimMode(false)}>
          <span className="dim-hint">tap to dismiss</span>
        </div>
      )}
      {isMenuOpen && <div className="menu-overlay" onClick={() => setIsMenuOpen(false)} />}

      <div className="container">
        <div
          className="season-banner"
          style={{ borderColor: liturgical.color }}
        >
          <span style={{ color: liturgical.color }}>✦</span>
          {showLatin ? liturgical.latinSeason : liturgical.season}
        </div>

        <div className="navbar">
          {mode === 'prayers' && (
            <div className="hamburger" onClick={toggleMenu}>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          )}
          <h4>{{ prayers: 'Prayers', rosary: 'The Rosary', stations: 'Stations', chaplet: 'Divine Mercy' }[mode]}</h4>
          <div className="font-controls">
            <button className="font-btn" onClick={shrinkFont} title="Decrease font size">A−</button>
            <button className="font-btn" onClick={growFont} title="Increase font size">A+</button>
            <button className="dim-btn" onClick={() => setDimMode(true)} title="Dim screen for night prayer">☽</button>
          </div>
          <div className="mode-toggle">
            <button className={`mode-btn${mode === 'prayers' ? ' active' : ''}`} onClick={() => setMode('prayers')}>Prayers</button>
            <button className={`mode-btn${mode === 'rosary' ? ' active' : ''}`} onClick={() => setMode('rosary')}>Rosary</button>
            <button className={`mode-btn${mode === 'stations' ? ' active' : ''}`} onClick={() => setMode('stations')}>Stations</button>
            <button className={`mode-btn${mode === 'chaplet' ? ' active' : ''}`} onClick={() => setMode('chaplet')}>Chaplet</button>
          </div>
        </div>

        {mode === 'prayers' && (
          <>
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

            <div ref={verseRef} className="verse">
              <Verse
                title={prayers[currentPrayerIndex].title}
                latinTitle={prayers[currentPrayerIndex].latinTitle}
                body={prayers[currentPrayerIndex].body}
                latinBody={prayers[currentPrayerIndex].latinBody}
                showLatin={showLatin}
              />
            </div>

            <p className="prayer-counter">
              {currentPrayerIndex + 1} / {prayers.length}
            </p>

            <div className="buttons">
              <button onClick={handlePrev}>&#8592; Previous</button>
              <button onClick={handleNext}>Next &#8594;</button>
              {prayers[currentPrayerIndex].latinBody && (
                <button onClick={() => setShowLatin(!showLatin)}>
                  {showLatin ? 'Show English' : 'Show Latin'}
                </button>
              )}
            </div>
          </>
        )}

        {mode === 'rosary' && (
          <Rosary
            showLatin={showLatin}
            onToggleLatin={() => setShowLatin((prev) => !prev)}
          />
        )}

        {mode === 'stations' && (
          <Stations
            showLatin={showLatin}
            onToggleLatin={() => setShowLatin((prev) => !prev)}
          />
        )}

        {mode === 'chaplet' && (
          <Chaplet
            showLatin={showLatin}
            onToggleLatin={() => setShowLatin((prev) => !prev)}
          />
        )}
      </div>
    </div>
  );
};

export default App;
