# Mikádo

## Namespace
```
mikado
```
## Popis
Simulace hry mikádo.
 
## Metody
#### Klidová hodnota
```
function normalValue(): number
```
- Vrátí klidovou hodnotu senzoru (číslo 1023)
- Bez parametrů
- Bez návratové hodnoty

#### Při porušení senzoru s obtížnost %obtiznost
```
function onGuardAwaken(difficulty: Difficulty, action: () => void)
```
- Zkontroluje, jestli nedošlo k pohybu
- Parametry:
    - obtížnost (enum)
    - metoda
- Bez návratové hodnoty

## Enumy
```
enum Difficulty {
    Easy = 500,
    Medium = 200,
    Hard = 100,
}
```

## Příklady

### Mikádo s použitím eventu

#### Bloky
![Jednoduchý příklad](https://github.com/microbit-cz/pxt-mikado-extension/blob/master/images/easyexample.png)

#### Kód
```
let jeZapnutoHlidani = false
let jeProvadenaAkce = false
let stavDispleje = ""
mikado.onGuardAwaken(Difficulty.Easy, function () {
    if (jeZapnutoHlidani == true) {
        jeProvadenaAkce = true
        stavDispleje = "nastvany"
        basic.showLeds(`
            # . . . #
            . # . # .
            . . . . .
            . # # # .
            # . . . #
            `)
        soundExpression.sad.playUntilDone()
        jeProvadenaAkce = false
    }
})
input.onButtonPressed(Button.A, function () {
    if (jeZapnutoHlidani == false) {
        jeZapnutoHlidani = true
    } else {
        jeZapnutoHlidani = false
    }
})
basic.forever(function () {
    serial.writeLine(stavDispleje)
    if (!(jeZapnutoHlidani) && stavDispleje != "vesely") {
        stavDispleje = "vesely"
        basic.showLeds(`
            . # . # .
            . # . # .
            . . . . .
            # . . . #
            . # # # .
            `)
    } else if (jeZapnutoHlidani && !(jeProvadenaAkce) && stavDispleje != "pozor") {
        stavDispleje = "pozor"
        basic.showLeds(`
            # # . # #
            . . . . .
            . . . . .
            . . . . .
            # # # # #
            `)
    }
})
```

Demo  [https://github.com/microbit-cz/pxt-mikado-demo-easy](https://github.com/microbit-cz/pxt-mikado-demo-easy)


### Mikádo s použitím vlastní metody

#### Bloky
![Těžší příklad](https://github.com/microbit-cz/pxt-mikado-extension/blob/master/images/hardexample.png)


#### Kód
```
let jeZapnutoHlidani = false
let jeProvadenaAkce = false
let stavDispleje = ""
mikado.onGuardAwaken(Difficulty.Easy, function () {
    if (jeZapnutoHlidani == true) {
        jeProvadenaAkce = true
        stavDispleje = "nastvany"
        basic.showLeds(`
            # . . . #
            . # . # .
            . . . . .
            . # # # .
            # . . . #
            `)
        soundExpression.sad.playUntilDone()
        jeProvadenaAkce = false
    }
})
input.onButtonPressed(Button.A, function () {
    if (jeZapnutoHlidani == false) {
        jeZapnutoHlidani = true
    } else {
        jeZapnutoHlidani = false
    }
})
basic.forever(function () {
    serial.writeLine(stavDispleje)
    if (!(jeZapnutoHlidani) && stavDispleje != "vesely") {
        stavDispleje = "vesely"
        basic.showLeds(`
            . # . # .
            . # . # .
            . . . . .
            # . . . #
            . # # # .
            `)
    } else if (jeZapnutoHlidani && !(jeProvadenaAkce) && stavDispleje != "pozor") {
        stavDispleje = "pozor"
        basic.showLeds(`
            # # . # #
            . . . . .
            . . . . .
            . . . . .
            # # # # #
            `)
    }
})
```
Demo  [https://github.com/microbit-cz/pxt-mikado-demo-hard](https://github.com/microbit-cz/pxt-mikado-demo-hard)

#### Metadata (slouží k vyhledávání, vykreslování)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
