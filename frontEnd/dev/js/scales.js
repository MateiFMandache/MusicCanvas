const scaleTonics = {
  // we calculate the index of a note's name in CDEFGAB and the
  // number of semitones it is above C and store
  // them in the namePos and semitones properties
  Cflat: {name: "C♭", namePos: 0, semitones: -1},
  C: {name: "C", namePos: 0, semitones: 0},
  Csharp: {name: "C♯", namePos: 0, semitones: 1},
  Dflat: {name: "D♭", namePos: 1, semitones: 1},
  D: {name: "D", namePos: 1, semitones: 2},
  Dsharp: {name: "D♯", namePos: 1, semitones: 3},
  Eflat: {name: "E♭", namePos: 2, semitones: 3},
  E: {name: "E", namePos: 2, semitones: 4},
  Esharp: {name: "E♯", namePos: 2, semitones: 5},
  Fflat: {name: "F♭", namePos: 3, semitones: 4},
  F: {name: "F", namePos: 3, semitones: 5},
  Fsharp: {name: "F♯", namePos: 3, semitones: 6},
  Gflat: {name: "G♭", namePos: 4, semitones: 6},
  G: {name: "G", namePos: 4, semitones: 7},
  Gsharp: {name: "G♯", namePos: 4, semitones: 8},
  Aflat: {name: "A♭", namePos: 5, semitones: 8},
  A: {name: "A", namePos: 5, semitones: 9},
  Asharp: {name: "A♯", namePos: 5, semitones: 10},
  Bflat: {name: "B♭", namePos: 6, semitones: 10},
  B: {name: "B", namePos: 6, semitones: 11},
  Bsharp: {name: "B♯", namePos: 6, semitones: 12}
}

const allScaleTonics = [
  scaleTonics.Cflat, scaleTonics.C, scaleTonics.Csharp,
  scaleTonics.Dflat, scaleTonics.D, scaleTonics.Dsharp,
  scaleTonics.Eflat, scaleTonics.E, scaleTonics.Esharp,
  scaleTonics.Fflat, scaleTonics.F, scaleTonics.Fsharp,
  scaleTonics.Gflat, scaleTonics.G, scaleTonics.Gsharp,
  scaleTonics.Aflat, scaleTonics.A, scaleTonics.Asharp,
  scaleTonics.Bflat, scaleTonics.B, scaleTonics.Bsharp
]

