# Google Cloud API

> API-Übersicht: https://cloud.google.com/apis/

Einrichtung:
1. Auf Google Cloud Console gehen: https://console.cloud.google.com/
2. Existierendes Projekt auswählen oder neu anlegen (links oben klicken -> *API-Manager*)
3. Via `Enable API`-Button die gewünschte Api API aktivieren
4. Via "Credentials" in der linken Leiste "API-Key" aktivieren und an Anfragen via Parameter `?key=<API-KEY>`anhängen

## Google Vision

> - API-Dokumentation: https://cloud.google.com/vision/docs/
> - Basic Request & Response Tutorial (u.a mit API-Key): https://cloud.google.com/vision/docs/requests-and-responses

### Endpunkt

POST: `https://vision.googleapis.com/v1/images:annotate?key=<API-KEY>`


Types:
| Feature | Type |
|---------|------|
|LABEL_DETECTION |	Execute Image Content Analysis on the entire image and return |
| TEXT_DETECTION | Perform Optical Character Recognition (OCR) on text within the image |
| FACE_DETECTION | Detect faces within the image|
| LANDMARK_DETECTION | Detect geographic landmarks within the image |
| LOGO_DETECTION |	Detect company logos within the image|
| SAFE_SEARCH_DETECTION	| Determine image safe search properties on the image |
| IMAGE_PROPERTIES | Compute a set of properties about the image (such as the image's dominant colors) |


## Cloud Speech

> - API-Dokumentation: https://cloud.google.com/speech/docs/
> - Basic Request & Response Tutorial: https://cloud.google.com/speech/docs/basics

### Endpunkt
POST: `https://speech.googleapis.com/v1beta1/speech:syncrecognize?key=<API-Key>`


Audio Conversion to flac via: http://audio.online-convert.com/convert-to-flac
- Bit resolution: 16bit
- Sampling Rate: 16000 Hz
- Audio Channels: Mono


# Maschinelles Lernen

= Oberbegriff für die „künstliche“ Generierung von Wissen aus Erfahrung. Wenn das Wort Erkennung drin steckt, dann hat das ziemlich sicher was mit Erfahrung zu tun und gehört damit zum maschinellen Lernen.
- Teilgebiet der KI
- Mustererkennung ist Teilgebiet

> A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P if its performance at tasks in T, as measured by P, improves with experience E.
(Tom M. Mitchell)

## Aufgabenfeld: Erkennung
❗ Es gibt auch noch andere Aufgabenfelder als Erkennung, wie die Maschinennavigation durch Umgebungen. Das geht aber zu weit von der Google Cloud API weg und basiert auf Verfahren, die im Vortrag nicht abgedeckt werden können.

### Grundlegende Modellierung

- Feature-Raum $F = \{X \times Y \times Z \times ..\}$ = Menge unabhängiger Variablen
- Sample-Menge $S\subseteq F$
- Label-Menge $L$
  - Kontinuierlicher Zahlenraum (Regression)
  - Nominale Werte (Kategorien ohne Reihenfolge)
  - Ordinalskala (Diskrete Werte mit Reihenfolge)
- $k: S \to L$

Klassifizierung des Maschinenlernens nach Feedback bzw. E, dass der Maschine zur Verfügung steht:

#### 1. Überwachtes Lernen: $L$ bekannt, sowie $S \to L$ allgemein bekannt

Unterscheidung der Menge $S$ nötig:
-  Training-Sample-Menge $S_{Training} \subseteq S$, $S_{Training} \to L$ bekannt, wird Algorithmus mitgeiteilt
-  Test-Sample-Menge $S_{Test} \subseteq S$, $S_{Test} \to L$ bekannt, wird Algorithmus vorenthalten

Abbildung auf Definition von Mitchell:
- T = $m: F \to L$ finden (auch als Modell bezeichnet)
- E = $S_{Training} \to L$
- P = $\min \sum_{s \in S_{Test}}{(k(s) - m (s))^2}$
    ➡️ Minimierung des Klassifizierungsfehler
    ❗ Anmerkung: geht hier nur bei binären Kategorien, Ordinalskalen oder kontinuierlichen Skalen

#### Klassifizierung: $L$ ist Diskret und ohne Reihenfolge
> **Definition 1**
> Klassifizierung oder Klassifikation (von lat. classis, „Klasse“, und facere, „machen“) nennt man das Zusammenfassen von Objekten zu Klassen.
*(M.O.Franz, September 2007 Mustererkennung und Klassifikation - Einführung, Skript HTWG Konstanz)*

> **Definition 2**
> Generalisierung in Hinblick auf Erfahrung

Kategorisierung ist damit quasi Grundbaustein der Generalisierung, was wiederum von Bedeutung für die Abstraktionsbildung ist, was wiederum Voraussetzung für intelligentes Denkens ist.

**Anwendung:** Einstufung neuer Samples, d.h. Prognose
$s \in F, k(s)$ herausfinden

Unterscheidung nach Form des Modells:

- K-Nearest-Neighbors (KNN)
  - Für ein unbekanntes $s \in F$ werden die k nearest Nighbours gesucht
  - $s$ übernimmt das Label, das unter den k nächsten Nighbours am häufigsten Vorkommt
  - $k = 1$ = einfach nur Nearest-Nighbour-Interpolation
  - Form: Voronoi-Zellen
- Classification And Regression Tree (CART)
  - Ein bisschen wie KD-Trees, nur das Labels beachtet werden
  - Rekursive Unterteilung des Feature Raumes, so dass die Varianz bzw. Enthropie innerhalb der Samples mit gleichem Labels minimiert wird
  - Danach Verschmelzung von Zellen, die nur Samples mit gleichem Label beinhalten
  - Form: Entscheidungsbäume, treppenartige Trennung
- Support-Vector-Machines (SVM)
  - Eine Linie wird durch den Raum gelegt, so dass sich auf jeder Seite nur Samples mit dem selben Label befinden befinden und die dabei den größtmöglichen Abstand zu den Samples hat
  - Es gibt auch eine Variante mit geschwungenen Linien
  - Form: gerade oder runde Linien
- Klassische / Künstliche Neuronale Netze
  - Nicht interpretierbare Kategorisierung
  - Wird nochmal nachgeschlagen

#### Regression: $L$ ist kontinuierlich (unendlich viele Klassen)

**Anwendung**
- Bewertung, z.B. wie viel ist mein Haus wert

Allgemein:
T: Das finden einer Funktion, die den Datensatz möglichst gut approximiert

Lineare Regression:
- T: Das finden einer Hyperebene (ein Objekt im beliebig dimensionalen Raum,  dass den Raum zweiteilt), die den Datensatz möglichst gut approximiert


#### Ranking: $L$ ist diskret, aber hat Rangfolge (ordinal)

### 2. Unüberwachtes Lernen:
> L **nicht** bekannt, dementsprechend auch nicht $S \to L$

#### Verfahren: Custering
Abbildung auf Definition von Mitchell:
- T = $L$ finden, wodurch sich in der Regel auch $k: S \to L$ ergibt
- E = $S$
- P = ?

Algorithmus: Der, der in Hinblick auf die Optimierungsfunktion am besten funktioniert

##### Bsp: K-Means:
T: $L$ finden (ohne Semantik)
- L = Mean aller Samples, die momentan L am nähesten sind
- P = $\min \sum_{s \in S_{Test}}{||k(s) - s||^2}$ global
- E = $S$

##### Anwendung
- Allgemein: Trends erkennen
- Datamining: Trends erkennen im Kontext von Business
- Labels erstellen: Basis für überwachtes Lernen
