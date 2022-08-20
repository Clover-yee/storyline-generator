function openFragmentPanel(){
    var floatPanelFragment = document.getElementById('float-panel-fragment')
    floatPanelFragment.classList.add('options')
    setTimeout(() => {
        floatPanelFragment.classList.remove('options')
        floatPanelFragment.style.right = '15px'
        floatPanelFragment.style.bottom = '25px'
    }, 500);
}

function closeFragmentPanel(){
    var floatPanelFragment = document.getElementById('float-panel-fragment')
    floatPanelFragment.style.top = ''
    floatPanelFragment.style.left = ''
    floatPanelFragment.style.right = '-260px'
    floatPanelFragment.style.bottom = '25px'
    clearFragmentText()
}