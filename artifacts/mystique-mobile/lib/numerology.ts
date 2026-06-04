export interface CompoundData {
  compound: number;
  reduced: number;
  name: string;
  isKarmicDebt: boolean;
  isMasterNumber: boolean;
  symbolism: string;
  vibrationalEssence: string;
  karmicDynamics?: string;
  manifestationPatterns: string;
}

const COMPOUND_LIST: CompoundData[] = [
  {
    compound: 10, reduced: 1, name: "The Wheel of Fortune",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "The Wheel of Fortune, turning endlessly — Isis and Osiris governing rise and fall.",
    vibrationalEssence: "The 10/1 Personal Year operates as a karmic engine of instant manifestation. Whatever the individual directs their will toward during this year has an unusual capacity to materialize rapidly. The Wheel of Fortune symbolism carries a precise meaning: the year's circumstances turn according to the individual's desires, but they turn with the wheel's full momentum. The name one builds during this year, the reputation one establishes — all will become known.",
    karmicDynamics: "The 10/1 year brings past actions into present manifestation with unusual speed. Positive karma produces visible opportunities that seem to arrive without effort. Negative karma surfaces just as rapidly, bringing obstacles that force confrontation with previously avoided responsibilities.",
    manifestationPatterns: "Individuals experiencing 10/1 years often report synchronicities that feel almost theatrical in their precision. There is rarely mediocrity with 10/1: the year's outcomes tend toward extremes — great success or significant failure, rapid advancement or sudden reversal."
  },
  {
    compound: 11, reduced: 2, name: "Strength",
    isKarmicDebt: false, isMasterNumber: true,
    symbolism: "A woman holding open the jaw of a lion. Master Number of spiritual illumination.",
    vibrationalEssence: "The 11/2 Personal Year is one of the most spiritually significant compound numbers in the Chaldean system. The 11 is a Master Number representing the higher octave of 2's receptive energy — the Illumination number, the Intuition number, the channel through which spiritual vision penetrates ordinary consciousness.\n\nThe image of the woman holding open the lion's jaw captures the year's essential dynamic: tremendous power that must be controlled through gentleness rather than force. The 11/2 year's strength is not the strength of domination but the strength of containment.",
    karmicDynamics: "The 11/2 year brings karmic tests around the integration of spiritual vision with practical relationship. Past-life patterns of misusing psychic or intuitive abilities create the year's curriculum.",
    manifestationPatterns: "Individuals in 11/2 years frequently report intensified intuitive experiences — dreams that carry precognitive information, synchronicities that feel guided by unseen intelligence. The year's partnerships carry unusual significance."
  },
  {
    compound: 12, reduced: 3, name: "The Sacrifice",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "The Sacrifice — or the Victim; one sacrificed for the plans or intrigues of others.",
    vibrationalEssence: "The 12/3 Personal Year introduces a quality of suffering and anxiety into the 3's normally joyful expressive cycle. The individual's creative and communicative efforts are frequently diverted, exploited, or undermined by others. The year's outward theme remains expression and expansion, but the hidden current involves sacrifice — giving more than one receives.",
    karmicDynamics: "The 12/3 year brings karmic lessons around the relationship between giving and receiving. Past-life patterns of martyrdom, of allowing oneself to be exploited, create the energetic template.",
    manifestationPatterns: "Individuals in 12/3 years frequently find their creative work appropriated by others, their ideas adopted without credit. The year's essential teaching is discernment in giving — establishing boundaries that protect creative energy from depletion."
  },
  {
    compound: 13, reduced: 4, name: "Rebirth",
    isKarmicDebt: true, isMasterNumber: false,
    symbolism: "Rebirth — change of plans, change of place, upheaval and destruction; death as symbolic ending and new beginning.",
    vibrationalEssence: "The 13/4 Personal Year carries one of the four Karmic Debt numbers, introducing the most dramatic transformative energy into the 4's normally stable foundation-building cycle. The individual's efforts to establish structure and security are continually disrupted by forces of change that operate beyond their control. Each disruption creates the necessity for the discipline the individual's karma requires them to develop.",
    karmicDynamics: "The 13/4 year brings the karmic debt of laziness and irresponsibility from past lives. The upheaval is not punishment but education: each disruption creates the necessity for disciplined effort and responsible action.",
    manifestationPatterns: "The 13/4 year produces sudden and unexpected changes where the individual seeks security. Career plans may be overturned; financial structures shaken; living situations changed. The essential teaching is that true foundation cannot be built on rigid attachment to existing structures."
  },
  {
    compound: 14, reduced: 5, name: "Magnetic Movement",
    isKarmicDebt: true, isMasterNumber: false,
    symbolism: "Movement, combination of people and things; danger from natural elements; fortunate dealings with money but with risk.",
    vibrationalEssence: "The 14/5 Personal Year carries the second Karmic Debt number, introducing the lesson of balanced freedom into the 5's expansive change cycle. The year's energy is magnetic — it draws people, opportunities, and circumstances toward the individual with unusual force. The 14 compound has a special association with magnetic communication with the public through writing, publishing and all media.",
    karmicDynamics: "The 14/5 year brings the karmic debt of misused freedom and irresponsible behavior from past lives. Each opportunity carries embedded risks that require careful navigation.",
    manifestationPatterns: "The 14/5 year produces a paradox: extraordinary magnetic power to attract people and opportunities, combined with constant risk of loss through others' unreliability. The individual's communicative abilities operate at peak effectiveness."
  },
  {
    compound: 15, reduced: 6, name: "The Enchantment",
    isKarmicDebt: true, isMasterNumber: false,
    symbolism: "Revolution, upheaval, strife when associated with 4 or 8; enchantment, eloquence, and magnetic charisma otherwise.",
    vibrationalEssence: "The 15/6 Personal Year carries the third Karmic Debt number, introducing the most complex energy into the 6's normally harmonious service cycle. The year's energy carries what practitioners call 'the essence of enchantment' — a magnetic quality that draws people, opportunities, and resources toward the individual with almost supernatural force.",
    karmicDynamics: "The 15/6 year's karmic debt operates through the relationship between personal power and responsibility. Past-life patterns of using magnetic influence for selfish purposes create the year's critical test.",
    manifestationPatterns: "When constructive, the 15/6 year produces extraordinary capacity for obtaining gifts and favors from others. When destructive, it produces manipulation and exploitation. The challenge is maintaining ethical integrity while wielding the 15's considerable power."
  },
  {
    compound: 16, reduced: 7, name: "The Shattered Citadel",
    isKarmicDebt: true, isMasterNumber: false,
    symbolism: "A tower struck by lightning, from which a man with a crown is falling — the Shattered Citadel.",
    vibrationalEssence: "The 16/7 Personal Year carries the fourth and most intense Karmic Debt number. The Tower card symbolism captures the year's essential dynamic: lightning from heaven strikes the citadel, destroying what was constructed on false foundations and creating the necessity for authentic reconstruction. The year's catastrophes are not random misfortunes but precise corrections.",
    karmicDynamics: "The 16/7 year brings the karmic debt of ego and arrogance from past lives. Each destruction removes something built on ego; each fall humbles something that had become prideful.",
    manifestationPatterns: "The 16/7 year produces sudden disruptions where the individual has built their sense of security. Belief systems may collapse; spiritual practices may prove ineffective; intellectual frameworks may reveal fundamental flaws. Surrender rather than resistance is the key."
  },
  {
    compound: 17, reduced: 8, name: "The Star of the Magi",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "The 8-pointed Star of Venus; peace, love, immortality; the name lives after them.",
    vibrationalEssence: "The 17/8 Personal Year carries the most spiritually elevated compound vibration in the entire 8-series. The 8's material authority becomes the vehicle for expressing higher love, deeper peace, and lasting significance. The 'Number of immortality' indicates that the year's accomplishments have lasting significance — they contribute to the individual's legacy in ways that transcend their mortal lifespan.",
    karmicDynamics: "The 17/8 year often represents the flowering of exceptionally positive karma related to past-life spiritual achievement. Material success and spiritual fulfillment converge.",
    manifestationPatterns: "The 17/8 year produces material achievement that carries spiritual significance. The individual's professional success and authority are not merely secular accomplishments but expressions of higher purpose. Their leadership inspires others."
  },
  {
    compound: 18, reduced: 9, name: "Materialism Striving to Destroy Spirit",
    isKarmicDebt: true, isMasterNumber: false,
    symbolism: "A rayed moon from which drops of blood are falling; a wolf and dog catching the drops — materialism striving to destroy spirit.",
    vibrationalEssence: "The 18/9 Personal Year carries the most difficult symbolism of all Chaldean compound numbers. The image of the bleeding moon, predatory animals, and scavenging crab paints a picture of spiritual vitality under attack by materialistic forces. The individual's capacity for release, compassion, and transcendence is tested by circumstances that demand material focus.",
    karmicDynamics: "The 18/9 year brings the karmic debt of misused power and material exploitation from past lives. The year's tests force confrontation with the consequences of spiritual neglect.",
    manifestationPatterns: "The 18/9 year produces situations where material and spiritual values come into sharp conflict. The individual may face decisions that appear to require choosing between financial survival and ethical integrity."
  },
  {
    compound: 19, reduced: 1, name: "The Prince of Heaven",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "The Sun, radiant and triumphant — the Prince of Heaven victorious over all temporal failure.",
    vibrationalEssence: "The 19/1 Personal Year carries what Cheiro described as 'all the power of the compound number 10, without the inherent dangers.' Where 10/1 offers karmic momentum that can be directed toward either constructive or destructive ends, 19/1 channels the 1's initiating force through the Sun's radiant beneficence, producing a year where success, happiness, esteem, and honor flow with unusual consistency.",
    karmicDynamics: "The 19/1 year often represents the resolution of karmic debts related to past-life abuse of power. The year's opportunities come with embedded tests of integrity.",
    manifestationPatterns: "This compound produces 'effortless success' — not that no effort is required, but that the effort invested yields returns disproportionate to the input. Projects launched during 19/1 years tend to gain momentum through favorable coincidence."
  },
  {
    compound: 20, reduced: 2, name: "The Awakening",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "A winged angel sounding a trumpet while a man, woman, and child rise from a tomb with hands clasped in prayer.",
    vibrationalEssence: "The 20/2 Personal Year carries one of the most profound spiritual symbols in the Chaldean system. Called 'The Awakening' and 'The Judgement,' this compound number introduces a quality of spiritual calling into the 2's partnership cycle. The 2's receptive energy becomes a channel for higher purpose — a call to action for some great purpose, cause, or duty.",
    karmicDynamics: "The 20/2 year often represents a karmic turning point — the moment when the soul's deeper purpose becomes undeniable, when the individual can no longer ignore the call to serve their destined role.",
    manifestationPatterns: "The 20/2 year frequently produces experiences that feel like 'wake-up calls' — events that disrupt comfortable routines and challenge established priorities. The angel's trumpet is not a gentle suggestion; it is a summons that demands response."
  },
  {
    compound: 21, reduced: 3, name: "The Crown of the Magi",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "The Universe; the Crown of the Magi — advancement, honors, elevation in life.",
    vibrationalEssence: "The 21/3 Personal Year carries one of the most auspicious compound vibrations in the entire Chaldean system. Where 12/3 brings sacrifice, 21/3 brings 'advancement, honors, elevation in life and general success.' The 2's cooperative energy opens doors that the 1's pioneering force then walks through. Cheiro emphasized this number 'means victory after long initiation and tests of determination.'",
    karmicDynamics: "The 21/3 year often represents the flowering of karma cultivated through previous cycles of disciplined effort. The year's honors are earned rewards for sustained creative work.",
    manifestationPatterns: "The 21/3 year produces visible advancement in creative and professional domains. The individual's work gains public recognition; their communication skills open doors to new opportunities. Honors, awards, promotions, and public acknowledgment characterize this cycle."
  },
  {
    compound: 22, reduced: 4, name: "The Fool",
    isKarmicDebt: false, isMasterNumber: true,
    symbolism: "A good man blinded by the folly of others, with a knapsack full of arrows; a dreamer who awakens only when surrounded by danger. Master Number of the Master Builder.",
    vibrationalEssence: "The 22/4 Personal Year is a Master Number year, representing the higher octave of 4's structural energy. Where the ordinary 4 builds through methodical discipline, the 22/4 builds on a scale that transforms not only the individual's life but also the lives of those around them. The 22 is the Master Builder number — a year where the individual's foundation-building efforts have the potential to create lasting structures of significant scale.",
    karmicDynamics: "The 22/4 year brings karmic tests around the responsible use of building power. The individual must learn to be the Master Builder rather than the master builder's tool.",
    manifestationPatterns: "The 22/4 year produces opportunities for significant construction — building businesses, organizations, systems, or structures that serve large numbers of people. The warning: others may seek to attach themselves to the individual's building efforts, steering it toward their own ends."
  },
  {
    compound: 23, reduced: 5, name: "The Royal Star of the Lion",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "The Royal Star of the Lion — a promise of success, help from superiors, and protection from those in high places.",
    vibrationalEssence: "The 23/5 Personal Year carries what Cheiro described as 'a most fortunate number and a promise of success of one's plans.' The year's energy operates through channels of patronage, mentorship, and support from established authority. The year's fortunate events carry the quality of royal favor — support that arrives through the intervention of powerful figures who recognize the individual's potential.",
    karmicDynamics: "The 23/5 year often represents the flowering of positive karma related to past-life service to authority. The individual now receives the return on that karmic investment through patronage and protection.",
    manifestationPatterns: "The 23/5 year produces encounters with influential people who provide unexpected support. The individual may receive mentorship from established figures, may be recommended for positions by powerful advocates. Obstacles dissolve when confronted with the Royal Star's influence."
  },
  {
    compound: 24, reduced: 6, name: "Magnetic Attraction",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "Assistance and association of those of rank and position; gain through love and the opposite sex; favorable in relation to future events.",
    vibrationalEssence: "The 24/6 Personal Year carries one of the most consistently favorable compound vibrations in the Chaldean system. The year's energy operates through attraction rather than pursuit — the individual's presence, their way of being in relationship, their capacity for care and service, draws supportive people and favorable circumstances toward them.",
    karmicDynamics: "The 24/6 year often represents the flowering of positive karma related to past-life service and loving care. The individual now receives the return through magnetic attraction of beneficial alliances.",
    manifestationPatterns: "The 24/6 year produces connections with people of position and influence who provide tangible support. These connections often develop through natural affinity rather than calculated networking. Partnerships formed during this cycle tend toward genuine affection and shared growth."
  },
  {
    compound: 25, reduced: 7, name: "Strength Through Experience",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "Strength gained through experience; benefits obtained through observation of people and things; success given through strife and trials.",
    vibrationalEssence: "The 25/7 Personal Year carries a compound vibration that transforms the 7's introspective energy through the lens of hard-won wisdom. Cheiro described 25 as denoting 'strength gained through experience, and benefits obtained through observation of people and things.' The year's wisdom comes not from current experiences alone but from the activation of knowledge accumulated through past-life trials.",
    manifestationPatterns: "The 25/7 year produces situations that test and confirm the individual's hard-won wisdom. The compound number's assessment as 'not deemed exactly lucky' is important: benefits come through effort and willingness to engage with challenges. The year's rewards are substantial but earned."
  },
  {
    compound: 26, reduced: 8, name: "The Gravest Warnings",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "Full of the gravest warnings for the future; disasters brought about by association with others; ruin by bad speculations and bad advice.",
    vibrationalEssence: "The 26/8 Personal Year carries one of the most severely cautionary compound vibrations in the Chaldean system. Cheiro's description is explicit: 'This number is full of the gravest warnings for the future. It foreshadows disasters brought about by association with others; ruin by bad speculations, by partnerships, unions and bad advice.' The year's material achievements are perpetually at risk.",
    karmicDynamics: "The 26/8 year brings karmic lessons around discernment in partnership. Past-life patterns of forming alliances with untrustworthy partners create the energetic template for the year's experiences.",
    manifestationPatterns: "The 26/8 year produces material opportunities that appear promising but prove dangerous. Business partnerships that seem advantageous dissolve into conflict; financial speculations result in losses. The year's successes come through self-reliance; its disasters come through misplaced trust."
  },
  {
    compound: 27, reduced: 9, name: "The Scepter",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "The Scepter — a promise of authority, power, and command; reward from the productive intellect.",
    vibrationalEssence: "The 27/9 Personal Year carries the most favorable compound vibration in the entire 9-series. Cheiro described 27 as 'a good number and is symbolized as the Sceptre. It is a promise of authority, power and command. It indicates that reward will come from the productive intellect; that the creative faculties have sown good seeds that will reap a harvest.'",
    karmicDynamics: "The 27/9 year often represents the culmination of positive karma accumulated through cycles of creative service. The individual now reaps the harvest through positions of influence and authority.",
    manifestationPatterns: "The 27/9 year produces recognition and reward for intellectual and creative achievement. The individual's ideas gain authority; their creative work commands respect; their leadership is sought after. The command that 27/9 promises is constructive authority exercised for the benefit of those they lead."
  },

  // ── NEW: compounds 28–52 (classical Chaldean) ─────────────────────────────
  {
    compound: 28, reduced: 1, name: "The Lamb",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "A person of great promise and possibilities who is likely to see all taken away unless they carefully provide for the future.",
    vibrationalEssence: "The 28/1 is one of the most contradictory compound numbers in the Chaldean system. Classical description warns explicitly of 'loss through trust in others, opposition and competition in trade, danger of loss through law, and the likelihood of having to begin life's road over and over again.' The 2's cooperative energy attracts significant opportunities while the 8's power creates them — yet repeatedly cycles of loss overturn carefully laid plans.",
    karmicDynamics: "The 28/1 often brings karmic lessons around trust and discernment. Past-life patterns of placing faith in unworthy allies, of assuming others share one's integrity, of failing to protect one's interests through proper legal safeguards — all create the energetic template.",
    manifestationPatterns: "Individuals in 28/1 frequently experience 'two steps forward, one step back' progress. Money lent rarely returns; promises made are frequently broken; trust placed is often betrayed. Yet the repeated necessity of beginning again builds resilience, adaptability, and unusual capacity for regeneration."
  },
  {
    compound: 29, reduced: 2, name: "Grace Under Trial",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "Uncertainties, treachery, and deception of others; trials, tribulation, and unexpected dangers; unreliable friends; grief and deception caused by members of the opposite sex.",
    vibrationalEssence: "The 29/2 carries one of the most challenging compound vibrations in the Chaldean system. The 2's receptive partnership energy combines with the 9's completion, producing a period where relationships and collaborations become the primary arena for karmic testing. Cheiro gave grave warning if this comes out in anything concerning future events. The 29 reduces to 11, creating a hidden Master Number beneath the 2's outward receptivity.",
    karmicDynamics: "The 29/2 brings karmic debts related to relationship patterns from past lives — misuse of trust, betrayal of confidences, abandonment of those who depended on the individual, or excessive gullibility.",
    manifestationPatterns: "Individuals in 29/2 frequently encounter situations that test their capacity to trust wisely. People who present themselves as friends prove unreliable; partnerships that seem promising dissolve through deception. The hidden 11 Master Number means that the period's trials, properly met, develop intuitive wisdom and spiritual resilience."
  },
  {
    compound: 30, reduced: 3, name: "The Thoughtful Deduction",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "Thoughtful deduction, retrospection, and mental superiority over one's fellows.",
    vibrationalEssence: "The 30/3 introduces a quality of intellectual detachment into the 3's normally social and expressive cycle. Cheiro observed that this number 'seems to belong completely to the mental plane.' Those it represents are likely to put all material things on one side — not because they have to, but because they wish to do so. The 0's mystical amplification channels the 3's creative energy into pure mental activity.",
    manifestationPatterns: "The 30/3 produces significant mental productivity. The individual's creative energy channels into intellectual rather than social or artistic expression. Cheiro described 30 as 'neither fortunate nor unfortunate, for either depends on the mental outlook of the person it represents.' Clear, constructive thinking produces powerful results; scattered thinking yields indifferent outcomes."
  },
  {
    compound: 31, reduced: 4, name: "The Recluse",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "Even more self-contained, lonely, and isolated from his fellows; not a fortunate number from a worldly or material standpoint.",
    vibrationalEssence: "The 31/4 carries the 30/3's thoughtful, mental energy through the 4's structural filter. Cheiro described 31 as 'very similar to the preceding one [30], except that the person it represents is even more self-contained, lonely, and isolated from his fellows.' Foundation-building becomes a solitary endeavor — achievement comes through one's own effort but progress is slower than with collaborative support.",
    manifestationPatterns: "The 31/4 produces methodical, systematic progress achieved individually rather than collectively. The individual builds solid foundations through disciplined effort, developing skills and creating structures that are genuinely durable. The period's isolation means progress is slower, but what is built is entirely one's own."
  },
  {
    compound: 32, reduced: 5, name: "The Unexpected Power",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "Magical power like the single 5; associated with combinations of people or nations; fortunate if the person holds to their own judgment.",
    vibrationalEssence: "The 32/5 carries the same fortunate vibration as 23/5 but with the digits reversed, producing success through 'unexpected power' — achievement that arrives through surprising channels, often from one's own creative efforts rather than external patronage. Cheiro described 32 as having 'a magical power like the single 5, or the command numbers 14 and 23.'",
    manifestationPatterns: "The 32/5 produces sudden successes that seem to emerge from nowhere. The individual's creative efforts gain traction through unexpected channels. The compound number's warning is specific: 'if the person it represents holds to his own judgment and opinions; if not, his plans are likely to become wrecked by the stubbornness and stupidity of others.'"
  },
  {
    compound: 33, reduced: 6, name: "The Master Teacher",
    isKarmicDebt: false, isMasterNumber: true,
    symbolism: "Same essential quality as 24/6 with the Master Number's intensified spiritual power and deeper magnetism.",
    vibrationalEssence: "The 33/6 is a Master Number representing the highest octave of 6's nurturing energy. Where the ordinary 6 cares for family and community, the 33/6 serves humanity with the dedicated commitment of the spiritual master. This is the Master Teacher number, producing a period where nurturing, service-oriented energy achieves its most elevated expression. Even stronger magnetism than 24/6.",
    manifestationPatterns: "The 33/6 produces opportunities for significant service and teaching. The individual's capacity for care and nurture finds expression through roles that guide, heal, or educate others. Their presence becomes a source of inspiration and transformation for those who encounter them."
  },
  {
    compound: 34, reduced: 7, name: "The Well-Regarded Balance",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "Same essence as 25/7, well-regarded and generous with a good work-life balance.",
    vibrationalEssence: "The 34/7 carries the Wheel of Fortune's karmic momentum with the 3's creative expression and the 4's structural discipline through the 7's introspective filter. Described as 'well-regarded and generous, with a good work-life balance.' Introspective development is balanced with creative productivity and systematic effort.",
    manifestationPatterns: "The 34/7 produces harmonious integration of inner and outer life. The individual's analytical and spiritual pursuits proceed alongside creative and professional endeavors, with each dimension supporting the others. The period's introspection yields insights that enhance practical performance."
  },
  {
    compound: 35, reduced: 8, name: "The Same Disastrous Warning",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "Same essence as 26/8; strong inner needs to fill and will move mountains to do it.",
    vibrationalEssence: "The 35/8 carries the same fundamental warning as 26/8. The Chaldean source explicitly states that 35 'has the same meaning as the number 26' — the dangerous alliance warning applies with equal force. The 3's creative expression and 5's dynamic change modify the pattern toward creative and professional alliances.",
    manifestationPatterns: "The 35/8 produces the same partnership dangers as 26/8, with additional emphasis on creative and professional alliances. The individual's drive for material success may lead them to accept partnerships in creative ventures that appear promising but prove problematic. Extreme caution in partnership is essential."
  },
  {
    compound: 36, reduced: 9, name: "The Creatively Influential",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "Same essence as 27/9, creatively influential; puts effort into success; finds the easy way to rise.",
    vibrationalEssence: "The 36/9 carries the 27/9's scepter energy with the 3's creative expression and the 6's nurturing responsibility. Described as 'creatively influential, puts a lot of effort into being a success, niche is finding the easy way to rise to the top.' The completion theme operates through the fruition of creative projects.",
    manifestationPatterns: "The 36/9 produces creative achievement that gains authoritative recognition. The individual's artistic, communicative, or expressive efforts are acknowledged by those in positions to grant influence and opportunity. Previous creative cycles come to fruition."
  },
  {
    compound: 37, reduced: 1, name: "The Royal Star of Taurus",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "The 8-pointed Star of Venus; a symbol of peace, love, and fortunate partnerships.",
    vibrationalEssence: "The 37/1 carries a distinctly social and relational quality. Cheiro described 37 as 'a number of good and fortunate friendships in love, and in combinations connected with the opposite sex. It is also good for partnerships of all kinds.' The 3's creative expression combines with the 7's spiritual depth, producing an energy that attracts genuinely supportive connections.",
    karmicDynamics: "The 37/1 often resolves karmic patterns around isolation and self-sufficiency taken to excess. The Royal Star of Taurus symbolism suggests that the period's partnerships carry a quality of divine blessing — connections that feel fated, encounters that transform the trajectory of the individual's life.",
    manifestationPatterns: "This compound produces 'partnership magic' — the phenomenon where the right person appears at precisely the moment their contribution becomes essential. Business partnerships formed during 37/1 tend to be mutually beneficial and enduring. Romantic connections carry unusual depth and transformative potential."
  },
  {
    compound: 38, reduced: 2, name: "The Unexpected Power",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "Same essence as 29/2, with the 3's creative expression and 8's material power modifying the trial pattern.",
    vibrationalEssence: "The 38/2 reduces to 11, carrying the same Master Number foundation as 29/2 but with distinctly different surface characteristics. The 3's creative, expressive energy combines with the 8's material authority, producing a period where trials and deceptions manifest primarily in professional and creative arenas rather than purely emotional ones.",
    manifestationPatterns: "The 38/2 produces challenges in creative and professional partnerships. The individual's ideas and work attract interest from others, but not all who express enthusiasm prove trustworthy. Business arrangements require unusually careful scrutiny; creative partnerships demand clear agreements about ownership and credit."
  },
  {
    compound: 39, reduced: 3, name: "The Creative Multiplicity",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "Same essence as 30/3, keeping many projects going so that life works out.",
    vibrationalEssence: "The 39/3 reduces to 12, then to 3, carrying the thoughtful deduction energy of 30/3 with the 9's completion and the 3's creative expression intensified. This compound produces a period of creative abundance and multiple projects, where the individual's expressive energy extends in many directions simultaneously.",
    manifestationPatterns: "The 39/3 produces a busy creative life with many projects in various stages of development. The individual may write, teach, perform, and organize simultaneously. The challenge lies in completion; the 9's influence brings many initiatives to fruition, but multiplicity requires disciplined focus."
  },
  {
    compound: 40, reduced: 4, name: "The Higher Recluse",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "Same essence as 31/4, charming their way into prominent positions and flexing rules.",
    vibrationalEssence: "The 40/4 carries the 40's energy through the structural 4, amplified by the 0's mystical potential. Where 31 produced isolation through self-containment, 40 produces prominence through disciplined charm. The individual's systematic approach to foundation-building attracts the attention of those who value reliability and thoroughness.",
    manifestationPatterns: "The 40/4 produces solid professional advancement through demonstrated competence. The individual's systematic approach attracts recognition; promotions, expanded responsibilities, and positions of trust characterize this cycle. Achievements are solid, visible, and built with thoroughness that produces lasting results."
  },
  {
    compound: 41, reduced: 5, name: "The Verbal Leader",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "Same essence as 32/5, leadership that comes easily; at home in verbal debate; drawn to technical disciplines.",
    vibrationalEssence: "The 41/5 carries the 32/5's unexpected power energy with the 4's structural discipline and the 1's initiating force. This compound produces a period where dynamic change operates through leadership, technical expertise, and verbal mastery. Leadership positions emerge through demonstrated expertise.",
    manifestationPatterns: "The 41/5 produces advancement through technical skill and verbal facility. The individual's capacity for clear communication, structured argument, and methodical presentation opens doors to new opportunities. The period's changes bring the individual into roles where their systematic approach is precisely what is needed."
  },
  {
    compound: 42, reduced: 6, name: "The Steady Foundation",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "Same essence as 24/6, steady and assured; slow and steady.",
    vibrationalEssence: "The 42/6 carries the 24/6's magnetic attraction energy with the 4's structural discipline emphasized. Nurturing and service are expressed through methodical, systematic effort rather than spontaneous charm. This compound produces solid, enduring relationships built through patient effort.",
    manifestationPatterns: "The 42/6 produces solid, enduring relationships built through patient effort. The individual's care for others is demonstrated through daily actions rather than occasional grand displays. Partnerships are characterized by mutual reliability and shared commitment to practical responsibilities. Results accumulate slowly but prove durable."
  },
  {
    compound: 43, reduced: 7, name: "The Point of Reaper",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "Revolution, upheaval, strife, failure, and prevention; the Point of Reaper — destruction and annihilation.",
    vibrationalEssence: "The 43/7 carries one of the most severe compound vibrations in the Chaldean system. Sepharial described 43 as 'the Point of Reaper — Destruction; abortive enterprises; things brought to nothing; annihilation.' The 4's structure combines with the 3's creativity, producing a period where analytical and spiritual efforts encounter forces of dissolution that overturn established patterns.",
    manifestationPatterns: "The 43/7 produces experiences of fundamental disruption. Plans and projects may fail completely; spiritual practices may prove ineffective; analytical frameworks may reveal fatal inconsistencies. Yet the Point of Reaper is also cleansing: it removes what is false, hollow, or unsustainable, creating the emptiness from which genuine understanding can emerge."
  },
  {
    compound: 44, reduced: 8, name: "The Master Business Number",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "Same essence as 26/8; master number that knows the ins and outs of business but does not know when to stop.",
    vibrationalEssence: "The 44/8 introduces a Power Number into the 8's material cycle. The double 4 intensifies the structural discipline, methodical effort, and systematic organization of the 4. World numerology sources describe 44 as 'a master number that knows the ins and outs of business but does not know when to stop.' The 26/8's dangerous alliance warning remains operative beneath the intensified force.",
    manifestationPatterns: "The 44/8 produces deep understanding of business dynamics and exceptional capacity for material achievement. The individual's systematic approach yields insights and strategies that elude less disciplined competitors. However, the warning about not knowing 'when to stop' is significant; the period's intensity may lead to overwork or neglect of relationships."
  },
  {
    compound: 45, reduced: 9, name: "The Ambitious Business Success",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "Same essence as 27/9, ambition and success in business.",
    vibrationalEssence: "The 45/9 carries the 27/9's scepter energy with the 4's structural discipline and the 5's dynamic change. This compound produces a period where completion and authority are achieved through systematic business achievement and adaptive professional development. The individual's methodical approach to career development yields advancement to leadership roles.",
    manifestationPatterns: "The 45/9 produces business and professional success that culminates in positions of authority. The period's completion theme operates through the achievement of professional goals that have been pursued through disciplined effort. Leadership emerges naturally from demonstrated competence and ethical conduct."
  },
  {
    compound: 46, reduced: 1, name: "The Magnetic Foundation",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "Same essence as 37/1 — the Royal Star of Taurus operating through a higher octave of partnership energy.",
    vibrationalEssence: "The 46/1 carries the same fundamental vibration as 37/1, with the 4's structural discipline and the 6's nurturing responsibility added to the partnership-oriented energy. Partnerships formed during 46/1 tend to be characterized by clear agreements, defined responsibilities, and structured approaches to shared goals. The 6's influence introduces care, service, and relational commitment.",
    manifestationPatterns: "The 46/1 produces partnerships that are both fortunate and durable. The individual attracts allies who bring stability — people who commit, who follow through, who invest in long-term success of shared endeavors. Professional collaborations benefit from clear structure and mutual accountability."
  },
  {
    compound: 47, reduced: 2, name: "The Analytical Perception",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "Same essence as 29/2, with the 4's structured analysis and 7's spiritual depth modifying the trial pattern.",
    vibrationalEssence: "The 47/2 reduces to 11, carrying the Master Number foundation with the 4's methodical discipline and the 7's analytical introspection. Relationship challenges are met through intellectual rigor and spiritual investigation. The period's trials become puzzles to be solved, opportunities for deepening understanding rather than merely enduring suffering.",
    manifestationPatterns: "The 47/2 produces relationship challenges that yield to analytical investigation. The individual who applies careful attention to partnership dynamics, who studies the patterns in their relational experiences, emerges with significantly developed capacity for wise relationship. The period's trials become the raw material for expertise in human dynamics."
  },
  {
    compound: 48, reduced: 3, name: "The Frictioned Visionary",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "Same essence as 39/3 and 30/3, visionary but with efforts brought down by friction from all sides.",
    vibrationalEssence: "The 48/3 reduces to 12, then to 3, carrying the 30/3 energy with the 4's structural discipline and the 8's material power. This compound produces a period of significant creative vision coupled with practical challenges that obstruct the vision's realization. The compound's reduction through 12 introduces the Sacrifice vibration, meaning creative efforts encounter resistance and friction.",
    manifestationPatterns: "The 48/3 produces ambitious creative projects that encounter practical obstacles. The individual's vision is clear and implementation capacity is strong, but external circumstances — bureaucratic delays, financial constraints, opposition from established interests — create friction that slows progress. Persistence in the face of resistance is the key lesson."
  },
  {
    compound: 49, reduced: 4, name: "The Humanitarian Builder",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "Same essence as 31/4, the practical humanitarian who is uncomfortable with travel and dislikes changes.",
    vibrationalEssence: "The 49/4 reduces to 13, then to 4, carrying the karmic rebirth energy of 13/4 through a higher octave. The 4's structural discipline combines with the 9's completion and humanitarian breadth, producing a period where foundation-building serves collective welfare rather than merely individual security.",
    manifestationPatterns: "The 49/4 produces practical achievements with humanitarian impact. The individual's systematic efforts create structures that serve collective needs — community organizations, educational programs, social services, or infrastructure that benefits broad populations. The period's foundation-building carries a quality of legacy."
  },
  {
    compound: 50, reduced: 5, name: "The Debater at Home",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "Same essence as 32/5, at home in verbal debate; drawn to technical disciplines.",
    vibrationalEssence: "The 50/5 carries the 5's dynamic energy amplified by the 0's mystical potential, producing a period of intensified change and movement where the individual's adaptability operates at peak capacity.",
    manifestationPatterns: "The 50/5 produces abundant opportunities for movement, travel, and new experience. The individual's adaptability is the period's greatest asset; they can enter unfamiliar situations and rapidly orient themselves, finding advantage where others see only confusion. Rigidity or resistance to change produces the only significant difficulties."
  },
  {
    compound: 51, reduced: 6, name: "The Warrior's Sacrifice",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "The nature of the warrior; sudden advancement; favorable for military or naval life and leaders; threatens enemies, danger, and the likelihood of assassination.",
    vibrationalEssence: "The 51/6 carries one of the most powerful and paradoxical compound vibrations. Cheiro described 51 as representing 'the nature of the warrior; it promises sudden advancement in whatever one undertakes.' The period's service takes the form of protection, defense, and leadership in challenging circumstances. The warrior energy is protective rather than aggressive.",
    karmicDynamics: "The 51/6 often brings karmic patterns related to past-life military or protective service. The individual who defended their community, who led others through danger — now encounters circumstances that activate these established patterns.",
    manifestationPatterns: "The 51/6 produces situations that require courage, decisiveness, and protective leadership. Others depend on the individual's strength and judgment; circumstances demand confrontation with opposition or danger. Advancement comes through demonstrated bravery. The warning is explicit: 'it threatens enemies, danger, and the likelihood of assassination' — the warrior's path attracts those who oppose what one defends."
  },
  {
    compound: 52, reduced: 7, name: "The Same Revolutionary Force",
    isKarmicDebt: false, isMasterNumber: false,
    symbolism: "Same essence as 43/7, caring and charitable people who want to bring emotional peace to others.",
    vibrationalEssence: "The 52/7 carries the same fundamental energy as 43/7 but with the digits reversed, producing a period where the 43/7's revolutionary force operates through emotional and relational channels. The Chaldean source describes 52 as having the same meaning as 43, but those under its influence are 'caring and charitable people who want to bring emotional peace to others.'",
    manifestationPatterns: "The 52/7 produces deep emotional insights that can be applied to healing others. The individual's own experiences of upheaval and transformation become the foundation for compassionate understanding of others' struggles. The period's destructiveness, properly processed, becomes the basis for wisdom that serves collective emotional healing."
  },
];

