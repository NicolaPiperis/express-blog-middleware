Impariamo ad utilizzare i middleware e quindi gestiamo gli errori e le pagine 404.
Questi middleware dovranno rispondere con un json contente il codice ed il messaggio dell’errore.
Creiamo le seguenti rotte:
home
posts/ (index)
posts/ (store)
posts/:slug (show)
Tramite JTW creiamo una rotta per autenticare un utente ed ottenere il Token JWT e tramite un middleware limitiamo l’accesso alla rota store dei post ai soli utenti loggati.
Svolgiamo tutto l’esercizio tramite relativi controller e router.

Bonus
Ritornare un errore diverso nel caso il jwt sia non valido o scaduto
Prevedere negli errori diversi in caso di autenticazione. Fare questo usando il throw di JS
invece di ritornare un errore tramite res.send() nei controller, lanciamo un errore tramite throw e gestiamolo nel middleware degli errori