const scaleTypes = {
  // For each scale type we have an array of scale degrees.
  // for each degree we have a nameOffset, which tells us which name to
  // give the note relative to the tonic, and a semitone offset.
  major: {name: "Major",
  degrees: [
    {nameOffset: 0, semitoneOffset: 0},
    {nameOffset: 1, semitoneOffset: 2},
    {nameOffset: 2, semitoneOffset: 4},
    {nameOffset: 3, semitoneOffset: 5},
    {nameOffset: 4, semitoneOffset: 7},
    {nameOffset: 5, semitoneOffset: 9},
    {nameOffset: 6, semitoneOffset: 11}
  ]},
  minor: {name: "Minor",
  degrees:[
    {nameOffset: 0, semitoneOffset: 0},
    {nameOffset: 1, semitoneOffset: 2},
    {nameOffset: 2, semitoneOffset: 3},
    {nameOffset: 3, semitoneOffset: 5},
    {nameOffset: 4, semitoneOffset: 7},
    {nameOffset: 5, semitoneOffset: 8},
    {nameOffset: 6, semitoneOffset: 10}
  ]},
  chromatic: {name:"Chromatic",
  degrees:[
    {nameOffset: 0, semitoneOffset: 0},
    {nameOffset: 1, semitoneOffset: 1},
    {nameOffset: 1, semitoneOffset: 2},
    {nameOffset: 2, semitoneOffset: 3},
    {nameOffset: 2, semitoneOffset: 4},
    {nameOffset: 3, semitoneOffset: 5},
    {nameOffset: 3, semitoneOffset: 6},
    {nameOffset: 4, semitoneOffset: 7},
    {nameOffset: 5, semitoneOffset: 8},
    {nameOffset: 5, semitoneOffset: 9},
    {nameOffset: 6, semitoneOffset: 10},
    {nameOffset: 6, semitoneOffset: 11}
  ]},
  naturalMinor: {name: "Natural Minor",
  degrees: [
    {nameOffset: 0, semitoneOffset: 0},
    {nameOffset: 1, semitoneOffset: 2},
    {nameOffset: 2, semitoneOffset: 3},
    {nameOffset: 3, semitoneOffset: 5},
    {nameOffset: 4, semitoneOffset: 7},
    {nameOffset: 5, semitoneOffset: 8},
    {nameOffset: 6, semitoneOffset: 10}
  ]},
  harmonicMinor: {name: "Harmonic Minor",
  degrees: [
    {nameOffset: 0, semitoneOffset: 0},
    {nameOffset: 1, semitoneOffset: 2},
    {nameOffset: 2, semitoneOffset: 3},
    {nameOffset: 3, semitoneOffset: 5},
    {nameOffset: 4, semitoneOffset: 7},
    {nameOffset: 5, semitoneOffset: 8},
    {nameOffset: 6, semitoneOffset: 11}
  ]},
  lydian: {name: "Lydian",
  degrees: [
    {nameOffset: 0, semitoneOffset: 0},
    {nameOffset: 1, semitoneOffset: 2},
    {nameOffset: 2, semitoneOffset: 4},
    {nameOffset: 3, semitoneOffset: 6},
    {nameOffset: 4, semitoneOffset: 7},
    {nameOffset: 5, semitoneOffset: 9},
    {nameOffset: 6, semitoneOffset: 11}
  ]},
  ionian: {name: "Ionian",
  degrees: [
    {nameOffset: 0, semitoneOffset: 0},
    {nameOffset: 1, semitoneOffset: 2},
    {nameOffset: 2, semitoneOffset: 4},
    {nameOffset: 3, semitoneOffset: 5},
    {nameOffset: 4, semitoneOffset: 7},
    {nameOffset: 5, semitoneOffset: 9},
    {nameOffset: 6, semitoneOffset: 11}
  ]},
  mixolydian: {name: "Mixolydian",
  degrees: [
    {nameOffset: 0, semitoneOffset: 0},
    {nameOffset: 1, semitoneOffset: 2},
    {nameOffset: 2, semitoneOffset: 4},
    {nameOffset: 3, semitoneOffset: 5},
    {nameOffset: 4, semitoneOffset: 7},
    {nameOffset: 5, semitoneOffset: 9},
    {nameOffset: 6, semitoneOffset: 10}
  ]},
  dorain: {name: "Dorian",
  degrees: [
    {nameOffset: 0, semitoneOffset: 0},
    {nameOffset: 1, semitoneOffset: 2},
    {nameOffset: 2, semitoneOffset: 3},
    {nameOffset: 3, semitoneOffset: 5},
    {nameOffset: 4, semitoneOffset: 7},
    {nameOffset: 5, semitoneOffset: 9},
    {nameOffset: 6, semitoneOffset: 10}
  ]},
  aeolian: {name: "Aeolian",
  degrees: [
    {nameOffset: 0, semitoneOffset: 0},
    {nameOffset: 1, semitoneOffset: 2},
    {nameOffset: 2, semitoneOffset: 3},
    {nameOffset: 3, semitoneOffset: 5},
    {nameOffset: 4, semitoneOffset: 7},
    {nameOffset: 5, semitoneOffset: 8},
    {nameOffset: 6, semitoneOffset: 10}
  ]},
  phrygian: {name: "Phrygian",
  degrees: [
    {nameOffset: 0, semitoneOffset: 0},
    {nameOffset: 1, semitoneOffset: 1},
    {nameOffset: 2, semitoneOffset: 3},
    {nameOffset: 3, semitoneOffset: 5},
    {nameOffset: 4, semitoneOffset: 7},
    {nameOffset: 5, semitoneOffset: 8},
    {nameOffset: 6, semitoneOffset: 10}
  ]},
  locrian: {name: "Locrian",
  degrees: [
    {nameOffset: 0, semitoneOffset: 0},
    {nameOffset: 1, semitoneOffset: 2},
    {nameOffset: 2, semitoneOffset: 3},
    {nameOffset: 3, semitoneOffset: 5},
    {nameOffset: 4, semitoneOffset: 7},
    {nameOffset: 5, semitoneOffset: 8},
    {nameOffset: 6, semitoneOffset: 10}
  ]},
  majorPentatonic: {name: "Major Pentatonic",
  degrees: [
    {nameOffset: 0, semitoneOffset: 0},
    {nameOffset: 1, semitoneOffset: 2},
    {nameOffset: 2, semitoneOffset: 4},
    {nameOffset: 4, semitoneOffset: 7},
    {nameOffset: 5, semitoneOffset: 9}
  ]},
  minorPentatonic: {name: "Minor Pentatonic",
  degrees: [
    {nameOffset: 0, semitoneOffset: 0},
    {nameOffset: 2, semitoneOffset: 3},
    {nameOffset: 3, semitoneOffset: 5},
    {nameOffset: 4, semitoneOffset: 7},
    {nameOffset: 6, semitoneOffset: 10}
  ]},
  wholeTone: {name: "Whole Tone",
  degrees: [
    {nameOffset: 0, semitoneOffset: 0},
    {nameOffset: 1, semitoneOffset: 2},
    {nameOffset: 2, semitoneOffset: 4},
    {nameOffset: 3, semitoneOffset: 6},
    {nameOffset: 5, semitoneOffset: 8},
    {nameOffset: 6, semitoneOffset: 10}
  ]}
}