export const COMPOUNDS: Record<number, CompoundData> = Object.fromEntries(
  COMPOUND_LIST.map((c) => [c.compound, c])
);

export const PERSONAL_YEAR_MEANINGS: Record<number, string> = {
  1: `PERSONAL YEAR 1 — AN ACTIVE YEAR OF ADJUSTMENT

This is an extremely powerful doing year for personal growth and expression as we adjust to the changes wrought during the now-concluded PY9. The power of this year encourages us to dare to be different as we improve in self-confidence. This is an excellent year for breaking old habits, improving finances, and buying and selling on a wide scale.

ESOTERIC MEANING: THE BURDEN OF THE ARCHITECT. It's a year of radical isolation. You are the only one who can see the vision. It requires the "death" of your former identity to make room for the new seed. The focus is the emergence of the Self from the void.`,

  2: `PERSONAL YEAR 2 — A SPIRITUAL GROWTH YEAR OF SHARING

Though not with the power of a peak number, this is a year in which its own powerful nature can cause many a turbulent personality to embrace calmness. Spiritual development is the primary feature of this year with an enhanced awareness of life's more subtle qualities. Central to the growth is the need to actively develop the power of meditation.

ESOTERIC MEANING: THE PSYCHIC SPONGE. This isn't just about "waiting"; it's about developing extreme receptivity. You are learning to be "second" so you can understand the nuances of energy and intuition.`,

  3: `PERSONAL YEAR 3 — A MIND-EXPANSIVE YEAR

Between the peak PYNs and the trough of PY4 comes this year of surprisingly intensified mental power. Under this vibration, our thinking and observing faculties are attuned to an acute peak of alertness. It is a year when the intellect thirsts for knowledge and expression, through academic study, philosophy, or extensive travel.

ESOTERIC MEANING: THE MASK AND THE MIRROR. It is the "adolescence" of the cycle. The challenge is moving beyond superficial charm to find authentic self-expression. It's about the vulnerability of being truly seen.`,

  4: `PERSONAL YEAR 4 — A YEAR OF CONSOLIDATION

Physical and material factors dominate this trough year. Rest and stability are vital to regenerate and consolidate the previous five years' development. It is a year of squaring, when everything is brought to a reckoning and the unwanted aspects are eliminated, like a vine pruned in winter.

ESOTERIC MEANING: THE ANVIL. While most call this "hard work," it is actually about ancestral patterns. You are being compressed into a diamond. The lack of external movement is a sign of internal intensity — an incubation period as the roots grow deep.`,

  5: `PERSONAL YEAR 5 — A YEAR OF FREEDOM

Spiritual and emotional factors prevail this year, igniting the power of freedom through heightened psychic awareness and personal expression. This leads to the development of our talents and release from material and social confinement, replacing them with a focus on artistic expression and creative exploration.

ESOTERIC MEANING: THE CROSSROADS OF CHAOS. Beyond just "travel and change," this is a sensory recalibration. The universe tests your ability to remain centered while the world spins.`,

  6: `PERSONAL YEAR 6 — A YEAR OF CREATIVITY

This is the year of the mini-peak, its focus on accumulation of power through creative investment. New creative projects undertaken this year will have the most favourable aspects for success, especially when directed toward the upliftment of humankind. It is also a year of focus on the home and personal relationships.

ESOTERIC MEANING: THE GOLDEN HANDCUFFS. The deeper meaning is The Karmic Mirror — you attract exactly the level of harmony (or discord) that you hold within. It's a year of "Sacred Service" versus "Slavery" — learning the difference between helping others and losing yourself.`,

  7: `PERSONAL YEAR 7 — A TROUGH YEAR OF FOCUS

Similar to PY4, this is a trough year of consolidation when no major change should be undertaken. It is a highly significant year in which we learn to intensely focus on previous years' growth. For many, this implies sacrifice brought about by a failure to recognise and apply guidance from the higher powers.

ESOTERIC MEANING: THE HOLY GHOSTING. Often called "spiritual introspection," it manifests as a Dark Night of the Ego. The world may withdraw its support so you are forced to find connection to the Divine without external validation. A "bridge" year between the physical and the metaphysical.`,

  8: `PERSONAL YEAR 8 — A YEAR OF INDEPENDENCE AND WISDOM

This is a year of rapid change as we emerge from a trough onto the steep rise toward our next peak. Many new opportunities manifest as we assert our independence with growing wisdom — whether in a significant improvement in financial affairs or a heightened spiritual independence.

ESOTERIC MEANING: THE MIRROR OF MERIT. It is the Cosmic Harvest. The universe reflects your integrity back to you in material form. If you've worked with heart in years 1–7, Year 8 brings expansion. It is the mastery of the flow between "as above, so below."`,

  9: `PERSONAL YEAR 9 — THE PEAK YEAR OF CHANGE

We commence by analysing this year first, because it is both the end of the old cycle and the commencement of the new. At the forefront of the major peak in the nine-year cycle, it is the year in which change is set into motion. These changes include travel, change of home or job, and the making of new and exciting friendships.

ESOTERIC MEANING: THE GREAT EMPTYING. Often feared as "endings," this is actually a Womb-like State. You are "burning the fields" so the soil can rest. The deeper work is radical detachment — clearing the space so that the Year 1 version of you has a place to land.`,
};

