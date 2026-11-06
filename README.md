# EuroClub „Pan Halippa” — Edineț

Website static, realizat cu HTML, CSS și JavaScript vanilla pentru EuroClub „Pan Halippa”, IP Liceul Teoretic „Pan Halippa”.

## Rulare locală

Deschide fișierul index.html într-un browser sau pornește orice server static simplu din directorul proiectului. Nu sunt necesare instalări sau dependențe.

## Publicare gratuită cu GitHub Pages

1. Creează un repository GitHub **public** numit euroclub-pan-halippa.
2. Încarcă toate fișierele din acest director, păstrând structura assets/images/.
3. În GitHub, intră în **Settings → Pages**.
4. La **Build and deployment**, selectează **Deploy from a branch**, apoi ramura main și folderul /(root).
5. Salvează. După publicare, adresa este https://USERNAME.github.io/euroclub-pan-halippa/.
6. După ce există adresa finală, completează opțional URL-ul public în meta-eticheta og:url din index.html.

Nu este necesar un domeniu, un card bancar, hosting plătit sau un backend.

## Modificarea conținutului

### Fotografii și logo

- Imaginile sunt în assets/images/.
- Pentru a înlocui o fotografie, păstrează numele actual al fișierului sau actualizează atributul src corespunzător din index.html.
- Logo-ul este assets/images/euroclub-pan-halippa-logo.jpg. Nu îl modifica; înlocuiește-l numai cu o versiune oficială nouă.
- Publică doar fotografii pentru care există drept de utilizare și acordurile necesare.

### Texte, proiecte și activități

- Tot conținutul site-ului se află în index.html.
- Secțiunea **Proiecte** are trei carduri. Duplică structura unui element article cu clasa project-card pentru un proiect nou.
- Înainte de publicare, înlocuiește textele „după confirmare” numai cu informații validate. Nu adăuga rezultate, bugete, parteneri sau nume neconfirmate.
- Pentru un membru nou, actualizează unul dintre cardurile din secțiunea echipa după obținerea acordului necesar.

### Galerie

- Adaugă un buton cu clasa gallery-card în secțiunea galerie.
- Completează atributele data-album, data-image, data-alt și data-caption.
- Butonul va intra automat în lightbox și în navigarea cu săgețile.

### Formular Google Forms

Butonul de înscriere deschide acum un mesaj informativ, ca să nu existe un link fals. Când ai linkul confirmat Google Forms, înlocuiește butoanele cu atributul data-open-signup cu un link de forma:

    <a class="button button--gold" href="https://forms.gle/ADRESA_CONFIRMATA" target="_blank" rel="noopener noreferrer">Înscrie-te în comunitate →</a>

### Rețele sociale și contact

Actualizează doar adresele confirmate în secțiunea contact. Nu sunt incluse linkuri inventate, date personale sau o hartă cu o adresă neconfirmată.

## Verificare înainte de publicare

- Testează meniul mobil, navigarea, filtrele galeriei și lightbox-ul.
- Verifică toate informațiile factuale și acordurile pentru fotografii.
- După publicare, testează site-ul pe telefon și pe desktop.

