radio.onReceivedNumber(function (receivedNumber) {
    if (SpielAktiv == 1 && RundeGewonnen == 0) {
        Antwortverarbeiten(receivedNumber)
    }
})
function Rundestarten () {
    RundeGewonnen = 0
    SpielAktiv = 1
    Aufgabe = randint(1, 3)
    radio.sendNumber(Aufgabe)
    AufgabeAnzeigen()
    basic.pause(5000)
    if (RundeGewonnen == 0) {
        basic.showString("- - -")
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        basic.setLedColor(0x000000)
    }
    SpielAktiv = 0
}
function Falsch (num: number) {
    if (SpielerID == 1) {
        S1Punkte += -1
    }
    if (SpielerID == 2) {
        S2Punkte += -1
    }
    if (SpielerID == 3) {
        S3Punkte += -1
    }
    if (SpielerID == 4) {
        S4Punkte += -1
    }
    basic.setLedColor(0xff0000)
    basic.showString("S")
    basic.showNumber(SpielerID)
    radio.sendValue("falsch", SpielerID)
    basic.pause(1000)
    basic.setLedColor(0x000000)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
}
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    if (SpielAktiv == 0) {
        Rundestarten()
    }
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    if (SpielAktiv == 0) {
        basic.showString("S1")
        basic.showNumber(S1Punkte)
        basic.pause(500)
        basic.showString("S2")
        basic.showNumber(S2Punkte)
        basic.pause(500)
        basic.showString("S3")
        basic.showNumber(S3Punkte)
        basic.pause(500)
        basic.showString("S4")
        basic.showNumber(S4Punkte)
        basic.pause(500)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    }
})
function Richtig (num: number) {
    RundeGewonnen = 1
    if (SpielerID == 1) {
        S1Punkte += 1
    }
    if (SpielerID == 2) {
        S2Punkte += 1
    }
    if (SpielerID == 3) {
        S3Punkte += 1
    }
    if (SpielerID == 4) {
        S4Punkte += 1
    }
    basic.setLedColor(0x00ff00)
    basic.showString("S")
    basic.showNumber(SpielerID)
    basic.pause(1000)
    radio.sendValue("gewinner", SpielerID)
    basic.setLedColor(0x000000)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
}
function AufgabeAnzeigen () {
    if (Aufgabe == 1) {
        basic.setLedColor(0x00ff00)
        basic.showLeds(`
            . . # . .
            . # . # .
            # . . . #
            # # # # #
            # . . . #
            `)
        music.play(music.tonePlayable(587, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    }
    if (Aufgabe == 2) {
        basic.setLedColor(0xff0000)
        basic.showLeds(`
            # # # . .
            # . . # .
            # # # . .
            # . . # .
            # # # . .
            `)
        music.play(music.tonePlayable(294, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    }
    if (Aufgabe == 3) {
        basic.setLedColor(0x0000ff)
        basic.showLeds(`
            . # . # .
            # # # # #
            # # # # #
            . # # # .
            . . # . .
            `)
        music.play(music.tonePlayable(147, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    }
}
function Antwortverarbeiten (num: number) {
    SpielerID = Math.floor(Math.idiv(num, 10))
    Aktion = num % 10
    if (SpielerID >= 1 && SpielerID <= 4) {
        if (Aktion == Aufgabe) {
            Richtig(SpielerID)
        } else {
            Falsch(SpielerID)
        }
    }
}
let Aktion = 0
let SpielerID = 0
let SpielAktiv = 0
let S4Punkte = 0
let S3Punkte = 0
let S2Punkte = 0
let S1Punkte = 0
let RundeGewonnen = 0
let Aufgabe = 0
Aufgabe = 0
RundeGewonnen = 0
S1Punkte = 0
S2Punkte = 0
S3Punkte = 0
S4Punkte = 0
SpielAktiv = 0
radio.setGroup(1)
basic.showIcon(IconNames.Yes)