const allScaleTypes = [
  scaleTypes.major,
  scaleTypes.minor,
  scaleTypes.chromatic,
  scaleTypes.naturalMinor,
  scaleTypes.harmonicMinor,
  scaleTypes.lydian,
  scaleTypes.ionian,
  scaleTypes.mixolydian,
  scaleTypes.dorain,
  scaleTypes.aeolian,
  scaleTypes.phrygian,
  scaleTypes.locrian,
  scaleTypes.majorPentatonic,
  scaleTypes.minorPentatonic,
  scaleTypes.wholeTone
]


function standardScale(tonic, scaleType) {
  let scale = [];
  for (let i = 0; i < scaleType.degrees.length; i++) {
    const degree = scaleType.degrees[i];
    let note = {};
    // we calculate pitch in (fractional) octaves above C
    note.pitch = ((tonic.semitones + degree.semitoneOffset) / 12) % 1;
    // find the name of the note
    note.name = "CDEFGAB".charAt((tonic.namePos + degree.nameOffset) % 7);
    // calculate number of sharps to add. We are based at C,
    // which is 1 step towards having sharps (from F=0 sharpness)
    let sharps = Math.floor(((tonic.semitones + degree.semitoneOffset) * 7
                            - (tonic.namePos + degree.nameOffset) * 12
                            + 1) / 7);
    switch(sharps) {
      case -2:
        note.name += "𝄫";
        break;
      case 1:
        note.name += "♭";
        break;
      case 1:
        note.name += "♯";
        break;
      case -2:
        note.name += "𝄪";
        break;
    }
    if(i == 0) {
      // the tonic
      note.tonic = true;
      note.tonicOffset = Math.floor((tonic.semitones + degree.semitoneOffset) / 12);
    }
    scale.push(note);
  }
  // sort ascending by pitch
  scale.sort((a, b) => a.pitch - b.pitch)
  return scale;
}
