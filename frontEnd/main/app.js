function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const check = async ()=>{
    const refreshToken = localStorage.getItem('refreshToken')
    const email = localStorage.getItem('email')
    const dataTime = localStorage.getItem('data')
    if (Date.now() > dataTime){
        window.location.href = "../login"
    }

    const data = {
        "email": email,
        "refresh": refreshToken
    }
    const response = await fetch('/api/check',
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
        }
    )
    const jsn = await response.json
    if (!jsn){
        window.location.href = "../login"
    }
    
    
    await render()
}

check()

document.querySelector('.logout').addEventListener('click',async ()=>{
    const data = {
        "email": localStorage.getItem('email')
    }
    await fetch('/api/check',
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
        }
    )
    localStorage.clear()
    window.location.href = "../"
})

document.querySelector('.home').addEventListener('click', ()=>{
    window.location.href = "../"
})

async function getData (){
    const resopnce = await fetch('../api/dataInfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    })
    const dataStats = await resopnce.json()
    return {
        "cpu_load": dataStats.cpuLoad,
        "cpu_temp": dataStats.cpuTemp,
        "ram_load": (dataStats.memUsed/dataStats.memTotal).toFixed(2).toString().replace('0.',''),
        'hdd_load': ((dataStats.diskSize-dataStats.diskFree)/dataStats.diskSize).toFixed(2).toString().replace('0.',''),
        "hddLoad": (dataStats.diskSize-dataStats.diskFree).toFixed(0),
    }
}

async function UpdateStats(){
    const data = await getData()

    const cpu = document.querySelector('.CPU')
    const cpuStat = document.querySelector('.CPUstat')

    const cpu_temp = document.querySelector('.CPU_TEMP')
    const cpu_tempStat = document.querySelector('.CPU_TEMPstat')

    const ram = document.querySelector('.RAM')
    const ramStat = document.querySelector('.RAMstat')

    const DISK_load = document.querySelector('.DISK_load')
    const DISK = document.querySelector('.DISK')
    const DISKstat = document.querySelector('.DISKstat')

    cpuStat.style.cssText = 
        `--p:${data.cpu_load};--b:10px;--c:${getColor(data.cpu_load)};`
    cpu.textContent = data.cpu_load+" %"
    cpu_tempStat.style.cssText = 
        `--p:${data.cpu_temp};--b:10px;--c:${getColor(data.cpu_temp)};`
        cpu_temp.textContent = data.cpu_temp+" °C"
    ram.textContent = data.ram_load+" %"
    ramStat.style.cssText = `--p:${data.ram_load};--b:10px;--c:${getColor(data.ram_load)};`
    DISKstat.style.cssText = `--p:${data.hdd_load};--b:10px;--c:${getColor(data.hdd_load)};`
    DISK_load.textContent = data.hddLoad + ' GB'
    DISK.textContent = data.hdd_load+" %"
    await sleep(1000)
}

async function UpdateService (){
    const response = await fetch('/api/getService')
    const data = await response.json()
    console.log(data);
    for (let service of data){
        const servises = document.querySelector('.servises')
        servises.innerHTML = servises.innerHTML + 
        `<div class='service'>
            <h2>${service.name}</h2>
            <div>Status</div>
            <div class='status_service' style='color: ${getColorStatus(service.status)};'>
                ${service.status?"Online":"Offline"}
            </div>
            <button class="buttonDelete button" type="submit" value="${service.name}">delete</button>
        </div>`
    }
}

async function render(){
    await UpdateService()

    document.querySelectorAll(".buttonDelete").forEach(item =>{
        item.addEventListener('click', (event)=>{
            console.log(event.target.value);
            deleteService(event.target.value)
        })
    })

    const theme = localStorage.getItem('theme')
    if (theme != 0){
        setTheme(theme)
    }

    while (true){
        await UpdateStats()
    }   
}

async function login (){
	let password = document.querySelector('.inputPassword').value
	let email = document.querySelector('.inputLogin').value
	const data = {
					"email": email,
					"password": password
				}
	let response = await fetch('../api/registration',
		{
			method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
		}
	)
}

async function addService(){
	let nameService = document.querySelector('.inputService').value
    const data = {
        "name": nameService
    }
    let response = await fetch('../api/pushService',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
        }
    )
}

async function deleteService(name){
    const data = {
        "name": name
    }
    let response = await fetch('../api/deleteService',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
        }
    )
}


document.querySelector('.buttonSend').addEventListener('click', login)
document.querySelector('.buttonSendService').addEventListener('click', addService)


// document.querySelector('.buttonSend').addEventListener('click', login)

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
let len = colors.length
const buttonTheme = document.querySelector('.theme')

function setTheme (){
    stateTheme+=1
    const elements = [
        {'stat': document.querySelector('.header'), 'color': 'color2', "isArr": false},
        {'stat': document.querySelectorAll('.button'), 'color': 'color3', "isArr": true},
        {'stat': document.querySelector('body'), 'color': 'color1', "isArr": false},
        {'stat': document.querySelector('.stats'), 'color': 'color2', "isArr": false},
        {'stat': document.querySelectorAll('.service'), 'color': 'color2', "isArr": true},
        {'stat': document.querySelectorAll('.status_service'), 'color': 'color3', "isArr": true}
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
    localStorage.theme = stateTheme
}

buttonTheme.addEventListener('click', setTheme)


function getColor(num){
    if (num <= 45){
        return '#00CA14'
    } else if (num <=75){
        return '#FFE601'
    } 
    return '#FF0000'
}

function getColorStatus (status){
    if (status === false){
        return 'black'
    } else if (status ===true){
        return '#00CA14'
    }
    return '#FFE601'
}