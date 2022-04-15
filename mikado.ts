enum Difficulty {
    //% block="Jednoduchá"
    Easy = 500,
    //% block="Střední"
    Medium = 200,
    //% block="Těžká"
    Hard = 100,
}

//% weight=100 color=#3bccc0 icon="\uf11b" block="Mikado"
namespace mikado {
    let methodLock = false;

    /**
    * Vrátí klidovou hodnotu senzoru
    */
    //% block="Klidová hodnota"

    export function normalValue(): number {
        return 1023
    }

    /**
    * Zkontroluje, jestli nedošlo k pohybu
    * @difficulty Obtížnost hry
    * @action Příkazy, které se provedou při moc velké/malé akceleraci
    */
    //% block="Při porušení senzoru s obtížností %difficulty"
    export function onGuardAwaken(difficulty: Difficulty, action: () => void) {
        const eventID = 111 + Math.randomRange(0, 100);

        control.onEvent(eventID, 0, function () {
            control.inBackground(() => {
                methodLock = true
                action()
                methodLock = false
            })
        })

        control.inBackground(() => {
            while (true) {
                let acceleration = input.acceleration(Dimension.Strength);
                if (!methodLock && (acceleration + difficulty < 1023 || acceleration - difficulty > 1023)) {
                    control.raiseEvent(eventID, 1)
                }
                basic.pause(20)
            }
        })
    }

}