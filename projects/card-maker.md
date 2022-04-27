---
slug: "/projects/card-maker"
title: "Card maker"
description: ""
tags: 
  - TypeScript
  - React
banner:
  src: ""
  description: "Stylistisch weergegeven computer, tablet, en mobiel. Het scherm geeft de \"card maker\" weer."
---

# Trading Card maker

Als iemand die in de jaren '90 is opgegroeid, heb ik in mijn jeugd verschillende ruilkaartspelkaarten verzameld (zoals Pokémon en Yu-Gi-Oh!). Dit type spel leent zich sterk voor het zelf bedenken van kaarten.

Het realiseren van zelf bedachte kaarten kan soms een "probleem zijn. Indien de kaart zelf wordt samengesteld in een afbeelding bewerkingsprogramma, zullen de benodigde lettertypen ergens moeten worden gevonden, evenals de overige componenten.

Deze problemen spelen minder met applicaties die specifiek zijn ontworpen voor het creëeren van het type kaart in kwestie. Maar deze applicaties werken mogelijk niet op alle systemen. Ook bestaat er een risico dat deze applicaties een virus bevatten.

Een website om zelf 

[Live demo](https://matthijsmud.github.io/card-maker)

## Gebruikte tools

- [TypeScript][typescript]: 
- [React][react]: Eén van de vele opties beschikbaar voor het ontwikkelen van webapplicaties.
- [Next.js][next]: 
- [MUI][mui]: Een set componenten waarmee de applicatie is opgebouwd zodat het er als een geheel uitziet.
- [RxJS][rxjs]: 
- [Redux][redux]: 
  - [redux-dynamic-modules][redux-dynamic-modules]: Maakt het mogelijk om bepaalde `redux` functionaliteit pas in te laden als het nodig is. 
  - [redux-observable][redux-observable]: Asynchroon code uitvoeren als er iets veranderd in de toestand van de applicatie.
  - [redux-persist][redux-persist]: Voor het opslaan van informatie tussen sessies. 

## Code opsplitsen

Normaliter heeft [redux][redux] één _store_ voor het behouden van de toestand van de applicatie. Omdat de toestand invloed heeft op een groot deel van de applicatie, zal die vroeg in de structuur moeten worden geïntroduceerd. In het geval van [next][next] zijn er in hoofdlijnen twee niveau's te onderscheiden: 

- Eén _store_ voor de hele applicatie.
- Iedere pagina een eigen _store_.


Standaard is er een aantal opties voor het opslitsen van de code. `combineReducers()` is een van deze opties, evenals handmatig vergelijkbare code schrijven voor iets meer niche scenario's. Het nadeel hierbij is dat in dit 

   Dit maakt het echter wel dat alle "reducers" in dezelfde  
```ts
const rootReducer = combineReducers({
  // List of reducers
})
```


[typescript]: https://www.typescriptlang.org/
[react]: https://reactjs.org/
[next]: https://nextjs.org/
[redux]: https://redux.js.org/
[redux-dynamic-modules]: https://github.com/microsoft/redux-dynamic-modules
[redux-observable]: https://redux-observable.js.org/
[redux-persist]: https://github.com/rt2zz/redux-persist 
[rxjs]: https://rxjs.dev/
[mui]: https://mui.com/ "Material UI"

[krita]: https://krita.org/en/