// ─── Rosary Data ──────────────────────────────────────────────────────────────
// Full text (English + Latin) for every prayer and all four sets of mysteries.

export interface RosaryMystery {
  name: string;
  latinName: string;
  fruit: string;         // spiritual fruit
  scripture: string;     // scripture reference
  meditation: string;    // short English meditation
  latinMeditation: string;
}

export interface MysterySet {
  name: string;
  latinName: string;
  days: string;          // traditional days prayed
  mysteries: RosaryMystery[];
}

// ─── Prayers (fixed text used throughout the rosary) ─────────────────────────

export const ROSARY_PRAYERS = {
  apostlesCreed: {
    label: "Apostles' Creed",
    latinLabel: 'Symbolum Apostolorum',
    en: `I believe in God, the Father Almighty, Creator of Heaven and earth; and in Jesus Christ, His only Son Our Lord, Who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died, and was buried; He descended into Hell; on the third day He rose again from the dead; He ascended into Heaven, and sitteth at the right hand of God, the Father Almighty; from thence He shall come to judge the living and the dead. I believe in the Holy Spirit, the holy Catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.`,
    la: `Credo in Deum Patrem omnipotentem, Creatorem caeli et terrae; et in Iesum Christum, Filium eius unicum, Dominum nostrum, qui conceptus est de Spiritu Sancto, natus ex Maria Virgine, passus sub Pontio Pilato, crucifixus, mortuus, et sepultus; descendit ad inferos; tertia die resurrexit a mortuis; ascendit ad caelos, sedet ad dexteram Dei Patris omnipotentis; inde venturus est iudicare vivos et mortuos. Credo in Spiritum Sanctum, sanctam Ecclesiam catholicam, communionem sanctorum, remissionem peccatorum, carnis resurrectionem, vitam aeternam. Amen.`,
  },
  ourFather: {
    label: 'Our Father',
    latinLabel: 'Pater Noster',
    en: `Our Father, Who art in heaven, hallowed be Thy Name. Thy Kingdom come. Thy Will be done, on earth as it is in Heaven. Give us this day our daily bread. And forgive us our trespasses, as we forgive those who trespass against us. And lead us not into temptation, but deliver us from evil. Amen.`,
    la: `Pater Noster, qui es in caelis, sanctificetur Nomen Tuum. Adveniat Regnum Tuum. Fiat voluntas Tua, sicut in caelo, et in terra. Panem nostrum quotidianum da nobis hodie. Et dimitte nobis debita nostra sicut et nos dimittimus debitoribus nostris. Et ne nos inducas in tentationem, sed libera nos a malo. Amen.`,
  },
  hailMary: {
    label: 'Hail Mary',
    latinLabel: 'Ave Maria',
    en: `Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.`,
    la: `Ave Maria, gratia plena, Dominus tecum; benedicta tu in mulieribus, et benedictus fructus ventris tui, Iesus. Sancta Maria, Mater Dei, ora pro nobis peccatoribus, nunc et in hora mortis nostrae. Amen.`,
  },
  gloryBe: {
    label: 'Glory Be',
    latinLabel: 'Gloria Patri',
    en: `Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.`,
    la: `Gloria Patri, et Filio, et Spiritui Sancto. Sicut erat in principio, et nunc, et semper, et in saecula saeculorum. Amen.`,
  },
  fatima: {
    label: 'Fatima Prayer',
    latinLabel: 'Oratio Fatimæ',
    en: `O my Jesus, forgive us our sins, save us from the fires of Hell, lead all souls to Heaven, especially those in most need of Thy mercy.`,
    la: `O Iesu, dimitte nobis peccata nostra, salva nos ab igne inferni, duc omnes animas ad caelum, praesertim eas quae misericordia Tua maxime indigent.`,
  },
  hailHolyQueen: {
    label: 'Hail, Holy Queen',
    latinLabel: 'Salve Regina',
    en: `Hail, Holy Queen, Mother of Mercy, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve; to thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us; and after this our exile show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary. Pray for us, O Holy Mother of God, that we may be made worthy of the promises of Christ. Amen.`,
    la: `Salve Regina, Mater misericordiae, vita, dulcedo et spes nostra, salve. Ad te clamamus exsules filii Hevae. Ad te suspiramus gementes et flentes in hac lacrimarum valle. Eia ergo, advocata nostra, illos tuos misericordes oculos ad nos converte. Et Iesum, benedictum fructum ventris tui, nobis post hoc exsilium ostende. O clemens, O pia, O dulcis Virgo Maria. Ora pro nobis, sancta Dei Genitrix, ut digni efficiamur promissionibus Christi. Amen.`,
  },
  closingPrayer: {
    label: 'Closing Prayer',
    latinLabel: 'Oratio Finalis',
    en: `O God, whose only-begotten Son, by His life, death, and resurrection, has purchased for us the rewards of eternal life; grant, we beseech Thee, that meditating upon these mysteries of the Most Holy Rosary of the Blessed Virgin Mary, we may imitate what they contain and obtain what they promise, through the same Christ our Lord. Amen.\n\nV. May the divine assistance remain always with us.\nR. And may the souls of the faithful departed, through the mercy of God, rest in peace. Amen.`,
    la: `Deus, cuius Unigenitus per vitam, mortem et resurrectionem suam nobis salutis aeternae praemia comparavit, concede, quaesumus, ut haec mysteria sacratissimo Beatae Mariae Virginis Rosario recolentes, et imitemur quod continent, et quod promittunt assequamur. Per eundem Christum Dominum nostrum. Amen.\n\nV. Divinum auxilium maneat semper nobiscum.\nR. Et fidelium animae per misericordiam Dei requiescant in pace. Amen.`,
  },
};

