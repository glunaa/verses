export interface Station {
  number: number;
  name: string;
  latinName: string;
  scripture: string;
  meditation: string;
  latinMeditation: string;
}

export const STATIONS: Station[] = [
  {
    number: 1,
    name: 'Jesus is condemned to death',
    latinName: 'Iesus ad mortem damnatur',
    scripture: 'Matthew 27:24–26',
    meditation:
      'Pilate, wishing to satisfy the crowd, releases Barabbas and hands Jesus over to be crucified. Jesus — innocent, sinless, and silent as a lamb — accepts the unjust sentence. He takes upon Himself the condemnation that our sins deserved.',
    latinMeditation:
      'Pilatus, turbam placare cupiens, Barabbam dimittit et Iesum crucifigendum tradit. Iesus — innocens, sine peccato, et tacitus ut agnus — sententiam iniustam accipit. In se suscipit damnationem quam peccata nostra meruerunt.',
  },
  {
    number: 2,
    name: 'Jesus takes up His Cross',
    latinName: 'Iesus crucem accipit',
    scripture: 'John 19:17',
    meditation:
      'Jesus willingly takes the heavy wooden cross upon His bruised shoulders. It is the instrument of His death, yet He embraces it as the will of the Father and the price of our redemption. He calls each of us to take up our own cross and follow Him.',
    latinMeditation:
      'Iesus voluntarie gravem crucem ligneam in umeros contusus accipit. Est instrumentum mortis suae, sed eam ut voluntatem Patris et pretium redemptionis nostrae amplectitur. Nos omnes vocat ut crucem nostram tollamus et eum sequamur.',
  },
  {
    number: 3,
    name: 'Jesus falls the first time',
    latinName: 'Iesus primo cadit',
    scripture: 'Isaiah 53:4–6',
    meditation:
      'Weakened by the scourging and the crown of thorns, Jesus stumbles and falls beneath the weight of the cross. He falls under the weight of our sins, not His own. Each time we sin, we add to that weight; yet He rises again to continue the journey for our sake.',
    latinMeditation:
      'Flagellatione et corona spinis exhaustus, Iesus sub pondere crucis labitur et cadit. Sub pondere peccatorum nostrorum, non suorum, cadit. Quoties peccamus, pondus augemus; sed ille pro nobis iterum surgit et iter pergit.',
  },
  {
    number: 4,
    name: 'Jesus meets His Mother',
    latinName: 'Iesus Matrem suam obviam habet',
    scripture: 'Luke 2:35; John 19:25',
    meditation:
      'Jesus and His Blessed Mother encounter each other along the Way of the Cross. Their eyes meet in an exchange of unspeakable sorrow and love. Mary\'s soul is pierced as Simeon foretold. She walks every step of this sorrowful way with her Son.',
    latinMeditation:
      'Iesus et Mater eius Beatissima in Via Crucis sibi occurrunt. Oculi eorum in commutatione doloris et amoris inenarrabilis conveniunt. Anima Mariae, sicut Simeon praedixit, gladio transfigit. Ipsa omnem gradum Viae Dolorosae cum Filio suo ambulat.',
  },
  {
    number: 5,
    name: 'Simon of Cyrene helps Jesus carry the Cross',
    latinName: 'Simon Cyrenaeus adiuvat Iesum crucem portare',
    scripture: 'Mark 15:21',
    meditation:
      'The soldiers compel Simon of Cyrene, a passerby, to help Jesus carry the cross. What began as compulsion became an act of grace. Simon is the image of every Christian who, when called — willingly or unwillingly — takes up the cross alongside Christ.',
    latinMeditation:
      'Milites Simonem Cyreneum, praetereuntem, cogunt Iesum in portando cruce adiuvare. Quod incipit coactione, gratia fit. Simon imago est cuiuslibet Christiani qui, vocatus — vel invitus vel libens — crucem iuxta Christum tollit.',
  },
  {
    number: 6,
    name: 'Veronica wipes the face of Jesus',
    latinName: 'Veronica faciem Iesu abstergit',
    scripture: 'Isaiah 53:3; Tradition',
    meditation:
      'A woman named Veronica steps forward through the crowd and wipes the face of Jesus with her veil. On the cloth, the image of His sacred face is imprinted. She offers the small comfort she can; Jesus rewards her gesture with the gift of His likeness.',
    latinMeditation:
      'Mulier nomine Veronica per turbam procedit et faciem Iesu velo abstergit. In panno imago Vultus Sacri eius imprimitur. Parvum solatium quod potest offert; Iesus gestum eius dono similitudinis suae recompensat.',
  },
  {
    number: 7,
    name: 'Jesus falls the second time',
    latinName: 'Iesus secundo cadit',
    scripture: 'Psalm 22:14–15',
    meditation:
      'Again Jesus falls beneath the cross. His body is at its limit of human endurance. He fell so that no matter how many times we fall into sin, we would know that He has been there — that He understands our weakness and extends His hand to lift us up.',
    latinMeditation:
      'Iterum Iesus sub cruce cadit. Corpus eius est in extremo tolerantiae humanae. Cecidit ut, quotcumque vicibus in peccatum cadimus, sciamus eum ibi fuisse — ut imbecillitatem nostram intellegat et manum ad nos erigendum extendat.',
  },
  {
    number: 8,
    name: 'Jesus speaks to the women of Jerusalem',
    latinName: 'Iesus filiabus Hierusalem loquitur',
    scripture: 'Luke 23:27–31',
    meditation:
      'Jesus turns to the weeping women who follow Him and says, "Daughters of Jerusalem, do not weep for me, but weep for yourselves and for your children." Even in His agony, He thinks of others. He calls us to true sorrow for sin, not merely sorrow for suffering.',
    latinMeditation:
      'Iesus ad mulieres flentes quae eum sequuntur se vertit et dicit: "Filiae Hierusalem, nolite flere super me, sed super vos ipsas flete et super filios vestros." Etiam in agonia sua, de aliis cogitat. Nos ad verum dolorem propter peccatum vocat, non solum propter poenam.',
  },
  {
    number: 9,
    name: 'Jesus falls the third time',
    latinName: 'Iesus tertio cadit',
    scripture: 'Lamentations 3:1–2',
    meditation:
      'Near the end of the journey, almost at the foot of Golgotha, Jesus falls a third time. He is utterly exhausted. Yet He rises. His resurrection on the third day is already prefigured here: no matter how many times He falls, He rises — and raises us with Him.',
    latinMeditation:
      'Prope finem itineris, fere ad pedem Golgotha, Iesus tertio cadit. Omnino exhaustus est. Attamen surgit. Resurrectio eius die tertia iam hic praefiguratur: quotcumque vicibus cadit, surgit — et nos secum erigit.',
  },
  {
    number: 10,
    name: 'Jesus is stripped of His garments',
    latinName: 'Iesus exspoliatur vestimentis',
    scripture: 'John 19:23–24; Psalm 22:18',
    meditation:
      'At Golgotha, the soldiers strip Jesus of His garments and divide them among themselves, casting lots for His tunic, fulfilling the Psalm. He who clothes the lilies of the field and the birds of the air is left with nothing. He is stripped of all earthly comfort for our sake.',
    latinMeditation:
      'In Golgotha, milites Iesum vestimentis exspoliant et ea inter se dividunt, de tunica eius sortes mittentes, Psalmum implentes. Ille qui lilia agri et aves caeli vestit nihil habet. Pro nobis omni solatio terreno spoliatur.',
  },
  {
    number: 11,
    name: 'Jesus is nailed to the Cross',
    latinName: 'Iesus cruci affligitur',
    scripture: 'Luke 23:33–34; Psalm 22:16',
    meditation:
      'Jesus is laid on the cross and nails are driven through His hands and feet. "Father, forgive them, for they know not what they do." Even as He is nailed, He prays for His executioners — and for us, whose sins drove those nails. His arms are spread wide in an eternal embrace.',
    latinMeditation:
      'Iesus in crucem ponitur et clavi per manus et pedes eius figuntur. "Pater, dimitte illis, non enim sciunt quid faciunt." Etiam dum crucifigitur, pro carnificibus suis orat — et pro nobis, quorum peccata clavi figebant. Brachia eius in amplexu aeterno patent.',
  },
  {
    number: 12,
    name: 'Jesus dies on the Cross',
    latinName: 'Iesus in Cruce moritur',
    scripture: 'John 19:28–30; Luke 23:44–46',
    meditation:
      'After three hours of agony, Jesus bows His head and says, "It is finished." He gives up His spirit to the Father. The veil of the Temple is torn in two. The earth shakes. The price of our redemption is paid. The greatest act of love in history is complete.',
    latinMeditation:
      'Post tres horas agoniae, Iesus caput inclinat et dicit: "Consummatum est." Spiritum Patri tradit. Velum Templi in duas partes scinditur. Terra tremit. Pretium redemptionis nostrae solutum est. Maximum opus amoris in historia completum est.',
  },
  {
    number: 13,
    name: 'Jesus is taken down from the Cross',
    latinName: 'Iesus de Cruce deponitur',
    scripture: 'John 19:38–40',
    meditation:
      'Joseph of Arimathea and Nicodemus take the body of Jesus down from the cross and place it in the arms of His Mother. Mary holds her Son — the child she held at Bethlehem, now lifeless. She is the image of the Church holding the suffering of the world.',
    latinMeditation:
      'Ioseph ab Arimathaea et Nicodemus corpus Iesu de cruce deponunt et in brachia Matris eius ponunt. Maria Filium suum tenet — infantem quem Bethlehemi tenebat, nunc exanimem. Ipsa imago est Ecclesiae dolorem mundi sustinentis.',
  },
  {
    number: 14,
    name: 'Jesus is laid in the tomb',
    latinName: 'Iesus in sepulcro deponitur',
    scripture: 'John 19:41–42; Mark 15:46',
    meditation:
      'The body of Jesus is anointed and wrapped in a linen cloth. He is laid in a new tomb. A large stone is rolled across the entrance. All appears lost. Yet this is not the end — it is the silence before the dawn of Easter. Death itself has been entered and conquered.',
    latinMeditation:
      'Corpus Iesu ungitur et in sindonem involutum deponitur. In sepulcro novo ponitur. Magnus lapis ad ostium volvit. Omnia perdita videntur. Haec tamen non est finis — est silentium ante auroram Paschae. Mors ipsa intrata et victa est.',
  },
];

export const STATIONS_PRAYERS = {
  opening: {
    en: 'We adore Thee, O Christ, and we bless Thee.\nBecause by Thy Holy Cross Thou hast redeemed the world.',
    la: 'Adoramus te, Christe, et benedicimus tibi.\nQuia per sanctam crucem tuam redemisti mundum.',
  },
  closing: {
    en: 'Lord Jesus Christ, Your passion and death is the sacrifice that unites earth and heaven and ransoms the human race. May we who have walked in Your footsteps arrive at the glory of the resurrection. Amen.',
    la: 'Domine Iesu Christe, passio et mors tua sacrificium est quod caelum et terram unit et genus humanum redimit. Nos qui vestigiis tuis ambulavimus ad gloriam resurrectionis perveniamus. Amen.',
  },
};