// ─── Compound lookup ─────────────────────────────────────────────────────────

function digitSumRaw(n: number): number {
  return String(Math.abs(n)).split('').reduce((a, d) => a + Number(d), 0);
}

export function lookupCompound(rawSum: number): CompoundData | null {
  if (rawSum < 10) return null;
  let n = rawSum;
  while (n > 99) n = digitSumRaw(n);
  if (COMPOUNDS[n]) return COMPOUNDS[n];
  if (n > 52) {
    const ds = digitSumRaw(n);
    if (ds >= 10 && COMPOUNDS[ds]) return COMPOUNDS[ds];
    return null;
  }
  return null;
}

// ─── Pinnacles & Challenges ──────────────────────────────────────────────────

export interface PinnacleStage {
  stage: number;
  label: string;
  ages: string;
  p: number;           // final reduced pinnacle number
  c: number;           // final reduced challenge number
  rawP: number;        // pre-reduction compound sum for pinnacle
  compound: CompoundData | null;
  active: boolean;
}

function yearDigitSum(yr: number): number {
  return reduceDigits(digitSumRaw(yr));
}

export function calculatePinnacles(
  lifePath: number,
  birthDay: number,
  birthMonth: number,
  birthYear: number,
  currentYear: number = new Date().getFullYear()
): PinnacleStage[] {
  const firstEnd = 36 - lifePath;
  // Pure Digit Totals approach (preserving compound vibrations)
  const dRaw = digitSumRaw(birthDay);
  const mRaw = digitSumRaw(birthMonth);
  const yRaw = digitSumRaw(birthYear);

  const rawP1 = mRaw + dRaw;
  const rawP2 = dRaw + yRaw;
  const rawP3 = rawP1 + rawP2;
  const rawP4 = mRaw + yRaw;

  const p1 = reduceDigits(rawP1);
  const p2 = reduceDigits(rawP2);
  const p3 = reduceDigits(rawP3);
  const p4 = reduceDigits(rawP4);

  const c1 = Math.abs(reduceDigits(dRaw) - reduceDigits(mRaw));
  const c2 = Math.abs(reduceDigits(dRaw) - reduceDigits(yRaw));
  const c3 = Math.abs(c1 - c2);
  const c4 = Math.abs(reduceDigits(mRaw) - reduceDigits(yRaw));

  const age = currentYear - birthYear;
  return [
    { stage: 1, label: "First Pinnacle",  ages: `0–${firstEnd}`,                 p: p1, c: c1, rawP: rawP1, compound: lookupCompound(rawP1), active: age < firstEnd },
    { stage: 2, label: "Second Pinnacle", ages: `${firstEnd}–${firstEnd + 9}`,   p: p2, c: c2, rawP: rawP2, compound: lookupCompound(rawP2), active: age >= firstEnd && age < firstEnd + 9 },
    { stage: 3, label: "Third Pinnacle",  ages: `${firstEnd+9}–${firstEnd + 18}`, p: p3, c: c3, rawP: rawP3, compound: lookupCompound(rawP3), active: age >= firstEnd + 9 && age < firstEnd + 18 },
    { stage: 4, label: "Fourth Pinnacle", ages: `${firstEnd + 18}+`,              p: p4, c: c4, rawP: rawP4, compound: lookupCompound(rawP4), active: age >= firstEnd + 18 },
  ];
}