// ─── Joyful Mysteries (Monday & Saturday) ────────────────────────────────────

const joyfulMysteries: RosaryMystery[] = [
  {
    name: 'The Annunciation',
    latinName: 'Annuntiatio',
    fruit: 'Humility',
    scripture: 'Luke 1:26–38',
    meditation: 'The Angel Gabriel announces to the Virgin Mary that she will conceive and bear the Son of God. Mary humbly accepts, saying, "Behold the handmaid of the Lord; be it done unto me according to thy word."',
    latinMeditation: 'Angelus Gabriel Virgini Mariae annuntiat se Filium Dei concepturam et parituram. Maria humiliter respondit: "Ecce ancilla Domini; fiat mihi secundum verbum tuum."',
  },
  {
    name: 'The Visitation',
    latinName: 'Visitatio',
    fruit: 'Love of Neighbor',
    scripture: 'Luke 1:39–56',
    meditation: 'Mary, carrying Jesus in her womb, visits her cousin Elizabeth. At the sound of Mary\'s greeting, the infant John the Baptist leaps for joy in Elizabeth\'s womb, and Elizabeth exclaims, "Blessed art thou among women!"',
    latinMeditation: 'Maria, Iesum in utero gestans, Elisabetham consobrinam visitat. Ad salutationem Mariae, Ioannes Baptista in utero exsultat, et Elisabetha exclamat: "Benedicta tu in mulieribus!"',
  },
  {
    name: 'The Nativity',
    latinName: 'Nativitas',
    fruit: 'Poverty of Spirit / Detachment from the World',
    scripture: 'Luke 2:1–20',
    meditation: 'Jesus Christ, the Son of God, is born in a humble stable in Bethlehem. He is laid in a manger. Angels announce His birth to the shepherds, and all heaven rejoices.',
    latinMeditation: 'Iesus Christus, Filius Dei, in humili praesepio Bethlehemi nascitur. In praesepe ponitur. Angeli nativitatem eius pastoribus annuntiant, et omne caelum laetatur.',
  },
  {
    name: 'The Presentation in the Temple',
    latinName: 'Praesentatio in Templo',
    fruit: 'Obedience and Purity',
    scripture: 'Luke 2:22–38',
    meditation: 'Mary and Joseph present the infant Jesus in the Temple in Jerusalem according to the Law of Moses. Simeon the prophet recognizes the Messiah and prophesies that a sword shall pierce Mary\'s soul.',
    latinMeditation: 'Maria et Ioseph infantem Iesum in Templo Hierosolymis iuxta Legem Moysi offerunt. Simeon propheta Messiam agnoscit et prophetat gladium animam Mariae pertransiturum.',
  },
  {
    name: 'The Finding of Jesus in the Temple',
    latinName: 'Inventio Iesu in Templo',
    fruit: 'Piety and Joy of Finding God',
    scripture: 'Luke 2:41–52',
    meditation: 'The twelve-year-old Jesus remains in the Temple when His parents begin the journey home. After three days of searching, Mary and Joseph find Him sitting among the teachers, and Jesus says, "Did you not know I must be about my Father\'s business?"',
    latinMeditation: 'Duodecim annorum Iesus in Templo relinquitur quando parentes iter domum incipiunt. Post tres dies quaerendi, Maria et Ioseph eum inter doctores sedentem inveniunt, et Iesus dicit: "Nesciebatis quia in his quae Patris mei sunt oportet me esse?"',
  },
];

