
function Session(time=null,person=null,event=null,place=null,start=null,end=null,curtime=null){
    var template = {value:'',stroke:{pageNum:0,points:[]}}
    this.time = template
    this.person = template
    this.event = template
    this.place = template
    this.curtime = curtime
}

function clearFragmentText(){
    document.getElementById('event').innerText = ''
    document.getElementById('place').innerText = ''
    document.getElementById('time').innerText = ''
    document.getElementById('person').innerText = ''
}