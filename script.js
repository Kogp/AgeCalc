const inputDay = document.querySelector('#birthday')
const inputMonth = document.querySelector('#birthmonth')
const inputYear = document.querySelector('#birthyear')

const subbutton = document.querySelector('.sub-button')

const outputYears = document.querySelector('#r_one')
const outputMonths = document.querySelector('#r_two')
const outputDays = document.querySelector('#r_three')

// Rechnet deine Geburtstag um deine Alter.
function onClick() {
    const inYear = inputYear.value
    const inMonth = inputMonth.value
    const inDay = inputDay.value
    // wenn Funktion onClick aktiviert ist.
    console.log("click")

    // Brecht auf,wenn etwas mit Daten nicht stimmt.
    if (!checkInputs(inYear, inMonth, inDay)) {
        outputYears.innerText = "--";
        outputMonths.innerText = "--";
        outputDays.innerText = "--";

        // Wenn Zustand von Daten nicht passt der Bedingungen von Funktion.
        console.log("checkInputs:",checkInputs(inYear, inMonth, inDay))
        return
    }

    const birthDate = inYear + '-' + inMonth + '-' + inDay

    const today = new Date();
    const birthDateObj = new Date(birthDate);

    let years = today.getFullYear() - birthDateObj.getFullYear();
    let months = today.getMonth() - birthDateObj.getMonth();
    let days = today.getDate() - birthDateObj.getDate();

    // Wenn der aktuelle Monat vor dem Geburtsmonat liegt oder im Geburtsmonat, aber vor dem Geburtstag, ziehe ein Jahr ab.
    if (months < 0 || (months === 0 && days < 0)) {
        years--;
        months += (months <= 0 ? 12 : 0);
    }

    // Wenn der aktuelle Tag vor dem Geburtstag liegt, ziehe einen Monat ab.
    if (days < 0) {
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
    }

    // Gibt Fehler, wenn Geburtdatum größer ist als heutige Datum.
    if(birthDateObj > today){
        document.querySelector('#calculator .error-text ').innerText = 'Birthday bigger than today'

        // GeburtsTag ligt in der Zukunft.
        return console.log("geburtstag größer als heute")
    }

    const age = {years, months, days}
    // Resultat
    console.log(`Du bist ${age.years} Jahre, ${age.months} Monate und ${age.days} Tage alt.`);

    outputYears.innerText = age.years;
    outputMonths.innerText = age.months;
    outputDays.innerText = age.days;

}

    // Überprüft ob die Zustand von Daten richtig ist.
function checkInputs(year, month, day) {
    let check = true

    // entfernt Klassen "is-invalid" von alle "birth.." conteinern in der conteiner "CalculatorInput".
    document.querySelector('.birthyear').classList.remove('is-invalid')
    document.querySelector('.birthmonth').classList.remove('is-invalid')
    document.querySelector('.birthday').classList.remove('is-invalid')

    // verdeckt Fehler-text
    document.querySelector('.birthyear .error-text').innerText = ''
    document.querySelector('.birthmonth .error-text').innerText = ''
    document.querySelector('.birthday .error-text').innerText = ''

    // Gibt Fehler Wenn felder
    if(day.length === 0 && month.length === 0 && year.length === 0 ) {
        check = false
        document.querySelector('.birthyear .error-text').innerText = 'required'
        document.querySelector('.birthmonth .error-text').innerText = 'required'
        document.querySelector('.birthday .error-text').innerText = 'required'
        return
    }

    // Prüfung ob Jahr 5  Reihen lang ist und nicht kleiner als 1900 Jahr und nicht Größer als dieses Jahr ist.
    if (year.length !== 4 || year < 1900 || year > new Date().getFullYear()) {
        check = false

        // Fügt ein is-invalid Klasse in einer Konteiner "birth..." um die Farbe zu verändert.
        document.querySelector('.birthyear').classList.add('is-invalid')

        // Verändert schrieft in der error-text Konteiner, der die in der "birt..." Konteiner ist.
        document.querySelector('.birthyear .error-text').innerText = 'Year is not valid'

        // Jahr passt nicht zu Bedingungen
        console.log('Jahr ist nicht gültig: ', check)
    }

    // Prüfung ob Monats Reihen lenge nicht größer als 2 ist und Monats Zahl aus die Monate stimmen.
    if (month.length < 1 || month.length > 2 || month < 1 || month > 12) {
        check = false

        document.querySelector('.birthmonth').classList.add('is-invalid')
        document.querySelector('.birthmonth .error-text').innerText = 'Month is not valid'

        // Monat passt nicht zu Bedingungen
        console.log("Monat ist nicht gültig: ", check)

    }

    // Prüfung ob Tags Zahlen lenge nicht größer als 2 und Tags Zahl aus der Monat stimmen.
    if (day.length < 1 || day.length > 2 || day < 1 || day > 31) {
        check = false

        document.querySelector('.birthday').classList.add('is-invalid')
        document.querySelector('.birthday .error-text').innerText = 'Day is not valid'

        // Tag passt nicht zu Bedingungen
        console.log("Tag ist nicht gültig: ", check)
    }
    return check
}

subbutton.addEventListener('click', onClick)

// Abliest inputs von Tastatur, wenn Input passt aktiviert onClick().
window.addEventListener('keydown',(e)=> {
   if (e.key === 'Enter') {
       onClick()
   }
})

// gibt nicht weiter zu schreiben, wenn Reihen lenge von Zahlen in der input größer ist als bestimmter lenge.
inputYear.addEventListener('input', (e) => {
    if(e.target.value.length > 4){
        e.target.value = e.target.value.substring(0,4)
    }
})

inputMonth.addEventListener('input', (e) => {
    if(e.target.value.length > 2){
        e.target.value = e.target.value.substring(0,2)
    }
})

inputDay.addEventListener('input', (e) => {
    if(e.target.value.length > 2){
        e.target.value = e.target.value.substring(0,2)
    }
})