// ─── Sorrowful Mysteries (Tuesday & Friday) ──────────────────────────────────

const sorrowfulMysteries: RosaryMystery[] = [
  {
    name: 'The Agony in the Garden',
    latinName: 'Agonia in Horto',
    fruit: 'True Contrition for Sin',
    scripture: 'Matthew 26:36–56',
    meditation: 'Jesus goes to the Garden of Gethsemane after the Last Supper. Knowing all that awaits Him, He prays, "Father, if it be possible, let this cup pass from me; yet not my will, but Thine be done." His sweat becomes like drops of blood.',
    latinMeditation: 'Post Cenam Domini, Iesus ad Hortum Gethsemani pergit. Omnia quae eum manent sciens, orat: "Pater, si possibile est, transeat a me calix iste; verumtamen non sicut ego volo, sed sicut Tu." Sudor eius sicut guttae sanguinis factus est.',
  },
  {
    name: 'The Scourging at the Pillar',
    latinName: 'Flagellatio ad Columnam',
    fruit: 'Purity and Mortification',
    scripture: 'Matthew 27:26; John 19:1',
    meditation: 'Pilate, wishing to satisfy the crowd, releases Barabbas and orders Jesus to be scourged. Jesus is bound to a pillar and beaten mercilessly, His sacred body torn by the stripes He endures for our sins.',
    latinMeditation: 'Pilatus, turbam placare volens, Barabbam dimittit et Iesum flagellari iubet. Iesus ad columnam ligatur et immisericorditer caeditur, corpus eius sacrum verberibus dilaceratur quae pro peccatis nostris sustinet.',
  },
  {
    name: 'The Crowning with Thorns',
    latinName: 'Coronatio Spinis',
    fruit: 'Moral Courage',
    scripture: 'Matthew 27:27–31; John 19:2–3',
    meditation: 'The soldiers weave a crown of thorns and press it onto the head of Jesus, mocking Him as the King of the Jews. They strike Him and spit on Him, yet He remains silent and meek.',
    latinMeditation: 'Milites coronam spineam texunt et capiti Iesu imponunt, eum ut Regem Iudaeorum irridentes. Eum percutiunt et conspuunt, ille vero tacitus et mitis manet.',
  },
  {
    name: 'The Carrying of the Cross',
    latinName: 'Baiulatio Crucis',
    fruit: 'Patient Endurance of Suffering',
    scripture: 'John 19:17; Luke 23:26–32',
    meditation: 'Jesus takes up the heavy cross and carries it through the streets of Jerusalem toward Golgotha. He falls three times beneath its weight. Simon of Cyrene is compelled to help carry it. Mary watches her Son along the Way of Sorrows.',
    latinMeditation: 'Iesus gravem crucem tollit et per vias Hierosolymae ad Golgotha portat. Sub eius pondere ter cadit. Simon Cyrenaeus ei portare cogitur. Maria Filium suum per Viam Dolorosam aspicit.',
  },
  {
    name: 'The Crucifixion',
    latinName: 'Crucifixio',
    fruit: 'Salvation and Perseverance',
    scripture: 'Luke 23:33–46; John 19:18–30',
    meditation: 'Jesus is nailed to the cross between two thieves on Calvary. For three hours He hangs, suffering for our sins. He forgives His executioners, promises paradise to the good thief, and commends His spirit to the Father before He dies.',
    latinMeditation: 'Iesus inter duos latrones in Calvaria cruci affixus est. Per tres horas pendet, pro peccatis nostris patiens. Crucifixoribus suis ignoscit, latroni bono paradisum promittit, et spiritum suum Patri commendat antequam moritur.',
  },
];