export const LIFE_PATH_MEANINGS: Record<number, string> = {
  1: "The Leader & Pioneer. You are here to develop original thinking, courage, and independence. Your life's purpose involves forging new paths that others can follow. You possess a natural authority that, when wielded with integrity, inspires loyalty and admiration.",
  2: "The Diplomat & Peacemaker. You are here to develop cooperation, sensitivity, and partnership. Your life's purpose involves creating harmony between opposing forces. You possess an intuitive understanding of relationships that makes you a natural mediator and counselor.",
  3: "The Creative Communicator. You are here to develop self-expression, joy, and artistic gifts. Your life's purpose involves inspiring others through creative communication. You possess a natural charisma and optimism that, when channeled productively, can uplift and entertain.",
  4: "The Builder & Foundation-Layer. You are here to develop discipline, reliability, and practical mastery. Your life's purpose involves creating lasting structures — whether physical, organizational, or philosophical — that serve collective welfare.",
  5: "The Adventurer & Freedom-Seeker. You are here to develop versatility, progressive thinking, and the responsible use of freedom. Your life's purpose involves experiencing and communicating the full spectrum of human possibility.",
  6: "The Nurturer & Healer. You are here to develop loving service, responsibility, and the creation of beauty. Your life's purpose involves caring for others while maintaining healthy personal boundaries.",
  7: "The Seeker & Analyst. You are here to develop wisdom, spiritual understanding, and the capacity to penetrate beneath surface appearances. Your life's purpose involves investigating the deeper dimensions of existence.",
  8: "The Executive & Manifestor. You are here to develop material mastery, executive wisdom, and the ethical use of power. Your life's purpose involves demonstrating that material success and spiritual integrity can coexist.",
  9: "The Humanitarian & Sage. You are here to develop universal love, compassionate wisdom, and the art of completion. Your life's purpose involves serving humanity through inspired leadership and creative expression.",
  11: "Master Number 11 — The Illuminator. You carry the highest spiritual charge of any life path. Your purpose involves bridging the spiritual and material worlds, serving as a channel for higher inspiration. The path demands exceptional development of intuition and spiritual courage.",
  22: "Master Number 22 — The Master Builder. You carry the most powerful constructive potential of any life path. Your purpose involves building structures — material, social, or conceptual — that serve humanity on a grand scale. The path requires exceptional practicality combined with visionary scope.",
  33: "Master Number 33 — The Master Teacher. You carry the vibration of unconditional love and compassionate wisdom. Your purpose involves healing others through the power of selfless service and creative expression. The path requires extraordinary self-sacrifice and spiritual maturity.",
};

