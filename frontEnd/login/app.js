if(localStorage.getItem('data') && localStorage.getItem('data') > Date.now()){
    window.location.href = "/main"
}

async function login (){

	let password = document.querySelector('.inputPassword').value
	let email = document.querySelector('.inputLogin').value
	const data = {
					"email": email,
					"password": password
				}
	let response = await fetch('/api/login',
		{
			method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
		}
	)
    let tokens = await response.json()
    localStorage.setItem('refreshToken', tokens.refresh)
    localStorage.setItem('email', tokens.email)
    localStorage.setItem('data', tokens.data)
    localStorage.setItem("theme", 0)
    window.location.href = "/main"
}

document.querySelector('.send').addEventListener('click', login)

const colors = [
    [
            {"color1":"#B2DFDB", "color":"color1"},
            {"color2":"#009688", "color":"color2"},
            {"color3":"#00695C", "color":"color3"},
            {"color4":"#000000", "color":"color4"},
        ],
    [
            {"color1":"#7C4C48", "color":"color1"},
            {"color2":"#F6CFB2", "color":"color2"},
            {"color3":"#FEFEFD", "color":"color3"},
            {"color4":"#32373D", "color":"color4"},
        ]
    ]
    
    
let stateTheme = 0
const buttonTheme = document.querySelector('.theme')
    
function setTheme (){
    stateTheme+=1
    const elements = [
        {'stat': document.querySelector('.header'), 'color': 'color2', "isArr": false},
        {'stat': document.querySelectorAll('.button'), 'color': 'color3', "isArr": true},
        {'stat': document.querySelector('.main'), 'color': 'color1', "isArr": false}
    ]
    
    for (element of elements){
        if (element.isArr === false){
            colors[stateTheme].forEach((color, index) =>{
                if (element.color === color.color){
                     element.stat.style = `background-color: ${colors[stateTheme][index][color.color]};`
                }
            })
        } else {
            element.stat.forEach(item => {
                colors[stateTheme].forEach((color, index) =>{
                    if (element.color === color.color){
                        item.style = `background-color: ${colors[stateTheme][index][color.color]};`
                    }
                })
            })
                
        }
    }
    
    if (stateTheme){
        stateTheme -=2
    }
}
    
buttonTheme.addEventListener('click', setTheme)