// ─── Glorious Mysteries (Wednesday & Sunday) ─────────────────────────────────

const gloriousMysteries: RosaryMystery[] = [
  {
    name: 'The Resurrection',
    latinName: 'Resurrectio',
    fruit: 'Faith',
    scripture: 'Luke 24:1–12; John 20:1–29',
    meditation: 'On the third day, Jesus rises gloriously from the dead. The tomb is found empty; the angel proclaims, "He is not here; He is risen!" He appears to Mary Magdalene, to the disciples on the road to Emmaus, and to the Apostles.',
    latinMeditation: 'Die tertia, Iesus gloriose a mortuis resurgit. Sepulcrum vacuum invenitur; angelus proclamat: "Non est hic; surrexit!" Apparuit Mariae Magdalenae, discipulis in via Emmaus, et Apostolis.',
  },
  {
    name: 'The Ascension',
    latinName: 'Ascensio',
    fruit: 'Hope and Desire for Heaven',
    scripture: 'Acts 1:6–11; Luke 24:50–53',
    meditation: 'Forty days after the Resurrection, Jesus leads the Apostles to the Mount of Olives, blesses them, and ascends into Heaven in a cloud of glory. Angels promise He will return in the same way.',
    latinMeditation: 'Quadraginta dies post Resurrectionem, Iesus Apostolos ad Montem Oliveti ducit, eos benedicit, et in nube gloriae in caelum ascendit. Angeli promittunt eum eodem modo reversurum.',
  },
  {
    name: 'The Descent of the Holy Spirit',
    latinName: 'Descensus Spiritus Sancti',
    fruit: 'Zeal for Souls / Love of God',
    scripture: 'Acts 2:1–41',
    meditation: 'On the day of Pentecost, the Holy Spirit descends upon Mary and the Apostles gathered in the upper room as tongues of fire. They are filled with the Holy Spirit and begin to speak in many tongues, proclaiming Christ to all nations.',
    latinMeditation: 'Die Pentecostes, Spiritus Sanctus super Mariam et Apostolos in cenaculo congregatos ut linguae ignis descendit. Spiritu Sancto repleti, linguis variis loqui incipiunt, Christum omnibus gentibus praedicantes.',
  },
  {
    name: 'The Assumption of Mary',
    latinName: 'Assumptio Mariae',
    fruit: 'Grace of a Happy Death',
    scripture: 'Revelation 12:1; Tradition',
    meditation: 'At the end of her earthly life, the Blessed Virgin Mary, having completed her course, was assumed body and soul into heavenly glory. There she already shares in the glory of her Son\'s Resurrection.',
    latinMeditation: 'In fine vitae suae terrestris, Beata Virgo Maria, cursum suum complevit, corpore et anima in caelestem gloriam assumpta est. Ibi iam in gloria Resurrectionis Filii sui participat.',
  },
  {
    name: 'The Coronation of Mary as Queen of Heaven',
    latinName: 'Coronatio Mariae Reginae Caeli',
    fruit: 'Trust in Mary\'s Intercession / Perseverance',
    scripture: 'Revelation 12:1; Psalm 45',
    meditation: 'The Virgin Mary is crowned Queen of Heaven and Earth by the Holy Trinity. She intercedes ceaselessly for her children on earth. All the angels and saints join in the rejoicing of heaven.',
    latinMeditation: 'Virgo Maria a Sanctissima Trinitate Regina Caeli et Terrae coronatur. Ipsa pro filiis suis in terris incessanter intercedit. Omnes angeli et sancti gaudium caeli participant.',
  },
];

// ─── Luminous Mysteries (Thursday) ──────────────────────────────────────────