export interface NumerologyProfile {
  name: string;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
}

export interface NumerologyReading {
  psychicNumber: number;
  lifePathNumber: number;
  personalYearNumber: number;
  personalYearCompound: number | null;
  personalYearCompoundData: CompoundData | null;
}

function reduceDigits(n: number): number {
  if (n === 11 || n === 22 || n === 33) return n;
  let v = n;
  while (v > 9) {
    v = String(v)
      .split("")
      .reduce((a, d) => a + Number(d), 0);
    if (v === 11 || v === 22 || v === 33) return v;
  }
  return v || 9;
}

export function calculatePsychicNumber(day: number): number {
  return reduceDigits(day);
}

export function calculateLifePath(
  day: number,
  month: number,
  year: number
): number {
  const allDigits = `${day}${month}${year}`;
  const sum = allDigits.split("").reduce((a, d) => a + Number(d), 0);
  return reduceDigits(sum);
}

export function calculatePersonalYear(
  birthDay: number,
  birthMonth: number,
  currentYear: number
): { compound: number | null; reduced: number; data: CompoundData | null } {
  const dRed = reduceDigits(birthDay);
  const mRed = reduceDigits(birthMonth);
  const ySum = String(currentYear)
    .split("")
    .reduce((a, c) => a + Number(c), 0);

  const raw = dRed + mRed + ySum;
  const reduced = reduceDigits(raw);
  const compound = raw >= 10 ? raw : null;
  const data = compound ? (COMPOUNDS[compound] ?? null) : null;

  return { compound, reduced, data };
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

export function calculateReading(profile: NumerologyProfile): NumerologyReading {
  const psychicNumber = calculatePsychicNumber(profile.birthDay);
  const lifePathNumber = calculateLifePath(
    profile.birthDay,
    profile.birthMonth,
    profile.birthYear
  );
  const pyn = calculatePersonalYear(
    profile.birthDay,
    profile.birthMonth,
    getCurrentYear()
  );

  return {
    psychicNumber,
    lifePathNumber,
    personalYearNumber: pyn.reduced,
    personalYearCompound: pyn.compound,
    personalYearCompoundData: pyn.data,
  };
}

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
