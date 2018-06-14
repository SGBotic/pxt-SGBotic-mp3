/**
* Makecode block for mp3 player
*/

namespace SGBotic{
    
    export enum CMD{
        NEXT_TRACK = 0x01,
        PREV_TRACK = 0x02,  // Play previous song.
        PLAY_TRACK = 0x03,
        VOLUME_UP = 0x04,
        VOLUME_DOWN,
        SET_VOLUME,
        
        TRACK_REPEAT_PLAY = 0X08, //repeat playing one track
        SEL_DEVICE = 0x09,
        SLEEP_MODE,
        WAKE_UP,
        RESET,
        PLAY,
        PAUSE,
        PLAY_FOLDER_FILE,
        
        STOP = 0x16,
        FOLDER_REPEAT_PLAY,
        SHUFFLE_PLAY,
        SET_SINGLE_CYCLE_PLAY,
        
        PLAY_W_VOL = 0x22,
        
        QUERY_STATUS = 0x42, 
        QUERY_VOLUME,
        QUERY_TRACK_COUNT = 0x48,
        QUERY_CURRENT_TRACK = 0x4C,
        QUERY_FOLDER_TRACKS = 0x4E,  //check no. of tracks in folder
        QUERY_FOLDER_COUNT = 0x4f      // check no. of folders
    }
    
    export enum YesNo{
        //%block="No"
        NO = 0,
        //%block="Yes"
        YES = 1
    }
    
    export enum StartStop{
        //%block="Stop"
        STOP = 0,
        //%block="Start"
        START = 1
    }
 
   /**
    * Initialize MP3 player
    * @param pinRX is to receive data, eg: SerialPin.P0
    * @param pinTx is to transmit data, eg: SerialPin.P1
    */
    //% subcategory=MP3
    //% blockId="MP3_init" block="connect MP3 player RX to %pinRX|TX to %pinTX"
    //% weight=100  blockExternalInputs=true blockGap=20
    export function MP3_init(pinRX: SerialPin, pinTX: SerialPin): void {
      serial.redirect(
            pinRX,
            pinTX,
            BaudRate.BaudRate9600
        )
       // basic.pause(500)
      //  basic.pause(2000)
        sendCMD(CMD.SEL_DEVICE, 0, 0x02)       //select TF Card
        basic.pause(500)
       
    }
    
    
    /**
    * Reset MP3 player
    */
    //% subcategory=MP3
    //% blockId="MP3_reset" block="reset MP3 player"
    //% weight=95  blockGap=20
    export function MP3_reset(): void {
    
        sendCMD(CMD.RESET, 0, 0)       //select TF Card
    }
    
    
    
    /**
     * Set volume (1 to 30)
     * @param volume is to set speaker volume, eg: 15
     */
    //% subcategory=MP3
    //% blockId="MP3_setVolume" block="volume %volume"
    //% weight=94  blockExternalInputs=true blockGap=20
    //% volume.min=1 volume.max=30
    export function setVolume(volume: number): void {
        sendCMD(CMD.SET_VOLUME, 0, volume)
    }
    
    /**
     * Increase volume
     */
    //% subcategory=MP3
    //% blockId="MP3_volumeInc" block="volume +"
    //% weight=93  blockExternalInputs=true blockGap=20
    export function volumeInc(): void {
        sendCMD(CMD.VOLUME_UP, 0, 0)
    }
    
    /**
     * Decrease volume
     */
    //% subcategory=MP3
    //% blockId="MP3_volumeDec" block="volume -"
    //% weight=92  blockExternalInputs=true blockGap=20
    export function volumeDec(): void {
        sendCMD(CMD.VOLUME_DOWN, 0, 0)
    }
    
    
    /**
     * Play next track
     */
    //% subcategory=MP3
    //% blockId="MP3_nextTrack" block="next track"
    //% weight=71  blockExternalInputs=true blockGap=20
    export function nextTrack(): void {  
        sendCMD(CMD.NEXT_TRACK, 0, 0)
    }
    
    
     /**
     * Play previous track
     */
    //% subcategory=MP3
    //% blockId="MP3_prevTrack" block="previous track"
    //% weight=70  blockExternalInputs=true blockGap=20
    export function prevTrack(): void {
        sendCMD(CMD.PREV_TRACK, 0, 0)
    }
    