const luminousMysteries: RosaryMystery[] = [
  {
    name: 'The Baptism of Jesus',
    latinName: 'Baptismus Iesu',
    fruit: 'Openness to the Holy Spirit',
    scripture: 'Matthew 3:13–17; Mark 1:9–11',
    meditation: 'Jesus goes to the Jordan River and is baptized by John. The heavens open, the Holy Spirit descends as a dove, and the Father\'s voice is heard: "This is my beloved Son, with whom I am well pleased."',
    latinMeditation: 'Iesus ad Iordanem venit et ab Ioanne baptizatur. Caeli aperiuntur, Spiritus Sanctus ut columba descendit, et vox Patris auditur: "Hic est Filius meus dilectus, in quo mihi bene complacui."',
  },
  {
    name: 'The Wedding at Cana',
    latinName: 'Nuptiae Canae',
    fruit: 'Marian Intercession / Fidelity',
    scripture: 'John 2:1–11',
    meditation: 'At a wedding feast in Cana, the wine runs out. Mary intercedes with her Son, saying to the servants, "Do whatever He tells you." Jesus performs His first public miracle, turning water into wine, manifesting His glory.',
    latinMeditation: 'In nuptiis Canae vinum deficit. Maria pro eis apud Filium intercedit, servientibus dicens: "Quodcumque dixerit vobis, facite." Iesus primum signum publicum facit, aquam in vinum convertens, gloriam suam manifestans.',
  },
  {
    name: 'The Proclamation of the Kingdom',
    latinName: 'Praedicatio Regni',
    fruit: 'Repentance and Trust in God',
    scripture: 'Mark 1:15; Matthew 4:17',
    meditation: 'Jesus proclaims the Kingdom of God throughout Galilee, calling all to repentance and faith. He heals the sick, drives out demons, and forgives sinners — offering His mercy to all who turn to Him.',
    latinMeditation: 'Iesus Regnum Dei per totam Galilaeam praedicat, omnes ad poenitentiam et fidem vocans. Aegros sanat, daemones eiicit, et peccatoribus ignoscit — misericordiam suam omnibus ad se conversis offerens.',
  },
  {
    name: 'The Transfiguration',
    latinName: 'Transfiguratio',
    fruit: 'Desire for Holiness',
    scripture: 'Matthew 17:1–8; Mark 9:2–8',
    meditation: 'Jesus takes Peter, James, and John to Mount Tabor. There He is transfigured before them — His face shines like the sun, His garments become white as light. Moses and Elijah appear. A cloud overshadows them, and the Father speaks: "This is my beloved Son; listen to Him."',
    latinMeditation: 'Iesus Petrum, Iacobum et Ioannem ad Montem Tabor ducit. Ibi coram eis transfiguratur — facies eius ut sol lucet, vestimenta eius alba ut lux fiunt. Moses et Elias apparent. Nubes eos obumbrat, et Pater dicit: "Hic est Filius meus dilectus; ipsum audite."',
  },
  {
    name: 'The Institution of the Eucharist',
    latinName: 'Institutio Eucharistiae',
    fruit: 'Adoration and Eucharistic Devotion',
    scripture: 'Matthew 26:26–29; Luke 22:14–20',
    meditation: 'At the Last Supper, Jesus takes bread, blesses it, breaks it, and gives it to His disciples saying, "This is my Body." He takes the cup and says, "This is my Blood of the covenant, poured out for many." He gives the Apostles the command: "Do this in memory of me."',
    latinMeditation: 'In Cena Domini, Iesus panem accipit, benedicit, frangit, et discipulis suis dat dicens: "Hoc est Corpus meum." Calicem accipit dicens: "Hic est Sanguis meus foederis, qui pro multis effunditur." Apostolis mandat: "Hoc facite in meam commemorationem."',
  },
];

// ─── Mystery Sets ─────────────────────────────────────────────────────────────

export const MYSTERY_SETS: MysterySet[] = [
  {
    name: 'Joyful Mysteries',
    latinName: 'Mysteria Gaudiosa',
    days: 'Monday & Saturday',
    mysteries: joyfulMysteries,
  },
  {
    name: 'Sorrowful Mysteries',
    latinName: 'Mysteria Dolorosa',
    days: 'Tuesday & Friday',
    mysteries: sorrowfulMysteries,
  },
  {
    name: 'Glorious Mysteries',
    latinName: 'Mysteria Gloriosa',
    days: 'Wednesday & Sunday',
    mysteries: gloriousMysteries,
  },
  {
    name: 'Luminous Mysteries',
    latinName: 'Mysteria Luminosa',
    days: 'Thursday',
    mysteries: luminousMysteries,
  },
];
