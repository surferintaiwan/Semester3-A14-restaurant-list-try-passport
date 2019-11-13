let buttons = document.querySelectorAll('.delete-button')
buttons.forEach((eachButton) => {
    eachButton.addEventListener('click',(event) => {
        event.preventDefault()
        let result = window.confirm("確定要刪除?")
        if (result) {event.target.parentElement.submit()}
    })
})
