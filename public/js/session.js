
function Session(time=null,person=null,event=null,place=null,start=null,end=null,curtime=null){
    this.time = time
    this.person = person
    this.event = event
    this.place = place
    this.start = start
    this.end = end
    this.curtime = curtime
}

function clearSession(){
    document.getElementById('event').innerText = ''
    document.getElementById('place').innerText = ''
    document.getElementById('time').innerText = ''
    document.getElementById('person').innerText = ''
}