    /**
     * Play track
     */
    //% subcategory=MP3
    //% blockId="MP3_play" block="play"
    //% weight=80  blockExternalInputs=true blockGap=20
    export function play(): void {
        sendCMD(CMD.PLAY, 0, 0)
    }
    
    /**
     * Pause
     */
    //% subcategory=MP3
    //% blockId="MP3_pause" block="pause"
    //% weight=79  blockExternalInputs=true blockGap=20
    export function pause(): void {
        sendCMD(CMD.PAUSE, 0, 0)
    }
    
    /**
     * Stop
     */
    //% subcategory=MP3
    //% blockId="MP3_stop" block="stop"
    //% weight=78  blockExternalInputs=true blockGap=20
    export function stop(): void {
        sendCMD(CMD.STOP, 0, 0)
    }
    
   /**
     * Play track (1 to 99) in folder (1 to 99).
     * @param track to be play, eg: 1
     * @param folder which the track resides, eg: 1
     */
    //% subcategory=MP3
    //% blockId="MP3_playTrack" block="play track %track| in folder %folder"
    //% weight=90 blockExternalInputs=true  blockGap=20
    //% track.min=1 track.max=99
    //% folder.min=1 folder.max=99
    export function playTrack(track: number, folder: number): void {
        sendCMD(CMD.PLAY_FOLDER_FILE, folder, track)  
        clearBuffer()
    }
    
    /**
     * Repeat track
     * @param repeatTrack to continue playing track, eg: StartStop.STOP
     */
    //% subcategory=MP3
    //% blockId="MP3_repeatTrack" block="repeat track %repeatTrk"
    //% weight=90 blockExternalInputs=true  blockGap=20
    export function repeatTrack(repeatTrk: StartStop): void {
        basic.pause(500) 
        if(repeatTrk === 0)
        {
            sendCMD(CMD.SET_SINGLE_CYCLE_PLAY, 0, 1)  //stop  
        }else
        {
            sendCMD(CMD.SET_SINGLE_CYCLE_PLAY, 0, 0)  //stop
        }
    }
    
    /**
     * Shuffle play
     */
    //% subcategory=MP3
    //% blockId="MP3_shufflePlay" block="shuffle play"
    //% weight=90 blockExternalInputs=true  blockGap=20
    export function shufflePlay(): void {
        sendCMD(CMD.SHUFFLE_PLAY, 0, 0)  //stop 
    }
    
    
    export function clearBuffer():void{
        //let bufr = pins.createBuffer(20)
        //bufr = serial.readBuffer(20) 
        let strbufr: string
        strbufr = serial.readString()
    }
  
    export function sendCMD(command: number, dath: number, datl: number): void {
        basic.pause(500)
        let dataBuffer = pins.createBuffer(8)
        dataBuffer.setNumber(NumberFormat.UInt8LE, 0, 0x7E) 
        dataBuffer.setNumber(NumberFormat.UInt8LE, 1, 0xFF) 
        dataBuffer.setNumber(NumberFormat.UInt8LE, 2, 0x06)
        dataBuffer.setNumber(NumberFormat.UInt8LE, 3, command)
        dataBuffer.setNumber(NumberFormat.UInt8LE, 4, 0x00)     //0x00 no fb, 0x01 feedback
        dataBuffer.setNumber(NumberFormat.UInt8LE, 5, dath)     //higher byte
        dataBuffer.setNumber(NumberFormat.UInt8LE, 6, datl)     //lower byte
        dataBuffer.setNumber(NumberFormat.UInt8LE, 7, 0xEF)
        serial.writeBuffer(dataBuffer)   
       
    }
    
 
 
  
  
}