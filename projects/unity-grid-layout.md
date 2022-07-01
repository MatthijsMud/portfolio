---
slug: "/projects/unity-grid-layout"
title: "Unity grid layout"
description: "Unity container voor het flexibel uitlijnen van componenten in een raster."
status: "published"
tags:
- Unity
- C#
banner:
  src: "/unity/grid/preview.png"
  description: "Unity container voor het flexibel uitlijnen van componenten in een raster."
---

# Unity grid layout

[Unity][unity] beschikt over minstens 3 officiële systemen voor het maken van grafische interfaces.
- Immediate Mode GUI (IMGUI)
- Unity UI
- UI Toolkit

In eerste instantie was enkel IMGUI beschikbaar. Hierbij wordt de structuur van de interface volledig geschreven in code. De volgende code resulteert bijvoorbeeld in een menu waarbij twee knoppen onder elkaar worden getekend: "Start" en "Exit".

```C#
public void OnGUI()
{
  GUILayout.BeginVertical();
  if (GUILayout.Button("Start"))
  {
    // ...
  }
  if (GUILayout.Button("Exit"))
  {
    // ...
  }
  GUILayout.EndVertical();
}
```

Deze manier van het opbouwen van een interface is niet bepaald gebruiksvriendelijk. Zeker als de persoon die zich over het ontwerpen van de interface ontfermt minder ervaring heeft met programmeren. Daarnaast moet de code steeds opnieuw worden gecompileerd om het resultaat te kunnen zien.

Later is hier een alternatief voor geïntroduceerd in de vorm van Unity UI. Ontwerpers kunnen hierbij direct het resultaat zien. Ook kan deze interface in de 3D wereld worden geplaatst voor meer immersie.

Daarnaast biedt het de mogelijkheid om afmeting en positie relatief aan de beschikbare ruimte te specificeren. Sommige componenten doen dit automatisch voor de ontwerper op basis van een aantal opties. Dit maakt het makkelijker om een interface te maken die geschikt is voor meerdere resoluties. Dit betreft onder meer:

- `LayoutElement` voor het aangeven van de minimale en gewenste grootte (en hoe de overige ruimte dient te worden verdeeld).
- `HorizontalLayoutGroup` en `VerticalLayoutGroup` plaatsen respectievelijk de elementen naast en onder elkaar. De gewenste afmetingen worden hierbij zoveel mogelijk gerespecteerd.
- [`GridLayoutGroup`][unity-grid-layout] plaatst de componenten in een raster waarbij kan worden aangegeven hoe groot de cellen zijn. Iedere cel krijgt precies die ruimte toegewezen; waardes van een `LayoutElement` worden volledig genegeerd.

Omdat `GridLayoutGroup` absolute waarden gebruikt voor de breedte en hoogte van de cellen, is het component vrij gelimiteerd in welke context het zinnig kan worden gebruikt. 

Met behulp van een aantal `VerticalLayoutGroup` in een `HorizontalLayoutGroup` (of vice versa) kan een flexibel raster worden opgebouwd; bijvoorbeeld een tabel. Een nadeel van deze oplossing is dat een kolom/rij de neiging heeft om er gekarteld uit te zien als er geen specifieke stappen zijn genomen dit tegen te gaan.

!["Raster" waarbij de cellen in een rij variëren in hoogte][img-hv-layout]

Om deze ongemakken te verhelpen heb ik een component geschreven dat berekent hoe breed/hoog een kolom/rij minimaal en idealiter hoort te zijn (het totaal vormt de afmetingen van het raster zelf): `FlexibleGridLayoutGroup`. 

## Werking

1. Het aantal rijen wordt berekend op basis van het aantal "kinderen" en het gewenste aantal kolommen.
1. Voor iedere kolom wordt de minimale, gewenste en flexibele breedte van alle cellen in de betreffende kolom geïnventariseerd. De hoogste waardes worden gebruikt voor de breedte van de betreffende kolom. De minimale, gewenste en totale breedte van het raster is het totaal plus eventuele ruimte tussen cellen.
1. Hetzelfde wordt gedaan voor de hoogte van de rijen, en daarmee de hoogte van het raster.
1. Het raster krijgt een breedte toegekend, en berekend op basis daarvan hoeveel ruimte iedere kolom uiteindelijk krijgt toebedeeld.
    1. Iedere kolom krijgt de eerder berekende minimale breedte van de kolom in kwestie toegewezen.
    1. Kolommen krijgen, zover beschikbaar, extra ruimte toebedeeld tot zij hun gewenste breedte hebben bereikt. De verdeling is gebaseerd op het aandeel dat de gewenste breedte van een kolom heeft op de totaal gewenste breedte van alle kolommen, ten opzichte van de minimale breedte. 
    1. Eventueel overgebleven ruimte wordt verdeeld op basis van de flexibele breedtes van de kolommen.
    1. Iedere cell in de betreffende kolom krijgt een breedte toegewezen en een x-positie op basis van de totale breedte van alle voorafgaande kolommen (en ruimte daartussen).
1. Hetzelfde wordt gedaan voor de hoogtes van de rijen.

`FlexibleGridLayoutGroup` is zeer geschikt voor contexts waarbij de afmetingen van de content leidend zijn. Denk hierbij bijvoorbeeld aan een tabel. 

Daarnaast is het ook goed te gebruiken in situaties waarbij iedere kolom/rij even groot hoort te zijn, maar het wel wenselijk is dat de beschikbare ruimte zoveel mogelijk wordt benut. Afhankelijk van de componenten in kwestie kan dit soms iets meer werk geven.

## Potentiële verbeteringen

Hoewel `FlexibleGridLayoutGroup` doet waar het voor ontworpen is, is er ruimte voor een aantal "verbeteringen". In verschillende gevallen is het echter mogelijk om een vergelijkbaar effect te realiseren met wat er al is; vaak is dat wel omslachtiger. Derhalve hebben deze verbeteringen geen prioriteit. Verbeteringen waar aan zou kunnen worden gedacht zijn:

- Ondersteuning bieden voor cellen splitsen/samenvoegen. 
    - Een `…LayoutGroup` in een cell plaatsen geeft een vergelijkbaar effect.
- Optie bieden om een aantal rijen te specificeren in plaats van het aantal kolommen.
    - Door de elementen in een andere volgorde te plaatsen, en het aantal kolommen af te leiden van het gewenste aantal rijen, kan dit met de bestaande opties al worden gerealiseerd.

[img-imgui]: /unity/grid/imgui.png
[img-hv-layout]: /unity/grid/horizontal-and-vertical-layout-groups.svg 

[unity]: https://unity.com/
[unity-grid-layout]: https://docs.unity3d.com/Packages/com.unity.ugui@1.0/api/UnityEngine.UI.GridLayoutGroup.html