export type Skill='Listening'|'Speaking'|'Reading'|'Writing';
export type Lesson={skill:Skill;title:string;prompt:string;answer:string;choices?:string[];passage?:string};
export const lessons:Record<Skill,Lesson>={
Listening:{skill:'Listening',title:'At the café',prompt:'Listen and choose what the customer orders.',passage:'Could I have a small iced latte, please?',answer:'A small iced latte',choices:['A small iced latte','A hot tea','A large cappuccino']},
Speaking:{skill:'Speaking',title:'Introduce yourself',prompt:'Say this sentence aloud.',passage:'Nice to meet you. My name is Alex.',answer:'Nice to meet you my name is Alex'},
Reading:{skill:'Reading',title:'A short message',prompt:'Where will Mia meet Sam?',passage:'Hi Sam! I will be at the library at three. See you there! — Mia',answer:'At the library',choices:['At the station','At the library','At the café']},
Writing:{skill:'Writing',title:'A simple reply',prompt:'Write one sentence in English: 「私は毎朝コーヒーを飲みます。」',answer:'I drink coffee every morning.'}
};
export const skills=Object.keys(lessons) as Skill[];
export function normalize(s:string){return s.toLowerCase().replace(/[^a-z0-9 ]/g,'').replace(/\s+/g,' ').trim()}
export function evaluate(skill:Skill,input:string){const expected=lessons[skill].answer;return normalize(input)===normalize(expected)}
