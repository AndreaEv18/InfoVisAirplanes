# Aeroplanini in formazione
Questa è la repository per il mini-progetto assegnatomi dal prof. Maurizio Patrignani dell'università di Roma Tre inerente al corso Visualizzazione delle informazioni.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/T-50B_Blackeagles_Demo_Flight_%2812201493173%29.jpg/1200px-T-50B_Blackeagles_Demo_Flight_%2812201493173%29.jpg" width="1000" height="500">

--------------------------------------------------------------------------------
Testo del mini-progetto:

Crea un file json con dei dati multivariati: ci sono *8 data-cases* e ogni
data-case ha *sei* variabili quantitative i cui valori sono tutti
positivi. In base a questi dati disegna *8 aeroplanini* (è sufficiente la
silhouette) distribuiti nell'area di disegno come se volassero in
formazione.\
Un aeroplanino corrisponde ad un data-case e utilizza la
variabile *1* e *2* del rispettivo data-case per le coordinate x e y. Lo
sfondo è *azzurro* e nell'area di disegno ci sono anche *10 nuvolette*
bianche.\
Quando l'utente clicca su un aeroplanino con il *pulsante
sinistro del mouse e il tasto "x" premuto* tutti gli aeroplani si muovono
verso una nuova configurazione passando *dietro* alle nuvolette. Le
coordinate della nuova configurazione sono ricavate dalle variabili *3* e
*4* del rispettivo data-case. Alla prossima pressione del tasto sinistro
del mouse con il tasto "x" premuto gli aeroplanini usano le variabili *5*
e *6* per le coordinate e alla prossima ancora tornano alla configurazione
iniziale.\
Se invece il *tasto "y" era premuto* gli aeroplanini si muovono
nella *configurazione precedente*.\
Fai in modo che i cambi di posizione degli aeroplanini avvengano con un'animazione fluida. Usa le scale D3.js
per mappare l'intervallo dei valori delle variabili (che è arbitrario)
sull'intervallo dei valori delle coordinate, che dipende dalla tua
interfaccia.

--------------------------------------------------------------------------------

Per il funzionamento, recarsi tramite terminale nella cartella scaricata e avviare il server tramite il comando:

python3 -m http.server 8080

--------------------------------------------------------------------------------

NB: in basso a destra nell'interfaccia è stato aggiunto un controllo audio, in quanto purtroppo diversi browser non supportano più l'autoplay di musica in sottofondo. Perciò se non dovesse automaticamente partire la soundtrack, avviarla tramite il tasto play. :sound::sound:



