const os = require('os')
const si = require('systeminformation');
var osu = require('node-os-utils')
const checkDiskSpace = require('check-disk-space').default
// const { exec } = require("child_process");


module.exports = new class {
    async getInfo(){
        var cpu = osu.cpu
        const uptime = si.time().uptime /60/60
        const cpuTemp = await si.cpuTemperature()
        const cpuLoad = await cpu.usage()
        const memTotal = await si.mem()
        const memUsed = await si.mem()
        // const memLoad = memUsed/memTotal
        const diskSize = await si.diskLayout()
        const diskFree = await checkDiskSpace("/")
        return await ({
            "uptime": uptime,
            "cpuTemp": cpuTemp.main,
            "cpuLoad": cpuLoad,
            "memTotal": memTotal.total/1024/1024/1024,
            "memUsed": memUsed.used/1024/1024/1024,
            // "memLoad": memLoad,
            "diskSize": diskSize[0].size/1024/1024/1024,
            "diskFree": diskFree.free/1024/1024/1024,
        })
    }
    async setInfo(obj){
        const data = await si.services(obj)
        return await data[0].running
    }

}
